"use client"

import { useAuthStore } from '@/stores/auth'

interface HydrationBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationBoundary({ children, fallback }: HydrationBoundaryProps) {
  const hasHydrated = useAuthStore(state => state.hasHydrated)
  
  if (!hasHydrated) {
    return fallback || null
  }
  
  return <>{children}</>
}