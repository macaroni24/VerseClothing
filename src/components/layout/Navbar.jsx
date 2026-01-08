import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { getProducts } from '../../api/products.api'

export default function Navbar() {
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const [q, setQ] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [open, setOpen] = useState(false)

  const boxRef = useRef(null)

  /* ---------------- load products once ---------------- */
  useEffect(() => {
    getProducts().then(setAllProducts).catch(() => setAllProducts([]))
  }, [])

  /* ---------------- live filter ---------------- */
  const results = useMemo(() => {
    const v = q.trim().toLowerCase()
    if (!v) return []
    return allProducts
      .filter(p => String(p.title).toLowerCase().includes(v))
      .slice(0, 6) // limit results
  }, [q, allProducts])

  /* ---------------- close on outside click ---------------- */
  useEffect(() => {
    function onClick(e) {
      if (!boxRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-xs uppercase tracking-[0.25em] text-white'
      : 'text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition'

  const badge = useMemo(() => {
    const v = Number(itemCount || 0)
    return v > 99 ? '99+' : String(v)
  }, [itemCount])

  function onSubmit(e) {
    e.preventDefault()
    if (!q.trim()) return
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`)
    setOpen(false)
  }

  return (
    <header className="w-full bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          CLOTHES
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/shop?group=adults" className={linkClass}>Adults</NavLink>
          <NavLink to="/shop?group=kids" className={linkClass}>Kids</NavLink>
          <NavLink to="/shop?cat=women" className={linkClass}>Women</NavLink>
          <NavLink to="/shop?cat=men" className={linkClass}>Men</NavLink>
        </nav>

        {/* Search + Cart */}
        <div className="flex items-center gap-4 relative" ref={boxRef}>
          {/* SEARCH */}
          <form onSubmit={onSubmit} className="hidden sm:block relative">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search…"
              className="w-56 bg-black border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
            />

            {/* DROPDOWN */}
            {open && q && (
              <div className="absolute left-0 right-0 mt-2 bg-black border border-gray-800 shadow-xl">
                {results.length === 0 ? (
                  <div className="p-4 text-sm text-gray-400">
                    No results found
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-800">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.id}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-900 transition"
                        >
                          <div className="w-10 h-12 bg-gray-800 overflow-hidden">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">
                              {p.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              ${p.price}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* View all */}
                {results.length > 0 && (
                  <button
                    onClick={() => {
                      navigate(`/shop?q=${encodeURIComponent(q)}`)
                      setOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white border-t border-gray-800"
                  >
                    View all results
                  </button>
                )}
              </div>
            )}
          </form>

          {/* CART */}
          <Link
            to="/cart"
            className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition inline-flex items-center gap-2"
          >
            Cart
            <span className="min-w-6 h-6 px-2 inline-flex items-center justify-center text-[11px] border border-gray-600">
              {badge}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
