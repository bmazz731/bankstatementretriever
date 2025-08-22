/**
 * Accounts API routes for Cloudflare Workers - Production Implementation
 */
import { Hono } from 'hono'
import { requestId, apiLogger, errorHandler } from '../middleware/api'
import { authenticateSupabaseUser, createSupabaseClient } from '../lib/auth'
import type { Env } from '../types/env'

const accounts = new Hono<{ Bindings: Env }>()

// Apply middleware for all routes
accounts.use('*', requestId)
accounts.use('*', apiLogger)
accounts.use('*', errorHandler)

// DEBUG ENDPOINT: Check accounts data
accounts.get('/debug', async (c) => {
  try {
    const { error, user } = await authenticateSupabaseUser(c)
    if (error) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: error
      }, 401)
    }

    const supabase = createSupabaseClient(c.env)

    // Check what connections exist for this user
    const { data: connections, error: connError } = await supabase
      .from('connections')
      .select('*')
      .eq('org_id', user.org_id)

    // Check what accounts exist (all accounts)
    const { data: allAccounts, error: allAccountsError } = await supabase
      .from('accounts')
      .select('*')

    // Check accounts with connection info
    const { data: accountsWithConnections, error: joinError } = await supabase
      .from('accounts')
      .select(`
        *,
        connection:connections(*)
      `)

    return c.json({
      user_org_id: user.org_id,
      connections_count: connections?.length || 0,
      connections: connections,
      all_accounts_count: allAccounts?.length || 0,
      all_accounts: allAccounts,
      accounts_with_connections: accountsWithConnections,
      errors: {
        connections: connError,
        all_accounts: allAccountsError,
        join: joinError
      }
    })

  } catch (error) {
    console.error('Debug accounts error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: error.message
    }, 500)
  }
})

// Get all accounts for authenticated user
accounts.get('/', async (c) => {
  try {
    const { error, user } = await authenticateSupabaseUser(c)
    if (error) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: error
      }, 401)
    }

    const supabase = createSupabaseClient(c.env)

    const { status, page = '1', page_size = '20' } = c.req.query()
    
    // First get connection IDs for this user's org
    const { data: userConnections, error: connectionsError } = await supabase
      .from('connections')
      .select('id')
      .eq('org_id', user.org_id)
      
    if (connectionsError) {
      console.error('Database connections error:', connectionsError)
      return c.json({
        error: 'BSR_DATABASE_ERROR',
        message: 'Failed to retrieve connections'
      }, 500)
    }
    
    const connectionIds = userConnections?.map(conn => conn.id) || []
    
    if (connectionIds.length === 0) {
      // No connections for this user, return empty result
      return c.json({
        data: [],
        page: parseInt(page),
        page_size: parseInt(page_size),
        total: 0
      })
    }
    
    // Build query for accounts with connections  
    let query = supabase
      .from('accounts')
      .select(`
        id,
        plaid_account_id,
        account_last4,
        account_name,
        account_type,
        account_subtype,
        statements_supported,
        status,
        created_at,
        updated_at,
        connection:connections(
          id,
          plaid_item_id,
          institution,
          status,
          last_reauth_at,
          created_at,
          updated_at
        )
      `)
      .in('connection_id', connectionIds)
    
    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    
    // Add pagination
    const pageNum = parseInt(page)
    const pageSizeNum = parseInt(page_size)
    const startIndex = (pageNum - 1) * pageSizeNum
    
    query = query.range(startIndex, startIndex + pageSizeNum - 1)
    
    const { data: accountsData, error: accountsError } = await query
    
    if (accountsError) {
      console.error('Database accounts error:', accountsError)
      return c.json({
        error: 'BSR_DATABASE_ERROR',
        message: 'Failed to retrieve accounts'
      }, 500)
    }

    // Get total count for pagination
    const { count, error: countError } = await supabase
      .from('accounts')
      .select('id', { count: 'exact', head: true })
      .in('connection_id', connectionIds)
    
    if (countError) {
      console.error('Database count error:', countError)
    }

    // Transform data to match frontend expectations
    const accounts = (accountsData || []).map(account => ({
      id: account.id,
      connection_id: account.connection?.id,
      plaid_account_id: account.plaid_account_id,
      name: account.account_name,
      type: account.account_type,
      subtype: account.account_subtype,
      mask: account.account_last4,
      status: account.status,
      statements_supported: account.statements_supported,
      created_at: account.created_at,
      updated_at: account.updated_at,
      connection: account.connection ? {
        id: account.connection.id,
        plaid_item_id: account.connection.plaid_item_id,
        institution_id: account.connection.institution,
        institution_name: account.connection.institution, // TODO: Look up actual institution name
        status: account.connection.status,
        last_sync: account.connection.updated_at,
        last_reauth_at: account.connection.last_reauth_at
      } : null
    }))
    
    return c.json({
      data: accounts,
      page: pageNum,
      page_size: pageSizeNum,
      total: count || 0
    })
    
  } catch (error) {
    console.error('Get accounts error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to retrieve accounts'
    }, 500)
  }
})

// Trigger manual sync for account
accounts.post('/:accountId/sync', async (c) => {
  try {
    const accountId = c.req.param('accountId')
    
    const { error, user } = await authenticateSupabaseUser(c)
    if (error) {
      return c.json({
        error: 'BSR_AUTH_ERROR',
        message: error
      }, 401)
    }
    
    const supabase = createSupabaseClient(c.env)
    
    // Verify account ownership
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select(`
        id,
        connection_id,
        connection:connections(
          id,
          org_id
        )
      `)
      .eq('id', accountId)
      .single()
      
    if (accountError || !account) {
      return c.json({
        error: 'BSR_NOT_FOUND',
        message: 'Account not found'
      }, 404)
    }
    
    // Check if the account belongs to the user's organization
    if (!account?.connection || account.connection.org_id !== user.org_id) {
      return c.json({
        error: 'BSR_NOT_FOUND',
        message: 'Account not found'
      }, 404)
    }
    
    // TODO: Queue manual sync job in BSR_QUEUE
    console.log(`Manual sync triggered for account ${accountId}`)
    
    return c.json({ 
      success: true,
      message: 'Sync initiated successfully',
      account_id: accountId,
      estimated_completion: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    })
    
  } catch (error) {
    console.error('Manual sync error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to trigger sync'
    }, 500)
  }
})

export { accounts as accountsRouter }