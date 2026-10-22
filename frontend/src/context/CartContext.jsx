import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { CartContext } from './cartContext.js'

const CART_STORAGE_KEY = 'akira-cart'

// WHY: Restore saved cart lines so shoppers keep their cart after reloading the site.
function loadCart() {
  if (typeof window === 'undefined') return []

  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!savedCart) return []

    const parsedCart = JSON.parse(savedCart)
    if (
      Array.isArray(parsedCart) &&
      parsedCart.every(
        (item) =>
          item &&
          typeof item.cartItemId === 'string' &&
          typeof item.id === 'string' &&
          Number.isFinite(item.price) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      )
    ) {
      return parsedCart
    }

    console.error('Saved cart data is invalid and was not restored.')
    return []
  } catch (error) {
    console.error('Unable to read the saved cart.', error)
    return []
  }
}

// WHY: Keep cart changes predictable by applying each action through one reducer.
function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = items.find(
        (item) => item.cartItemId === action.item.cartItemId,
      )

      if (existingItem) {
        return items.map((item) =>
          item.cartItemId === action.item.cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...items, { ...action.item, quantity: 1 }]
    }
    case 'remove':
      return items.filter((item) => item.cartItemId !== action.cartItemId)
    case 'updateQuantity':
      if (action.quantity <= 0) {
        return items.filter((item) => item.cartItemId !== action.cartItemId)
      }

      return items.map((item) =>
        item.cartItemId === action.cartItemId
          ? { ...item, quantity: action.quantity }
          : item,
      )
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)

  // WHY: Persist every cart update so the cart survives a page refresh.
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Unable to save the cart.', error)
    }
  }, [items])

  const addToCart = useCallback((product, size = product.sizes?.[0] ?? 'ONE SIZE') => {
    if (!product?.id || !Number.isFinite(product.price)) {
      throw new TypeError('A product with an id and finite price is required.')
    }

    dispatch({
      type: 'add',
      item: {
        id: product.id,
        cartItemId: `${product.id}::${size}`,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images?.[0] ?? '',
        size,
      },
    })
  }, [])

  const removeFromCart = useCallback((cartItemId) => {
    dispatch({ type: 'remove', cartItemId })
  }, [])

  const updateQuantity = useCallback((cartItemId, quantity) => {
    if (!Number.isInteger(quantity)) {
      throw new TypeError('Cart quantity must be an integer.')
    }

    dispatch({ type: 'updateQuantity', cartItemId, quantity })
  }, [])

  const cartCount = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items],
  )
  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )
  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartCount,
      cartTotal,
    }),
    [items, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
