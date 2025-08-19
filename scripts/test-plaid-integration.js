#!/usr/bin/env node

/**
 * Test script for Plaid integration
 * Run with: node scripts/test-plaid-integration.js
 */

const https = require('https');
const crypto = require('crypto');

// Configuration
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787',
  plaidClientId: process.env.PLAID_CLIENT_ID,
  plaidSecret: process.env.PLAID_SECRET,
  plaidEnv: process.env.PLAID_ENV || 'sandbox',
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  encryptionKey: process.env.ENCRYPTION_KEY
};

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(colors.green, `✓ ${message}`);
}

function error(message) {
  log(colors.red, `✗ ${message}`);
}

function warning(message) {
  log(colors.yellow, `⚠ ${message}`);
}

function info(message) {
  log(colors.blue, `ℹ ${message}`);
}

// HTTP request helper
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const lib = urlObj.protocol === 'https:' ? https : require('http');
    const req = lib.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Test functions
async function testEnvironmentConfiguration() {
  info('Testing environment configuration...');
  
  const required = [
    'PLAID_CLIENT_ID',
    'PLAID_SECRET',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'ENCRYPTION_KEY'
  ];
  
  let allPresent = true;
  
  for (const env of required) {
    if (!process.env[env]) {
      error(`Missing environment variable: ${env}`);
      allPresent = false;
    } else {
      success(`Found ${env}`);
    }
  }
  
  if (!allPresent) {
    error('Environment configuration incomplete. Check your .env.local file.');
    return false;
  }
  
  // Test encryption key format
  try {
    const keyBuffer = Buffer.from(config.encryptionKey, 'base64');
    if (keyBuffer.length === 32) {
      success('Encryption key is properly formatted (32 bytes)');
    } else {
      warning(`Encryption key is ${keyBuffer.length} bytes, should be 32 bytes`);
    }
  } catch (e) {
    error('Encryption key is not valid base64');
    return false;
  }
  
  return true;
}

async function testPlaidDirectConnection() {
  info('Testing direct Plaid API connection...');
  
  try {
    const response = await makeRequest('https://sandbox.api.plaid.com/link/token/create', {
      method: 'POST',
      headers: {
        'PLAID-CLIENT-ID': config.plaidClientId,
        'PLAID-SECRET': config.plaidSecret
      },
      body: {
        client_name: 'BankStatementRetriever Test',
        country_codes: ['US'],
        language: 'en',
        user: { client_user_id: 'test_user' },
        products: ['statements', 'auth']
      }
    });
    
    if (response.status === 200 && response.data.link_token) {
      success('Plaid API connection successful');
      success(`Link token received: ${response.data.link_token.substring(0, 20)}...`);
      return true;
    } else {
      error(`Plaid API error: ${response.data.error_message || 'Unknown error'}`);
      return false;
    }
  } catch (e) {
    error(`Plaid API connection failed: ${e.message}`);
    return false;
  }
}

async function testSupabaseConnection() {
  info('Testing Supabase connection...');
  
  try {
    const response = await makeRequest(`${config.supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': config.supabaseServiceKey,
        'Authorization': `Bearer ${config.supabaseServiceKey}`
      }
    });
    
    if (response.status === 200) {
      success('Supabase API connection successful');
      return true;
    } else {
      error(`Supabase API error: Status ${response.status}`);
      return false;
    }
  } catch (e) {
    error(`Supabase connection failed: ${e.message}`);
    return false;
  }
}

async function testWorkerEndpoints() {
  info('Testing Worker API endpoints...');
  
  // Test health endpoint
  try {
    const healthResponse = await makeRequest(`${config.apiUrl}/health`);
    if (healthResponse.status === 200) {
      success('Health endpoint responding');
    } else {
      warning(`Health endpoint returned status ${healthResponse.status}`);
    }
  } catch (e) {
    error(`Health endpoint failed: ${e.message}`);
    return false;
  }
  
  // Test link token endpoint (should fail without auth)
  try {
    const linkResponse = await makeRequest(`${config.apiUrl}/api/plaid/link_token`, {
      method: 'POST'
    });
    
    if (linkResponse.status === 401) {
      success('Link token endpoint properly requires authentication');
    } else {
      warning(`Link token endpoint returned unexpected status: ${linkResponse.status}`);
    }
  } catch (e) {
    error(`Link token endpoint test failed: ${e.message}`);
    return false;
  }
  
  return true;
}

async function testDatabaseSchema() {
  info('Testing database schema...');
  
  const tables = [
    'organizations',
    'users',
    'connections',
    'accounts',
    'statements',
    'destinations',
    'routing_rules',
    'deliveries',
    'webhook_endpoints',
    'oauth_tokens',
    'audit_logs',
    'backfill_jobs',
    'notification_preferences'
  ];
  
  try {
    for (const table of tables) {
      const response = await makeRequest(
        `${config.supabaseUrl}/rest/v1/${table}?limit=1`,
        {
          headers: {
            'apikey': config.supabaseServiceKey,
            'Authorization': `Bearer ${config.supabaseServiceKey}`
          }
        }
      );
      
      if (response.status === 200) {
        success(`Table '${table}' exists and accessible`);
      } else {
        error(`Table '${table}' error: Status ${response.status}`);
        return false;
      }
    }
    
    return true;
  } catch (e) {
    error(`Database schema test failed: ${e.message}`);
    return false;
  }
}

async function testEncryption() {
  info('Testing encryption functionality...');
  
  try {
    const testData = 'access_token_test_12345';
    
    // Test encryption
    const key = await crypto.subtle.importKey(
      'raw',
      Buffer.from(config.encryptionKey, 'base64'),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedText = new TextEncoder().encode(testData);
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encodedText
    );
    
    // Test decryption
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encrypted
    );
    
    const decryptedText = new TextDecoder().decode(decrypted);
    
    if (decryptedText === testData) {
      success('Encryption/decryption working correctly');
      return true;
    } else {
      error('Encryption/decryption failed: data mismatch');
      return false;
    }
  } catch (e) {
    error(`Encryption test failed: ${e.message}`);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🏦 BankStatementRetriever Plaid Integration Test Suite');
  console.log('=' .repeat(60));
  
  const tests = [
    { name: 'Environment Configuration', fn: testEnvironmentConfiguration },
    { name: 'Plaid Direct Connection', fn: testPlaidDirectConnection },
    { name: 'Supabase Connection', fn: testSupabaseConnection },
    { name: 'Worker Endpoints', fn: testWorkerEndpoints },
    { name: 'Database Schema', fn: testDatabaseSchema },
    { name: 'Encryption', fn: testEncryption }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    console.log('');
    try {
      const result = await test.fn();
      if (result) {
        passed++;
        success(`${test.name} PASSED`);
      } else {
        failed++;
        error(`${test.name} FAILED`);
      }
    } catch (e) {
      failed++;
      error(`${test.name} FAILED: ${e.message}`);
    }
  }
  
  console.log('');
  console.log('=' .repeat(60));
  console.log(`Tests completed: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    success('🎉 All tests passed! Your Plaid integration is ready.');
    console.log('');
    info('Next steps:');
    console.log('1. Start the development servers (npm run dev)');
    console.log('2. Open http://localhost:3000 in your browser');
    console.log('3. Test the Plaid Link flow with sandbox credentials');
    console.log('   - Username: user_good');
    console.log('   - Password: pass_good');
    console.log('   - PIN: 1234 (if required)');
  } else {
    error('❌ Some tests failed. Please check the configuration and try again.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };