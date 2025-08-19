#!/bin/bash

# BankStatementRetriever Cloudflare Workers Deployment Script
# Requires CLOUDFLARE_API_TOKEN environment variable

set -e

echo "🚀 Deploying BankStatementRetriever Workers API..."

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ ERROR: CLOUDFLARE_API_TOKEN environment variable not set"
    echo "Please get your API token from: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/"
    echo "Then run: export CLOUDFLARE_API_TOKEN=your_token_here"
    exit 1
fi

# Navigate to workers directory
cd "$(dirname "$0")/../apps/workers"

echo "📦 Installing dependencies..."
npm install

echo "🔧 Setting Cloudflare secrets..."

# Set secrets (you'll need to run these commands with actual values)
echo "Setting up required secrets..."
echo "Run these commands after this script to set your secrets:"
echo ""
echo "wrangler secret put SUPABASE_SERVICE_ROLE_KEY"
echo "wrangler secret put PLAID_CLIENT_ID"
echo "wrangler secret put PLAID_SECRET"
echo "wrangler secret put ENCRYPTION_KEY"
echo "wrangler secret put PLAID_WEBHOOK_SECRET  # Optional"
echo ""

# Deploy to production environment
echo "🌍 Deploying to production..."
wrangler deploy --env=""

echo "✅ Workers API deployed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set the required secrets using the wrangler commands above"
echo "2. Test the deployment at: https://api.bankstatementretriever.com/health"
echo "3. Update your dashboard environment to point to the production API"