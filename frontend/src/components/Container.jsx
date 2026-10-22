// WHY: Give page sections a consistent responsive width without repeating layout styles.
function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`container ${className}`.trim()} {...props}>
      {children}
    </Element>
  )
}

export default Container
