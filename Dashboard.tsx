
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import { getInventorySummary } from '../db/queries'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInventorySummary()
      setSummary(data)
    }
    fetchData()
  }, [])

  const chartData = {
    labels: summary?.categories || [],
    datasets: [
      {
        label: 'Stock Levels',
        data: summary?.quantities || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Products</h3>
        <p className="text-3xl font-bold text-blue-600">{summary?.totalProducts || 0}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
        <p className="text-3xl font-bold text-red-600">{summary?.lowStockItems || 0}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Inventory Value</h3>
        <p className="text-3xl font-bold text-green-600">${summary?.totalValue?.toFixed(2) || 0}</p>
      </div>
      
      <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Inventory by Category</h3>
        <div className="h-64">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  )
}
  