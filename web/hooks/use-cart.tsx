"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  imageSrc: string
  unitLabel: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      }

      return [...current, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== id))
      return
    }

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo(() => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }
  }, [addItem, clearCart, items, removeItem, updateQuantity])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}
