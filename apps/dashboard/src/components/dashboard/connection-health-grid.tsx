"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { getStatusColor, formatRelativeTime } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationStore } from '@/stores/dashboard'
import apiClient from '@/lib/api'
import type { Account } from '@/types'

interface ConnectionHealthGridProps {
  accounts: Account[]
  isLoading: boolean
}

export function ConnectionHealthGrid({ accounts, isLoading }: ConnectionHealthGridProps) {
  const queryClient = useQueryClient()
  const { addNotification } = useNotificationStore()

  const syncMutation = useMutation({
    mutationFn: (accountId: string) => apiClient.syncAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
      addNotification({
        type: 'success',
        title: 'Sync started',
        description: 'Account sync has been queued successfully',
      })
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        title: 'Sync failed',
        description: error.message || 'Failed to start account sync',
      })
    },
  })

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center py-8">
        <Icons.building className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No bank connections</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Connect your first bank account to get started
        </p>
        <Button className="mt-4">
          <Icons.plus className="mr-2 h-4 w-4" />
          Connect Bank Account
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => {
        const statusColor = getStatusColor(account.status)
        const connectionStatus = account.connection?.status || 'unknown'
        const lastSync = account.last_statement_check || account.connection?.last_sync

        return (
          <Card key={account.id} className="relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{account.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {account.connection?.institution_name}
                  </p>
                  {account.mask && (
                    <p className="text-xs text-muted-foreground">
                      •••• {account.mask}
                    </p>
                  )}
                </div>
                <Badge
                  variant={
                    statusColor === 'green' ? 'success' :
                    statusColor === 'yellow' ? 'warning' :
                    statusColor === 'red' ? 'error' : 'secondary'
                  }
                  className="ml-2"
                >
                  {account.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Connection:</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'active' ? 'bg-green-500' :
                      connectionStatus === 'reauth_required' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                    <span className="capitalize">{connectionStatus}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Statements:</span>
                  <span>{account.statements_supported ? 'Supported' : 'Not supported'}</span>
                </div>

                {lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last sync:</span>
                    <span>{formatRelativeTime(lastSync)}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => syncMutation.mutate(account.id)}
                  disabled={syncMutation.isPending}
                >
                  {syncMutation.isPending ? (
                    <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />
                  ) : (
                    <Icons.activity className="mr-2 h-3 w-3" />
                  )}
                  Sync
                </Button>
                <Button size="sm" variant="ghost">
                  <Icons.eye className="h-3 w-3" />
                </Button>
              </div>

              {connectionStatus === 'reauth_required' && (
                <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    <Icons.warning className="inline mr-1 h-3 w-3" />
                    Reconnection required
                  </p>
                </div>
              )}

              {account.connection?.error_message && (
                <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-xs text-red-800 dark:text-red-200">
                    <Icons.warning className="inline mr-1 h-3 w-3" />
                    {account.connection.error_message}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}