"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, setInitialized } = useAuthStore()
  const router = useRouter()
  const supabase = createSupabaseClient()

  useEffect(() => {
    // Get initial session immediately on client
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          })
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
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          })
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
  }, [setUser, setLoading, setInitialized, router, supabase.auth])

  return <>{children}</>
}