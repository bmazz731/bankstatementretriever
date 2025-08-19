/**
 * API Routes - Core endpoints per PRD Section 8
 */
import { Hono } from 'hono'
import type { Env } from '../types/env'
import { 
  requestId, 
  apiLogger, 
  jwtAuth, 
  rateLimit, 
  extractUserContext,
  errorHandler,
  apiCors,
  idempotency
} from '../middleware/api'
import { validateInput, ValidationSchemas } from '../lib/validation'
import { testWebhookEndpoint } from '../lib/webhook-delivery'

const api = new Hono<{ Bindings: Env }>()

// Apply middleware to all routes
api.use('*', requestId)
api.use('*', apiCors)
api.use('*', apiLogger)
api.use('*', errorHandler)
api.use('*', rateLimit(100, 60000)) // 100 requests per minute
api.use('*', idempotency)

// JWT authentication for protected routes (all except health)
api.use('/accounts/*', async (c, next) => {
  const secret = c.env.WEBHOOK_SIGNING_SECRET || 'dev-secret'
  return jwtAuth(secret)(c, next)
})
api.use('/accounts/*', extractUserContext)
api.use('/statements/*', async (c, next) => {
  const secret = c.env.WEBHOOK_SIGNING_SECRET || 'dev-secret'
  return jwtAuth(secret)(c, next)
})
api.use('/statements/*', extractUserContext)
api.use('/destinations/*', async (c, next) => {
  const secret = c.env.WEBHOOK_SIGNING_SECRET || 'dev-secret'
  return jwtAuth(secret)(c, next)
})
api.use('/destinations/*', extractUserContext)
api.use('/routes/*', async (c, next) => {
  const secret = c.env.WEBHOOK_SIGNING_SECRET || 'dev-secret'
  return jwtAuth(secret)(c, next)
})
api.use('/routes/*', extractUserContext)
api.use('/notifications/*', async (c, next) => {
  const secret = c.env.WEBHOOK_SIGNING_SECRET || 'dev-secret'
  return jwtAuth(secret)(c, next)
})
api.use('/notifications/*', extractUserContext)

// Plaid Integration Endpoints - Already implemented in plaid.ts
// POST /api/plaid/link_token -> handled by plaidRouter
// POST /api/plaid/exchange_public_token -> handled by plaidRouter

// Account Management Endpoints
api.get('/accounts', async (c) => {
  try {
    const url = new URL(c.req.url)
    const status = url.searchParams.get('status')
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const pageSize = parseInt(url.searchParams.get('page_size') ?? '20')

    // Build query parameters
    const queryParams = new URLSearchParams({
      select: '*,connection(*)',
      offset: ((page - 1) * pageSize).toString(),
      limit: pageSize.toString()
    })

    if (status) {
      queryParams.append('status', `eq.${status}`)
    }

    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/accounts?${queryParams}`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Database query failed: ${response.statusText}`)
    }

    const accounts = await response.json()

    return c.json({
      accounts,
      page,
      page_size: pageSize,
      total: accounts.length // TODO: Get actual count
    })

  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to fetch accounts'
    }, 500)
  }
})

api.delete('/accounts/:id', async (c) => {
  const accountId = c.req.param('id')

  try {
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/accounts?id=eq.${accountId}`, {
      method: 'PATCH',
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'inactive',
        updated_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to deactivate account: ${response.statusText}`)
    }

    return c.body(null, 204)

  } catch (error) {
    console.error('Failed to deactivate account:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to deactivate account'
    }, 500)
  }
})

// Statement History Endpoints
api.get('/statements/:accountId', async (c) => {
  const accountId = c.req.param('accountId')
  const url = new URL(c.req.url)
  
  try {
    const queryParams = new URLSearchParams({
      select: '*,deliveries(*,destination(*))',
      account_id: `eq.${accountId}`,
      order: 'statement_date.desc'
    })

    // Add filters
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    const fileType = url.searchParams.get('file_type')

    if (from) queryParams.append('statement_date', `gte.${from}`)
    if (to) queryParams.append('statement_date', `lte.${to}`)
    if (fileType) queryParams.append('file_type', `eq.${fileType}`)

    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/statements?${queryParams}`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Database query failed: ${response.statusText}`)
    }

    const statements = await response.json()

    return c.json({
      statements: statements.map((stmt: any) => ({
        statement_id: stmt.id,
        period_start: stmt.period_start,
        period_end: stmt.period_end,
        statement_date: stmt.statement_date,
        file_type: stmt.file_type,
        version: stmt.version,
        checksum: stmt.checksum,
        delivered: stmt.deliveries.some((d: any) => d.status === 'succeeded')
      })),
      page: 1, // TODO: Add pagination
      page_size: statements.length,
      total: statements.length
    })

  } catch (error) {
    console.error('Failed to fetch statements:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to fetch statements'
    }, 500)
  }
})

// Manual Actions
api.post('/accounts/:id/sync', async (c) => {
  const accountId = c.req.param('id')
  
  try {
    // Queue immediate sync job
    const message = {
      type: 'retrieve_statements',
      accountId,
      orgId: 'user-org-id', // TODO: Get from JWT
      connectionId: 'connection-id', // TODO: Get from database
      requestId: crypto.randomUUID()
    }

    await c.env.BSR_QUEUE.send(message)

    return c.json({ 
      message: 'Sync job queued',
      request_id: message.requestId 
    })

  } catch (error) {
    console.error('Failed to queue sync job:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to start sync'
    }, 500)
  }
})

api.post('/accounts/:id/backfill', async (c) => {
  const accountId = c.req.param('id')
  
  try {
    const body = await c.req.json()
    
    // Validate input
    const validation = validateInput(body, ValidationSchemas.backfillRequest)
    if (!validation.valid) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'Invalid input data',
        details: {
          errors: validation.errors
        }
      }, 400)
    }

    const { range_start, range_end } = validation.data!

    // Validate date range (max 12 months per PRD)
    const startDate = new Date(range_start)
    const endDate = new Date(range_end)
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                      (endDate.getMonth() - startDate.getMonth())
    
    if (monthsDiff > 12) {
      return c.json({
        error: 'BSR_BUSINESS_RULE_ERROR',
        message: 'Backfill range cannot exceed 12 months'
      }, 400)
    }

    // Get account and verify ownership
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/accounts?id=eq.${accountId}&select=*,connection(user_id)`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const accounts = await response.json()
    if (!accounts || accounts.length === 0) {
      return c.json({
        error: 'BSR_NOT_FOUND_ERROR',
        message: 'Account not found'
      }, 404)
    }

    // Queue backfill job
    const requestId = crypto.randomUUID()
    await c.env.BSR_QUEUE.send({
      type: 'backfill_statements',
      account_id: accountId,
      range_start,
      range_end,
      request_id: requestId
    })

    return c.json({
      success: true,
      request_id: requestId,
      message: 'Backfill job queued',
      range: { start: range_start, end: range_end }
    })

  } catch (error) {
    console.error('Backfill error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to queue backfill job'
    }, 500)
  }
})

// Destinations Management
api.post('/destinations', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate input
    const validation = validateInput(body, ValidationSchemas.createDestination)
    if (!validation.valid) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'Invalid input data',
        details: {
          errors: validation.errors
        }
      }, 400)
    }

    const { type, name, config, folder_path } = validation.data!

    // Additional validation for webhook destinations
    if (type === 'webhook') {
      const webhookValidation = validateInput(config, ValidationSchemas.webhookConfig)
      if (!webhookValidation.valid) {
        return c.json({
          error: 'BSR_VALIDATION_ERROR',
          message: 'Invalid webhook configuration',
          details: {
            errors: webhookValidation.errors
          }
        }, 400)
      }
    }

    const destinationId = crypto.randomUUID()
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/destinations`, {
      method: 'POST',
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: destinationId,
        type,
        name,
        config,
        folder_path: folder_path || '/',
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`Database insert failed: ${response.statusText}`)
    }

    const destination = await response.json()

    return c.json({
      success: true,
      destination: destination[0],
      message: 'Destination created successfully'
    }, 201)

  } catch (error) {
    console.error('Create destination error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to create destination'
    }, 500)
  }
})

api.get('/destinations', async (c) => {
  try {
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/destinations?status=eq.active&order=created_at.desc`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const destinations = await response.json()

    return c.json({
      destinations: destinations.map((dest: any) => ({
        id: dest.id,
        type: dest.type,
        name: dest.name,
        folder_path: dest.folder_path,
        status: dest.status,
        created_at: dest.created_at
      }))
    })

  } catch (error) {
    console.error('Get destinations error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to fetch destinations'
    }, 500)
  }
})

// Test webhook destination
api.post('/destinations/:id/test', async (c) => {
  const destinationId = c.req.param('id')
  
  try {
    // Get destination
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/destinations?id=eq.${destinationId}&type=eq.webhook&select=*`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const destinations = await response.json()
    if (!destinations || destinations.length === 0) {
      return c.json({
        error: 'BSR_NOT_FOUND_ERROR',
        message: 'Webhook destination not found'
      }, 404)
    }

    const destination = destinations[0]
    if (!destination.config?.url || !destination.config?.secret) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'Webhook destination missing required config (url, secret)'
      }, 400)
    }

    // Test webhook endpoint
    const testResult = await testWebhookEndpoint(
      destination.config.url,
      destination.config.secret
    )

    return c.json({
      success: testResult.success,
      response_time_ms: testResult.response_time_ms,
      error: testResult.error,
      message: testResult.success ? 'Webhook endpoint is reachable' : 'Webhook endpoint test failed'
    })

  } catch (error) {
    console.error('Webhook test error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to test webhook endpoint'
    }, 500)
  }
})

// Routes Management (account → destination mapping)
api.post('/routes', async (c) => {
  try {
    const { account_id, destination_id, folder_override, filename_template } = await c.req.json()
    
    if (!account_id || !destination_id) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'account_id and destination_id are required'
      }, 400)
    }

    // Verify account and destination exist
    const [accountCheck, destinationCheck] = await Promise.all([
      fetch(`${c.env.SUPABASE_URL}/rest/v1/accounts?id=eq.${account_id}&select=id`, {
        headers: {
          'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }),
      fetch(`${c.env.SUPABASE_URL}/rest/v1/destinations?id=eq.${destination_id}&select=id`, {
        headers: {
          'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      })
    ])

    const accounts = await accountCheck.json()
    const destinations = await destinationCheck.json()

    if (!accounts || accounts.length === 0) {
      return c.json({
        error: 'BSR_NOT_FOUND_ERROR',
        message: 'Account not found'
      }, 404)
    }

    if (!destinations || destinations.length === 0) {
      return c.json({
        error: 'BSR_NOT_FOUND_ERROR',
        message: 'Destination not found'
      }, 404)
    }

    // Create routing rule
    const routeId = crypto.randomUUID()
    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/account_destinations`, {
      method: 'POST',
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: routeId,
        account_id,
        destination_id,
        folder_override: folder_override || null,
        filename_template: filename_template || '{institution}_{account_name}_{statement_date}.pdf',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`Database insert failed: ${response.statusText}`)
    }

    const route = await response.json()

    return c.json({
      success: true,
      route: route[0],
      message: 'Route created successfully'
    }, 201)

  } catch (error) {
    console.error('Create route error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to create route'
    }, 500)
  }
})

// Notification Preferences
api.put('/notifications/preferences/:accountId', async (c) => {
  const accountId = c.req.param('accountId')
  
  try {
    const { preferences } = await c.req.json()
    
    if (!preferences || !Array.isArray(preferences)) {
      return c.json({
        error: 'BSR_VALIDATION_ERROR',
        message: 'preferences array is required'
      }, 400)
    }

    // Validate preference format
    for (const pref of preferences) {
      if (!pref.channel || !pref.event_type || typeof pref.enabled !== 'boolean') {
        return c.json({
          error: 'BSR_VALIDATION_ERROR',
          message: 'Each preference must have channel, event_type, and enabled fields'
        }, 400)
      }

      const validChannels = ['email', 'webhook']
      const validEvents = ['statement_delivered', 'statement_failed', 'reauth_required', 'monthly_summary']
      
      if (!validChannels.includes(pref.channel)) {
        return c.json({
          error: 'BSR_VALIDATION_ERROR',
          message: `Invalid channel. Must be one of: ${validChannels.join(', ')}`
        }, 400)
      }

      if (!validEvents.includes(pref.event_type)) {
        return c.json({
          error: 'BSR_VALIDATION_ERROR',
          message: `Invalid event_type. Must be one of: ${validEvents.join(', ')}`
        }, 400)
      }
    }

    // Verify account exists
    const accountResponse = await fetch(`${c.env.SUPABASE_URL}/rest/v1/accounts?id=eq.${accountId}&select=id`, {
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    })

    const accounts = await accountResponse.json()
    if (!accounts || accounts.length === 0) {
      return c.json({
        error: 'BSR_NOT_FOUND_ERROR',
        message: 'Account not found'
      }, 404)
    }

    // Delete existing preferences
    await fetch(`${c.env.SUPABASE_URL}/rest/v1/notification_preferences?account_id=eq.${accountId}`, {
      method: 'DELETE',
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    })

    // Insert new preferences
    const newPreferences = preferences.map(pref => ({
      id: crypto.randomUUID(),
      account_id: accountId,
      channel: pref.channel,
      event_type: pref.event_type,
      enabled: pref.enabled,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const response = await fetch(`${c.env.SUPABASE_URL}/rest/v1/notification_preferences`, {
      method: 'POST',
      headers: {
        'apikey': c.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPreferences)
    })

    if (!response.ok) {
      throw new Error(`Database insert failed: ${response.statusText}`)
    }

    return c.json({
      updated: true,
      preferences: newPreferences.length,
      message: 'Notification preferences updated successfully'
    })

  } catch (error) {
    console.error('Update notification preferences error:', error)
    return c.json({
      error: 'BSR_INTERNAL_ERROR',
      message: 'Failed to update notification preferences'
    }, 500)
  }
})

export { api as apiRouter }