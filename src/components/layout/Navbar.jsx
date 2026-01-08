import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { getProducts } from '../../api/products.api'

export default function Navbar() {
  const { itemCount } = useCart()
  const navigate = useNavigate()

  // Search (desktop)
  const [q, setQ] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileQ, setMobileQ] = useState('')

  const searchBoxRef = useRef(null)

  /* ---------------- load products once ---------------- */
  useEffect(() => {
    getProducts().then(setAllProducts).catch(() => setAllProducts([]))
  }, [])

  /* ---------------- close desktop search on outside click ---------------- */
  useEffect(() => {
    function onClick(e) {
      if (!searchBoxRef.current?.contains(e.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  /* ---------------- lock scroll when mobile menu open ---------------- */
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-xs uppercase tracking-[0.25em] text-white'
      : 'text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition'

  const badge = useMemo(() => {
    const v = Number(itemCount || 0)
    return v > 99 ? '99+' : String(v)
  }, [itemCount])

  const desktopResults = useMemo(() => {
    const v = q.trim().toLowerCase()
    if (!v) return []
    return allProducts
      .filter((p) => String(p.title || '').toLowerCase().includes(v))
      .slice(0, 6)
  }, [q, allProducts])

  function goToShopWithQuery(query) {
    const t = String(query || '').trim()
    if (!t) return
    navigate(`/shop?q=${encodeURIComponent(t)}`)
  }

  function closeAll() {
    setSearchOpen(false)
    setMenuOpen(false)
  }

  function NavLinks({ onNavigate }) {
    return (
      <>
        <NavLink onClick={onNavigate} to="/shop" className={linkClass}>Shop</NavLink>
        <NavLink onClick={onNavigate} to="/shop?group=adults" className={linkClass}>Adults</NavLink>
        <NavLink onClick={onNavigate} to="/shop?group=kids" className={linkClass}>Kids</NavLink>
        <NavLink onClick={onNavigate} to="/shop?cat=women" className={linkClass}>Women</NavLink>
        <NavLink onClick={onNavigate} to="/shop?cat=men" className={linkClass}>Men</NavLink>
      </>
    )
  }

  return (
    <header className="w-full bg-black text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
        {/* Left: Burger (mobile) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-gray-800 hover:border-gray-700 transition"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <span className="text-lg leading-none">×</span>
          ) : (
            <span className="text-lg leading-none">☰</span>
          )}
        </button>

        {/* Brand */}
        <Link to="/" onClick={closeAll} className="text-xl font-semibold tracking-wide">
          VerseClothes
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks onNavigate={() => setSearchOpen(false)} />
        </nav>

        {/* Right: desktop search + cart */}
        <div className="flex items-center gap-4 relative" ref={searchBoxRef}>
          {/* Desktop search */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!q.trim()) return
              goToShopWithQuery(q)
              setSearchOpen(false)
            }}
            className="hidden sm:block relative"
          >
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search…"
              className="w-56 bg-black border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
            />

            {/* Dropdown */}
            {searchOpen && q && (
              <div className="absolute left-0 right-0 mt-2 bg-black border border-gray-800 shadow-xl">
                {desktopResults.length === 0 ? (
                  <div className="p-4 text-sm text-gray-400">No results found</div>
                ) : (
                  <ul className="divide-y divide-gray-800">
                    {desktopResults.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center gap-3 p-3 hover:bg-gray-900 transition"
                        >
                          <div className="w-10 h-12 bg-gray-800 overflow-hidden">
                            <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{p.title}</p>
                            <p className="text-xs text-gray-400">${p.price}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {desktopResults.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      goToShopWithQuery(q)
                      setSearchOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white border-t border-gray-800"
                  >
                    View all results
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={closeAll}
            className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition inline-flex items-center gap-2"
          >
            Cart
            <span className="min-w-6 h-6 px-2 inline-flex items-center justify-center text-[11px] border border-gray-600">
              {badge}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                goToShopWithQuery(mobileQ)
                closeAll()
              }}
              className="flex gap-3"
            >
              <input
                value={mobileQ}
                onChange={(e) => setMobileQ(e.target.value)}
                placeholder="Search products…"
                className="flex-1 bg-black border border-gray-700 px-3 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
              />
              <button
                type="submit"
                className="bg-white text-black px-5 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-200 transition"
              >
                Search
              </button>
            </form>

            {/* Links */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <LinkBlock to="/shop" onClick={closeAll} label="Shop" />
              <LinkBlock to="/shop?group=adults" onClick={closeAll} label="Adults" />
              <LinkBlock to="/shop?group=kids" onClick={closeAll} label="Kids" />
              <LinkBlock to="/shop?cat=women" onClick={closeAll} label="Women" />
              <LinkBlock to="/shop?cat=men" onClick={closeAll} label="Men" />
              <LinkBlock to="/cart" onClick={closeAll} label="Cart" />
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500">
              <p className="uppercase tracking-[0.25em]">Verse CLOTHES</p>
              <p className="mt-2 leading-5">
                Minimal storefront. Mobile menu is slide-down for fast navigation.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function LinkBlock({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="border border-gray-800 hover:border-gray-700 transition p-4"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-white">
        {label}
      </p>
    </Link>
  )
}
