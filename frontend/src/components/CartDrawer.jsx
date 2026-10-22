import { FiMinus, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useCart } from '../context/useCart.js'
import formatPrice from '../utils/formatPrice.js'
import Button from './Button.jsx'

function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()

  return (
    <>
      <button
        aria-hidden={!open}
        aria-label="Close cart"
        className={`cart-overlay${open ? ' is-open' : ''}`}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <aside
        aria-hidden={!open}
        aria-labelledby="cart-drawer-title"
        className={`cart-drawer${open ? ' is-open' : ''}`}
        id="cart-drawer"
        inert={!open}
      >
        <div className="cart-drawer__header">
          <h2 id="cart-drawer-title">YOUR BAG ({cartCount})</h2>
          <button
            aria-label="Close cart"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer__empty">Your bag is currently empty.</p>
        ) : (
          <ul className="cart-items">
            {items.map((item) => (
              <li className="cart-item" key={item.cartItemId}>
                {item.image ? (
                  <img className="cart-item__image" src={item.image} alt="" />
                ) : (
                  <div aria-hidden="true" className="cart-item__image cart-item__image--empty" />
                )}
                <div className="cart-item__details">
                  <div className="cart-item__topline">
                    <div>
                      <h3>{item.name}</h3>
                      <p>SIZE: {item.size}</p>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </div>
                  <div className="cart-item__controls">
                    <div aria-label={`Quantity for ${item.name}`} className="quantity-control">
                      <button
                        aria-label={`Decrease quantity of ${item.name}`}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        type="button"
                      >
                        <FiMinus aria-hidden="true" />
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        aria-label={`Increase quantity of ${item.name}`}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        type="button"
                      >
                        <FiPlus aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.cartItemId)}
                      type="button"
                    >
                      <FiTrash2 aria-hidden="true" />
                      REMOVE
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-drawer__footer">
          <div className="cart-drawer__total">
            <span>SUBTOTAL</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <p className="cart-drawer__note">Shipping and taxes calculated at checkout.</p>
          <div className="cart-drawer__actions">
            <Button className="cart-drawer__action" onClick={onClose} variant="secondary">
              View Cart
            </Button>
            <Button className="cart-drawer__action" onClick={onClose}>
              Checkout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default CartDrawer
