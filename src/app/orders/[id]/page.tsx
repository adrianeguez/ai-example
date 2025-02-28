'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useOrderStore } from '@/store/useOrderStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Package, User, Clock, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { OrderStatus } from '@/types/models'
import { toast } from 'sonner'
import Image from 'next/image'

const ORDER_STATUS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered']

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrderById, updateOrderStatus } = useOrderStore()
  const [order, setOrder] = useState(getOrderById(params.id as string))

  useEffect(() => {
    if (!order) {
      router.push('/all-orders')
    }
  }, [order, router])

  if (!order) {
    return null
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus)
    setOrder(getOrderById(order.id)) // Refresh order data
    toast.success('Order status updated successfully')
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
          <div className="flex items-center gap-4">
            <Select
              value={order.status}
              onValueChange={(value) => handleStatusChange(value as OrderStatus)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                {ORDER_STATUS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Order Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Timeline</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">
                    Created: {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <p className="text-sm">
                    Last Updated: {format(new Date(order.updatedAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Contact Details</h3>
                <p className="text-sm">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="text-sm">{order.customer.email}</p>
                <p className="text-sm">{order.customer.phone}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                  <p className="text-sm">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.productId} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">{item.product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.priceAtPurchase.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 