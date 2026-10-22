import products from '../data/products.js'

// WHY: Return a copy so callers can sort or filter without changing the source catalog.
export function getAllProducts() {
  return [...products]
}

// WHY: Match product detail requests by the stable, readable URL slug.
export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug)
}

// WHY: Compare categories without depending on the caller's letter casing.
export function getProductsByCategory(category) {
  const normalizedCategory = category.trim().toLocaleLowerCase()

  return products.filter(
    (product) => product.category.toLocaleLowerCase() === normalizedCategory,
  )
}

// WHY: Search the useful catalog fields with one case-insensitive text query.
export function searchProducts(query) {
  const normalizedQuery = query.trim().toLocaleLowerCase()

  if (!normalizedQuery) return []

  return products.filter((product) =>
    [product.name, product.slug, product.category, product.description].some(
      (field) => field.toLocaleLowerCase().includes(normalizedQuery),
    ),
  )
}
