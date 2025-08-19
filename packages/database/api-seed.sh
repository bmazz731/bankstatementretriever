#!/bin/bash

# API-based seeding for Supabase using REST API
set -e

API_URL="https://yoodxepoxrxzfstfgwst.supabase.co/rest/v1"
API_KEY="sb_secret_kZpVzBHIEAO5oMvldGjDcA_xtNCzSyB"

echo "🌱 Seeding database via REST API..."

# Note: Due to circular dependency between organizations and users,
# we need to create them in a specific way or disable constraints temporarily

echo "📝 Creating seed data guide..."
echo ""
echo "To create seed data, run these commands in Supabase SQL Editor:"
echo ""

cat << 'EOF'
-- Temporarily disable foreign key checks
SET session_replication_role = replica;

-- Create test user
INSERT INTO users (id, org_id, email, password_hash, mfa_enabled) VALUES 
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'test@bankstatementretriever.com', '$2b$10$example_hash_for_testing', false);

-- Create test organization
INSERT INTO organizations (id, owner_user_id, plan, status) VALUES 
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'professional', 'active');

-- Re-enable foreign key checks
SET session_replication_role = DEFAULT;

-- Create test connection
INSERT INTO connections (id, org_id, plaid_item_id, institution, status) VALUES 
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'item_test_sandbox_12345', 'First Platypus Bank', 'active');

-- Create test accounts
INSERT INTO accounts (id, connection_id, plaid_account_id, account_last4, account_name, type, statements_supported, status) VALUES 
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'account_test_checking_12345', '1234', 'Plaid Checking', 'checking', true, 'active'),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'account_test_credit_12345', '5678', 'Plaid Credit Card', 'credit_card', true, 'active');

-- Create test destinations
INSERT INTO destinations (id, org_id, kind, name, config_json, secret_ref, active) VALUES 
  ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'google_drive', 'My Google Drive', '{"folderId": "test_folder_id", "folderName": "Bank Statements"}', 'oauth_token_ref_1', true),
  ('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001', 'webhook', 'Test Webhook', '{"url": "https://webhook.site/test-endpoint"}', 'webhook_secret_ref_1', true);

-- Create routing rules
INSERT INTO routing_rules (account_id, destination_id, folder_path, filename_pattern, active) VALUES 
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', 'Bank Statements/{institution}', '{institution}_{accountLast4}_{periodEnd}_statement.{fileType}', true),
  ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000006', '', '{institution}_credit_{periodEnd}.{fileType}', true);

-- Create sample statements
INSERT INTO statements (account_id, period_start, period_end, statement_date, file_type, checksum, version) VALUES 
  ('00000000-0000-0000-0000-000000000003', '2024-01-01', '2024-01-31', '2024-02-01', 'pdf', 'sha256:abc123...', 1),
  ('00000000-0000-0000-0000-000000000004', '2024-01-01', '2024-01-31', '2024-02-03', 'csv', 'sha256:def456...', 1);

-- Create sample deliveries
INSERT INTO deliveries (statement_id, destination_id, status, path, delivered_at, request_id, attempts) VALUES 
  ((SELECT id FROM statements WHERE account_id = '00000000-0000-0000-0000-000000000003' LIMIT 1), '00000000-0000-0000-0000-000000000005', 'succeeded', 'Bank Statements/First Platypus Bank/First_Platypus_Bank_1234_2024-01-31_statement.pdf', '2024-02-01T10:30:00Z', 'req_00000000-0000-0000-0000-000000000001', 1),
  ((SELECT id FROM statements WHERE account_id = '00000000-0000-0000-0000-000000000004' LIMIT 1), '00000000-0000-0000-0000-000000000006', 'pending', NULL, NULL, 'req_00000000-0000-0000-0000-000000000002', 0);

-- Create notification preferences
INSERT INTO notification_preferences (account_id, channel, event_type, enabled) VALUES 
  ('00000000-0000-0000-0000-000000000003', 'email', 'statement_delivered', true),
  ('00000000-0000-0000-0000-000000000003', 'email', 'delivery_failed', true);

-- Create audit log entries
INSERT INTO audit_logs (org_id, user_id, action, target_id, meta_json) VALUES 
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'connection_added', '00000000-0000-0000-0000-000000000002', '{"institution": "First Platypus Bank", "accounts_count": 2}'),
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'delivery_succeeded', (SELECT id FROM statements WHERE account_id = '00000000-0000-0000-0000-000000000003' LIMIT 1), '{"destination": "Google Drive", "file_type": "pdf"}');
EOF

echo ""
echo "✅ Seed data SQL generated above"
echo "📋 Copy and paste the SQL above into Supabase SQL Editor to create test data"
echo ""
echo "🔍 After seeding, verify with:"
echo "   curl -H 'apikey: $API_KEY' '$API_URL/organizations?select=*'"
echo ""