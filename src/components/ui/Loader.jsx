export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="py-10 text-sm text-gray-600">
      {label}
    </div>
  )
}
