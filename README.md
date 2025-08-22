# BankStatementRetriever MVP

Automated bank statement retrieval and delivery service for US businesses.

## Architecture

- **Frontend**: Next.js dashboard hosted on Vercel
- **Backend**: Cloudflare Workers for API and processing
- **Database**: Supabase (PostgreSQL + Auth)
- **Queue**: Cloudflare Queues for async processing
- **Storage**: Zero-storage design with direct streaming to destinations

## Project Structure

```
/
├── apps/
│   ├── dashboard/     # Next.js customer dashboard
│   └── workers/       # Cloudflare Workers
├── packages/
│   ├── database/      # Supabase schema and migrations
│   ├── shared/        # Shared types and utilities
│   └── config/        # Shared configuration
└── docs/              # Documentation
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
```

3. Run development servers:

```bash
npm run dev
```

## Deployment

- Dashboard deploys automatically to Vercel on push to main
- Workers deploy via Wrangler CLI or GitHub Actions
- Database migrations run via Supabase CLI

## Core Features (MVP)

- Bank account linking via Plaid
- Automated statement retrieval
- Delivery to Google Drive, Dropbox, OneDrive, or webhooks
- Email notifications for key events
- Simple dashboard for connection management

## Security

- Zero storage of statement content
- HMAC-signed webhooks
- Encrypted tokens at rest
- US-only data processing
