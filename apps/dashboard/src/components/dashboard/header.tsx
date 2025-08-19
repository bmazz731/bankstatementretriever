"use client"

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useTheme } from 'next-themes'
import { useAuthStore } from '@/stores/auth'
import { createSupabaseClient } from '@/lib/supabase'
import { useDashboardStore } from '@/stores/dashboard'
import { HydrationBoundary } from '@/components/hydration-boundary'

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuthStore()
  const { isRefreshing, updateLastRefresh } = useDashboardStore()
  const supabase = createSupabaseClient()

  const handleRefresh = () => {
    updateLastRefresh()
    // Trigger a refresh of dashboard data
    window.location.reload()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <Icons.activity className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Icons.sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <HydrationBoundary fallback={
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Welcome</span>
            </div>
          }>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Welcome,</span>
              <span className="font-medium">{user?.full_name || user?.email}</span>
            </div>
          </HydrationBoundary>

          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}