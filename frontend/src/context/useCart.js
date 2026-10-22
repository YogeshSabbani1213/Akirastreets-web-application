import { useContext } from 'react'
import { CartContext } from './cartContext.js'

// WHY: Fail clearly when cart functionality is used outside its provider.
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider.')
  }

  return context
}
