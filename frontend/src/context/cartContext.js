import { createContext } from 'react'

// WHY: Share the cart context without mixing context exports with Fast Refresh components.
export const CartContext = createContext(null)
