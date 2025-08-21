import { create } from 'zustand'
import type { Account, Connection, HealthCheck } from '@/types'

interface DashboardState {
  // Real-time data
  accounts: Account[]
  connections: Connection[]
  healthStatus: HealthCheck | null
  lastUpdate: string | null
  
  // UI state
  selectedAccountId: string | null
  isRefreshing: boolean
  
  // Actions
  setAccounts: (accounts: Account[]) => void
  setConnections: (connections: Connection[]) => void
  setHealthStatus: (health: HealthCheck) => void
  setSelectedAccount: (accountId: string | null) => void
  setRefreshing: (refreshing: boolean) => void
  updateLastRefresh: () => void
  
  // Optimistic updates
  optimisticUpdateAccount: (accountId: string, updates: Partial<Account>) => void
  optimisticAddAccount: (account: Account) => void
  optimisticRemoveAccount: (accountId: string) => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  accounts: [],
  connections: [],
  healthStatus: null,
  lastUpdate: null,
  selectedAccountId: null,
  isRefreshing: false,
  
  // Actions
  setAccounts: (accounts) => set({ accounts }),
  
  setConnections: (connections) => set({ connections }),
  
  setHealthStatus: (healthStatus) => set({ healthStatus }),
  
  setSelectedAccount: (selectedAccountId) => set({ selectedAccountId }),
  
  setRefreshing: (isRefreshing) => set({ isRefreshing }),
  
  updateLastRefresh: () => set({ lastUpdate: new Date().toISOString() }),
  
  // Optimistic updates
  optimisticUpdateAccount: (accountId, updates) => {
    const { accounts } = get()
    const updatedAccounts = accounts.map(account =>
      account.id === accountId ? { ...account, ...updates } : account
    )
    set({ accounts: updatedAccounts })
  },
  
  optimisticAddAccount: (account) => {
    const { accounts } = get()
    set({ accounts: [...accounts, account] })
  },
  
  optimisticRemoveAccount: (accountId) => {
    const { accounts } = get()
    const filteredAccounts = accounts.filter(account => account.id !== accountId)
    set({ accounts: filteredAccounts })
  },
}))

// Notification store for toasts and alerts
interface NotificationState {
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    title: string
    description?: string
    timestamp: string
  }>
  addNotification: (notification: Omit<NotificationState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

let notificationIdCounter = 0

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    notificationIdCounter += 1
    const id = `notification-${notificationIdCounter}`
    const timestamp = new Date().toISOString()
    const newNotification = { ...notification, id, timestamp }
    
    set(state => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // Auto-remove after 5 seconds - only on client side
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
      }, 5000)
    }
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
  
  clearNotifications: () => set({ notifications: [] }),
}))