import { create } from 'zustand'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  setInitialized: (initialized: boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isInitialized: false,
  
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
}))