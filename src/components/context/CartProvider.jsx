import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItemList, setCartItemList] = useState([])

  const addToCart = (itemId) => {
    setCartItemList((prev) => {
      const existingItem = prev.find((item) => item.id === itemId)

      if (existingItem) {
        const updated = prev.map((item) =>
          item.id === itemId ? { ...item, qty: item.qty + 1 } : item
        )
        return updated
      } else {
        const updated = [...prev, { id: itemId, qty: 1 }]
        return updated
      }
    })
  }

  const removeFromCart = (itemId) => {
    setCartItemList((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQty = (itemId, newQty) => {
    setCartItemList((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item

        const parsed = parseInt(newQty, 10)

        if (isNaN(parsed) || parsed < 1) return item

        return { ...item, qty: parsed }
      })
    )
  }

  return (
    <CartContext.Provider
      value={{ cartItemList, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
