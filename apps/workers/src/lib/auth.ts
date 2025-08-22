/**
 * Simple authentication helper for Supabase
 */
import { createClient } from '@supabase/supabase-js'
import type { Env } from '../types/env'
import { ensureUserAndOrganization } from './user-setup'

export function createSupabaseClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

export async function authenticateSupabaseUser(c: any) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Authentication required', user: null }
  }

  const token = authHeader.replace('Bearer ', '')
  const supabase = createSupabaseClient(c.env)
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
      return { error: 'Invalid token', user: null }
    }
    
    // Ensure user and organization exist in our database
    const setupResult = await ensureUserAndOrganization(c.env, user)
    
    if (!setupResult.success) {
      console.error('User setup failed:', setupResult.error, setupResult.debugInfo)
      return { error: setupResult.error || 'Failed to initialize user account', user: null }
    }
    
    return { error: null, user: setupResult.user }
  } catch (error) {
    console.error('Supabase authentication error:', error)
    return { error: 'Authentication service unavailable', user: null }
  }
}