import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // Scroll to top on route change (including query string changes)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Scroll restore */}
      <ScrollToTop />

      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />

          {/* Not Found */}
          <Route
            path="/404"
            element={
              <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                <h1 className="text-2xl font-semibold">Page not found</h1>
                <p className="mt-2 text-gray-500">
                  The page you are looking for does not exist.
                </p>
              </div>
            }
          />

          {/* Catch-all */}
          
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
