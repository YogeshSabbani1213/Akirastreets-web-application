import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import formatPrice from '../utils/formatPrice.js'
import Button from './Button.jsx'
import './ProductCard.css'

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState('')
  const { addToCart } = useCart()
  const hasSizes = Array.isArray(product.sizes) && product.sizes.length > 0
  const canAddToCart = product.inStock && (!hasSizes || selectedSize !== '')
  const [primaryImage, secondaryImage] = product.images ?? []

  // WHY: Preserve the product link while requiring a size choice when a product has sizes.
  function handleAddToCart() {
    if (!canAddToCart) return
    addToCart(product, hasSizes ? selectedSize : undefined)
  }

  return (
    <article className="product-card">
      <Link
        aria-label={`View ${product.name}`}
        className="product-card__link"
        to={`/products/${product.slug}`}
      >
        <div className="product-card__media">
          {primaryImage ? (
            <img
              alt={product.name}
              className="product-card__image product-card__image--primary"
              decoding="async"
              height="800"
              loading="lazy"
              src={primaryImage}
              width="600"
            />
          ) : (
            <div aria-label="Product image unavailable" className="product-card__image-placeholder" role="img" />
          )}
          {secondaryImage && (
            <img
              alt=""
              aria-hidden="true"
              className="product-card__image product-card__image--secondary"
              decoding="async"
              height="800"
              loading="lazy"
              src={secondaryImage}
              width="600"
            />
          )}
        </div>
        <div className="product-card__details">
          <h2 className="product-card__name">{product.name}</h2>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>

      <div className="product-card__actions">
        {hasSizes && (
          <label className="product-card__size-label">
            <span>SIZE</span>
            <select
              aria-label={`Choose a size for ${product.name}`}
              className="product-card__size-picker"
              onChange={(event) => setSelectedSize(event.target.value)}
              value={selectedSize}
            >
              <option value="">Select size</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        )}
        <Button
          className="product-card__add-button"
          disabled={!canAddToCart}
          onClick={handleAddToCart}
        >
          {product.inStock ? 'Add to cart' : 'Out of stock'}
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
