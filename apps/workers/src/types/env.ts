// Cloudflare Worker Environment Interface
export interface Env {
  // Environment Variables
  ENVIRONMENT: 'production' | 'staging' | 'development'
  NODE_ENV: 'production' | 'development'
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'debug'
  TIMEZONE: string

  // Supabase Configuration
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string

  // Domain
  DOMAIN: string

  // Plaid Configuration
  PLAID_CLIENT_ID: string
  PLAID_SECRET: string
  PLAID_ENV: 'sandbox' | 'development' | 'production'
  PLAID_WEBHOOK_SECRET: string

  // Encryption
  ENCRYPTION_KEY: string

  // Storage Provider APIs
  GOOGLE_DRIVE_CLIENT_ID: string
  GOOGLE_DRIVE_CLIENT_SECRET: string
  DROPBOX_CLIENT_ID: string
  DROPBOX_CLIENT_SECRET: string
  ONEDRIVE_CLIENT_ID: string
  ONEDRIVE_CLIENT_SECRET: string

  // External APIs
  SENDGRID_API_KEY: string
  STRIPE_SECRET_KEY: string
  WEBHOOK_SIGNING_SECRET: string

  // KV Namespaces
  BSR_CONFIG: KVNamespace
  BSR_CACHE: KVNamespace
  BSR_RATE_LIMITS: KVNamespace

  // Database (direct SQL for better performance)
  DB: D1Database

  // Queues
  BSR_QUEUE: Queue

  // Durable Objects
  ACCOUNT_COORDINATOR: DurableObjectNamespace
  RATE_LIMITER: DurableObjectNamespace
}

// Context for Workers
export interface WorkerContext {
  env: Env
  ctx: ExecutionContext
}

// Queue Message Types
export interface StatementRetrievalMessage {
  type: 'retrieve_statements'
  accountId: string
  orgId: string
  connectionId: string
  requestId: string
  retryCount?: number
}

export interface DeliveryMessage {
  type: 'deliver_statement'
  statementId: string
  destinationId: string
  requestId: string
  retryCount?: number
}

// Durable Object State
export interface AccountCoordinatorState {
  accountId: string
  status: 'idle' | 'polling' | 'retrieving' | 'rate_limited'
  lastPoll: number
  nextPoll?: number
  learnedSchedule?: {
    pattern: 'monthly' | 'irregular'
    expectedDay: number
    expectedHour: number
    confidence: number
  }
}

export interface RateLimitState {
  key: string
  count: number
  windowStart: number
  windowEnd: number
}