/**
 * BankStatementRetriever Cloudflare Workers
 * Main entry point for API and background processing
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { secureHeaders } from 'hono/secure-headers'

import type { Env } from './types/env'
import { apiRouter } from './routes/api'
import { authRouter } from './routes/auth'
import { plaidRouter } from './routes/plaid'
import { storageRouter } from './routes/storage'
import { healthRouter } from './routes/health'
import { webhooksRouter } from './routes/webhooks'
import { AccountCoordinator } from './durable-objects/AccountCoordinator'
import { RateLimiter } from './durable-objects/RateLimiter'
import { handleStatementPolling, handleHealthCheck } from './cron/statement-poller'
import { handleSimplifiedQueue, type QueueMessage } from './queue/simplified-processor'

// Initialize Hono app
const app = new Hono<{ Bindings: Env }>()

// Middleware
app.use('*', cors({
  origin: [
    'https://app.bankstatementretriever.com',
    'https://bankstatementretriever.com',
    /^https:\/\/.*\.bankstatementretriever\.com$/
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
app.route('/api', apiRouter)
app.route('/api/auth', authRouter)
app.route('/api/plaid', plaidRouter)
app.route('/api/storage', storageRouter)
app.route('/webhooks', webhooksRouter)

// Health check endpoint for cron monitoring
app.get('/cron/health', async (c) => {
  return handleHealthCheck(c.env)
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

// Scheduled event handler - Daily polling at 2:00 AM ET
async function handleScheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
  console.log('Cron trigger fired at:', new Date().toISOString())
  
  // Use waitUntil to ensure the cron job completes
  ctx.waitUntil(handleStatementPolling(env))
}

// Queue message handler
async function handleBSRQueue(batch: MessageBatch<QueueMessage>, env: Env, ctx: ExecutionContext) {
  // Use waitUntil to ensure queue processing completes
  ctx.waitUntil(handleSimplifiedQueue(batch, env))
}

// Export handlers
export default {
  fetch: app.fetch,
  scheduled: handleScheduled,
  queue: async (batch: MessageBatch<QueueMessage>, env: Env, ctx: ExecutionContext) => {
    switch (batch.queue) {
      case 'bsr-main-prod':
      case 'bsr-main-staging':
        return handleBSRQueue(batch, env, ctx)
      default:
        console.warn('Unknown queue:', batch.queue)
    }
  }
}

// Export Durable Objects
export { AccountCoordinator, RateLimiter }