# MVP API Test Endpoints

This document lists the simplified API endpoints available in the MVP deployment.

## Health Check
- `GET /health` - Basic health check
- `GET /api/health` - Additional health endpoint

## Authentication (Stub Implementation)
- `POST /api/auth/signup` - Create account (accepts any email/password)
- `POST /api/auth/signin` - Sign in (accepts any email/password)
- `POST /api/auth/google/callback` - Google OAuth callback (stub)
- `POST /api/auth/magic-link` - Send magic link (stub)
- `POST /api/auth/magic-link/verify` - Verify magic link (stub)
- `GET /api/auth/me` - Get current user (requires Authorization header)
- `POST /api/auth/signout` - Sign out (requires Authorization header)
- `POST /api/auth/change-password` - Change password (requires Authorization header)
- `POST /api/auth/refresh` - Refresh token

## Plaid Integration (Stub Implementation)
- `POST /api/plaid/webhook` - Plaid webhook endpoint
- `POST /api/plaid/link_token` - Create Plaid Link token (requires auth)
- `POST /api/plaid/exchange_public_token` - Exchange public token (requires auth)
- `GET /api/plaid/accounts` - Get connected accounts (requires auth, returns demo data)
- `POST /api/plaid/accounts/refresh/:itemId` - Refresh accounts (requires auth)
- `GET /api/plaid/predictions` - Get statement predictions (requires auth, returns demo data)
- `POST /api/plaid/check_statements/:accountId` - Manual statement check (requires auth)

## Storage (Stub Implementation)
- `GET /api/storage/providers` - Get storage providers (requires auth)
- `POST /api/storage/connect/:providerId` - Connect storage provider (requires auth)
- `POST /api/storage/upload` - Upload statement (requires auth)
- `GET /api/storage/statements` - List statements (requires auth, returns demo data)

## Test Authentication

To test authenticated endpoints, first sign in:

```bash
curl -X POST https://your-domain/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}'
```

This will return a token. Use it in subsequent requests:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://your-domain/api/auth/me
```

## Frontend Integration

The frontend at https://bankstatementretriever.vercel.app can now connect to these endpoints. All responses include proper CORS headers for the Vercel domain.

## Next Steps

Once this MVP is deployed and working:

1. Replace stub authentication with real Supabase integration
2. Replace stub Plaid integration with real Plaid API calls
3. Add real storage provider integrations
4. Implement proper database operations
5. Add back queue processing and cron jobs
6. Implement proper webhook processing