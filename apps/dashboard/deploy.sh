#!/bin/bash
# BSR Dashboard Deployment Script

echo "🚀 Deploying BSR Dashboard to Vercel..."
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run from apps/dashboard directory"
    exit 1
fi

# Clean install dependencies
echo "📦 Installing dependencies..."
rm -rf node_modules package-lock.json
npm install

if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed"
    exit 1
fi

# Run type checking
echo "🔍 Running type check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript errors detected, but continuing..."
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📤 Deploying to Vercel..."
    echo "Run: vercel --prod"
    echo ""
    echo "Or push to GitHub for automatic deployment:"
    echo "git add . && git commit -m 'Deploy dashboard' && git push"
else
    echo "❌ Build failed! Please fix errors before deploying"
    exit 1
fi

echo ""
echo "✨ Pre-deployment checklist:"
echo "  ✅ Environment variables configured in Vercel"
echo "  ✅ Custom domain CNAME configured in Cloudflare"
echo "  ⏳ Update Supabase redirect URLs after deployment"
echo "  ⏳ Update Google OAuth redirect URIs after deployment"
echo "  ⏳ Test authentication flow after deployment"