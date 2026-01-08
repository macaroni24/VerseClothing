import { apiGet } from './client'
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from './mockProducts'

// Toggle this:
// - true  => use local 40-product catalog (Kids Boys/Girls + Men/Women)
// - false => use Fake Store API
const USE_MOCK = true

function normalizeCategory(input) {
  return String(input || '').trim().toLowerCase()
}

export async function getCategories() {
  if (USE_MOCK) return MOCK_CATEGORIES
  return apiGet('/products/categories')
}

export async function getProducts() {
  if (USE_MOCK) return MOCK_PRODUCTS
  return apiGet('/products')
}

export async function getProductsByCategory(category) {
  if (USE_MOCK) {
    const c = normalizeCategory(category)
    if (!c || c === 'all') return MOCK_PRODUCTS
    return MOCK_PRODUCTS.filter(p => normalizeCategory(p.category) === c)
  }

  if (!category || category === 'all') return apiGet('/products')
  return apiGet(`/products/category/${encodeURIComponent(category)}`)
}

export async function getProductById(id) {
  if (!id) throw new Error('Product id is required')

  if (USE_MOCK) {
    const numId = Number(id)
    const found = MOCK_PRODUCTS.find(p => p.id === numId)
    if (!found) throw new Error('Product not found')
    return found
  }

  return apiGet(`/products/${id}`)
}
