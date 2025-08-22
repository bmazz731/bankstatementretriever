/**
 * Simple authentication helper for Supabase
 */
import { createClient } from '@supabase/supabase-js'
import type { Env } from '../types/env'

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
  
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return { error: 'Invalid token', user: null }
  }
  
  return { error: null, user }
}