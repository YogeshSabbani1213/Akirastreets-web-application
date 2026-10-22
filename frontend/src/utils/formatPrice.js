// WHY: Format numeric prices with Indian digit grouping and an explicit INR label.
const inrNumberFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export default function formatPrice(price) {
  if (!Number.isFinite(price)) {
    throw new TypeError('Price must be a finite number.')
  }

  return `INR ${inrNumberFormatter.format(price)}`
}
