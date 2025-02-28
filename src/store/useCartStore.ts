import { create } from 'zustand'
import { Product } from '@/types/models'

interface CartStore {
  // State
  items: Product[]
  
  // Actions
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
}

export const useCartStore = create<CartStore>((set, get) => ({
  // Initial State
  items: [],

  // Actions
  addToCart: (product) => {
    const { items, isInCart } = get()
    if (!isInCart(product.id)) {
      set({ items: [...items, product] })
    }
  },

  removeFromCart: (productId) => {
    const { items } = get()
    set({ items: items.filter(item => item.id !== productId) })
  },

  clearCart: () => set({ items: [] }),

  isInCart: (productId) => {
    const { items } = get()
    return items.some(item => item.id === productId)
  },
})) 