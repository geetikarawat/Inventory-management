
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

async function getDb() {
  return await open({
    filename: './inventory.db',
    driver: sqlite3.Database
  })
}

export async function getAllProducts() {
  const db = await getDb()
  return await db.all('SELECT * FROM products ORDER BY name')
}

export async function getLowStockProducts() {
  const db = await getDb()
  return await db.all('SELECT * FROM products WHERE quantity <= min_stock_level ORDER BY quantity')
}

export async function getInventorySummary() {
  const db = await getDb()
  
  const totalProducts = await db.get('SELECT COUNT(*) as count FROM products')
  const lowStockItems = await db.get('SELECT COUNT(*) as count FROM products WHERE quantity <= min_stock_level')
  const totalValue = await db.get('SELECT SUM(quantity * price) as sum FROM products')
  const categories = await db.all('SELECT category, SUM(quantity) as total FROM products GROUP BY category')
  
  return {
    totalProducts: totalProducts.count,
    lowStockItems: lowStockItems.count,
    totalValue: totalValue.sum || 0,
    categories: categories.map(c => c.category),
    quantities: categories.map(c => c.total)
  }
}

export async function getInventoryHistory() {
  const db = await getDb()
  return await db.all(`
    SELECT h.*, p.name as product_name 
    FROM inventory_history h
    JOIN products p ON h.product_id = p.id
    ORDER BY h.timestamp DESC
    LIMIT 30
  `)
}
  