/**
 * Accounts API routes for Cloudflare Workers - MVP Implementation
 */
import { Hono } from 'hono'
import type { Env } from '../types/env'

// Mock account data that matches frontend expectations
const mockAccounts = [
  {
    id: "acc_1",
    user_id: "user_123",
    plaid_account_id: "plaid_acc_1",
    name: "Chase Checking",
    official_name: "Chase Total Checking",
    type: "depository",
    subtype: "checking",
    mask: "1234",
    status: "active",
    sync_status: "synced",
    last_sync: "2024-08-19T18:00:00.000Z",
    created_at: "2024-08-01T10:00:00.000Z",
    updated_at: "2024-08-19T18:00:00.000Z",
    connection: {
      id: "conn_1",
      institution_id: "ins_109508",
      institution_name: "Chase",
      status: "active",
      last_sync: "2024-08-19T18:00:00.000Z"
    },
    balance: {
      available: 2547.83,
      current: 2547.83,
      iso_currency_code: "USD"
    },
    statements: {
      total: 12,
      latest: "2024-08-01",
      oldest: "2024-01-01"
    }
  },
  {
    id: "acc_2", 
    user_id: "user_123",
    plaid_account_id: "plaid_acc_2",
    name: "Wells Fargo Savings",
    official_name: "Wells Fargo Way2Save Savings",
    type: "depository",
    subtype: "savings",
    mask: "5678",
    status: "active",
    sync_status: "pending",
    last_sync: "2024-08-18T14:30:00.000Z",
    created_at: "2024-07-15T09:00:00.000Z", 
    updated_at: "2024-08-19T12:00:00.000Z",
    connection: {
      id: "conn_2",
      institution_id: "ins_109511",
      institution_name: "Wells Fargo",
      status: "active",
      last_sync: "2024-08-18T14:30:00.000Z"
    },
    balance: {
      available: 12847.92,
      current: 12847.92,
      iso_currency_code: "USD"
    },
    statements: {
      total: 8,
      latest: "2024-08-01",
      oldest: "2024-03-01"
    }
  },
  {
    id: "acc_3",
    user_id: "user_123", 
    plaid_account_id: "plaid_acc_3",
    name: "Bank of America Credit Card",
    official_name: "Bank of America Cash Rewards Credit Card",
    type: "credit",
    subtype: "credit card",
    mask: "9012",
    status: "active",
    sync_status: "error",
    last_sync: "2024-08-17T08:15:00.000Z",
    created_at: "2024-06-01T11:00:00.000Z",
    updated_at: "2024-08-17T08:15:00.000Z", 
    connection: {
      id: "conn_3",
      institution_id: "ins_109503",
      institution_name: "Bank of America",
      status: "reauth_required",
      last_sync: "2024-08-17T08:15:00.000Z",
      error_message: "Account credentials need to be updated"
    },
    balance: {
      available: 3452.17,
      current: -847.83,
      iso_currency_code: "USD",
      limit: 4300.00
    },
    statements: {
      total: 6,
      latest: "2024-07-01", 
      oldest: "2024-02-01"
    }
  }
]

// Stub auth functions
function requireAuth(c: any, next: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'UNAUTHORIZED', message: 'Authentication required' }, 401)
  }
  
  c.set('user', {
    id: 'user_123',
    email: 'demo@example.com',
    org_id: 'org_123'
  })
  
  return next()
}

const accounts = new Hono<{ Bindings: Env }>()

// Get all accounts for authenticated user
accounts.get('/', requireAuth, async (c) => {
  try {
    const user = c.get('user')
    const { status, page = 1, page_size = 20 } = c.req.query()
    
    // Filter accounts by status if provided
    let filteredAccounts = mockAccounts.filter(acc => acc.user_id === user.id)
    
    if (status) {
      filteredAccounts = filteredAccounts.filter(acc => acc.sync_status === status)
    }
    
    // Simple pagination
    const startIndex = (parseInt(page as string) - 1) * parseInt(page_size as string)
    const endIndex = startIndex + parseInt(page_size as string)
    const paginatedAccounts = filteredAccounts.slice(startIndex, endIndex)
    
    return c.json({
      accounts: paginatedAccounts,
      pagination: {
        page: parseInt(page as string),
        page_size: parseInt(page_size as string),
        total_count: filteredAccounts.length,
        total_pages: Math.ceil(filteredAccounts.length / parseInt(page_size as string))
      }
    })
    
  } catch (error) {
    console.error('Get accounts error:', error)
    return c.json({ error: 'Failed to retrieve accounts' }, 500)
  }
})

// Get single account by ID
accounts.get('/:accountId', requireAuth, async (c) => {
  try {
    const accountId = c.req.param('accountId')
    const user = c.get('user')
    
    const account = mockAccounts.find(acc => 
      acc.id === accountId && acc.user_id === user.id
    )
    
    if (!account) {
      return c.json({ error: 'Account not found' }, 404)
    }
    
    return c.json({ account })
    
  } catch (error) {
    console.error('Get account error:', error)
    return c.json({ error: 'Failed to retrieve account' }, 500)
  }
})

// Trigger manual sync for account
accounts.post('/:accountId/sync', requireAuth, async (c) => {
  try {
    const accountId = c.req.param('accountId')
    const user = c.get('user')
    
    const account = mockAccounts.find(acc => 
      acc.id === accountId && acc.user_id === user.id
    )
    
    if (!account) {
      return c.json({ error: 'Account not found' }, 404)
    }
    
    // Simulate sync trigger
    console.log(`Manual sync triggered for account ${accountId}`)
    
    return c.json({ 
      success: true,
      message: 'Sync initiated successfully',
      account_id: accountId,
      estimated_completion: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
    })
    
  } catch (error) {
    console.error('Manual sync error:', error)
    return c.json({ error: 'Failed to trigger sync' }, 500)
  }
})

// Get account statements
accounts.get('/:accountId/statements', requireAuth, async (c) => {
  try {
    const accountId = c.req.param('accountId')
    const user = c.get('user')
    const { start_date, end_date, page = 1, page_size = 10 } = c.req.query()
    
    const account = mockAccounts.find(acc => 
      acc.id === accountId && acc.user_id === user.id
    )
    
    if (!account) {
      return c.json({ error: 'Account not found' }, 404)
    }
    
    // Mock statements data
    const mockStatements = [
      {
        id: "stmt_1",
        account_id: accountId,
        period_start: "2024-07-01",
        period_end: "2024-07-31", 
        statement_date: "2024-08-01",
        file_path: `/statements/${accountId}/2024-07.pdf`,
        file_size: 245680,
        status: "delivered",
        created_at: "2024-08-01T09:00:00.000Z"
      },
      {
        id: "stmt_2", 
        account_id: accountId,
        period_start: "2024-06-01",
        period_end: "2024-06-30",
        statement_date: "2024-07-01", 
        file_path: `/statements/${accountId}/2024-06.pdf`,
        file_size: 198432,
        status: "delivered",
        created_at: "2024-07-01T09:00:00.000Z"
      }
    ]
    
    return c.json({
      statements: mockStatements,
      pagination: {
        page: parseInt(page as string),
        page_size: parseInt(page_size as string),
        total_count: mockStatements.length,
        total_pages: Math.ceil(mockStatements.length / parseInt(page_size as string))
      }
    })
    
  } catch (error) {
    console.error('Get statements error:', error)
    return c.json({ error: 'Failed to retrieve statements' }, 500)
  }
})

export { accounts as accountsRouter }