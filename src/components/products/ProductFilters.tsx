'use client'

import { useProductStore } from '@/store/useProductStore'
import { ProductCategory } from '@/types/models'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const categories: ProductCategory[] = ['protein', 'vitamins', 'minerals', 'supplements', 'herbs']

const categoryOptions = categories.map(category => ({
  label: category.charAt(0).toUpperCase() + category.slice(1),
  value: category,
}))

export default function ProductFilters() {
  const {
    selectedCategories = [],
    setSelectedCategories,
    priceRange,
    setPriceRange,
    products,
    resetFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    showBestSellers,
    setShowBestSellers,
  } = useProductStore()

  // Client-side state for price range
  const [priceRangeValues, setPriceRangeValues] = useState({
    min: 0,
    max: 100,
  })

  // Initialize price range after component mounts
  useEffect(() => {
    const minPrice = Math.min(...products.map(p => p.price))
    const maxPrice = Math.max(...products.map(p => p.price))
    setPriceRangeValues({ min: minPrice, max: maxPrice })
  }, [products])

  // Handle price range changes
  const handlePriceRangeChange = ([min, max]: number[]) => {
    setPriceRange({ min, max })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold mb-4 text-lg">Filters</h2>
        </div>

        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search-products" className="font-medium">
            Search Products
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search-products"
              type="search"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
              aria-label="Search products by name or description"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Enter product name or description to search
          </p>
        </div>

        {/* Best Sellers Filter */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="best-sellers"
              checked={showBestSellers}
              onCheckedChange={(checked) => setShowBestSellers(checked as boolean)}
            />
            <Label 
              htmlFor="best-sellers" 
              className="text-sm font-normal cursor-pointer flex items-center gap-2"
            >
              Best Sellers
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </Label>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Categories</Label>
          <CheckboxGroup
            options={categoryOptions}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            className="mt-2"
          />
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="text-sm text-gray-500 mb-2">
            ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
          </div>
          <Slider
            min={priceRangeValues.min}
            max={priceRangeValues.max}
            step={0.01}
            value={[priceRange.min, priceRange.max]}
            onValueChange={handlePriceRangeChange}
          />
        </div>

        {/* Sort Options */}
        <div className="space-y-2">
          <Label>Sort By</Label>
          <Select
            value={sortBy || 'default'}
            onValueChange={(value) => setSortBy(value === 'default' ? null : value as typeof sortBy)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Default Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Order</SelectItem>
              <SelectItem value="best-sellers">Best Sellers</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full mt-4"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
} 