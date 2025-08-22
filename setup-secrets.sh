#!/bin/bash

# Setup script for Cloudflare Workers secrets
# This sets up the essential secrets needed for the Plaid integration

echo "🔧 Setting up Cloudflare Workers secrets for Plaid integration..."
echo

cd apps/workers

# Set real values from .env.local
echo "Setting PLAID_CLIENT_ID..."
echo "68a34239073c850022b20229" | CLOUDFLARE_EMAIL="bmazz@ymail.com" CLOUDFLARE_API_KEY="79cddbc99be21caf18d3200c6464e6d890a46" npx wrangler secret put PLAID_CLIENT_ID

echo "Setting PLAID_SECRET..."
echo "2e40974b3610a254874130112b3aec" | CLOUDFLARE_EMAIL="bmazz@ymail.com" CLOUDFLARE_API_KEY="79cddbc99be21caf18d3200c6464e6d890a46" npx wrangler secret put PLAID_SECRET

echo "Setting SUPABASE_SERVICE_ROLE_KEY..."
echo "sb_secret_kZpVzBHIEAO5oMvldGjDcA_xtNCzSyB" | CLOUDFLARE_EMAIL="bmazz@ymail.com" CLOUDFLARE_API_KEY="79cddbc99be21caf18d3200c6464e6d890a46" npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY

echo "Setting ENCRYPTION_KEY..."
echo "lTNvUpIq7ihB8V9U+IjfUzl+WqPTA1bywAu6+5QhIvI=" | CLOUDFLARE_EMAIL="bmazz@ymail.com" CLOUDFLARE_API_KEY="79cddbc99be21caf18d3200c6464e6d890a46" npx wrangler secret put ENCRYPTION_KEY

echo
echo "✅ Secrets setup complete!"
echo "✅ Using real credentials from .env.local"
echo "🚀 Now redeploy with: npx wrangler deploy"