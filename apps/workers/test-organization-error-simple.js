#!/usr/bin/env node
/**
 * Simple test to reproduce the organization creation error
 * Uses direct API calls instead of Supabase client
 */

const API_BASE_URL = 'https://api.bankstatementretriever.com';

async function testWithValidToken() {
  console.log('🔍 Testing organization error with valid auth token...\n');
  
  // We need a real JWT token to test this properly
  // For now, let's just test the endpoint structure and see what errors we get
  
  console.log('1. Testing exchange_public_token without auth (should get 401)...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/plaid/exchange_public_token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        public_token: 'public-sandbox-test-token',
        backfill_months: 1
      })
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Request failed:', error);
  }
  
  console.log('\n2. Testing with mock authorization header...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/plaid/exchange_public_token`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify({
        public_token: 'public-sandbox-test-token',
        backfill_months: 1
      })
    });
    
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Request failed:', error);
  }
}

async function analyzeCodeIssue() {
  console.log('\n📋 CODE ANALYSIS:');
  console.log('Based on examination of plaid.ts lines 301-329, the issue is likely:');
  console.log('');
  console.log('1. CIRCULAR DEPENDENCY PROBLEM:');
  console.log('   - auth.ts line 38: user.org_id = user.id (when no org_id exists)');
  console.log('   - plaid.ts line 314: id: user.org_id (this becomes user.id)');
  console.log('   - plaid.ts line 315: owner_user_id: user.id');
  console.log('   - This means: org.id = user.id AND org.owner_user_id = user.id');
  console.log('');
  console.log('2. FOREIGN KEY CONSTRAINT ISSUE:');
  console.log('   - organizations.owner_user_id references users.id');
  console.log('   - But users.org_id references organizations.id');
  console.log('   - If org.id = user.id, this creates a circular reference');
  console.log('');
  console.log('3. POSSIBLE CONSTRAINT VIOLATIONS:');
  console.log('   - Trying to reference users(user.id) from organizations.owner_user_id');
  console.log('   - But the user record has org_id = user.id (self-reference)');
  console.log('   - May violate database integrity checks');
  console.log('');
  console.log('🔧 RECOMMENDED FIXES:');
  console.log('   A) Generate separate UUID for org_id instead of using user.id');
  console.log('   B) Create organization first, then update user with org_id');
  console.log('   C) Use database transaction to handle the circular dependency properly');
}

async function suggestDatabaseFix() {
  console.log('\n🛠️  SUGGESTED DATABASE TRANSACTION FIX:');
  console.log('');
  console.log('Instead of current approach, use this pattern:');
  console.log('');
  console.log('```sql');
  console.log('BEGIN TRANSACTION;');
  console.log('');
  console.log('-- Step 1: Insert organization with generated UUID');
  console.log('INSERT INTO organizations (id, owner_user_id, plan, status)');
  console.log('VALUES (uuid_generate_v4(), $1, \'free\', \'active\')');
  console.log('RETURNING id;');
  console.log('');
  console.log('-- Step 2: Update user.org_id with the new org id');  
  console.log('UPDATE users SET org_id = $2 WHERE id = $1;');
  console.log('');
  console.log('COMMIT;');
  console.log('```');
  console.log('');
  console.log('Or check if the user already has an org_id from Supabase Auth metadata');
}

// Run the analysis
testWithValidToken()
  .then(() => analyzeCodeIssue())
  .then(() => suggestDatabaseFix())
  .catch(console.error);