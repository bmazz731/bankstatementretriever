/**
 * Plaid API routes for Cloudflare Workers - MVP Stub Implementation
 */
import { Hono } from 'hono'
import type { Env } from '../types/env'

// Stub types to replace @bsr/plaid
interface User {
  id: string
  email: string
  org_id: string
  organization: {
    plan: string
    status: string
    owner_user_id: string
  }
}

// Stub auth functions
function requireAuth(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'UNAUTHORIZED', message: 'Authentication required' }, 401)
  }
  
  c.set('user', {
    id: 'user_123',
    email: 'demo@example.com',
    org_id: 'org_123',
    organization: { plan: 'starter', status: 'active', owner_user_id: 'user_123' }
  })
  
  return next()
}

function getCurrentUser(c: any): User | null {
  return c.get('user')
}

const plaid = new Hono<{ Bindings: Env }>()

// Middleware for authenticated routes
const authMiddleware = requireAuth

// Public webhook endpoint - MVP stub
plaid.post('/webhook', async (c) => {
  try {
    console.log('Plaid webhook received (stub implementation)')
    
    return c.json({ success: true })

  } catch (error) {
    console.error('Plaid webhook error:', error)
    return c.json({ error: 'Webhook processing failed' }, 500)
  }
})

// Create link token for Plaid Link - MVP stub
plaid.post('/link_token', authMiddleware, async (c) => {
  try {
    // Stub link token for MVP
    return c.json({
      link_token: `link-sandbox-${Date.now()}`,
      expiration: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString() // 4 hours
    })

  } catch (error) {
    console.error('Link token creation error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to create link token'
    }, 500)
  }
})

// Exchange public token for access token - MVP stub
plaid.post('/exchange_public_token', authMiddleware, async (c) => {
  try {
    const { public_token } = await c.req.json()
    
    if (!public_token) {
      return c.json({
        error: 'INVALID_INPUT',
        message: 'public_token is required'
      }, 400)
    }

    // Stub token exchange for MVP
    const item_id = `item_${Date.now()}`
    
    return c.json({
      success: true,
      item_id,
      message: 'Bank connection established successfully (stub)'
    })

  } catch (error) {
    console.error('Token exchange error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to exchange token'
    }, 500)
  }
})

// Get user's connected accounts - MVP stub
plaid.get('/accounts', authMiddleware, async (c) => {
  try {
    // Stub accounts data for MVP
    const accounts = [
      {
        id: 'account_1',
        name: 'Demo Checking Account',
        account_type: 'depository',
        subtype: 'checking',
        mask: '0000',
        institution_name: 'Demo Bank',
        connection_status: 'active',
        balance: {
          available: 1500.00,
          current: 1500.00
        }
      },
      {
        id: 'account_2',
        name: 'Demo Savings Account',
        account_type: 'depository',
        subtype: 'savings',
        mask: '0001',
        institution_name: 'Demo Bank',
        connection_status: 'active',
        balance: {
          available: 5000.00,
          current: 5000.00
        }
      }
    ]

    return c.json({ accounts })

  } catch (error) {
    console.error('Get accounts error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to fetch accounts'
    }, 500)
  }
})

// Force refresh accounts for a connection - MVP stub
plaid.post('/accounts/refresh/:itemId', authMiddleware, async (c) => {
  try {
    const itemId = c.req.param('itemId')
    console.log(`Would refresh accounts for item: ${itemId}`)
    
    return c.json({
      success: true,
      message: 'Accounts refreshed successfully (stub)'
    })

  } catch (error) {
    console.error('Account refresh error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to refresh accounts'
    }, 500)
  }
})

// Get statement availability predictions - MVP stub
plaid.get('/predictions', authMiddleware, async (c) => {
  try {
    // Stub predictions for MVP
    const predictions = [
      {
        account_id: 'account_1',
        account_name: 'Demo Checking Account',
        next_statement_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.85,
        pattern: 'monthly'
      },
      {
        account_id: 'account_2',
        account_name: 'Demo Savings Account',
        next_statement_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.92,
        pattern: 'monthly'
      }
    ]

    return c.json({ predictions })

  } catch (error) {
    console.error('Get predictions error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to get predictions'
    }, 500)
  }
})

// Manual statement check for account - MVP stub
plaid.post('/check_statements/:accountId', authMiddleware, async (c) => {
  try {
    const accountId = c.req.param('accountId')
    console.log(`Would check statements for account: ${accountId}`)
    
    return c.json({
      success: true,
      message: 'Statement check queued (stub)'
    })

  } catch (error) {
    console.error('Manual check error:', error)
    return c.json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to queue statement check'
    }, 500)
  }
})

// Simplified webhook processing - remove complex logic for MVP
// TODO: Add back webhook processing after basic deployment works

export { plaid as plaidRouter }