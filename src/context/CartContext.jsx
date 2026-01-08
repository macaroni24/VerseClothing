import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'clothes_store_cart_v1'

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json)
    return v ?? fallback
  } catch {
    return fallback
  }
}

function readCartFromStorage() {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  const data = safeParse(raw, [])
  return Array.isArray(data) ? data : []
}

function writeCartToStorage(items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCartFromStorage())

  useEffect(() => {
    writeCartToStorage(items)
  }, [items])

  const addItem = (product) => {
    if (!product || product.id == null) return

    setItems((prev) => {
      const id = product.id
      const selectedSize = product.selectedSize || null

      // Treat same product with different size as different line item
      const existingIndex = prev.findIndex(
        (x) => x.id === id && (x.selectedSize || null) === selectedSize
      )

      if (existingIndex === -1) {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title || 'Untitled',
            price: Number(product.price || 0),
            image: product.image || '',
            category: product.category || '',
            selectedSize,
            quantity: 1,
          },
        ]
      }

      const next = [...prev]
      next[existingIndex] = {
        ...next[existingIndex],
        quantity: (next[existingIndex].quantity || 1) + 1,
      }
      return next
    })
  }

  const removeItem = (id, selectedSize = null) => {
    setItems((prev) =>
      prev.filter((x) => !(x.id === id && (x.selectedSize || null) === (selectedSize || null)))
    )
  }

  const setQty = (id, selectedSize = null, quantity = 1) => {
    const q = Math.max(1, Number(quantity || 1))

    setItems((prev) =>
      prev.map((x) => {
        if (x.id === id && (x.selectedSize || null) === (selectedSize || null)) {
          return { ...x, quantity: q }
        }
        return x
      })
    )
  }

  const clearCart = () => setItems([])

  const itemCount = useMemo(() => {
    return items.reduce((sum, x) => sum + (Number(x.quantity || 0) || 0), 0)
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce((sum, x) => sum + (Number(x.price || 0) || 0) * (Number(x.quantity || 0) || 0), 0)
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      setQty,
      clearCart,
      itemCount,
      subtotal,
    }),
    [items, itemCount, subtotal]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
