import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../api/products.api'
import { useCart } from '../context/CartContext'

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

export default function Product() {
  const { id } = useParams()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [size, setSize] = useState('M')

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError('')
    setProduct(null)

    ;(async () => {
      try {
        const data = await getProductById(id)
        if (!alive) return
        setProduct(data)
      } catch (e) {
        if (!alive) return
        setError(e?.message || 'Failed to load product.')
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [id])

  const price = useMemo(() => {
    const p = Number(product?.price || 0)
    return Number.isFinite(p) ? p : 0
  }, [product])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between">
        <Link to="/shop" className="text-sm uppercase tracking-wide hover:text-gray-500">
          Back to shop
        </Link>

        <Link to="/cart" className="text-sm uppercase tracking-wide hover:text-gray-500">
          View cart
        </Link>
      </div>

      {error ? (
        <div className="mt-8 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
          <div>
            <div className="h-7 bg-gray-200 w-3/4 animate-pulse" />
            <div className="mt-4 h-5 bg-gray-200 w-1/4 animate-pulse" />
            <div className="mt-8 h-4 bg-gray-200 w-full animate-pulse" />
            <div className="mt-2 h-4 bg-gray-200 w-5/6 animate-pulse" />
            <div className="mt-2 h-4 bg-gray-200 w-2/3 animate-pulse" />
          </div>
        </div>
      ) : product ? (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="border border-gray-200 bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
              {product.title}
            </h1>

            <p className="mt-4 text-lg font-medium">${price}</p>

            <p className="mt-6 text-sm text-gray-700 leading-6">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Size
              </p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={
                      s === size
                        ? 'border border-black bg-black text-white py-2 text-sm uppercase tracking-wide'
                        : 'border border-gray-300 bg-white hover:border-gray-400 py-2 text-sm uppercase tracking-wide'
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500">
                Selected: <span className="text-gray-700">{size}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    selectedSize: size,
                  })
                }}
                className="flex-1 bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition"
              >
                Add to cart
              </button>

              <Link
                to="/cart"
                className="flex-1 inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-sm uppercase tracking-wide hover:border-gray-400 transition"
              >
                Go to cart
              </Link>
            </div>

            <div className="mt-8 text-xs text-gray-500">
              Note: Sizes are UI-only for now. We’ll persist selection in cart items.
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
