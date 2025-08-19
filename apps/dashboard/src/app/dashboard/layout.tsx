"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'
import { ErrorBoundary } from '@/components/error-boundary'

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

// Minimal dashboard layout to test React Error #130
function MinimalDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ 
        borderBottom: '1px solid #ccc', 
        paddingBottom: '10px', 
        marginBottom: '20px' 
      }}>
        <h1>BSR Dashboard</h1>
        <button 
          onClick={() => window.location.href = '/auth/signin'}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </header>
      <main>
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

  // Use minimal dashboard to avoid any complex component issues
  return (
    <ErrorBoundary>
      <MinimalDashboard>{children}</MinimalDashboard>
    </ErrorBoundary>
  )
}