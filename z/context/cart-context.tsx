"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect, useCallback } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, newQuantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("artisanAxisCart")
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("artisanAxisCart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        toast.success(`Updated quantity for ${item.name}`)
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i))
      } else {
        toast.success(`${item.name} added to cart!`)
        return [...prevItems, { ...item, quantity: quantityToAdd }]
      }
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id)
      if (removedItem) {
        toast.info(`${removedItem.name} removed from cart.`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }, [])

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== id)
      }
      return prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    toast.info("Cart cleared.")
  }, [])

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
