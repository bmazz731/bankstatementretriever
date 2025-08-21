import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
  hasHydrated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  setInitialized: (initialized: boolean) => void
  setHasHydrated: (hydrated: boolean) => void
}

export const useAuthStore = create<AuthState>()(persist(
  (set, get) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isInitialized: false,
    hasHydrated: false,
    
    setUser: (user) => set({ 
      user, 
      isAuthenticated: !!user,
      isLoading: false 
    }),
    
    setLoading: (isLoading) => set({ isLoading }),
    
    logout: () => set({ 
      user: null, 
      isAuthenticated: false,
      isLoading: false 
    }),

    setInitialized: (isInitialized) => set({ isInitialized }),
    
    setHasHydrated: (hasHydrated) => set({ hasHydrated }),
  }),
  {
    name: 'auth-store',
    storage: createJSONStorage(() => {
      // Only access localStorage on client side
      if (typeof window !== 'undefined') {
        return localStorage
      }
      // Return a mock storage for server-side
      return {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
      }
    }),
    partialize: (state) => ({ 
      user: state.user,
      isAuthenticated: state.isAuthenticated 
    }),
    onRehydrateStorage: () => (state) => {
      if (state) {
        state.setHasHydrated(true)
        state.setInitialized(false)
        state.setLoading(true)
      }
    },
    skipHydration: typeof window === 'undefined', // Skip hydration on server
  }
))