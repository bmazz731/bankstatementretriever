#!/usr/bin/env node
/**
 * Test script to reproduce the organization creation error
 * This tests the exchange_public_token endpoint specifically
 */

const { createClient } = require('@supabase/supabase-js');

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://yoodxepoxrxzfstfgwst.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const API_BASE_URL = 'https://api.bankstatementretriever.com';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Please set SUPABASE_SERVICE_ROLE_KEY environment variable');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function createTestUser() {
  console.log('🔧 Creating test user in Supabase...');
  
  // Create a test user via Supabase auth
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  
  try {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true
    });

    if (authError) {
      console.error('❌ Failed to create test user:', authError);
      return null;
    }

    console.log('✅ Test user created:', authData.user.id);
    return authData.user;
  } catch (error) {
    console.error('❌ Unexpected error creating user:', error);
    return null;
  }
}

async function getAuthToken(user) {
  console.log('🔑 Getting auth token for user...');
  
  try {
    // Generate an access token for the user
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateAccessToken(user.id);
    
    if (sessionError) {
      console.error('❌ Failed to generate token:', sessionError);
      return null;
    }

    console.log('✅ Auth token generated');
    return sessionData.access_token;
  } catch (error) {
    console.error('❌ Error generating token:', error);
    return null;
  }
}

async function testExchangePublicToken(authToken) {
  console.log('💱 Testing exchange_public_token endpoint...');
  
  // Using a mock public token (this will fail at Plaid level, but we want to see the database error)
  const mockPublicToken = 'public-sandbox-test-token-' + Date.now();
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/plaid/exchange_public_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        public_token: mockPublicToken,
        backfill_months: 1
      })
    });

    const data = await response.json();
    
    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Body:', JSON.stringify(data, null, 2));
    
    if (response.status === 500 && data.error === 'BSR_DATABASE_ERROR' && data.message.includes('Failed to create organization')) {
      console.log('🔥 REPRODUCED THE ORGANIZATION ERROR!');
      console.log('Debug info:', data.debug);
      
      // Let's check what actually exists in the database
      await checkDatabaseState(data.debug?.user_id, data.debug?.org_id);
    } else if (response.status === 400 && data.error === 'BSR_PLAID_ERROR') {
      console.log('ℹ️  Got expected Plaid error (mock token), but no database error occurred');
    }
    
    return data;
    
  } catch (error) {
    console.error('❌ Request failed:', error);
    return null;
  }
}

async function checkDatabaseState(userId, orgId) {
  console.log('\n🔍 Checking database state...');
  
  if (userId) {
    console.log('Checking user:', userId);
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (userError) {
      console.log('User query error:', userError);
    } else {
      console.log('User data:', userData);
    }
  }
  
  if (orgId) {
    console.log('Checking organization:', orgId);
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', orgId)
      .single();
    
    if (orgError) {
      console.log('Organization query error:', orgError);
    } else {
      console.log('Organization data:', orgData);
    }
  }
}

async function cleanupTestUser(user) {
  console.log('🧹 Cleaning up test user...');
  
  try {
    await supabase.auth.admin.deleteUser(user.id);
    console.log('✅ Test user deleted');
  } catch (error) {
    console.error('❌ Failed to delete test user:', error);
  }
}

async function runDiagnosticTest() {
  console.log('🔍 Running Organization Error Diagnostic Test...\n');
  
  let testUser = null;
  
  try {
    // Step 1: Create test user
    testUser = await createTestUser();
    if (!testUser) {
      console.log('❌ Could not create test user, aborting');
      return;
    }
    
    // Step 2: Get auth token  
    const authToken = await getAuthToken(testUser);
    if (!authToken) {
      console.log('❌ Could not get auth token, aborting');
      return;
    }
    
    // Step 3: Test the exchange endpoint
    const result = await testExchangePublicToken(authToken);
    
    // Step 4: Analyze what happened
    console.log('\n📋 ANALYSIS:');
    if (result && result.error === 'BSR_DATABASE_ERROR') {
      console.log('✅ Successfully reproduced the database error!');
      console.log('🔍 Error details suggest the organization creation is failing');
      console.log('🔍 This could be due to:');
      console.log('   1. Database constraint violations');
      console.log('   2. Missing required fields');
      console.log('   3. Permission issues with service role');
      console.log('   4. Timing issues with user.org_id generation');
    } else if (result && result.error === 'BSR_PLAID_ERROR') {
      console.log('ℹ️  Database operations succeeded, but Plaid API failed');
      console.log('ℹ️  This means organization creation logic is working');
    } else {
      console.log('❓ Unexpected result - may need to adjust test approach');
    }
    
  } catch (error) {
    console.error('❌ Diagnostic test failed:', error);
  } finally {
    // Cleanup
    if (testUser) {
      await cleanupTestUser(testUser);
    }
  }
}

// Run the diagnostic
runDiagnosticTest().catch(console.error);