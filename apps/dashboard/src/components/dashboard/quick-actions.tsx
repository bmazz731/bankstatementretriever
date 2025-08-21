"use client"

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { PlaidLinkButton } from '@/components/plaid/plaid-link-button'
import { HydrationSafe } from '@/components/hydration-safe'

export function QuickActions() {
  return (
    <HydrationSafe 
      className="space-y-3"
      fallback={
        <div className="space-y-3">
          <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-10 bg-gray-100 rounded animate-pulse" />
        </div>
      }
    >
      <PlaidLinkButton />
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.upload className="mr-2 h-4 w-4" />
        Add Destination
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.calendar className="mr-2 h-4 w-4" />
        Backfill Statements
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.settings className="mr-2 h-4 w-4" />
        Notification Settings
      </Button>
      
      <Button variant="outline" className="w-full justify-start">
        <Icons.download className="mr-2 h-4 w-4" />
        Download Activity Report
      </Button>
    </HydrationSafe>
  )
}