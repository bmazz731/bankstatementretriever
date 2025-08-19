#!/bin/bash

# BankStatementRetriever Dashboard Deployment Script
# Deploys Next.js dashboard to Vercel

set -e

echo "🚀 Deploying BankStatementRetriever Dashboard..."

# Navigate to dashboard directory
cd "$(dirname "$0")/../apps/dashboard"

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building application..."
npm run build

echo "🔍 Running type check..."
npm run type-check

echo "🌍 Deploying to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to production
vercel --prod

echo "✅ Dashboard deployed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_API_URL=https://api.bankstatementretriever.com"
echo "   - SUPABASE_URL=your_supabase_url"
echo "   - SUPABASE_ANON_KEY=your_supabase_anon_key"
echo "2. Test the deployment at your Vercel URL"
echo "3. Configure custom domain if needed"