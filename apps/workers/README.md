# @bsr/workers

Cloudflare Workers infrastructure for BankStatementRetriever MVP - pure serverless edge computing.

## 🏗️ Architecture Overview

### Core Components

- **Main Worker** - API endpoints and request routing
- **Queues** - Asynchronous statement retrieval and delivery processing
- **Durable Objects** - Per-account coordination and rate limiting
- **KV Storage** - Configuration and caching
- **Cron Triggers** - Daily 2:00 AM ET polling per PRD

### Infrastructure Stack

```
┌─────────────────────────────────────────────────────────┐
│                 Cloudflare Edge                         │
├─────────────────────────────────────────────────────────┤
│  WAF Rules → Workers → Queues → Durable Objects        │
│     ↓           ↓         ↓            ↓                │
│  Turnstile   API Routes  Async Jobs  Coordination       │
└─────────────────────────────────────────────────────────┘
            ↓
    ┌───────────────┐    ┌──────────────┐
    │   Supabase    │    │   External   │
    │   Database    │    │   APIs       │
    │               │    │  - Plaid     │
    │               │    │  - SendGrid  │
    │               │    │  - Stripe    │
    └───────────────┘    └──────────────┘
```

## 📁 Project Structure

```
apps/workers/
├── src/
│   ├── index.ts              # Main Worker entry point
│   ├── types/
│   │   └── env.ts            # Environment and type definitions
│   ├── routes/
│   │   ├── api.ts            # API endpoints per PRD Section 8
│   │   ├── health.ts         # Health check endpoints
│   │   └── webhooks.ts       # External webhook handlers
│   ├── durable-objects/
│   │   ├── AccountCoordinator.ts  # Per-account coordination
│   │   └── RateLimiter.ts    # Rate limiting with sliding window
│   └── lib/
│       └── database.ts       # Edge-compatible Supabase client
├── wrangler.toml             # Complete Cloudflare configuration
├── deploy.sh                 # Deployment automation
└── package.json              # Dependencies and scripts
```

## 🚀 Deployment

### Prerequisites

1. **Cloudflare Account** with Workers Paid plan ($5/month minimum)
2. **Wrangler CLI** installed and authenticated
3. **Domain** configured in Cloudflare (bankstatementretriever.com)

### Quick Deploy

```bash
# Development
./deploy.sh development

# Staging
./deploy.sh staging

# Production (requires confirmation)
./deploy.sh production
```

### Manual Setup

```bash
# Install dependencies
npm install

# Authenticate with Cloudflare
wrangler login

# Create KV namespaces
wrangler kv:namespace create "BSR_CONFIG"
wrangler kv:namespace create "BSR_CACHE"
wrangler kv:namespace create "BSR_RATE_LIMITS"

# Create Queues
wrangler queues create statement-retrieval-prod
wrangler queues create delivery-prod

# Set secrets
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put PLAID_CLIENT_ID
wrangler secret put PLAID_SECRET
wrangler secret put SENDGRID_API_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put WEBHOOK_SIGNING_SECRET

# Deploy
wrangler deploy
```

## 🔧 Configuration

### Environment Variables

Set via `wrangler secret put`:

```bash
# Database
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Plaid Integration
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret_key

# Email & Payments
SENDGRID_API_KEY=your_sendgrid_key
STRIPE_SECRET_KEY=your_stripe_key

# Security
WEBHOOK_SIGNING_SECRET=your_signing_secret
```

### KV Namespaces

- **BSR_CONFIG** - Application configuration and feature flags
- **BSR_CACHE** - Response caching and temporary data
- **BSR_RATE_LIMITS** - Rate limiting state (backup to Durable Objects)

### Queues Configuration

| Queue                    | Purpose            | Batch Size | Timeout | Retries |
| ------------------------ | ------------------ | ---------- | ------- | ------- |
| statement-retrieval-prod | Plaid polling jobs | 10         | 30s     | 3       |
| delivery-prod            | File delivery jobs | 5          | 15s     | 3       |

## 🔄 Queue Processing

### Statement Retrieval Flow

1. **Cron Trigger** (2:00 AM ET) → Get active accounts
2. **Queue Message** → AccountCoordinator Durable Object
3. **Coordination** → Check status, rate limits, learned schedule
4. **Plaid API** → Retrieve available statements
5. **Database** → Store statement metadata with deduplication
6. **Delivery Queue** → Enqueue delivery jobs per routing rules

### Delivery Flow

1. **Queue Message** → Get statement + destination details
2. **File Streaming** → Zero-storage transfer from Plaid → Destination
3. **Checksum Validation** → Verify integrity
4. **Database Update** → Mark delivery status
5. **Notifications** → Email/webhook based on preferences

## 🎯 API Endpoints

Per PRD Section 8:

| Method | Endpoint                           | Description                       |
| ------ | ---------------------------------- | --------------------------------- |
| GET    | `/health`                          | Service health check              |
| GET    | `/health/deep`                     | Detailed health with dependencies |
| POST   | `/api/plaid/link-token`            | Create Plaid Link token           |
| POST   | `/api/plaid/exchange-public-token` | Exchange public token             |
| GET    | `/api/accounts`                    | List accounts with pagination     |
| DELETE | `/api/accounts/:id`                | Deactivate account                |
| GET    | `/api/statements/:accountId`       | Statement history                 |
| POST   | `/api/accounts/:id/sync`           | Manual statement sync             |
| POST   | `/api/accounts/:id/backfill`       | Historical backfill               |
| POST   | `/webhooks/plaid`                  | Plaid webhook receiver            |
| POST   | `/webhooks/stripe`                 | Stripe webhook receiver           |

## 📊 Monitoring

### Health Checks

```bash
# Basic health
curl https://api.bankstatementretriever.com/health

# Deep health with dependencies
curl https://api.bankstatementretriever.com/health/deep
```

### Observability

- **Real-time Logs**: `wrangler tail`
- **Analytics**: Cloudflare Dashboard
- **Logpush**: Configured for API requests to external endpoint
- **Error Tracking**: Console.error statements captured

### Durable Object Monitoring

```bash
# Account coordinator status
curl -H "Authorization: Bearer $TOKEN" \
  https://api.bankstatementretriever.com/internal/coordinator/status

# Rate limiter status
curl -H "Authorization: Bearer $TOKEN" \
  https://api.bankstatementretriever.com/internal/limiter/status
```

## 🔒 Security Features

### WAF Rules (cloudflare-config.yaml)

- **Rate Limiting** - 100 requests/minute for POST endpoints
- **SQL Injection Protection** - Pattern-based blocking
- **Geographic Restrictions** - US-only API access (configurable)

### Authentication

- JWT tokens for protected endpoints
- HMAC webhook signature validation
- Service role key for database access

### Headers

- **CORS** - Restricted to bankstatementretriever.com domains
- **Security Headers** - CSP, frame options, etc.
- **TLS** - Minimum 1.2, prefer 1.3

## 📈 Performance

### Cold Start Mitigation

- Minimal dependencies in Workers
- Connection pooling via Supabase client
- KV caching for frequent queries

### Edge Computing Benefits

- **Global Distribution** - Low latency worldwide
- **Auto Scaling** - Handles traffic spikes automatically
- **Zero Infrastructure Management** - No servers to maintain

### Resource Limits

- **CPU**: 30 seconds max per request
- **Memory**: Automatic by Cloudflare
- **KV**: 25 MiB values, unlimited keys
- **Durable Objects**: 128 MB memory, persistent storage

## 🧪 Development

### Local Development

```bash
# Start development server
npm run dev
# OR
./deploy.sh development

# Access at http://localhost:8787
```

### Testing

```bash
# Type checking
npm run types:check

# Unit tests
npm test

# Integration tests (with real APIs)
npm run test:integration
```

### Environment Switching

The same codebase deploys to multiple environments:

- **Development** - Local with Miniflare
- **Staging** - api-staging.bankstatementretriever.com
- **Production** - api.bankstatementretriever.com

## 🔄 Maintenance

### Queue Management

```bash
# View queue status
wrangler queues list

# Retry failed jobs
wrangler queues retry statement-retrieval-prod

# Clear queue (emergency)
wrangler queues purge delivery-prod
```

### KV Management

```bash
# List keys
wrangler kv:key list --binding BSR_CONFIG

# Get/set values
wrangler kv:key get "feature_flags" --binding BSR_CONFIG
wrangler kv:key put "maintenance_mode" "false" --binding BSR_CONFIG
```

### Secrets Rotation

```bash
# Update secrets (zero downtime)
wrangler secret put PLAID_SECRET
wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# List secrets (names only)
wrangler secret list
```

## 🚨 Emergency Procedures

### Circuit Breaker

Set maintenance mode via KV:

```bash
wrangler kv:key put "maintenance_mode" "true" --binding BSR_CONFIG
```

### Rollback Deployment

```bash
# Deploy previous version
git checkout <previous-commit>
wrangler deploy

# OR use Cloudflare Dashboard quick rollback
```

### Queue Emergency Stop

```bash
# Pause queue processing
wrangler queues pause statement-retrieval-prod
wrangler queues pause delivery-prod

# Resume when ready
wrangler queues resume statement-retrieval-prod
```

## 📚 Next Steps

1. **Complete Plaid Integration** - Real statement retrieval
2. **Implement Storage Providers** - Google Drive, Dropbox, OneDrive
3. **Add Learning Algorithm** - Statement availability prediction
4. **Enhanced Monitoring** - Custom metrics and alerting
5. **Load Testing** - Validate scale requirements

---

Infrastructure is ready for feature implementation! 🎯
