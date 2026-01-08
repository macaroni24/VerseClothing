export default function CartItem({ item, onQtyChange, onRemove }) {
  if (!item) return null

  return (
    <div className="p-5 border-b border-gray-200 last:border-b-0">
      <div className="flex gap-4">
        <div className="w-24 h-32 bg-gray-100 overflow-hidden border border-gray-200">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium leading-5">{item.title}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                {item.category}{item.selectedSize ? ` • Size ${item.selectedSize}` : ''}
              </p>
            </div>

            <p className="text-sm font-medium">${Number(item.price || 0)}</p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-[0.2em] text-gray-500">Qty</label>
              <select
                value={item.quantity}
                onChange={(e) => onQtyChange?.(Number(e.target.value))}
                className="border border-gray-300 px-3 py-2 text-sm bg-white"
              >
                {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => onRemove?.()}
              className="text-sm uppercase tracking-wide text-gray-600 hover:text-black"
            >
              Remove
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Line total:{' '}
            <span className="text-gray-900 font-medium">
              ${Number(item.price || 0) * Number(item.quantity || 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
