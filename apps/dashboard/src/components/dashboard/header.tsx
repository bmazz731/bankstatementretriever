"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useTheme } from 'next-themes'
import { useAuthStore } from '@/stores/auth'
import { createSupabaseClient } from '@/lib/supabase'
import { useDashboardStore } from '@/stores/dashboard'
import { ClientOnly } from '@/components/client-only'

export function DashboardHeader() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useAuthStore()
  const { isRefreshing, updateLastRefresh } = useDashboardStore()
  const supabase = createSupabaseClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = () => {
    if (updateLastRefresh) updateLastRefresh()
    window.location.reload()
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const toggleTheme = () => {
    if (mounted && setTheme) {
      const newTheme = theme === 'dark' ? 'light' : 'dark'
      setTheme(newTheme)
    }
  }

  // Safe defaults for all potentially undefined values
  const displayName = user?.full_name || user?.email || 'User'
  const refreshing = isRefreshing || false

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-gray-600 hover:text-gray-900"
          >
            <Icons.activity className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>

          <ClientOnly fallback={
            <Button variant="ghost" size="icon" disabled className="text-gray-600">
              <Icons.sun className="h-4 w-4" />
            </Button>
          }>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900"
            >
              <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </ClientOnly>

          <ClientOnly fallback={
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Welcome</span>
            </div>
          }>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Welcome,</span>
              <span className="font-medium text-gray-900">{displayName}</span>
            </div>
          </ClientOnly>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="text-gray-600 hover:text-gray-900"
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}