# 🚀 Automated Deployment Setup

## GitHub Actions Auto-Deployment

This repository now has automated deployment for Cloudflare Workers on every push to `main` branch.

### Required GitHub Repository Secrets

To enable auto-deployment, set these secrets in **Settings → Secrets and variables → Actions**:

#### **CLOUDFLARE_API_TOKEN** (Required)
1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token" 
3. Use "Custom token" template with these permissions:
   - **Zone**: Zone:Read, Zone:Edit
   - **Account**: Cloudflare Workers:Edit
   - **Zone Resources**: Include: All zones from account

#### **Required Cloudflare Workers Secrets**

These secrets must be set in Cloudflare Workers Dashboard or via CLI:

```bash
# Authentication
wrangler secret put SUPABASE_SERVICE_ROLE_KEY

# Plaid Integration  
wrangler secret put PLAID_CLIENT_ID
wrangler secret put PLAID_SECRET
wrangler secret put PLAID_WEBHOOK_SECRET

# Data Security
wrangler secret put ENCRYPTION_KEY

# Optional: Third-party integrations
wrangler secret put GOOGLE_DRIVE_CLIENT_ID
wrangler secret put GOOGLE_DRIVE_CLIENT_SECRET
wrangler secret put DROPBOX_CLIENT_ID
wrangler secret put DROPBOX_CLIENT_SECRET
wrangler secret put ONEDRIVE_CLIENT_ID
wrangler secret put ONEDRIVE_CLIENT_SECRET
wrangler secret put SENDGRID_API_KEY
wrangler secret put STRIPE_SECRET_KEY
```

## Deployment Flow

### Automatic (Recommended)
1. Push code changes to `main` branch
2. GitHub Actions automatically deploys to Cloudflare Workers
3. Deployment includes type checking and validation
4. API available at: https://api.bankstatementretriever.com

### Manual (Backup)
```bash
cd apps/workers
./deploy.sh production
```

## Verification Steps

After deployment, verify these endpoints:
- ✅ Health: https://api.bankstatementretriever.com/health
- ✅ Deep Health: https://api.bankstatementretriever.com/health/deep
- ✅ Auth required: https://api.bankstatementretriever.com/api/accounts

## Troubleshooting

### Common Issues:

#### 1. **401 Authentication Errors**
- Cause: `SUPABASE_SERVICE_ROLE_KEY` not set
- Fix: `wrangler secret put SUPABASE_SERVICE_ROLE_KEY`

#### 2. **500 BSR_CONFIG_ERROR** 
- Cause: Plaid secrets missing
- Fix: Set `PLAID_CLIENT_ID` and `PLAID_SECRET`

#### 3. **GitHub Actions Failing**
- Cause: `CLOUDFLARE_API_TOKEN` not set in GitHub
- Fix: Add token in repository Settings → Secrets

#### 4. **Type Check Failures**
- Cause: TypeScript errors in workers code  
- Fix: Run `npm run types:check` locally and fix errors

### Monitoring

- **Logs**: `wrangler tail`  
- **Analytics**: Cloudflare Workers Dashboard
- **GitHub Actions**: Repository → Actions tab