/**
 * User and Organization Setup Utilities
 * Handles the creation and management of users and organizations
 */

import { createSupabaseClient } from './auth'
import type { Env } from '../types/env'

export interface UserOrgSetupResult {
  success: boolean
  user?: any
  organization?: any
  error?: string
  debugInfo?: any
}

/**
 * Ensure user exists in database with proper organization setup
 * This function handles the circular dependency between users and organizations
 */
export async function ensureUserAndOrganization(
  env: Env,
  authUser: any
): Promise<UserOrgSetupResult> {
  const supabase = createSupabaseClient(env)
  
  try {
    console.log('Ensuring user and organization setup for:', authUser.email)
    
    // First, check if user already exists
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('id, org_id, email')
      .eq('id', authUser.id)
      .single()
    
    if (existingUser && !userCheckError) {
      console.log('User already exists, returning existing data')
      return {
        success: true,
        user: {
          ...authUser,
          org_id: existingUser.org_id
        }
      }
    }
    
    // User doesn't exist, need to create user and organization
    console.log('Creating new user and organization')
    
    // Start a transaction-like operation by creating organization first
    const { data: newOrg, error: orgError } = await supabase
      .from('organizations')
      .insert({
        owner_user_id: authUser.id,
        plan: 'free',
        status: 'active'
      })
      .select()
      .single()
    
    if (orgError) {
      console.error('Failed to create organization:', orgError)
      return {
        success: false,
        error: 'Failed to create organization',
        debugInfo: {
          orgError,
          userId: authUser.id
        }
      }
    }
    
    // Now create the user record
    const { data: newUser, error: newUserError } = await supabase
      .from('users')
      .insert({
        id: authUser.id,
        org_id: newOrg.id,
        email: authUser.email || authUser.user_metadata?.email
      })
      .select()
      .single()
    
    if (newUserError) {
      console.error('Failed to create user:', newUserError)
      // Cleanup: remove the organization we just created
      await supabase.from('organizations').delete().eq('id', newOrg.id)
      return {
        success: false,
        error: 'Failed to create user account',
        debugInfo: {
          newUserError,
          orgId: newOrg.id,
          userId: authUser.id
        }
      }
    }
    
    console.log('Successfully created user and organization:', {
      userId: newUser.id,
      orgId: newOrg.id
    })
    
    return {
      success: true,
      user: {
        ...authUser,
        org_id: newOrg.id
      },
      organization: newOrg
    }
    
  } catch (error) {
    console.error('Unexpected error in user setup:', error)
    return {
      success: false,
      error: 'Unexpected error during user setup',
      debugInfo: { error: error.message }
    }
  }
}

/**
 * Validate that a user's organization exists and is accessible
 */
export async function validateUserOrganization(
  env: Env,
  userId: string,
  orgId: string
): Promise<{ valid: boolean; error?: string }> {
  const supabase = createSupabaseClient(env)
  
  try {
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('id, status')
      .eq('id', orgId)
      .single()
    
    if (orgError || !org) {
      return {
        valid: false,
        error: 'Organization not found'
      }
    }
    
    if (org.status !== 'active') {
      return {
        valid: false,
        error: 'Organization is not active'
      }
    }
    
    // Check if user is a member of this organization
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .eq('org_id', orgId)
      .single()
    
    if (userError || !user) {
      return {
        valid: false,
        error: 'User is not a member of this organization'
      }
    }
    
    return { valid: true }
    
  } catch (error) {
    return {
      valid: false,
      error: `Validation error: ${error.message}`
    }
  }
}