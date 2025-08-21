#!/usr/bin/env node
/**
 * Test script to check Plaid environment configuration
 */

const API_BASE_URL = 'https://api.bankstatementretriever.com';

async function testPlaidConfig() {
  console.log('🔍 Testing Plaid Environment Configuration...\n');
  
  try {
    // Test 1: Check if API is responding
    console.log('1. Testing API health...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ API Health:', healthData.status);
    console.log('   Environment:', healthData.environment);
    console.log('   Build:', healthData.build);
    
    // Test 2: Test authentication requirement
    console.log('\n2. Testing Plaid link_token endpoint (should require auth)...');
    const noAuthResponse = await fetch(`${API_BASE_URL}/api/plaid/link_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const noAuthData = await noAuthResponse.json();
    
    if (noAuthResponse.status === 401 && noAuthData.error === 'BSR_AUTH_ERROR') {
      console.log('✅ Authentication requirement working correctly');
    } else {
      console.log('❌ Unexpected response:', noAuthData);
    }
    
    // Test 3: Test with invalid auth token
    console.log('\n3. Testing with invalid auth token...');
    const invalidAuthResponse = await fetch(`${API_BASE_URL}/api/plaid/link_token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_token_12345'
      }
    });
    const invalidAuthData = await invalidAuthResponse.json();
    console.log('Status:', invalidAuthResponse.status);
    console.log('Response:', invalidAuthData);
    
    if (invalidAuthResponse.status === 401) {
      console.log('✅ Invalid token properly rejected');
    } else if (invalidAuthResponse.status === 500) {
      console.log('⚠️  500 error - this might indicate missing environment variables');
      if (invalidAuthData.error === 'BSR_INTERNAL_ERROR') {
        console.log('🔥 LIKELY ISSUE: Missing PLAID_CLIENT_ID, PLAID_SECRET, or PLAID_ENV');
        console.log('   Check that wrangler secrets are set properly');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  console.log('\n📋 Next steps:');
  console.log('If you see 500 errors or "BSR_INTERNAL_ERROR", run these commands:');
  console.log('cd apps/workers');
  console.log('wrangler secret put PLAID_CLIENT_ID');
  console.log('wrangler secret put PLAID_SECRET');
  console.log('wrangler secret put SUPABASE_SERVICE_ROLE_KEY');
  console.log('wrangler secret put ENCRYPTION_KEY');
}

testPlaidConfig().catch(console.error);