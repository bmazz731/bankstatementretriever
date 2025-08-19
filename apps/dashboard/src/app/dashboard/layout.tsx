"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'
import { DashboardNav } from '@/components/dashboard/nav'
import { DashboardHeader } from '@/components/dashboard/header'
import { ClientOnly } from '@/components/client-only'

// Loading component to prevent hydration issues
function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading dashboard...</p>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientOnly fallback={<LoadingScreen />}>
      <DashboardContent>{children}</DashboardContent>
    </ClientOnly>
  )
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized, hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (hasHydrated && isInitialized && !isLoading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [hasHydrated, isInitialized, isAuthenticated, isLoading, router])

  // Show loading until hydration and auth check completes
  if (!hasHydrated || !isInitialized || isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-screen bg-background">
      <ClientOnly fallback={<div className="w-64 border-r bg-card" />}>
        <DashboardNav />
      </ClientOnly>
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientOnly fallback={<div className="h-14 border-b bg-card" />}>
          <DashboardHeader />
        </ClientOnly>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}