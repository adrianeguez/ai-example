import { create } from 'zustand'
import { Order, ProductCategory, OrderStatus } from '@/types/models'
import { products } from '@/data/products'

// Helper function to generate random dates within the last 30 days
const getRandomDate = () => {
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - 30)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Helper function to get random products
const getRandomProducts = (min = 1, max = 4) => {
  const numProducts = Math.floor(Math.random() * (max - min + 1)) + min
  const selectedProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, numProducts)
  
  return selectedProducts.map(product => ({
    productId: product.id,
    product: product,
    quantity: 1,
    priceAtPurchase: product.price
  }))
}

// Helper function to calculate total amount
const calculateTotal = (items: Order['items']) => {
  return items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0)
}

// Initial orders data
const initialOrders: Order[] = Array.from({ length: 20 }, (_, i) => {
  const orderItems = getRandomProducts()
  const totalAmount = calculateTotal(orderItems)

  return {
    id: `order-${i + 1}`,
    customerId: `customer-${i + 1}`,
    customer: {
      id: `customer-${i + 1}`,
      firstName: `Customer`,
      lastName: `${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `(555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i).slice(1)}`,
      shippingAddress: {
        street: `${1000 + i} Main St`,
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      },
      billingAddress: {
        street: `${1000 + i} Main St`,
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'United States'
      }
    },
    items: orderItems,
    status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)] as OrderStatus,
    totalAmount,
    shippingAddress: {
      street: `${1000 + i} Main St`,
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    billingAddress: {
      street: `${1000 + i} Main St`,
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    createdAt: getRandomDate(),
    updatedAt: getRandomDate(),
    notes: i % 3 === 0 ? 'Special handling required' : undefined
  }
}).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

interface OrderStore {
  // State
  orders: Order[]
  
  // Actions
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  getOrderById: (orderId: string) => Order | undefined
  getOrdersByCustomer: (customerId: string) => Order[]
  getOrdersByStatus: (status: OrderStatus) => Order[]
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  // Initial State
  orders: initialOrders,

  // Actions
  addOrder: (order) => {
    set((state) => ({
      orders: [order, ...state.orders]
    }))
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    }))
  },

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId)
  },

  getOrdersByCustomer: (customerId) => {
    return get().orders.filter(order => order.customerId === customerId)
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter(order => order.status === status)
  }
})) 