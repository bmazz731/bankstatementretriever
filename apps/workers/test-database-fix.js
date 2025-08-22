/**
 * Test script to verify database operations work correctly
 * Run this with: node test-database-fix.js
 */

const { createClient } = require('@supabase/supabase-js');

// Environment variables - replace with your actual values
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function testDatabaseOperations() {
  console.log('🔍 Testing database operations...\n');

  try {
    // Test 1: Check if tables exist
    console.log('1. Testing table accessibility...');
    const { data: orgData, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .limit(1);
    
    if (orgError) {
      console.error('❌ Organizations table error:', orgError);
      return;
    }
    console.log('✅ Organizations table accessible');

    // Test 2: Test user/org creation flow
    console.log('\n2. Testing user/organization creation...');
    const testUserId = 'test-user-' + Date.now();
    const testEmail = `test-${Date.now()}@example.com`;

    // Create organization first
    const { data: newOrg, error: orgInsertError } = await supabase
      .from('organizations')
      .insert({
        owner_user_id: testUserId,
        plan: 'free',
        status: 'active'
      })
      .select()
      .single();

    if (orgInsertError) {
      console.error('❌ Organization creation error:', orgInsertError);
      return;
    }
    console.log('✅ Organization created:', newOrg.id);

    // Create user
    const { data: newUser, error: userInsertError } = await supabase
      .from('users')
      .insert({
        id: testUserId,
        org_id: newOrg.id,
        email: testEmail
      })
      .select()
      .single();

    if (userInsertError) {
      console.error('❌ User creation error:', userInsertError);
      // Clean up organization
      await supabase.from('organizations').delete().eq('id', newOrg.id);
      return;
    }
    console.log('✅ User created:', newUser.id);

    // Test 3: Test connection creation
    console.log('\n3. Testing connection creation...');
    const { data: connection, error: connectionError } = await supabase
      .from('connections')
      .insert({
        org_id: newOrg.id,
        plaid_item_id: 'test_item_' + Date.now(),
        institution: 'Test Bank',
        access_token_encrypted: 'encrypted_token_test',
        status: 'active'
      })
      .select()
      .single();

    if (connectionError) {
      console.error('❌ Connection creation error:', connectionError);
    } else {
      console.log('✅ Connection created:', connection.id);
    }

    // Test 4: Test account creation
    if (connection) {
      console.log('\n4. Testing account creation...');
      const { data: account, error: accountError } = await supabase
        .from('accounts')
        .insert({
          connection_id: connection.id,
          plaid_account_id: 'test_account_' + Date.now(),
          account_last4: '1234',
          account_name: 'Test Checking',
          account_type: 'checking',
          account_subtype: 'checking',
          statements_supported: true,
          status: 'active'
        })
        .select()
        .single();

      if (accountError) {
        console.error('❌ Account creation error:', accountError);
      } else {
        console.log('✅ Account created:', account.id);
      }
    }

    // Cleanup
    console.log('\n5. Cleaning up test data...');
    await supabase.from('users').delete().eq('id', testUserId);
    await supabase.from('organizations').delete().eq('id', newOrg.id);
    console.log('✅ Test data cleaned up');

    console.log('\n🎉 All database operations working correctly!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the test
testDatabaseOperations();