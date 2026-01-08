import { useEffect, useMemo, useState } from 'react'
import ProductGrid from '../components/product/ProductGrid'
import ProductSkeleton from '../components/product/ProductSkeleton'
import { getCategories, getProducts, getProductsByCategory } from '../api/products.api'

function labelCategory(c) {
  const v = String(c || '').toLowerCase()
  if (v === 'women') return 'Women'
  if (v === 'men') return 'Men'
  if (v === 'kids-girls') return 'Kids – Girls'
  if (v === 'kids-boys') return 'Kids – Boys'
  // fallback for API-provided categories
  return String(c || '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

function isKidsCategory(c) {
  const v = String(c || '').toLowerCase()
  return v.startsWith('kids')
}

export default function Shop() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [group, setGroup] = useState('all') // all | adults | kids

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured') // featured | price-asc | price-desc | title-asc

  // Load categories once
  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await getCategories()
        if (!alive) return
        setCategories(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!alive) return
        setCategories([])
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  // Load products when category changes
  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')

    ;(async () => {
      try {
        const data =
          selectedCategory === 'all'
            ? await getProducts()
            : await getProductsByCategory(selectedCategory)

        if (!alive) return
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load products.')
        setProducts([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [selectedCategory])

  const groupFilteredProducts = useMemo(() => {
    if (group === 'all') return products
    if (group === 'kids') return products.filter(p => isKidsCategory(p.category))
    if (group === 'adults') return products.filter(p => !isKidsCategory(p.category))
    return products
  }, [products, group])

  // Filter + sort client-side
  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase()

    let list = groupFilteredProducts
    if (q) {
      list = list.filter(p => {
        const title = String(p?.title || '').toLowerCase()
        const category = String(p?.category || '').toLowerCase()
        return title.includes(q) || category.includes(q)
      })
    }

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sort === 'price-desc') sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
    if (sort === 'title-asc') sorted.sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')))

    return sorted
  }, [groupFilteredProducts, query, sort])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
          <p className="mt-2 text-sm text-gray-600">
            Filter by Adults/Kids and category, then refine with search and sorting.
          </p>
        </div>

   {/* Controls */}
<div className="w-full md:w-auto">
  <div className="mt-2 md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
    {/* Group */}
    <div className="border border-gray-200 bg-white p-3">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Group</p>
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="mt-2 w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-500"
      >
        <option value="all">All</option>
        <option value="adults">Adults</option>
        <option value="kids">Kids</option>
      </select>
    </div>

    {/* Category */}
    <div className="border border-gray-200 bg-white p-3">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Category</p>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mt-2 w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-500"
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {labelCategory(c)}
          </option>
        ))}
      </select>
    </div>

    {/* Search */}
    <div className="border border-gray-200 bg-white p-3 sm:col-span-2 lg:col-span-1">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Search</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="mt-2 w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-500"
      />
    </div>

    {/* Sort */}
    <div className="border border-gray-200 bg-white p-3">
      <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">Sort</p>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="mt-2 w-full border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:border-gray-500"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Title: A to Z</option>
      </select>
    </div>
  </div>
</div>

      </div>

      {/* Status */}
      {error ? (
        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {/* Grid */}
      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {visibleProducts.length} item{visibleProducts.length === 1 ? '' : 's'}
            </div>
            <ProductGrid products={visibleProducts} />
          </>
        )}
      </div>
    </div>
  )
}
