"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, setInitialized, hasHydrated } = useAuthStore()
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Wait for hydration before initializing auth
    if (!hasHydrated) return

    // Get initial session immediately on client
    const getInitialSession = async () => {
      try {
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setUser(null)
          return
        }

        if (session?.user) {
          const userData = {
            id: session.user.id || '',
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            created_at: session.user.created_at || new Date().toISOString(),
            updated_at: session.user.updated_at || session.user.created_at || new Date().toISOString(),
          }
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setUser(null)
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = {
            id: session.user.id || '',
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            created_at: session.user.created_at || new Date().toISOString(),
            updated_at: session.user.updated_at || session.user.created_at || new Date().toISOString(),
          }
          setUser(userData)
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          router.push('/auth/signin')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setLoading, setInitialized, router, supabase.auth, hasHydrated])

  return <>{children}</>
}