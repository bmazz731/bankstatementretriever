/**
 * BankStatementRetriever Cloudflare Workers
 * Simplified MVP API without complex dependencies
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'

import type { Env } from './types/env'
import { healthRouter } from './routes/health'
import { authRouter } from './routes/auth'
import { plaidRouter } from './routes/plaid'
import { storageRouter } from './routes/storage'

// Initialize Hono app
const app = new Hono<{ Bindings: Env }>()

// Middleware
app.use('*', cors({
  origin: [
    'https://bankstatementretriever.vercel.app',
    'https://app.bankstatementretriever.com',
    'https://bankstatementretriever.com',
    /^https:\/\/.*\.bankstatementretriever\.com$/,
    'http://localhost:3000'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
}))

app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', secureHeaders({
  contentSecurityPolicy: "default-src 'self'",
  crossOriginEmbedderPolicy: false // Required for Cloudflare Workers
}))

// Routes
app.route('/health', healthRouter)
app.route('/api/auth', authRouter)
app.route('/api/plaid', plaidRouter)
app.route('/api/storage', storageRouter)

// Simple health check endpoint
app.get('/api/health', async (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Root endpoint
app.get('/', (c) => {
  return c.json({
    service: 'BankStatementRetriever API',
    version: '0.1.0',
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('Worker error:', err)
  
  const isDevelopment = c.env.NODE_ENV === 'development'
  
  return c.json({
    error: 'Internal Server Error',
    ...(isDevelopment && { details: err.message, stack: err.stack })
  }, 500)
})

// Simplified handlers - remove complex processing for MVP
// TODO: Add back complex features after basic deployment works

// Export simplified handlers
export default {
  fetch: app.fetch
}