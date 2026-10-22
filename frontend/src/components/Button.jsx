// WHY: Reuse one accessible button style and allow callers to select a simple visual variant.
function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}) {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
