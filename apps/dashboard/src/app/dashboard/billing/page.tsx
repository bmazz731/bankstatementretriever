"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import { formatCurrency } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: 0,
    accounts: 1,
    features: ['1 statement pull per month', 'Basic support', 'Email notifications'],
    current: true,
  },
  {
    name: 'Business',
    price: 19,
    accounts: 5,
    features: ['Daily checks', 'Priority support', 'All storage providers', 'Webhooks'],
    current: false,
  },
  {
    name: 'Professional',
    price: 49,
    accounts: 20,
    features: ['Everything in Business', 'Advanced scheduling', 'API access', 'Custom routing'],
    current: false,
  },
  {
    name: 'Agency',
    price: 99,
    accounts: 50,
    features: ['Everything in Professional', 'Multi-org management', 'White-label options'],
    current: false,
  },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the Free plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">Free Plan</span>
                <Badge>Current</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Accounts used:</span>
                  <span>0 / 1</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly statements:</span>
                  <span>0 / 1</span>
                </div>
                <div className="flex justify-between">
                  <span>Next billing date:</span>
                  <span>N/A</span>
                </div>
              </div>
              <Button className="w-full">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>
              Your statement delivery usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Statements delivered</span>
                  <span>0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accounts connected</span>
                  <span>0 / 1</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '0%'}}></div>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Monthly cost</span>
                  <span className="font-medium">{formatCurrency(0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that fits your needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-4 ${
                  plan.current ? 'border-primary bg-primary/5' : ''
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{plan.name}</h3>
                      {plan.current && <Badge variant="secondary">Current</Badge>}
                    </div>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Up to {plan.accounts} accounts
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Icons.check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.current ? 'secondary' : 'default'}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}