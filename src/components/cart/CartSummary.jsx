export default function CartSummary({ subtotal = 0, onCheckout }) {
  const total = Math.round(Number(subtotal || 0) * 100) / 100

  return (
    <aside className="border border-gray-200 p-6 h-fit">
      <h2 className="text-sm font-semibold uppercase tracking-wide">Summary</h2>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${total}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold">${total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition"
      >
        Checkout
      </button>

      <p className="mt-4 text-xs text-gray-500">
        Checkout is UI-only for now.
      </p>
    </aside>
  )
}
