export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`border border-gray-300 px-3 py-2 text-sm bg-white ${className}`}
      {...props}
    />
  )
}
