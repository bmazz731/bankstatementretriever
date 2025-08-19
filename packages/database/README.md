# @bsr/database

Database package for BankStatementRetriever MVP using Prisma and Supabase.

## 🗄️ Database Architecture

Complete PostgreSQL schema implementing all entities from PRD Section 7:

- **Organizations** - Single owner per account (MVP)
- **Users** - Auth and org membership 
- **Connections** - Plaid Items (bank institution connections)
- **Accounts** - Individual bank accounts with statement support
- **Statements** - Deduplication ledger with versioning
- **Destinations** - Storage providers (Drive, Dropbox, OneDrive, Webhook)
- **RoutingRules** - Account to destination mapping with templates
- **Deliveries** - Delivery attempts and status tracking
- **WebhookEndpoints** - HMAC-signed webhook destinations
- **OAuthTokens** - Encrypted storage provider tokens
- **AuditLogs** - Security and compliance logging
- **BackfillJobs** - Manual historical retrieval jobs
- **NotificationPreferences** - Per-account notification settings

## 🚀 Setup Instructions

### Option 1: Quick Setup (Recommended)
```bash
cd packages/database
./setup.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run the SQL migration in Supabase SQL Editor
# Copy and execute: supabase-migration.sql

# Seed with test data (optional)
npm run db:seed
```

### Option 3: Supabase SQL Editor (Current Requirement)
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor  
3. Copy and paste `supabase-migration.sql`
4. Execute the migration

## 📁 Package Structure

```
packages/database/
├── prisma/
│   └── schema.prisma          # Prisma schema definition
├── src/
│   ├── client.ts              # Prisma client setup
│   ├── types.ts               # TypeScript types and enums
│   ├── queries.ts             # Common database queries
│   └── index.ts               # Main exports
├── generated/
│   └── client/                # Generated Prisma client
├── supabase-migration.sql     # Manual SQL migration
├── seed.ts                    # Development seed data
└── setup.sh                  # Automated setup script
```

## 🔧 Available Commands

```bash
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema to database (when direct connection available)
npm run db:migrate      # Create and run migrations
npm run db:seed         # Seed database with test data
npm run db:studio       # Open Prisma Studio at http://localhost:5555
npm run typecheck       # TypeScript validation
```

## 📊 Key Features

### Deduplication System
Per PRD Section 4.3, statements are deduplicated using:
```typescript
// Unique constraint: (account_id, period_end, file_type, version)
const existing = await statementQueries.checkDuplicate(accountId, periodEnd, fileType)
const version = existing ? existing.version + 1 : 1
```

### Idempotency
All deliveries use `request_id` for safe retries:
```typescript
const delivery = await deliveryQueries.findByRequestId(requestId)
if (delivery) return delivery // Already processed
```

### Audit Logging
Comprehensive tracking per PRD Section 15.5:
```typescript
await auditQueries.log(orgId, 'statement_retrieved', userId, statementId, metadata)
```

### Row Level Security (RLS)
Supabase RLS policies ensure users only access their organization's data.

## 🧪 Test Data

The seed script creates:
- 1 test organization (Professional plan)
- 1 test user (`test@bankstatementretriever.com`)
- 1 bank connection (First Platypus Bank)
- 2 accounts (checking + credit card)
- 2 destinations (Google Drive + Webhook)
- 2 sample statements with deliveries
- Complete routing rules and notification preferences

## 🔗 Usage Examples

```typescript
import { prisma, accountQueries, statementQueries } from '@bsr/database'

// Get organization's accounts with pagination
const accounts = await accountQueries.findByOrg(orgId, { page: 1, pageSize: 20 })

// Create statement with deduplication
const statement = await statementQueries.createWithDeduplication({
  account_id: accountId,
  period_end: new Date('2024-01-31'),
  file_type: 'pdf',
  checksum: 'sha256:abc123...'
})

// Check database health
const health = await healthQueries.check()
```

## 🏗️ Development Notes

- **Prisma Client**: Generated in `generated/client/` directory
- **Connection Pooling**: Uses Supabase's built-in pgBouncer
- **Migrations**: Manual SQL approach due to Supabase constraints
- **TypeScript**: Full type safety with generated Prisma types
- **Performance**: Optimized indexes for common query patterns

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Encrypted token storage via `secret_ref` pattern
- Audit logging for all critical operations
- Soft deletes for data retention compliance

## Next Steps

After database setup:
1. Run seed data to get test environment
2. Use `npm run db:studio` to browse data
3. Import `@bsr/database` in other packages
4. Start building API endpoints with type-safe queries