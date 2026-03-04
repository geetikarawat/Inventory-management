
import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import InventoryTable from './components/InventoryTable'
import LowStockAlerts from './components/LowStockAlerts'
import Reports from './components/Reports'
import { createDatabase } from './db/database'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    createDatabase()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Inventory Management Dashboard</h1>
      </header>
      
      <nav className="bg-white shadow">
        <div className="flex space-x-4 p-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 rounded ${activeTab === 'alerts' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            Low Stock Alerts
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            Reports
          </button>
        </div>
      </nav>

      <main className="p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'inventory' && <InventoryTable />}
        {activeTab === 'alerts' && <LowStockAlerts />}
        {activeTab === 'reports' && <Reports />}
      </main>
    </div>
  )
}
  