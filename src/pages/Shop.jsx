import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductSkeleton from '../components/product/ProductSkeleton'
import { getProducts } from '../api/products.api'

function isKidsCategory(c) {
  return String(c || '').toLowerCase().startsWith('kids')
}

export default function Shop() {
  const [searchParams] = useSearchParams()

  // URL params from navbar
  const query = (searchParams.get('q') || '').trim()
  const cat = (searchParams.get('cat') || 'all').trim()      // women | men | kids-girls | kids-boys | all
  const group = (searchParams.get('group') || 'all').trim()  // kids | adults | all

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [sort, setSort] = useState('featured') // featured | price-asc | price-desc | title-asc

  // Load all products once
  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')

    ;(async () => {
      try {
        const data = await getProducts()
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
  }, [])

  // Filter + sort based on URL params
  const visibleProducts = useMemo(() => {
    let list = products

    // 1) Apply category filter
    if (cat !== 'all') {
      if (cat === 'kids') {
        // if someone uses /shop?cat=kids (optional support)
        list = list.filter((p) => isKidsCategory(p.category))
      } else {
        list = list.filter((p) => String(p.category || '').toLowerCase() === cat.toLowerCase())
      }
    }

    // 2) Apply group filter (kids/adults)
    if (group !== 'all') {
      if (group === 'kids') list = list.filter((p) => isKidsCategory(p.category))
      if (group === 'adults') list = list.filter((p) => !isKidsCategory(p.category))
    }

    // 3) Apply search (q)
    const q = query.toLowerCase()
    if (q) {
      list = list.filter((p) => {
        const title = String(p?.title || '').toLowerCase()
        const category = String(p?.category || '').toLowerCase()
        return title.includes(q) || category.includes(q)
      })
    }

    // 4) Sort
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
    if (sort === 'price-desc') sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
    if (sort === 'title-asc') {
      sorted.sort((a, b) => String(a.title || '').localeCompare(String(b.title || '')))
    }

    return sorted
  }, [products, cat, group, query, sort])

  // Nice label for the current filter state (optional)
  const filterLabel = useMemo(() => {
    const parts = []
    if (group !== 'all') parts.push(group.toUpperCase())
    if (cat !== 'all') parts.push(cat.toUpperCase())
    if (query) parts.push(`"${query}"`)
    return parts.length ? parts.join(' · ') : null
  }, [cat, group, query])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shop</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse products and sort results. Use the navbar links and search to filter.
          </p>

          {filterLabel ? (
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-500">
              {filterLabel}
            </p>
          ) : null}
        </div>

        {/* Controls — SORT ONLY */}
        <div className="w-full md:w-auto">
          <div className="mt-2 md:mt-0 grid grid-cols-1 gap-3">
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
