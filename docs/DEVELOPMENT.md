# Development Guide

This guide covers the development workflow and standards for the Bank Statement Retriever project.

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git
- Supabase CLI (for database work)
- Wrangler CLI (for Cloudflare Workers)

## Development Workflow

### 1. Setting Up Your Environment

```bash
# Clone the repository
git clone https://github.com/bmazz731/bankstatementretriever.git
cd bankstatementretriever

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

See [Setup Guide](./setup/SETUP.md) for detailed environment configuration.

### 2. Development Commands

```bash
# Run all development servers
npm run dev

# Run individual services
cd apps/dashboard && npm run dev  # Dashboard on localhost:3000
cd apps/workers && npm run dev    # Workers API

# Build all projects
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

### 3. Project Structure

- **apps/dashboard** - Next.js frontend application
- **apps/workers** - Cloudflare Workers API
- **packages/** - Shared libraries and utilities
- **docs/** - All documentation
- **deploy/** - Deployment scripts and database migrations

## Code Standards

### TypeScript
- Strict TypeScript configuration
- All functions must have proper return types
- Use proper error handling with typed errors
- Prefer interfaces over types for object definitions

### React/Next.js
- Use function components with hooks
- Implement proper error boundaries
- Use React Query for data fetching
- Follow Next.js App Router conventions

### Workers/API
- Use Hono framework for routing
- Implement proper middleware for auth and validation
- Use Zod for runtime validation
- Follow RESTful API conventions

### Database
- Use Supabase client with proper types
- Implement Row Level Security (RLS)
- Use database transactions for multi-step operations
- Always validate data before database operations

## Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch
```

## Deployment

### Dashboard (Vercel)
```bash
npm run deploy:dashboard
```

### Workers (Cloudflare)
```bash
# Set secrets first
cd apps/workers
wrangler secret put PLAID_CLIENT_ID
wrangler secret put PLAID_SECRET
wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Deploy
npm run deploy:workers
```

See [Deployment Scripts](../deploy/scripts/) for automated deployment options.

## Architecture Decisions

### Authentication
- Supabase Auth for user management
- JWT tokens for API authentication
- Row Level Security for data access

### Data Flow
- Frontend → Workers API → Supabase
- No direct database access from frontend
- All sensitive operations in Workers

### Error Handling
- Structured error responses with error codes
- Client-side error boundaries
- Server-side error logging

## Contributing

1. Create feature branch from `main`
2. Follow code standards and run linting
3. Write tests for new functionality
4. Update documentation as needed
5. Submit PR with clear description

## Troubleshooting

### Common Issues

**Build Errors**: Run `npm run typecheck` to identify TypeScript issues
**Database Errors**: Check RLS policies and user permissions
**Authentication Issues**: Verify JWT tokens and Supabase configuration
**Worker Deployment**: Ensure all secrets are set with `wrangler secret list`

See [Implementation Docs](./implementation/) for detailed technical solutions.