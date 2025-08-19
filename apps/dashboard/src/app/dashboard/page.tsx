"use client"

import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { ClientOnly } from '@/components/client-only'

// Safe dashboard stats component
function DashboardStats() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '20px',
      marginBottom: '30px'
    }}>
      {[
        { title: 'Total Accounts', value: '3', desc: '2 active' },
        { title: 'Connected', value: '2', desc: 'Healthy connections' },
        { title: 'Need Attention', value: '0', desc: 'All systems operational' },
        { title: 'Destinations', value: '1', desc: 'Storage configured' }
      ].map((stat) => (
        <div key={stat.title} style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: 'white'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6b7280' }}>
            {stat.title}
          </h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}>
            {stat.value}
          </div>
          <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>
            {stat.desc}
          </p>
        </div>
      ))}
    </div>
  )
}

// Safe recent activity component
function RecentActivity() {
  const activities = [
    { icon: '✅', bank: 'Bank of America', action: 'Statement retrieved', time: '2 hours ago' },
    { icon: '✅', bank: 'Chase Bank', action: 'Statement retrieved', time: '4 hours ago' },
    { icon: '⏳', bank: 'Wells Fargo', action: 'Sync in progress', time: 'Now' },
  ]

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Recent Activity</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activities.map((activity, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            backgroundColor: '#f9fafb',
            borderRadius: '6px'
          }}>
            <span style={{ marginRight: '12px', fontSize: '16px' }}>
              {activity.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                {activity.bank}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                {activity.action}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Safe quick actions component
function QuickActions() {
  const actions = [
    { label: 'Sync All Accounts', color: '#10b981', onClick: () => alert('Sync initiated') },
    { label: 'Add New Account', color: '#3b82f6', onClick: () => alert('Add account') },
    { label: 'View Settings', color: '#6b7280', onClick: () => window.location.href = '/dashboard/settings' },
  ]

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Quick Actions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            style={{
              padding: '12px 16px',
              backgroundColor: action.color,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: 'bold' }}>
            Dashboard
          </h1>
          <p style={{ margin: '0', color: '#6b7280' }}>
            Monitor your bank statement connections and delivery status.
          </p>
        </div>

        <ClientOnly fallback={
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            Loading dashboard...
          </div>
        }>
          <DashboardStats />
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '20px' 
          }}>
            <RecentActivity />
            <QuickActions />
          </div>
        </ClientOnly>
      </div>
    </ErrorBoundary>
  )
}