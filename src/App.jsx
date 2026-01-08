import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
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
