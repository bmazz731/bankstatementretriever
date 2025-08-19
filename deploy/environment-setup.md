# Environment Setup for Phase 1 Deployment

## Required Environment Variables

### 1. Cloudflare Workers (API)
Set these secrets using `wrangler secret put <name>`:

```bash
# Required for Plaid Integration
wrangler secret put PLAID_CLIENT_ID
wrangler secret put PLAID_SECRET
wrangler secret put ENCRYPTION_KEY

# Required for Database
wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Optional
wrangler secret put PLAID_WEBHOOK_SECRET
```

### 2. Vercel (Dashboard)
Set these environment variables in Vercel dashboard:

```env
NEXT_PUBLIC_API_URL=https://api.bankstatementretriever.com
SUPABASE_URL=https://yoodxepoxrxzfstfgwst.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Development Environment
Create `.env.local` in project root:

```env
# Plaid Configuration (Sandbox)
PLAID_CLIENT_ID=your_plaid_sandbox_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox

# Database
SUPABASE_URL=https://yoodxepoxrxzfstfgwst.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Encryption (Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
ENCRYPTION_KEY=your_32_byte_base64_encryption_key

# Application
NEXT_PUBLIC_API_URL=https://api.bankstatementretriever.com
DOMAIN=bankstatementretriever.com
```

## Security Notes

1. **Encryption Key**: Must be exactly 32 bytes (256 bits) encoded in base64
2. **Plaid Environment**: Use `sandbox` for testing, `production` for live
3. **Access Tokens**: Never log or expose Plaid access tokens
4. **Service Role Key**: Keep Supabase service role key secure - it has admin access

## Validation

Run the test suite to validate configuration:
```bash
node scripts/test-plaid-integration.js
```