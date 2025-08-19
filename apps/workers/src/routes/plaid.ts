/**
 * Plaid API routes for Cloudflare Workers
 */
import { Hono } from 'hono'
import { 
  PlaidService, 
  createPlaidConfig,
  isPlaidWebhook,
  isStatementWebhook,
  isItemWebhook,
  StatementLearningService,
  type PlaidWebhook,
  type StatementRefreshWebhook,
  type ItemWebhook
} from '@bsr/plaid'
import { requireAuth, getCurrentUser } from '@bsr/auth'
import type { Env } from '../types/env'
import { verifyWebhookSignature } from '../lib/webhook'

const plaid = new Hono<{ Bindings: Env }>()

// Initialize Plaid service
function createPlaidService(env: Env) {
  const config = createPlaidConfig(
    env.PLAID_CLIENT_ID,
    env.PLAID_SECRET,
    env.PLAID_ENV as 'sandbox' | 'development' | 'production',
    `https://${env.DOMAIN}/api/plaid/webhook`
  )
  
  return new PlaidService(config, env.ENCRYPTION_KEY)
}

// Initialize learning service
function createLearningService() {
  return new StatementLearningService()
}

// Middleware for authenticated routes
const authMiddleware = (c: any, next: any) => requireAuth(c, next)

// Public webhook endpoint (no auth required)
plaid.post('/webhook', async (c) => {
  try {
    const signature = c.req.header('plaid-verification')
    const body = await c.req.text()
    
    // Verify webhook signature
    const isValid = await verifyWebhookSignature(
      body,
      signature || '',
      c.env.PLAID_WEBHOOK_SECRET
    )
    
    if (!isValid) {
      return c.json({ error: 'Invalid webhook signature' }, 401)
    }

    const webhook = JSON.parse(body)
    
    if (!isPlaidWebhook(webhook)) {
      return c.json({ error: 'Invalid webhook format' }, 400)
    }

    // Process webhook based on type
    await processPlaidWebhook(webhook, c.env)
    
    return c.json({ success: true })

  } catch (error) {
    console.error('Plaid webhook error:', error)
    return c.json({ error: 'Webhook processing failed' }, 500)
  }
})

// Create link token for Plaid Link
plaid.post('/link_token', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const plaidService = createPlaidService(c.env)
    
    const result = await plaidService.createLinkToken(user.id, 'BankStatementRetriever')
    
    if (!result.success) {
      return c.json({
        error: result.error?.error_code || 'LINK_TOKEN_ERROR',
        message: result.error?.error_message || 'Failed to create link token'
      }, 400)
    }

    return c.json({
      link_token: result.data!.link_token,
      expiration: result.data!.expiration
    })

  } catch (error) {
    console.error('Link token creation error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to create link token'
    }, 500)
  }
})

// Exchange public token for access token
plaid.post('/exchange_public_token', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const { public_token } = await c.req.json()
    
    if (!public_token) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'public_token is required'
      }, 400)
    }

    const plaidService = createPlaidService(c.env)
    
    // Exchange token
    const exchangeResult = await plaidService.exchangePublicToken(public_token)
    
    if (!exchangeResult.success) {
      return c.json({
        error: exchangeResult.error?.error_code || 'EXCHANGE_ERROR',
        message: exchangeResult.error?.error_message || 'Failed to exchange token'
      }, 400)
    }

    const { access_token, item_id } = exchangeResult.data!
    
    // Store encrypted token
    const stored = await plaidService.storeAccessToken(user.id, item_id, access_token)
    
    if (!stored) {
      return c.json({
        error: 'STORAGE_ERROR',
        message: 'Failed to store access token'
      }, 500)
    }

    // Sync accounts
    const synced = await plaidService.syncAccounts(item_id)
    
    if (!synced) {
      console.warn('Failed to sync accounts for item:', item_id)
    }

    // Enqueue initial statement check
    await c.env.BSR_QUEUE.send({
      type: 'check_statements',
      item_id,
      account_id: null, // Will check all accounts
      priority: 'high'
    })

    return c.json({
      success: true,
      item_id,
      message: 'Bank connection established successfully'
    })

  } catch (error) {
    console.error('Token exchange error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to exchange token'
    }, 500)
  }
})

// Get user's connected accounts
plaid.get('/accounts', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    
    // Get accounts from database
    const accounts = await c.env.DB.prepare(`
      SELECT 
        a.*,
        conn.institution_name,
        conn.status as connection_status
      FROM accounts a
      JOIN connections conn ON a.connection_id = conn.id
      WHERE conn.user_id = ?
      ORDER BY conn.institution_name, a.name
    `).bind(user.id).all()

    return c.json({
      accounts: accounts.results
    })

  } catch (error) {
    console.error('Get accounts error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to fetch accounts'
    }, 500)
  }
})

// Force refresh accounts for a connection
plaid.post('/accounts/refresh/:itemId', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const itemId = c.req.param('itemId')
    
    // Verify user owns this connection
    const connection = await c.env.DB.prepare(`
      SELECT id FROM connections WHERE id = ? AND user_id = ?
    `).bind(itemId, user.id).first()
    
    if (!connection) {
      return c.json({
        error: 'NOT_FOUND',
        message: 'Connection not found'
      }, 404)
    }

    const plaidService = createPlaidService(c.env)
    const synced = await plaidService.syncAccounts(itemId)
    
    if (!synced) {
      return c.json({
        error: 'SYNC_ERROR',
        message: 'Failed to refresh accounts'
      }, 500)
    }

    return c.json({
      success: true,
      message: 'Accounts refreshed successfully'
    })

  } catch (error) {
    console.error('Account refresh error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to refresh accounts'
    }, 500)
  }
})

// Get statement availability predictions
plaid.get('/predictions', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const learningService = createLearningService()
    
    // Get user's accounts
    const accounts = await c.env.DB.prepare(`
      SELECT a.plaid_account_id, a.name, conn.institution_id
      FROM accounts a
      JOIN connections conn ON a.connection_id = conn.id
      WHERE conn.user_id = ?
    `).bind(user.id).all()

    const predictions = []
    
    for (const account of accounts.results as any[]) {
      const prediction = await learningService.predictNextStatement(
        account.institution_id || 'unknown',
        account.plaid_account_id
      )
      
      if (prediction) {
        predictions.push({
          account_id: account.plaid_account_id,
          account_name: account.name,
          ...prediction
        })
      }
    }

    return c.json({ predictions })

  } catch (error) {
    console.error('Get predictions error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to get predictions'
    }, 500)
  }
})

// Manual statement check for account
plaid.post('/check_statements/:accountId', authMiddleware, async (c) => {
  try {
    const user = getCurrentUser(c)!
    const accountId = c.req.param('accountId')
    
    // Verify user owns this account
    const account = await c.env.DB.prepare(`
      SELECT a.connection_id, conn.user_id
      FROM accounts a
      JOIN connections conn ON a.connection_id = conn.id
      WHERE a.plaid_account_id = ? AND conn.user_id = ?
    `).bind(accountId, user.id).first()
    
    if (!account) {
      return c.json({
        error: 'NOT_FOUND',
        message: 'Account not found'
      }, 404)
    }

    // Enqueue statement check
    await c.env.BSR_QUEUE.send({
      type: 'check_statements',
      item_id: (account as any).connection_id,
      account_id: accountId,
      priority: 'high'
    })

    return c.json({
      success: true,
      message: 'Statement check queued'
    })

  } catch (error) {
    console.error('Manual check error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to queue statement check'
    }, 500)
  }
})

// Webhook processing function
async function processPlaidWebhook(webhook: PlaidWebhook, env: Env): Promise<void> {
  try {
    if (isStatementWebhook(webhook)) {
      await handleStatementWebhook(webhook, env)
    } else if (isItemWebhook(webhook)) {
      await handleItemWebhook(webhook, env)
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
  }
}

async function handleStatementWebhook(webhook: StatementRefreshWebhook, env: Env): Promise<void> {
  console.log('Processing statement webhook:', webhook.webhook_code)
  
  // Enqueue statement check for the specific account
  await env.BSR_QUEUE.send({
    type: 'check_statements',
    item_id: webhook.item_id,
    account_id: webhook.account_id,
    priority: 'normal',
    webhook_triggered: true
  })
}

async function handleItemWebhook(webhook: ItemWebhook, env: Env): Promise<void> {
  console.log('Processing item webhook:', webhook.webhook_code)
  
  switch (webhook.webhook_code) {
    case 'ERROR':
      // Update connection status to error
      await env.DB.prepare(`
        UPDATE connections 
        SET status = 'error', error_message = ?
        WHERE id = ?
      `).bind(
        webhook.error?.error_message || 'Unknown error',
        webhook.item_id
      ).run()
      break
      
    case 'USER_PERMISSION_REVOKED':
      // Disable connection
      await env.DB.prepare(`
        UPDATE connections 
        SET status = 'revoked'
        WHERE id = ?
      `).bind(webhook.item_id).run()
      break
      
    case 'PENDING_EXPIRATION':
      // Send notification about expiring connection
      await env.BSR_QUEUE.send({
        type: 'send_notification',
        item_id: webhook.item_id,
        notification_type: 'connection_expiring',
        data: {
          expiration_time: webhook.consent_expiration_time
        }
      })
      break
  }
}

export { plaid as plaidRouter }