'use client'

import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Trash2, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore()

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0)

  const handleClearCart = () => {
    clearCart()
    toast('Cart cleared', {
      description: 'All items have been removed from your cart.'
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Your cart is empty</AlertTitle>
          <AlertDescription>
            Add some products to your cart to see them here.
            <Link href="/all-products" className="block mt-2 text-purple-600 hover:text-purple-700">
              Continue Shopping →
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button 
            variant="destructive" 
            onClick={handleClearCart}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      removeFromCart(item.id)
                      toast('Product removed', {
                        description: `${item.name} has been removed from your cart.`
                      })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Number of Items:</span>
              <span className="font-semibold">{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">${totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4">
            <Link href="/all-products" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/checkout" className="flex-1">
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 