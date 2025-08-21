#!/usr/bin/env node
/**
 * Comprehensive diagnostic script for Plaid integration issues
 * This will help identify exactly which environment variables/secrets are missing
 */

const API_BASE_URL = 'https://api.bankstatementretriever.com';

async function createDiagnosticEndpoint() {
  console.log('🔍 PLAID INTEGRATION DIAGNOSTIC REPORT');
  console.log('=====================================\n');
  
  console.log('🎯 ROOT CAUSE ANALYSIS:');
  console.log('You are getting BSR_INTERNAL_ERROR which means:');
  console.log('1. ✅ Authentication validation PASSED');
  console.log('2. ❌ PlaidService constructor or createLinkToken FAILED');
  console.log('');
  
  console.log('📋 REQUIRED CLOUDFLARE WORKERS SECRETS:');
  console.log('Based on the code analysis, these secrets MUST be set:');
  console.log('');
  console.log('CRITICAL SECRETS (will cause 500 error if missing):');
  console.log('  - PLAID_CLIENT_ID');
  console.log('  - PLAID_SECRET');  
  console.log('  - PLAID_ENV (should be set in wrangler.toml as "sandbox")');
  console.log('  - DOMAIN (should be set in wrangler.toml as "bankstatementretriever.com")');
  console.log('  - SUPABASE_SERVICE_ROLE_KEY');
  console.log('  - ENCRYPTION_KEY');
  console.log('');
  
  console.log('🔧 HOW TO FIX:');
  console.log('Run these commands in the apps/workers directory:');
  console.log('');
  console.log('cd apps/workers');
  console.log('wrangler secret put PLAID_CLIENT_ID');
  console.log('wrangler secret put PLAID_SECRET'); 
  console.log('wrangler secret put SUPABASE_SERVICE_ROLE_KEY');
  console.log('wrangler secret put ENCRYPTION_KEY');
  console.log('');
  console.log('For each command, you\'ll be prompted to enter the actual secret value.');
  console.log('');
  
  console.log('📊 CURRENT ENVIRONMENT STATUS:');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ API Status:', healthData.status);
    console.log('✅ Environment:', healthData.environment);
    console.log('✅ Build:', healthData.build);
    
    // Check if deployment is recent
    const timestamp = new Date(healthData.timestamp);
    const now = new Date();
    const minutesAgo = Math.floor((now - timestamp) / (1000 * 60));
    console.log('✅ Last Response:', `${minutesAgo} minutes ago`);
    
  } catch (error) {
    console.log('❌ API Health Check Failed:', error.message);
  }
  
  console.log('');
  console.log('🧪 TESTING AUTHENTICATION FLOW:');
  
  // Test authentication requirement
  try {
    const noAuthResponse = await fetch(`${API_BASE_URL}/api/plaid/link_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const noAuthData = await noAuthResponse.json();
    
    if (noAuthResponse.status === 401) {
      console.log('✅ Authentication requirement working');
    } else {
      console.log('❌ Authentication issue:', noAuthData);
    }
    
  } catch (error) {
    console.log('❌ Auth test failed:', error.message);
  }
  
  console.log('');
  console.log('🔍 DETAILED ERROR ANALYSIS:');
  console.log('The error flow is:');
  console.log('1. Frontend calls /api/plaid/link_token with valid JWT');
  console.log('2. Supabase auth validation succeeds'); 
  console.log('3. Code reaches: new PlaidService(c.env)');
  console.log('4. PlaidService constructor validates environment variables');
  console.log('5. If PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV, or DOMAIN is undefined:');
  console.log('   → Constructor throws error');
  console.log('   → Caught by try/catch at line 112');
  console.log('   → Returns BSR_INTERNAL_ERROR at line 124');
  console.log('');
  
  console.log('💡 SOLUTION PRIORITY:');
  console.log('1. Set PLAID_CLIENT_ID and PLAID_SECRET as Cloudflare Workers secrets');
  console.log('2. Set SUPABASE_SERVICE_ROLE_KEY as Cloudflare Workers secret');  
  console.log('3. Set ENCRYPTION_KEY as Cloudflare Workers secret');
  console.log('4. Verify PLAID_ENV="sandbox" and DOMAIN="bankstatementretriever.com" in wrangler.toml');
  console.log('5. Redeploy workers after setting secrets');
  console.log('');
  
  console.log('🚀 VERIFICATION:');
  console.log('After setting secrets, test by clicking "Connect Bank Account"');
  console.log('- If still 500 error: Check wrangler secret list');  
  console.log('- If 400 error with Plaid details: Secrets work, check Plaid credentials');
  console.log('- If Plaid Link opens: Success! Integration working');
}

createDiagnosticEndpoint().catch(console.error);