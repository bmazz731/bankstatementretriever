/**
 * Storage API routes for Cloudflare Workers - MVP Stub Implementation
 */
import { Hono } from 'hono'
import type { Env } from '../types/env'

// Stub auth function
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

const storage = new Hono<{ Bindings: Env }>()

// Get storage providers - MVP stub
storage.get('/providers', requireAuth, async (c) => {
  return c.json({
    providers: [
      {
        id: 'googledrive',
        name: 'Google Drive',
        status: 'available',
        connected: false
      },
      {
        id: 'dropbox',
        name: 'Dropbox',
        status: 'available',
        connected: false
      },
      {
        id: 'onedrive',
        name: 'Microsoft OneDrive',
        status: 'available',
        connected: false
      }
    ]
  })
})

// Connect storage provider - MVP stub
storage.post('/connect/:providerId', requireAuth, async (c) => {
  const providerId = c.req.param('providerId')
  
  return c.json({
    success: true,
    message: `${providerId} connection would be established (stub)`,
    auth_url: `https://example.com/oauth/${providerId}`
  })
})

// Upload statement - MVP stub
storage.post('/upload', requireAuth, async (c) => {
  return c.json({
    success: true,
    message: 'Statement uploaded successfully (stub)',
    file_id: `file_${Date.now()}`
  })
})

// List uploaded statements - MVP stub
storage.get('/statements', requireAuth, async (c) => {
  return c.json({
    statements: [
      {
        id: 'stmt_1',
        filename: 'demo_statement_2024_01.pdf',
        account: 'Demo Checking Account',
        period: '2024-01',
        uploaded_at: new Date().toISOString(),
        size: 245678
      }
    ]
  })
})

export { storage as storageRouter }