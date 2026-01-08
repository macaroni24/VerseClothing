import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { getProducts } from '../../api/products.api'

export default function Navbar() {
  const { itemCount } = useCart()
  const navigate = useNavigate()

  // Search (desktop + mobile)
  const [q, setQ] = useState('')
  const [allProducts, setAllProducts] = useState([])
  const [searchOpen, setSearchOpen] = useState(false)

  // Mobile Categories popup
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const categoriesRef = useRef(null)

  // Desktop search dropdown close handler
  const searchBoxRef = useRef(null)

  /* ---------------- load products once ---------------- */
  useEffect(() => {
    getProducts().then(setAllProducts).catch(() => setAllProducts([]))
  }, [])

  /* ---------------- close desktop/mobile search dropdown on outside click ---------------- */
  useEffect(() => {
    function onClick(e) {
      if (!searchBoxRef.current?.contains(e.target)) setSearchOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  /* ---------------- close categories popup on outside click ---------------- */
  useEffect(() => {
    function onClick(e) {
      if (!categoriesRef.current) return
      if (!categoriesRef.current.contains(e.target)) setCategoriesOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  /* ---------------- mobile bottom bar: prevent content being covered (NO gap under header) ---------------- */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)') // tailwind md breakpoint
    const prev = document.body.style.paddingBottom

    function apply() {
      document.body.style.paddingBottom = mq.matches ? '64px' : prev
    }

    apply()
    mq.addEventListener?.('change', apply)
    return () => {
      document.body.style.paddingBottom = prev
      mq.removeEventListener?.('change', apply)
    }
  }, [])

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-xs uppercase tracking-[0.25em] text-white'
      : 'text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition'

  const bottomItemClass = ({ isActive }) =>
    isActive
      ? 'flex flex-col items-center justify-center gap-1 text-white'
      : 'flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition'

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

  // Mobile can reuse same results; keeping separate name for clarity
  const mobileResults = useMemo(() => {
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

  function closeDesktopOverlays() {
    setSearchOpen(false)
  }

  function closeMobileOverlays() {
    setCategoriesOpen(false)
    setSearchOpen(false)
  }

  function DesktopNavLinks({ onNavigate }) {
    return (
      <>
        <NavLink onClick={onNavigate} to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink onClick={onNavigate} to="/shop" className={linkClass}>
          Shop
        </NavLink>
        <NavLink onClick={onNavigate} to="/shop?group=adults" className={linkClass}>
          Adults
        </NavLink>
        <NavLink onClick={onNavigate} to="/shop?group=kids" className={linkClass}>
          Kids
        </NavLink>
        <NavLink onClick={onNavigate} to="/shop?cat=women" className={linkClass}>
          Women
        </NavLink>
        <NavLink onClick={onNavigate} to="/shop?cat=men" className={linkClass}>
          Men
        </NavLink>
      </>
    )
  }

  return (
    <>
      <header className="w-full bg-black text-white sticky top-0 z-50">
        {/* Desktop header */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
            <Link to="/" onClick={closeMobileOverlays} className="text-xl font-semibold tracking-wide">
              VerseClothes
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <DesktopNavLinks onNavigate={() => setSearchOpen(false)} />
            </nav>

            <div className="flex items-center gap-4 relative" ref={searchBoxRef}>
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

                {/* Desktop Dropdown */}
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

              <Link
                to="/cart"
                onClick={closeDesktopOverlays}
                className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-white transition inline-flex items-center gap-2"
              >
                Cart
                <span className="min-w-6 h-6 px-2 inline-flex items-center justify-center text-[11px] border border-gray-600">
                  {badge}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile header (styled like your reference) */}
        <div className="md:hidden">
          {/* Top row: brand left + icons right */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-4">
            <Link to="/" onClick={closeMobileOverlays} className="min-w-0">
              <p className="text-lg font-semibold leading-tight truncate">VerseClothes</p>
              <p className="text-[12px] text-white/70 leading-tight truncate">Women • Men • Kids</p>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                onClick={closeMobileOverlays}
                className="w-10 h-10 inline-flex items-center justify-center border border-white/15 rounded-md relative"
                aria-label="Cart"
              >
                <CartIcon />
                {Number(itemCount || 0) > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-white text-black text-[11px] inline-flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile search + dropdown */}
          <div className="px-5 pb-4 relative" ref={searchBoxRef}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!q.trim()) return
                goToShopWithQuery(q)
                closeMobileOverlays()
              }}
              className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-lg px-3 py-2"
            >
              <SearchIcon />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search clothes…"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/50"
              />
              <button type="submit" className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium">
                Search
              </button>
            </form>

            {/* Mobile dropdown */}
            {searchOpen && q && (
              <div className="absolute left-5 right-5 mt-2 bg-black border border-gray-800 shadow-xl z-50">
                {mobileResults.length === 0 ? (
                  <div className="p-4 text-sm text-gray-400">No results found</div>
                ) : (
                  <ul className="divide-y divide-gray-800">
                    {mobileResults.map((p) => (
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

                {mobileResults.length > 0 && (
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
          </div>
        </div>
      </header>

      {/* Mobile bottom nav (you said perfect) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        {/* Categories popup */}
        {categoriesOpen && (
          <div className="absolute bottom-16 left-0 right-0 px-4 pb-3" ref={categoriesRef}>
            <div className="mx-auto max-w-md rounded-lg border border-gray-700 bg-black shadow-xl overflow-hidden">
              <div className="grid grid-cols-2">
                <Link
                  to="/shop?cat=men"
                  onClick={() => setCategoriesOpen(false)}
                  className="px-4 py-3 border-b border-r border-gray-700 text-sm text-white/90 hover:text-white hover:bg-gray-900 transition"
                >
                  Men
                </Link>
                <Link
                  to="/shop?cat=women"
                  onClick={() => setCategoriesOpen(false)}
                  className="px-4 py-3 border-b border-gray-700 text-sm text-white/90 hover:text-white hover:bg-gray-900 transition"
                >
                  Women
                </Link>
                <Link
                  to="/shop?group=kids"
                  onClick={() => setCategoriesOpen(false)}
                  className="px-4 py-3 border-r border-gray-700 text-sm text-white/90 hover:text-white hover:bg-gray-900 transition"
                >
                  Kids
                </Link>
                <Link
                  to="/shop?group=adults"
                  onClick={() => setCategoriesOpen(false)}
                  className="px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-gray-900 transition"
                >
                  Adults
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="h-16 flex items-center justify-around px-3">
          <NavLink to="/" onClick={closeMobileOverlays} className={bottomItemClass}>
            <HomeIcon />
            <span className="text-[12px]">Home</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setCategoriesOpen((v) => !v)}
            className="flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition"
            aria-label="Categories"
          >
            <MenuIcon />
            <span className="text-[12px]">Categories</span>
          </button>

          <NavLink to="/cart" onClick={closeMobileOverlays} className={bottomItemClass}>
            <span className="relative">
              <CartIcon />
              {Number(itemCount || 0) > 0 && (
                <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 rounded-full bg-white text-black text-[11px] inline-flex items-center justify-center">
                  {badge}
                </span>
              )}
            </span>
            <span className="text-[12px]">Cart</span>
          </NavLink>

          <NavLink to="/shop" onClick={closeMobileOverlays} className={bottomItemClass}>
            <ShopIcon />
            <span className="text-[12px]">Shop</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

/* ---------------- Icons ---------------- */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/80">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M6 6h15l-1.5 8.5H7.2L6 6z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
      <path d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-current">
      <path
        d="M4 9l2-5h12l2 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 9h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 9a3 3 0 0 0 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
