import { createBrowserClient } from '@supabase/ssr'

export const createSupabaseClient = () => {
  // For build time, use placeholder values
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}