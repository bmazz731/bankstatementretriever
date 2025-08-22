# BankStatementRetriever Setup Guide - Phase 1 Deployed

## 🚀 PHASE 1 DEPLOYMENT COMPLETE

Phase 1 Plaid Integration is **ready for deployment**! All code has been prepared and deployment scripts created.

## 📋 QUICK START - DEPLOY NOW

**Total Time**: ~45-60 minutes

1. **Critical Action Items**: See `ACTION_ITEMS.md` for complete deployment checklist
2. **Database Migration**: Execute `deploy/database-migration.sql` in Supabase
3. **Deploy Workers**: Run `./deploy/deploy-workers.sh` (requires Cloudflare API token)
4. **Deploy Dashboard**: Run `./deploy/deploy-dashboard.sh` (requires Vercel CLI)
5. **Test**: Run `node scripts/test-plaid-integration.js`

---

## 💻 Development Setup (Optional)

This guide will help you set up BankStatementRetriever for **local development** with Plaid Sandbox.

## Prerequisites

- Node.js 18+ and npm 9+
- Plaid account with Sandbox access
- Supabase account and project
- Cloudflare account (for workers deployment)

## 1. Environment Setup

### 1.1 Copy Environment Template

```bash
cp .env.example .env.local
```

### 1.2 Configure Plaid (Sandbox)

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Create a new application or use existing one
3. Get your Sandbox credentials:
   - Client ID
   - Secret Key
4. Update `.env.local`:
   ```env
   PLAID_CLIENT_ID=your_sandbox_client_id
   PLAID_SECRET=your_sandbox_secret
   PLAID_ENV=sandbox
   ```

### 1.3 Configure Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or use existing one
3. Go to Settings > API
4. Get your project credentials:
   - Project URL
   - Anon public key
   - Service role key (secret)
5. Update `.env.local`:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 1.4 Generate Encryption Key

Generate a secure encryption key for token storage:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Update `.env.local`:

```env
ENCRYPTION_KEY=generated_base64_key_here
```

## 2. Database Setup

### 2.1 Run Database Migration

1. Go to your Supabase project dashboard
2. Open SQL Editor
3. Copy and paste the contents of `packages/database/supabase-migration.sql`
4. Execute the SQL to create tables, constraints, and indexes

### 2.2 Enable Row Level Security (RLS)

The migration script automatically enables RLS, but you may need to configure additional policies based on your authentication setup.

## 3. Application Setup

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Dashboard Environment

Create dashboard-specific environment file:

```bash
cp .env.local apps/dashboard/.env.local
```

### 3.3 Workers Environment

For local workers development:

```bash
# Create workers environment file
cat > apps/workers/.dev.vars << EOF
PLAID_CLIENT_ID=your_sandbox_client_id
PLAID_SECRET=your_sandbox_secret
PLAID_ENV=sandbox
ENCRYPTION_KEY=your_base64_encryption_key
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DOMAIN=localhost:8787
EOF
```

## 4. Development

### 4.1 Start Development Servers

Terminal 1 (Dashboard):

```bash
cd apps/dashboard
npm run dev
```

Terminal 2 (Workers API):

```bash
cd apps/workers
npm run dev
```

The dashboard will be available at http://localhost:3000
The API will be available at http://localhost:8787

### 4.2 Test Plaid Integration

1. Open dashboard at http://localhost:3000
2. Sign up/login (you'll need to implement authentication first)
3. Go to Accounts page
4. Click "Connect Bank Account"
5. Use Plaid Sandbox test credentials:
   - Username: `user_good`
   - Password: `pass_good`
   - PIN: `1234` (if required)

### 4.3 Available Sandbox Institutions

For testing, use these popular sandbox institutions:

- **Chase**: Institution ID `ins_109508`
- **Bank of America**: Institution ID `ins_109509`
- **Wells Fargo**: Institution ID `ins_109510`
- **American Express**: Institution ID `ins_109511`

## 5. Testing Statement Support

Not all sandbox accounts support statements. Test with:

- Chase checking/savings accounts (usually supported)
- Bank of America checking accounts (usually supported)
- Some credit card accounts

The system will automatically detect statement support during account connection.

## 6. Deployment Preparation

### 6.1 Cloudflare Workers

1. Install Cloudflare Wrangler CLI:

   ```bash
   npm install -g wrangler
   ```

2. Configure wrangler.toml in `apps/workers/`
3. Set environment variables in Cloudflare dashboard
4. Deploy:
   ```bash
   cd apps/workers
   npm run deploy
   ```

### 6.2 Vercel Dashboard

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy:
   ```bash
   cd apps/dashboard
   npm run build
   vercel --prod
   ```

## 7. Production Migration

When ready for production:

1. Apply for Plaid Production access
2. Update environment variables:
   ```env
   PLAID_ENV=production
   PLAID_CLIENT_ID=production_client_id
   PLAID_SECRET=production_secret
   ```
3. Configure webhooks and proper domain settings
4. Set up monitoring and logging

## 8. Security Checklist

- [ ] Encryption keys are securely generated and stored
- [ ] Supabase RLS policies are properly configured
- [ ] Plaid webhook signatures are verified (when implemented)
- [ ] All environment variables are set securely
- [ ] HTTPS is enforced in production
- [ ] Access tokens are encrypted with AES-256

## 9. Troubleshooting

### Common Issues

1. **Plaid Link fails to open**
   - Check client ID and secret in environment
   - Verify PLAID_ENV is set to 'sandbox'
   - Check browser console for errors

2. **Database connection errors**
   - Verify Supabase URL and keys
   - Check if database migration was run successfully
   - Ensure RLS policies allow access

3. **Token exchange fails**
   - Check encryption key is properly set
   - Verify database schema includes access_token_encrypted column
   - Check workers logs for detailed errors

4. **Accounts not appearing**
   - Check if statement support detection is working
   - Verify database foreign key relationships
   - Check API response format matches frontend expectations

For additional help, check the logs in:

- Browser console (frontend)
- Cloudflare Workers logs (API)
- Supabase logs (database)
