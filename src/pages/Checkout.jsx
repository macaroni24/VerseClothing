import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, itemCount, subtotal, clearCart } = useCart()

  const total = useMemo(() => Math.round(Number(subtotal || 0) * 100) / 100, [subtotal])

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'cod',
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // If cart is empty, redirect back to cart (prevents “$0 checkout”)
  useEffect(() => {
    if (!items || items.length === 0) navigate('/cart', { replace: true })
  }, [items, navigate])

  function onChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function validate() {
    if (!form.fullName.trim()) return 'Full name is required.'
    if (!form.phone.trim()) return 'Phone number is required.'
    if (!form.address.trim()) return 'Address is required.'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Email looks invalid.'
    return ''
  }

  async function placeOrder(e) {
    e.preventDefault()
    setError('')

    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        customer: {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
        },
        paymentMethod: form.paymentMethod,
        items: items.map((x) => ({
          id: x.id,
          title: x.title,
          price: Number(x.price || 0),
          quantity: Number(x.quantity || 0),
          selectedSize: x.selectedSize || null,
          category: x.category || null,
        })),
        subtotal: total,
        createdAt: new Date().toISOString(),
      }

      // ✅ This is the part that sends to your backend API (serverless)
      // You MUST create /api/order (Vercel) or similar (Netlify) for email sending.
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || 'Failed to submit order')

      clearCart()
      setSuccess(true)
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!items || items.length === 0) return null

  if (success) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="border border-gray-200 p-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Order received</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Thank you.</h1>
          <p className="mt-3 text-sm text-gray-600 leading-6 max-w-xl">
            Your order has been placed successfully. You should receive it in your email if the API
            is configured correctly.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-black text-white px-7 py-3 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition"
            >
              Continue shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-gray-300 px-7 py-3 text-sm uppercase tracking-[0.2em] hover:border-gray-400 transition"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-baseline justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Checkout</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Shipping details</h1>
        </div>

        <Link to="/cart" className="text-sm uppercase tracking-[0.2em] hover:text-gray-500">
          Back to cart
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: form */}
        <form onSubmit={placeOrder} className="lg:col-span-2">
          <div className="border border-gray-200 p-6 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide">Contact</h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full name *">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Phone *">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  placeholder="+383..."
                />
              </Field>

              <Field label="Email (optional)">
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                  placeholder="you@email.com"
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
                    placeholder="Street, city, details…"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Order notes (optional)">
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={onChange}
                    rows={3}
                    className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black"
                    placeholder="Anything we should know?"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold uppercase tracking-wide">Payment</h3>

              <div className="mt-4 border border-gray-200">
                <label className="flex items-start gap-3 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={onChange}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium">Cash on delivery</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Later we can add card payments via Stripe.
                    </p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full bg-black text-white px-6 py-4 text-sm uppercase tracking-[0.2em] hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Placing order…' : 'Place order'}
              </button>

              <p className="mt-4 text-xs text-gray-500">
                Orders will email you once /api/order is configured.
              </p>
            </div>
          </div>
        </form>

        {/* RIGHT: order summary */}
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
            <Row label="Shipping" value="Calculated after address" />
            <Row label="Subtotal" value={`$${total.toFixed(2)}`} strong />
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 leading-5">
              This checkout needs an API endpoint to send order emails securely.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

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
