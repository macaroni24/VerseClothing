export default function Button({
  children,
  variant = 'primary', // primary | secondary | ghost
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center px-5 py-3 text-sm uppercase tracking-wide transition'

  const styles =
    variant === 'primary'
      ? 'bg-black text-white hover:bg-gray-800'
      : variant === 'secondary'
        ? 'border border-gray-300 bg-white hover:border-gray-400'
        : 'text-gray-600 hover:text-black'

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}
