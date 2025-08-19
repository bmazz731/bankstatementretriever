#!/bin/bash

# Test deployed endpoints for BankStatementRetriever

echo "🧪 Testing deployed endpoints..."

# Test API health endpoint
echo "Testing API health endpoint..."
curl -f https://api.bankstatementretriever.com/health || echo "❌ API health endpoint failed"

# Test dashboard
echo "Testing dashboard..."
curl -f -I https://app.bankstatementretriever.com || echo "❌ Dashboard endpoint failed"

# Test API authentication (should return 401)
echo "Testing API authentication..."
response=$(curl -s -o /dev/null -w "%{http_code}" https://api.bankstatementretriever.com/api/plaid/link_token -X POST)
if [ "$response" = "401" ]; then
    echo "✅ API authentication working (returns 401 as expected)"
else
    echo "❌ API authentication not working (expected 401, got $response)"
fi

echo "✅ Endpoint tests completed"