import { create } from 'zustand'
import { Product } from '@/types/models'
import { products as initialProducts } from '@/data/products'

interface ProductStore {
  // State
  products: Product[]
  filteredProducts: Product[]
  searchQuery: string
  selectedCategories: string[]
  priceRange: { min: number; max: number }
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'best-sellers' | null
  showBestSellers: boolean

  // Actions
  setProducts: (products: Product[]) => void
  setFilteredProducts: (products: Product[]) => void
  setSearchQuery: (query: string) => void
  setSelectedCategories: (categories: string[]) => void
  setPriceRange: (range: { min: number; max: number }) => void
  setSortBy: (sort: ProductStore['sortBy']) => void
  setShowBestSellers: (show: boolean) => void
  
  // Filter and Sort Methods
  filterProducts: () => void
  sortProducts: () => void
  resetFilters: () => void
}

// Calculate initial price range once
const initialPriceRange = {
  min: Math.min(...initialProducts.map(p => p.price)),
  max: Math.max(...initialProducts.map(p => p.price))
}

export const useProductStore = create<ProductStore>((set, get) => ({
  // Initial State
  products: initialProducts,
  filteredProducts: initialProducts,
  searchQuery: '',
  selectedCategories: [],
  priceRange: initialPriceRange,
  sortBy: null,
  showBestSellers: false,

  // Actions
  setProducts: (products) => set({ products }),
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().filterProducts()
  },
  setSelectedCategories: (categories) => {
    set({ selectedCategories: categories || [] }) // Ensure we always have an array
    get().filterProducts()
  },
  setPriceRange: (range) => {
    set({ priceRange: range })
    get().filterProducts()
  },
  setSortBy: (sort) => {
    set({ sortBy: sort })
    get().sortProducts()
  },
  setShowBestSellers: (show) => {
    set({ showBestSellers: show })
    get().filterProducts()
  },

  // Filter Method
  filterProducts: () => {
    const { products, searchQuery, selectedCategories, priceRange, showBestSellers } = get()
    
    let filtered = [...(products || [])]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (selectedCategories && selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      )
    }

    // Apply best sellers filter
    if (showBestSellers) {
      filtered = filtered.filter(product => product.isBestSeller)
    }

    // Apply price range filter
    if (priceRange) {
      filtered = filtered.filter(product => 
        product.price >= priceRange.min && 
        product.price <= priceRange.max
      )
    }

    set({ filteredProducts: filtered })
    get().sortProducts()
  },

  // Sort Method
  sortProducts: () => {
    const { filteredProducts, sortBy } = get()
    const sorted = [...(filteredProducts || [])] // Use const as it's not reassigned

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'best-sellers':
        sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
        break
      default:
        // Keep original order if no sort specified
        break
    }

    set({ filteredProducts: sorted })
  },

  // Reset Filters
  resetFilters: () => {
    set({
      searchQuery: '',
      selectedCategories: [],
      priceRange: initialPriceRange,
      sortBy: null,
      showBestSellers: false,
      filteredProducts: initialProducts
    })
  }
})) 