"use client"

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import { AccountActions } from '@/components/accounts/account-actions'
import { AccountStatementsDialog } from '@/components/accounts/account-statements-dialog'
import { BackfillDialog } from '@/components/accounts/backfill-dialog'
import { PlaidLinkButton } from '@/components/plaid/plaid-link-button'
import { getStatusColor, formatRelativeTime, truncateText } from '@/lib/utils'
import apiClient from '@/lib/api'
import type { Account } from '@/types'

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [showStatements, setShowStatements] = useState(false)
  const [showBackfill, setShowBackfill] = useState(false)

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => apiClient.getAccounts(),
  })

  const accountData = accounts?.data?.accounts || []

  const filteredAccounts = accountData.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.connection?.institution_name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleViewStatements = (account: Account) => {
    setSelectedAccount(account)
    setShowStatements(true)
  }

  const handleBackfill = (account: Account) => {
    setSelectedAccount(account)
    setShowBackfill(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage your connected bank accounts and statement delivery
          </p>
        </div>
        <PlaidLinkButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            View and manage your bank account connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAccounts.length === 0 ? (
              <div className="text-center py-8">
                <Icons.building className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  {searchTerm || statusFilter !== 'all' ? 'No matching accounts' : 'No bank accounts connected'}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Connect your first bank account to get started'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAccounts.map((account) => {
                  const statusColor = getStatusColor(account.status)
                  const connectionStatus = account.connection?.status || 'unknown'
                  const lastSync = account.last_statement_check || account.connection?.last_sync

                  return (
                    <div key={account.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{account.name}</h3>
                            <Badge
                              variant={
                                statusColor === 'green' ? 'success' :
                                statusColor === 'yellow' ? 'warning' :
                                statusColor === 'red' ? 'error' : 'secondary'
                              }
                            >
                              {account.status}
                            </Badge>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-muted-foreground">
                              <strong>Institution:</strong> {account.connection?.institution_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Account:</strong> {account.type}
                              {account.subtype && ` (${account.subtype})`}
                              {account.mask && ` •••• ${account.mask}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Connection:</strong>
                              <span className={`ml-1 inline-flex items-center space-x-1 ${
                                connectionStatus === 'active' ? 'text-green-600' :
                                connectionStatus === 'reauth_required' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  connectionStatus === 'active' ? 'bg-green-500' :
                                  connectionStatus === 'reauth_required' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} />
                                <span className="capitalize">{connectionStatus}</span>
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <strong>Statements:</strong> {account.statements_supported ? 'Supported' : 'Not supported'}
                            </p>
                            {lastSync && (
                              <p className="text-sm text-muted-foreground">
                                <strong>Last sync:</strong> {formatRelativeTime(lastSync)}
                              </p>
                            )}
                          </div>

                          {account.connection?.error_message && (
                            <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                              <p className="text-sm text-red-800 dark:text-red-200">
                                <Icons.warning className="inline mr-1 h-4 w-4" />
                                {truncateText(account.connection.error_message, 100)}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <AccountActions
                          account={account}
                          onViewStatements={() => handleViewStatements(account)}
                          onBackfill={() => handleBackfill(account)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedAccount && (
        <>
          <AccountStatementsDialog
            account={selectedAccount}
            open={showStatements}
            onOpenChange={setShowStatements}
          />
          <BackfillDialog
            account={selectedAccount}
            open={showBackfill}
            onOpenChange={setShowBackfill}
          />
        </>
      )}
    </div>
  )
}