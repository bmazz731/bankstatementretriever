"use client"

import { ErrorBoundary } from '@/components/error-boundary'

// Completely static dashboard page for testing React Error #130
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <div style={{ padding: '20px' }}>
        <h1>Dashboard Page</h1>
        <p>This is a completely static dashboard page to test React Error #130.</p>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Account Summary</h2>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            <p><strong>Total Accounts:</strong> 3</p>
            <p><strong>Connected:</strong> 2</p>
            <p><strong>Status:</strong> Operational</p>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h2>Recent Activity</h2>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '15px', 
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            <p>✅ Bank of America - Statement retrieved (2 hours ago)</p>
            <p>✅ Chase Bank - Statement retrieved (4 hours ago)</p>
            <p>⏳ Wells Fargo - Sync in progress</p>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h2>Quick Actions</h2>
          <div style={{ marginTop: '10px' }}>
            <button style={{
              padding: '10px 15px',
              marginRight: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Sync All Accounts
            </button>
            <button style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Add New Account
            </button>
          </div>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '10px', 
          backgroundColor: '#e8f5e8',
          border: '1px solid #4caf50',
          borderRadius: '4px'
        }}>
          <p><strong>Success:</strong> If you can see this dashboard without React Error #130, 
          the issue was in the complex components. We can now gradually add back functionality.</p>
        </div>
      </div>
    </ErrorBoundary>
  )
}