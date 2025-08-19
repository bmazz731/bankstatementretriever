"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'
import { createSupabaseClient } from '@/lib/supabase'
import { ErrorBoundary } from '@/components/error-boundary'
import { ClientOnly } from '@/components/client-only'

// Simple loading screen with no dynamic content
function LoadingScreen() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          border: '2px solid #ccc',
          borderTop: '2px solid #000',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
        <p style={{ marginTop: '10px', color: '#666' }}>Loading dashboard...</p>
      </div>
    </div>
  )
}

// Production dashboard layout - safe from hydration issues
function ProductionDashboard({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  
  const handleSignOut = async () => {
    try {
      const supabase = createSupabaseClient()
      await supabase.auth.signOut()
      window.location.href = '/auth/signin'
    } catch (error) {
      console.error('Sign out error:', error)
      window.location.href = '/auth/signin'
    }
  }

  // Safe user display with fallback
  const displayName = user?.full_name || user?.email || 'User'

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <header style={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ 
            margin: '0', 
            fontSize: '20px', 
            fontWeight: '600',
            color: '#111827'
          }}>
            BankStatementRetriever
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ClientOnly fallback={
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Welcome</span>
          }>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>
              Welcome, <span style={{ fontWeight: '500', color: '#111827' }}>{displayName}</span>
            </span>
          </ClientOnly>
          
          <button 
            onClick={handleSignOut}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Sign Out
          </button>
        </div>
      </header>
      
      <main style={{ padding: '0' }}>
        {children}
      </main>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)
  const { isAuthenticated, isLoading, isInitialized, hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything until mounted on client
  if (!isMounted) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <DashboardContent>{children}</DashboardContent>
    </ErrorBoundary>
  )
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isInitialized, hasHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    const timer = setTimeout(() => {
      if (hasHydrated && isInitialized && !isLoading && !isAuthenticated) {
        router.push('/auth/signin')
      }
    }, 1000) // Give time for auth to initialize

    return () => clearTimeout(timer)
  }, [hasHydrated, isInitialized, isAuthenticated, isLoading, router])

  // Show loading until hydration completes
  if (!hasHydrated || !isInitialized || isLoading) {
    return <LoadingScreen />
  }

  // Show loading if not authenticated (while redirecting)
  if (!isAuthenticated) {
    return <LoadingScreen />
  }

  // Use production dashboard with safe hydration
  return (
    <ErrorBoundary>
      <ProductionDashboard>{children}</ProductionDashboard>
    </ErrorBoundary>
  )
}