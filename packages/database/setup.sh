#!/bin/bash

# Database setup script for BankStatementRetriever
set -e

echo "🗄️  Setting up BankStatementRetriever database..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "⚙️  Generating Prisma client..."
npx prisma generate

# Push schema to database (for development)
echo "📤 Pushing schema to database..."
npx prisma db push

# Run seeds (optional, with confirmation)
read -p "🌱 Do you want to seed the database with test data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run db:seed
fi

echo "✅ Database setup complete!"
echo ""
echo "🚀 Available commands:"
echo "  npm run db:generate  - Generate Prisma client"
echo "  npm run db:push      - Push schema changes"
echo "  npm run db:migrate   - Create and apply migration"
echo "  npm run db:seed      - Seed database with test data"
echo "  npm run db:studio    - Open Prisma Studio"
echo ""
echo "🔗 Prisma Studio: http://localhost:5555"
echo "   Run 'npm run db:studio' to open database browser"