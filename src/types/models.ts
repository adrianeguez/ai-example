// Product related types
export type ProductCategory = 'protein' | 'vitamins' | 'minerals' | 'supplements' | 'herbs'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: ProductCategory
  imageUrl: string
  isBestSeller: boolean
  inStock: boolean
  createdAt: Date
  updatedAt: Date
}

// Cart related types
export interface CartItem {
  productId: string
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalAmount: number
  totalItems: number
}

// Customer related types
export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  shippingAddress: Address
  billingAddress: Address
}

// Order related types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  product: Product
  quantity: number
  priceAtPurchase: number
}

export interface Order {
  id: string
  customerId: string
  customer: Customer
  items: OrderItem[]
  status: OrderStatus
  totalAmount: number
  shippingAddress: Address
  billingAddress: Address
  createdAt: Date
  updatedAt: Date
  notes?: string
} 