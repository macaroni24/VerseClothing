import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { items, itemCount, subtotal, clearCart } = useCart()

  const total = useMemo(() => Math.round(Number(subtotal || 0) * 100) / 100, [subtotal])

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
  })

  const [showThanks, setShowThanks] = useState(false)
  const [error, setError] = useState('')

  function onChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function validate() {
    if (!form.fullName.trim()) return 'Full name is required.'
    if (!form.phone.trim()) return 'Phone is required.'
    if (!form.address.trim()) return 'Address is required.'
    return ''
  }

  function placeOrder() {
    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setError('')
    clearCart()
    setShowThanks(true)
  }

  return (
    <div className="relative">

      {/* ================== ANIMATED OVERLAY ================== */}
      {showThanks && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-6">
          <div className="bg-white max-w-md w-full p-10 text-center shadow-2xl
                          animate-popup">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Order successful
            </p>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight">
              Thank you for your order.
            </h1>

            <p className="mt-4 text-sm text-gray-600 leading-6">
              Your order has been placed successfully. We will contact you shortly to confirm
              delivery details.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/shop"
                className="bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition"
              >
                Continue shopping
              </Link>

              <Link
                to="/"
                className="border border-gray-300 px-6 py-3 text-sm uppercase tracking-[0.2em] hover:border-gray-400 transition"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ================== CHECKOUT PAGE ================== */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Checkout</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Shipping details
            </h1>
          </div>

          <Link to="/cart" className="text-sm uppercase tracking-[0.2em] hover:text-gray-500">
            Back to cart
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 p-6 sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide">Contact</h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full name *">
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </Field>

                <Field label="Phone *">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </Field>

                <Field label="Email (optional)">
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Address *">
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={onChange}
                      rows={3}
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Order notes">
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={onChange}
                      rows={3}
                      className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                    />
                  </Field>
                </div>
              </div>

              {error && (
                <div className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={placeOrder}
                className="mt-6 w-full bg-black text-white px-6 py-4 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition"
              >
                Place order
              </button>

              <p className="mt-4 text-xs text-gray-500">
                UI-only checkout. No payment is processed.
              </p>
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="border border-gray-200 p-6 sm:p-8 h-fit">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Order summary</h2>

            <div className="mt-6 space-y-4">
              {items.map((x) => (
                <div
                  key={`${x.id}-${x.selectedSize || 'nosize'}`}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{x.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
                      Qty {x.quantity}
                      {x.selectedSize ? ` • Size ${x.selectedSize}` : ''}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${(Number(x.price || 0) * Number(x.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3 text-sm">
              <Row label="Items" value={`${itemCount}`} />
              <Row label="Shipping" value="Free" />
              <Row label="Total" value={`$${total.toFixed(2)}`} strong />
            </div>
          </aside>
        </div>
      </div>

      {/* ================== ANIMATION STYLES ================== */}
      <style>{`
        @keyframes popup {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popup {
          animation: popup 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

/* ================= HELPERS ================= */

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={strong ? 'font-semibold' : 'font-medium'}>{value}</span>
    </div>
  )
}
