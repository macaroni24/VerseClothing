import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, itemCount, subtotal, setQty, removeItem, clearCart } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-baseline justify-between gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Cart <span className="text-gray-500">({itemCount})</span>
        </h1>

        <Link to="/shop" className="text-sm uppercase tracking-wide hover:text-gray-500">
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 border border-gray-200 p-8">
          <p className="text-sm text-gray-600">
            Your cart is currently empty. Add products from the shop to begin checkout.
          </p>

          <div className="mt-6">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition"
            >
              Go to shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200">
              {items.map((x) => (
                <div key={`${x.id}-${x.selectedSize || 'nosize'}`} className="p-5 border-b border-gray-200 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="w-24 h-32 bg-gray-100 overflow-hidden border border-gray-200">
                      <img
                        src={x.image}
                        alt={x.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium leading-5">{x.title}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                            {x.category}{x.selectedSize ? ` • Size ${x.selectedSize}` : ''}
                          </p>
                        </div>

                        <p className="text-sm font-medium">${Number(x.price || 0)}</p>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            Qty
                          </label>
                          <select
                            value={x.quantity}
                            onChange={(e) => setQty(x.id, x.selectedSize || null, Number(e.target.value))}
                            className="border border-gray-300 px-3 py-2 text-sm bg-white"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(x.id, x.selectedSize || null)}
                          className="text-sm uppercase tracking-wide text-gray-600 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-4 text-sm text-gray-600">
                        Line total:{' '}
                        <span className="text-gray-900 font-medium">
                          ${Number(x.price || 0) * Number(x.quantity || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={clearCart}
                className="text-sm uppercase tracking-wide text-gray-600 hover:text-black"
              >
                Clear cart
              </button>

              <Link
                to="/shop"
                className="text-sm uppercase tracking-wide hover:text-gray-500"
              >
                Add more
              </Link>
            </div>
          </div>

          {/* Summary */}
          <aside className="border border-gray-200 p-6 h-fit">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Summary</h2>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${Math.round(subtotal * 100) / 100}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">${Math.round(subtotal * 100) / 100}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition"
            >
              Checkout
            </button>

            <p className="mt-4 text-xs text-gray-500">
              Checkout is UI-only for now. Next we can integrate a real payments/checkout API.
            </p>
          </aside>
        </div>
      )}
    </div>
  )
}
