'use client'

import { useState, useMemo, useEffect } from 'react'
import { useOrderStore } from '@/store/useOrderStore'
import { Pagination } from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, CalendarIcon, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { OrderStatus } from '@/types/models'
import { useRouter } from 'next/navigation'

const ITEMS_PER_PAGE = 10
const ORDER_STATUS: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered']

export default function AllOrdersPage() {
  const { orders } = useOrderStore()
  const [isClient, setIsClient] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all')
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const router = useRouter()

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter orders based on search and filters
  const filteredOrders = useMemo(() => {
    if (!isClient) return []
    
    return orders.filter(order => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery === '' || 
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.firstName.toLowerCase().includes(searchLower) ||
        order.customer.lastName.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.product.name.toLowerCase().includes(searchLower))

      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus

      const matchesDateRange = (!dateRange.from || new Date(order.createdAt) >= dateRange.from) &&
        (!dateRange.to || new Date(order.createdAt) <= dateRange.to)

      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [orders, searchQuery, selectedStatus, dateRange, isClient])

  // Get current page's orders
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredOrders, currentPage])

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)

  // Reset to first page when filters change
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedStatus('all')
    setDateRange({ from: undefined, to: undefined })
    setCurrentPage(1)
  }

  const handleViewDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`)
  }

  if (!isClient) {
    return null // or a loading state
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Filters Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by order ID, customer, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value as OrderStatus | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ORDER_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                'Pick a date range'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{format(new Date(order.createdAt), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  {order.customer.firstName} {order.customer.lastName}
                </TableCell>
                <TableCell>
                  {order.items.map(item => item.product.name).join(', ')}
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleViewDetails(order.id)}
                    className="hover:bg-gray-100"
                    title="View Order Details"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No orders found matching your criteria.</p>
        </div>
      )}
    </main>
  )
} 