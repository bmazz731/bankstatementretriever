-- Simple fix to allow NULL owner_user_id temporarily
-- This allows us to break the circular dependency without complex transactions

-- Step 1: Allow NULL owner_user_id in organizations table
ALTER TABLE organizations ALTER COLUMN owner_user_id DROP NOT NULL;

-- Step 2: Add comment explaining the approach
COMMENT ON COLUMN organizations.owner_user_id IS 
'User ID of the organization owner. Can be temporarily NULL during user/organization creation 
to handle circular dependency. Will be updated after user creation.';

-- This is a simple, one-time schema change that allows the code to:
-- 1. Create organization with NULL owner_user_id
-- 2. Create user with reference to the organization
-- 3. Update organization with the correct owner_user_id