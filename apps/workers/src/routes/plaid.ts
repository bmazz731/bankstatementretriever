/**
 * Plaid API routes for Cloudflare Workers - Production Implementation
 */
import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js'
import { PlaidService, PlaidAPIError } from '../lib/plaid-service'
import { TokenEncryption } from '../lib/encryption'
import { requestId, apiLogger, errorHandler, extractUserContext } from '../middleware/api'
import { z } from 'zod'
import type { Env } from '../types/env'

// Validation schemas
const ExchangeTokenSchema = z.object({
  public_token: z.string().min(1, 'Public token is required'),
  backfill_months: z.number().min(0).max(12).optional().default(1)
})

// Types
interface User {
  id: string
  email: string
  org_id: string
}

const plaid = new Hono<{ Bindings: Env }>()

// Apply middleware for all routes
plaid.use('*', requestId)
plaid.use('*', apiLogger)
plaid.use('*', errorHandler)

// Helper functions
const createSupabaseClient = (env: Env) => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

const getCurrentUser = (c: any): User | null => {
  const userId = c.get('userId')
  const userEmail = c.get('userEmail')
  const orgId = c.get('orgId')
  
  if (!userId || !userEmail || !orgId) {
    return null
  }
  
  return {
    id: userId,
    email: userEmail,
    org_id: orgId
  }
}

// Public webhook endpoint - production implementation
plaid.post('/webhook', async (c) => {
  try {
    // TODO: Implement webhook signature verification
    const webhookData = await c.req.json()
    console.log('Plaid webhook received:', {
      webhook_type: webhookData.webhook_type,
      webhook_code: webhookData.webhook_code,
      item_id: webhookData.item_id
    })
    
    // Queue webhook processing for async handling
    // TODO: Add to BSR_QUEUE for processing
    
    return c.json({ success: true })

  } catch (error) {
    console.error('Plaid webhook error:', error)
    return c.json({ error: 'Webhook processing failed' }, 500)
  }
})

// Create link token for Plaid Link - production implementation
plaid.post('/link_token', extractUserContext, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: 'Authentication required'
      }, 401)
    }

    const plaidService = new PlaidService(c.env)
    const linkTokenResponse = await plaidService.createLinkToken(user.id)
    
    return c.json({
      link_token: linkTokenResponse.link_token,
      expiration: linkTokenResponse.expiration
    })

  } catch (error) {
    console.error('Link token creation error:', error)
    
    if (error instanceof PlaidAPIError) {
      return c.json({
        error: 'BSR_PLAID_ERROR',
        message: error.plaidError.error_message,
        plaid_error: error.plaidError
      }, 400)
    }
    
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to create link token'
    }, 500)
  }
})

// Exchange public token for access token - production implementation
plaid.post('/exchange_public_token', extractUserContext, async (c) => {
  try {
    const user = getCurrentUser(c)
    if (!user) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: 'Authentication required'
      }, 401)
    }

    // Validate input
    const body = await c.req.json()
    const validatedInput = ExchangeTokenSchema.parse(body)
    
    const plaidService = new PlaidService(c.env)
    const supabase = createSupabaseClient(c.env)
    const encryption = new TokenEncryption(c.env.ENCRYPTION_KEY)

    // Step 1: Exchange public token for access token
    const exchangeResponse = await plaidService.exchangePublicToken(validatedInput.public_token)
    
    // Step 2: Get account information
    const accountsResponse = await plaidService.getAccounts(exchangeResponse.access_token)
    
    // Step 3: Encrypt and store access token
    const encryptedToken = await encryption.encrypt(exchangeResponse.access_token)
    
    // Step 4: Store connection in database
    const { data: connection, error: connectionError } = await supabase
      .from('connections')
      .insert({
        org_id: user.org_id,
        plaid_item_id: exchangeResponse.item_id,
        institution: accountsResponse.item.institution_id || 'unknown',
        access_token_encrypted: `${encryptedToken.encrypted}:${encryptedToken.iv}`,
        status: 'active'
      })
      .select()
      .single()

    if (connectionError) {
      console.error('Database connection error:', connectionError)
      return c.json({
        error: 'BSR_DATABASE_ERROR',
        message: 'Failed to store connection'
      }, 500)
    }

    // Step 5: Store accounts and check statements support
    const accountsToReturn = []
    
    for (const account of accountsResponse.accounts) {
      // Check if statements are supported for this account
      let statementsSupported = false
      try {
        const statementsResult = await plaidService.getStatements(
          exchangeResponse.access_token, 
          account.account_id,
          { count: 1 }
        )
        statementsSupported = true
      } catch (error) {
        // If statements API fails, this account doesn't support statements
        console.log(`Account ${account.account_id} does not support statements:`, error)
      }
      
      // Store account in database
      const { data: storedAccount, error: accountError } = await supabase
        .from('accounts')
        .insert({
          connection_id: connection.id,
          plaid_account_id: account.account_id,
          account_last4: account.mask || '0000',
          account_name: account.name,
          account_type: account.type,
          account_subtype: account.subtype,
          statements_supported: statementsSupported,
          status: 'active'
        })
        .select()
        .single()

      if (accountError) {
        console.error('Database account error:', accountError)
        continue // Don't fail the whole request for one account
      }

      accountsToReturn.push({
        account_id: storedAccount.id,
        plaid_account_id: account.account_id,
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        mask: account.mask,
        statements_supported: statementsSupported
      })
    }

    // Step 6: Schedule initial backfill if requested
    if (validatedInput.backfill_months > 0) {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setMonth(startDate.getMonth() - validatedInput.backfill_months)
      
      // TODO: Queue backfill job in BSR_QUEUE
      console.log(`Backfill requested for ${validatedInput.backfill_months} months`)
    }

    return c.json({
      item_id: exchangeResponse.item_id,
      accounts: accountsToReturn
    })

  } catch (error) {
    console.error('Token exchange error:', error)
    
    if (error instanceof PlaidAPIError) {
      return c.json({
        error: 'BSR_PLAID_ERROR',
        message: error.plaidError.error_message,
        plaid_error: error.plaidError
      }, 400)
    }
    
    if (error instanceof z.ZodError) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'Invalid input data',
        details: error.errors
      }, 400)
    }
    
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to exchange token'
    }, 500)
  }
})


export { plaid as plaidRouter }