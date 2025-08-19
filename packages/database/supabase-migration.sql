-- BankStatementRetriever Database Schema
-- Manual migration for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID NOT NULL,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Users table  
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  oidc_provider TEXT,
  mfa_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Connections table
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  plaid_item_id TEXT UNIQUE NOT NULL,
  institution TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  last_reauth_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accounts table
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  connection_id UUID NOT NULL,
  plaid_account_id TEXT UNIQUE NOT NULL,
  account_last4 TEXT NOT NULL,
  account_name TEXT NOT NULL,
  type TEXT NOT NULL,
  statements_supported BOOLEAN DEFAULT FALSE,
  learned_schedule_json JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Statements table
CREATE TABLE statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  statement_date DATE NOT NULL,
  file_type TEXT NOT NULL,
  checksum TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  retrieved_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Destinations table
CREATE TABLE destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  config_json JSONB NOT NULL,
  secret_ref TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Routing Rules table
CREATE TABLE routing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL,
  destination_id UUID NOT NULL,
  folder_path TEXT DEFAULT '',
  filename_pattern TEXT DEFAULT '{institution}_{accountLast4}_{periodEnd}_statement.{fileType}',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deliveries table
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  statement_id UUID NOT NULL,
  destination_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  path TEXT,
  delivered_at TIMESTAMPTZ,
  attempts INTEGER DEFAULT 0,
  last_error TEXT,
  request_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook Endpoints table
CREATE TABLE webhook_endpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  url TEXT NOT NULL,
  secret_ref TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  last_success_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OAuth Tokens table
CREATE TABLE oauth_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID,
  user_id UUID,
  provider TEXT NOT NULL,
  scopes TEXT[] NOT NULL,
  expires_at TIMESTAMPTZ,
  enc_payload TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  user_id UUID,
  action TEXT NOT NULL,
  target_id TEXT,
  meta_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Backfill Jobs table
CREATE TABLE backfill_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL,
  account_id UUID NOT NULL,
  range_start DATE NOT NULL,
  range_end DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  progress JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification Preferences table
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id UUID NOT NULL,
  channel TEXT NOT NULL,
  event_type TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Foreign Key Constraints
ALTER TABLE organizations ADD CONSTRAINT organizations_owner_user_id_fkey 
  FOREIGN KEY (owner_user_id) REFERENCES users(id);

ALTER TABLE users ADD CONSTRAINT users_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE connections ADD CONSTRAINT connections_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE accounts ADD CONSTRAINT accounts_connection_id_fkey 
  FOREIGN KEY (connection_id) REFERENCES connections(id);

ALTER TABLE statements ADD CONSTRAINT statements_account_id_fkey 
  FOREIGN KEY (account_id) REFERENCES accounts(id);

ALTER TABLE destinations ADD CONSTRAINT destinations_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE routing_rules ADD CONSTRAINT routing_rules_account_id_fkey 
  FOREIGN KEY (account_id) REFERENCES accounts(id);

ALTER TABLE routing_rules ADD CONSTRAINT routing_rules_destination_id_fkey 
  FOREIGN KEY (destination_id) REFERENCES destinations(id);

ALTER TABLE deliveries ADD CONSTRAINT deliveries_statement_id_fkey 
  FOREIGN KEY (statement_id) REFERENCES statements(id);

ALTER TABLE deliveries ADD CONSTRAINT deliveries_destination_id_fkey 
  FOREIGN KEY (destination_id) REFERENCES destinations(id);

ALTER TABLE webhook_endpoints ADD CONSTRAINT webhook_endpoints_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE oauth_tokens ADD CONSTRAINT oauth_tokens_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE oauth_tokens ADD CONSTRAINT oauth_tokens_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE backfill_jobs ADD CONSTRAINT backfill_jobs_org_id_fkey 
  FOREIGN KEY (org_id) REFERENCES organizations(id);

ALTER TABLE backfill_jobs ADD CONSTRAINT backfill_jobs_account_id_fkey 
  FOREIGN KEY (account_id) REFERENCES accounts(id);

ALTER TABLE notification_preferences ADD CONSTRAINT notification_preferences_account_id_fkey 
  FOREIGN KEY (account_id) REFERENCES accounts(id);

-- Add Unique Constraints
ALTER TABLE statements ADD CONSTRAINT statements_unique_version 
  UNIQUE (account_id, period_end, file_type, version);

ALTER TABLE routing_rules ADD CONSTRAINT routing_rules_unique_account_destination 
  UNIQUE (account_id, destination_id);

ALTER TABLE notification_preferences ADD CONSTRAINT notification_preferences_unique 
  UNIQUE (account_id, channel, event_type);

-- Add Indexes for Performance
CREATE INDEX idx_audit_logs_org_created ON audit_logs(org_id, created_at);
CREATE INDEX idx_statements_account_date ON statements(account_id, statement_date DESC);
CREATE INDEX idx_deliveries_status ON deliveries(status) WHERE status IN ('pending', 'retrying');
CREATE INDEX idx_accounts_connection ON accounts(connection_id);
CREATE INDEX idx_connections_org ON connections(org_id);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON connections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routing_rules_updated_at BEFORE UPDATE ON routing_rules 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_endpoints_updated_at BEFORE UPDATE ON webhook_endpoints 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_oauth_tokens_updated_at BEFORE UPDATE ON oauth_tokens 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_backfill_jobs_updated_at BEFORE UPDATE ON backfill_jobs 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS) policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE routing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE backfill_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Add basic RLS policies (allow authenticated users to see their own org's data)
CREATE POLICY "Users can access their own organization data" ON organizations
  FOR ALL USING (auth.uid()::text IN (
    SELECT u.id::text FROM users u WHERE u.org_id = organizations.id
  ));

-- Note: Additional RLS policies should be added based on specific access patterns
-- This is a basic setup to get started

COMMIT;