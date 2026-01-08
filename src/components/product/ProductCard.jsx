import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  if (!product) return null

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
      </div>

      <div className="mt-3 text-sm">
        <p className="font-medium line-clamp-1">{product.title}</p>
        <p className="mt-1 text-gray-500">${Number(product.price || 0)}</p>
      </div>
    </Link>
  )
}
