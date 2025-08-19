#!/bin/bash

# Cloudflare Workers deployment script
set -e

ENVIRONMENT=${1:-staging}
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "🚀 Deploying BankStatementRetriever Workers to $ENVIRONMENT"
echo "Project root: $PROJECT_ROOT"

# Change to workers directory
cd "$PROJECT_ROOT/apps/workers"

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(development|staging|production)$ ]]; then
    echo "❌ Invalid environment: $ENVIRONMENT"
    echo "   Valid options: development, staging, production"
    exit 1
fi

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler@latest
fi

# Check authentication
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not authenticated with Cloudflare"
    echo "   Run: wrangler login"
    exit 1
fi

echo "✅ Authenticated with Cloudflare"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type check
echo "🔍 Running type check..."
npm run types:check

# Deploy based on environment
case $ENVIRONMENT in
    "production")
        echo "🌟 Deploying to PRODUCTION"
        echo "⚠️  This will affect live users!"
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ Deployment cancelled"
            exit 1
        fi
        
        # Create/update KV namespaces for production
        echo "📋 Setting up KV namespaces..."
        wrangler kv:namespace create "BSR_CONFIG" || true
        wrangler kv:namespace create "BSR_CACHE" || true  
        wrangler kv:namespace create "BSR_RATE_LIMITS" || true
        
        # Create/update Queues for production
        echo "📬 Setting up Queues..."
        wrangler queues create statement-retrieval-prod || true
        wrangler queues create delivery-prod || true
        wrangler queues create statement-retrieval-dlq || true
        wrangler queues create delivery-dlq || true
        
        # Deploy
        wrangler deploy
        ;;
        
    "staging")
        echo "🧪 Deploying to STAGING"
        
        # Create/update KV namespaces for staging
        echo "📋 Setting up KV namespaces..."
        wrangler kv:namespace create "BSR_CONFIG" --env staging || true
        wrangler kv:namespace create "BSR_CACHE" --env staging || true
        wrangler kv:namespace create "BSR_RATE_LIMITS" --env staging || true
        
        # Create/update Queues for staging
        echo "📬 Setting up Queues..."
        wrangler queues create statement-retrieval-staging || true
        wrangler queues create delivery-staging || true
        
        # Deploy to staging
        wrangler deploy --env staging
        ;;
        
    "development")
        echo "🔧 Starting development mode"
        wrangler dev --env development --local --port 8787
        ;;
esac

if [[ "$ENVIRONMENT" != "development" ]]; then
    echo "✅ Deployment completed!"
    echo ""
    echo "🔗 Endpoints:"
    case $ENVIRONMENT in
        "production")
            echo "   API: https://api.bankstatementretriever.com"
            echo "   Health: https://api.bankstatementretriever.com/health"
            ;;
        "staging")
            echo "   API: https://api-staging.bankstatementretriever.com"
            echo "   Health: https://api-staging.bankstatementretriever.com/health"
            ;;
    esac
    echo ""
    echo "📊 Monitoring:"
    echo "   Logs: wrangler tail"
    echo "   Analytics: Cloudflare Dashboard"
    echo ""
    echo "🔧 Management:"
    echo "   Secrets: wrangler secret put <NAME>"
    echo "   KV: wrangler kv:key put <KEY> <VALUE> --binding BSR_CONFIG"
fi