// WHY: Keep section titles and optional supporting text consistent throughout the storefront.
function SectionHeading({
  title,
  eyebrow,
  description,
  align = 'left',
  className = '',
}) {
  return (
    <div
      className={`section-heading${align === 'center' ? ' section-heading--center' : ''} ${className}`.trim()}
    >
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
