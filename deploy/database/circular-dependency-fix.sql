-- Circular Dependency Fix for User/Organization Creation
-- This SQL function handles the circular foreign key dependency using deferred constraints

-- Function to create user and organization in a single transaction
CREATE OR REPLACE FUNCTION create_user_and_organization(
  p_user_id UUID,
  p_org_id UUID,
  p_user_email TEXT,
  p_org_plan TEXT DEFAULT 'free',
  p_org_status TEXT DEFAULT 'active'
)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  result JSON;
BEGIN
  -- Start transaction with deferred constraint checking
  -- The organizations.owner_user_id constraint is already DEFERRABLE INITIALLY DEFERRED
  
  -- Insert organization first (the deferred constraint allows this)
  INSERT INTO organizations (id, owner_user_id, plan, status, created_at, updated_at)
  VALUES (p_org_id, p_user_id, p_org_plan, p_org_status, NOW(), NOW());
  
  -- Insert user with reference to organization
  INSERT INTO users (id, org_id, email, created_at, updated_at)
  VALUES (p_user_id, p_org_id, p_user_email, NOW(), NOW());
  
  -- At this point, both records exist and the deferred constraint is satisfied
  -- The constraint will be checked at transaction commit
  
  result := json_build_object(
    'success', true,
    'user_id', p_user_id,
    'org_id', p_org_id,
    'message', 'User and organization created successfully'
  );
  
  RETURN result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Return error information
    result := json_build_object(
      'success', false,
      'error_code', SQLSTATE,
      'error_message', SQLERRM,
      'user_id', p_user_id,
      'org_id', p_org_id
    );
    
    RETURN result;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_user_and_organization TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_and_organization TO service_role;

-- Test the function to ensure it works
DO $$
DECLARE
  test_user_id UUID := gen_random_uuid();
  test_org_id UUID := gen_random_uuid();
  test_result JSON;
BEGIN
  -- Test the function
  SELECT create_user_and_organization(
    test_user_id,
    test_org_id,
    'test@example.com',
    'free',
    'active'
  ) INTO test_result;
  
  RAISE NOTICE 'Test result: %', test_result;
  
  -- Clean up test data
  DELETE FROM users WHERE id = test_user_id;
  DELETE FROM organizations WHERE id = test_org_id;
  
  IF (test_result->>'success')::boolean THEN
    RAISE NOTICE 'Function test PASSED - circular dependency resolved';
  ELSE
    RAISE EXCEPTION 'Function test FAILED: %', test_result->>'error_message';
  END IF;
END;
$$;

-- Alternative fallback approach: Allow NULL owner_user_id temporarily
-- Modify the organizations table to allow NULL owner_user_id for this workflow
ALTER TABLE organizations ALTER COLUMN owner_user_id DROP NOT NULL;

-- Add a comment explaining the circular dependency handling
COMMENT ON FUNCTION create_user_and_organization IS 
'Handles circular foreign key dependency between users and organizations using deferred constraints. 
The organizations.owner_user_id constraint is DEFERRABLE INITIALLY DEFERRED, allowing both records 
to be created in the same transaction before constraint validation.';

COMMENT ON COLUMN organizations.owner_user_id IS 
'User ID of the organization owner. Can be temporarily NULL during user/organization creation 
to handle circular dependency, but should be set before transaction commit.';