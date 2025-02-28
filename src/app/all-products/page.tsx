'use client'

import { useProductStore } from '@/store/useProductStore'
import ProductCard from '@/components/products/ProductCard'
import ProductFilters from '@/components/products/ProductFilters'
import { Pagination } from '@/components/ui/pagination'
import { useState, useMemo } from 'react'

const ITEMS_PER_PAGE = 9

export default function AllProductsPage() {
  const { filteredProducts } = useProductStore()
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  // Get current page's products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Reset to first page when filters change total results
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Fixed Filters Sidebar */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-4">
            <ProductFilters />
          </div>
        </aside>

        {/* Products Section */}
        <section className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </main>
  )
} 