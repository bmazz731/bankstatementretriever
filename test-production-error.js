#!/usr/bin/env node
/**
 * Test script to reproduce the exact production error
 * This will test the Plaid link_token endpoint with various scenarios
 */

const API_BASE_URL = 'https://api.bankstatementretriever.com';

async function testProductionError() {
  console.log('🔍 Testing Production Plaid Error...\n');
  
  // Test 1: Check what happens with a properly formatted but invalid JWT
  console.log('1. Testing with mock JWT token structure...');
  const mockJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/plaid/link_token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockJWT}`
      }
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 500 && data.error === 'BSR_INTERNAL_ERROR') {
      console.log('🔥 REPRODUCED THE ERROR!');
      console.log('This suggests the issue is NOT with authentication validation');
      console.log('The error occurs AFTER successful auth, likely in PlaidService');
    }
    
  } catch (error) {
    console.error('Request failed:', error);
  }
  
  // Test 2: Try with a completely malformed token to see different error
  console.log('\n2. Testing with malformed token...');
  try {
    const response2 = await fetch(`${API_BASE_URL}/api/plaid/link_token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer invalid_token_123'
      }
    });
    
    const data2 = await response2.json();
    console.log('Status:', response2.status);
    console.log('Response:', JSON.stringify(data2, null, 2));
    
  } catch (error) {
    console.error('Request 2 failed:', error);
  }
  
  // Test 3: Check environment info
  console.log('\n3. Checking API environment...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('Environment:', healthData.environment);
    console.log('Build:', healthData.build);
    console.log('Service:', healthData.service);
    
  } catch (error) {
    console.error('Health check failed:', error);
  }
}

async function analyzeError() {
  console.log('\n🔍 ERROR ANALYSIS:');
  console.log('Based on the error pattern, the most likely causes are:');
  console.log('');
  console.log('1. PLAID_CLIENT_ID secret not set in Cloudflare Workers');
  console.log('2. PLAID_SECRET secret not set in Cloudflare Workers'); 
  console.log('3. PLAID_ENV environment variable issue');
  console.log('4. DOMAIN environment variable missing/incorrect');
  console.log('5. Supabase authentication succeeds but Plaid service initialization fails');
  console.log('');
  console.log('The fact that we get BSR_INTERNAL_ERROR instead of BSR_AUTH_ERROR');
  console.log('means the auth middleware passes, but PlaidService constructor or');
  console.log('createLinkToken method throws an exception.');
}

testProductionError()
  .then(() => analyzeError())
  .catch(console.error);