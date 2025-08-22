/**
 * Plaid API routes for Cloudflare Workers - Production Implementation
 */
import { Hono } from 'hono'
import { PlaidService, PlaidAPIError } from '../lib/plaid-service'
import { TokenEncryption } from '../lib/encryption'
import { requestId, apiLogger, errorHandler } from '../middleware/api'
import { authenticateSupabaseUser, createSupabaseClient } from '../lib/auth'
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

// DEBUG ENDPOINT: Check environment variables
plaid.post('/debug_env', async (c) => {
  return c.json({
    hasPlaidClientId: !!c.env.PLAID_CLIENT_ID,
    hasPlaidSecret: !!c.env.PLAID_SECRET,
    plaidEnv: c.env.PLAID_ENV,
    domain: c.env.DOMAIN,
    hasSupabaseServiceRole: !!c.env.SUPABASE_SERVICE_ROLE_KEY,
    hasEncryptionKey: !!c.env.ENCRYPTION_KEY
  })
})

// DEBUG ENDPOINT: Test DNS resolution via DoH
plaid.post('/debug_dns', async (c) => {
  try {
    const q = name => fetch(`https://cloudflare-dns.com/dns-query?name=${name}&type=A`, { 
      headers: { accept: 'application/dns-json' } 
    }).then(r => r.json());
    
    const g = name => fetch(`https://dns.google/resolve?name=${name}&type=A`)
      .then(r => r.json());
    
    const names = ["google.com", "production.api.plaid.com","development.api.plaid.com","sandbox.api.plaid.com"];
    
    const [cf, gg] = await Promise.all([
      Promise.all(names.map(q)),
      Promise.all(names.map(g))
    ]);
    
    return c.json({ 
      cloudflare_dns: cf, 
      google_dns: gg,
      zone_type: "Custom domain (likely Partial/CNAME setup)",
      worker_route: "api.bankstatementretriever.com"
    });
    
  } catch (error) {
    return c.json({
      error: 'DNS test failed',
      message: error.message
    });
  }
})

// TEST ENDPOINT: Create link token without auth (MVP testing only)
plaid.post('/test_link_token', async (c) => {
  try {
    console.log('TEST: Creating Plaid link token without authentication')
    console.log('Environment check:', {
      hasPlaidClientId: !!c.env.PLAID_CLIENT_ID,
      hasPlaidSecret: !!c.env.PLAID_SECRET,
      plaidEnv: c.env.PLAID_ENV,
      domain: c.env.DOMAIN
    })
    
    let plaidService
    
    try {
      plaidService = new PlaidService(c.env)
      console.log('PlaidService created successfully')
    } catch (error) {
      console.error('PlaidService initialization error:', error)
      
      if (error.message.includes('environment variable is required')) {
        return c.json({
          error: 'BSR_CONFIG_ERROR',
          message: 'Plaid service configuration incomplete. Missing environment variables.',
          details: error.message
        }, 500)
      }
      
      throw error // Re-throw non-config errors
    }
    
    console.log('Calling createLinkToken...')
    const linkTokenResponse = await plaidService.createLinkToken('test_user_123')
    console.log('Link token created successfully')
    
    return c.json({
      link_token: linkTokenResponse.link_token,
      expiration: linkTokenResponse.expiration,
      test_mode: true
    })

  } catch (error) {
    console.error('Test link token creation error:', error)
    
    if (error instanceof PlaidAPIError) {
      return c.json({
        error: 'BSR_PLAID_ERROR',
        message: error.plaidError.error_message,
        plaid_error: error.plaidError
      }, 400)
    }
    
    // Expose detailed error for debugging
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to create test link token',
      debug: {
        errorName: error.name,
        errorMessage: error.message,
        stack: error.stack?.split('\n').slice(0, 5) // First 5 lines of stack
      }
    }, 500)
  }
})

// Create link token for Plaid Link - production implementation
plaid.post('/link_token', async (c) => {
  try {
    const { error, user } = await authenticateSupabaseUser(c)
    if (error) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: error
      }, 401)
    }

    let plaidService
    let linkTokenResponse
    
    try {
      plaidService = new PlaidService(c.env)
    } catch (error) {
      console.error('PlaidService initialization error:', error)
      
      if (error.message.includes('environment variable is required')) {
        return c.json({
          error: 'BSR_CONFIG_ERROR',
          message: 'Plaid service configuration incomplete. Missing environment variables.'
        }, 500)
      }
      
      throw error // Re-throw non-config errors
    }
    
    linkTokenResponse = await plaidService.createLinkToken(user.id)
    
    return c.json({
      link_token: linkTokenResponse.link_token,
      expiration: linkTokenResponse.expiration
    })

  } catch (error) {
    console.error('Link token creation error:', error)
    
    if (error instanceof PlaidAPIError) {
      // Provide more specific error messages based on Plaid error codes
      let userMessage = error.plaidError.error_message
      
      if (error.plaidError.error_code === 'INVALID_PRODUCT') {
        userMessage = 'The statements product is not available for your Plaid environment. Please contact support.'
      } else if (error.plaidError.error_code === 'INVALID_CREDENTIALS') {
        userMessage = 'Plaid API credentials are invalid. Please check configuration.'
      } else if (error.plaidError.error_code === 'PRODUCT_NOT_ENABLED') {
        userMessage = 'The required Plaid product is not enabled for your account.'
      }
      
      return c.json({
        error: 'BSR_PLAID_ERROR',
        message: userMessage,
        plaid_error: {
          error_type: error.plaidError.error_type,
          error_code: error.plaidError.error_code,
          error_message: error.plaidError.error_message
        }
      }, 400)
    }
    
    // Log the full error for debugging but don't expose internal details
    console.error('Non-Plaid error in link token creation:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to create link token. Please try again or contact support.'
    }, 500)
  }
})

// Exchange public token for access token - production implementation
plaid.post('/exchange_public_token', async (c) => {
  try {
    const { error, user } = await authenticateSupabaseUser(c)
    if (error) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: error
      }, 401)
    }

    // Validate input
    const body = await c.req.json()
    const validatedInput = ExchangeTokenSchema.parse(body)
    
    let plaidService
    let encryption
    
    try {
      plaidService = new PlaidService(c.env)
      encryption = new TokenEncryption(c.env.ENCRYPTION_KEY)
    } catch (error) {
      console.error('PlaidService/TokenEncryption initialization error:', error)
      
      if (error.message.includes('environment variable is required') || error.message.includes('ENCRYPTION_KEY')) {
        return c.json({
          error: 'BSR_CONFIG_ERROR',
          message: 'Service configuration incomplete. Missing environment variables.'
        }, 500)
      }
      
      throw error // Re-throw non-config errors
    }

    // Step 1: Exchange public token for access token
    const exchangeResponse = await plaidService.exchangePublicToken(validatedInput.public_token)
    
    // Step 2: Get account information
    const accountsResponse = await plaidService.getAccounts(exchangeResponse.access_token)
    
    // Step 3: Encrypt and store access token
    const encryptedToken = await encryption.encrypt(exchangeResponse.access_token)
    
    // Step 4: Store connection in database
    const supabase = createSupabaseClient(c.env)
    
    // Ensure organization exists for the foreign key constraint
    console.log('Checking if organization exists for org_id:', user.org_id)
    const { data: existingOrg } = await supabase
      .from('organizations')
      .select('id')
      .eq('id', user.org_id)
      .single()
    
    if (!existingOrg) {
      console.log('Organization does not exist, creating it with id:', user.org_id)
      
      // Handle case where org_id equals user.id (circular reference)
      // Check if user exists in our database
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()
      
      if (!existingUser) {
        console.log('Creating user and organization (avoiding circular reference)')
        
        // Generate unique organization ID to break circular dependency
        const orgId = crypto.randomUUID()
        console.log('Generated org ID:', orgId, 'for user:', user.id)
        
        // Step 1: Create organization first (no circular reference)
        const { error: orgError } = await supabase
          .from('organizations')
          .insert({
            id: orgId,
            owner_user_id: user.id,
            plan: 'free',
            status: 'active'
          })
        
        if (orgError) {
          console.error('Failed to create organization:', orgError)
          return c.json({
            error: 'BSR_DATABASE_ERROR',
            message: 'Failed to create organization',
            debug: { orgError, user_id: user.id, org_id: orgId }
          }, 500)
        }
        console.log('Organization created successfully with id:', orgId)
        
        // Step 2: Now create user with proper org_id reference
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            org_id: orgId,
            email: user.email || user.user_metadata?.email
          })
        
        if (userError) {
          console.error('Failed to create user:', userError)
          // Clean up the organization we just created
          await supabase.from('organizations').delete().eq('id', orgId)
          return c.json({
            error: 'BSR_DATABASE_ERROR',
            message: 'Failed to create user account',
            debug: { userError, user_id: user.id, org_id: orgId }
          }, 500)
        }
        console.log('User record created successfully')
        
        // Update user object to use correct org_id for subsequent operations
        user.org_id = orgId
        
      } else {
        // User exists but organization doesn't - create organization
        const { error: orgError } = await supabase
          .from('organizations')
          .insert({
            id: user.org_id,
            owner_user_id: user.id,
            plan: 'free',
            status: 'active'
          })
        
        if (orgError) {
          console.error('Failed to create organization:', orgError)
          return c.json({
            error: 'BSR_DATABASE_ERROR',
            message: 'Failed to create organization',
            debug: { orgError, user_id: user.id, org_id: user.org_id }
          }, 500)
        }
        console.log('Organization created successfully')
      }
    }
    
    console.log('Attempting to insert connection with data:', {
      org_id: user.org_id,
      plaid_item_id: exchangeResponse.item_id,
      institution: accountsResponse.item.institution_id || 'unknown',
      user_id: user.id,
      user_email: user.email
    })
    
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
      console.error('Database connection insertion failed:', {
        error: connectionError,
        errorCode: connectionError.code,
        errorMessage: connectionError.message,
        errorDetails: connectionError.details,
        errorHint: connectionError.hint,
        user_org_id: user.org_id,
        user_id: user.id,
        plaid_item_id: exchangeResponse.item_id
      })
      
      // Check if it's a foreign key constraint error
      if (connectionError.code === '23503') {
        return c.json({
          error: 'BSR_DATABASE_ERROR',
          message: 'Failed to store connection: Organization not found. Please contact support.',
          debug: {
            constraint: connectionError.details,
            org_id: user.org_id
          }
        }, 500)
      }
      
      // Check if it's a unique constraint violation
      if (connectionError.code === '23505') {
        return c.json({
          error: 'BSR_DATABASE_ERROR',
          message: 'This bank connection already exists.',
          debug: {
            constraint: connectionError.details,
            plaid_item_id: exchangeResponse.item_id
          }
        }, 409)
      }
      
      return c.json({
        error: 'BSR_DATABASE_ERROR',
        message: 'Failed to store connection',
        debug: {
          code: connectionError.code,
          message: connectionError.message,
          details: connectionError.details
        }
      }, 500)
    }

    // Step 6: Store accounts and check statements support
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
        console.error('Database account insertion failed:', {
          error: accountError,
          errorCode: accountError.code,
          errorMessage: accountError.message,
          errorDetails: accountError.details,
          account_id: account.account_id,
          connection_id: connection.id
        })
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

    // Step 7: Schedule initial backfill if requested
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