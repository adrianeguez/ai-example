import { Product } from '@/types/models'

// Use a fixed timestamp for all products
const NOW = '2024-01-01T00:00:00.000Z'

// Use specific Unsplash photo IDs for more stable images
const PRODUCT_IMAGES = {
  protein: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9',
  vitamins: 'https://images.unsplash.com/photo-1577401239170-897942555fb3',
  minerals: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843',
  preworkout: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba',
  herbs: 'https://images.unsplash.com/photo-1564500601744-d5daa8922b10',
  fishoil: 'https://images.unsplash.com/photo-1559333086-b0a56225a93c',
  vegan: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f',
  zinc: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6',
  turmeric: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5',
  bcaa: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9',
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Whey Protein Isolate',
    description: 'High-quality protein powder for muscle recovery and growth. 25g of protein per serving with minimal fat and carbs.',
    price: 59.99,
    category: 'protein',
    imageUrl: PRODUCT_IMAGES.protein,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '2',
    name: 'Vitamin D3 + K2 Complex',
    description: 'Essential vitamins for bone health and immune system support. High absorption formula.',
    price: 24.99,
    category: 'vitamins',
    imageUrl: PRODUCT_IMAGES.vitamins,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '3',
    name: 'Magnesium Glycinate',
    description: 'High-absorption magnesium supplement for sleep, muscle, and nerve function support.',
    price: 29.99,
    category: 'minerals',
    imageUrl: PRODUCT_IMAGES.minerals,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '4',
    name: 'Pre-Workout Energy Blend',
    description: 'Advanced pre-workout formula with caffeine, beta-alanine, and L-citrulline for maximum performance.',
    price: 45.99,
    category: 'supplements',
    imageUrl: PRODUCT_IMAGES.preworkout,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '5',
    name: 'Ashwagandha Root Extract',
    description: 'Traditional herb for stress relief and mental clarity. Standardized for maximum potency.',
    price: 34.99,
    category: 'herbs',
    imageUrl: PRODUCT_IMAGES.herbs,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '6',
    name: 'Omega-3 Fish Oil',
    description: 'Pure fish oil supplement rich in EPA and DHA for heart and brain health.',
    price: 32.99,
    category: 'supplements',
    imageUrl: PRODUCT_IMAGES.fishoil,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '7',
    name: 'Plant-Based Protein',
    description: 'Complete vegan protein blend with pea, rice, and hemp proteins. 20g protein per serving.',
    price: 49.99,
    category: 'protein',
    imageUrl: PRODUCT_IMAGES.vegan,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '8',
    name: 'ZMA Complex',
    description: 'Zinc, Magnesium, and B6 complex for better sleep and recovery.',
    price: 27.99,
    category: 'minerals',
    imageUrl: PRODUCT_IMAGES.zinc,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '9',
    name: 'Turmeric Curcumin',
    description: 'High-potency turmeric extract with enhanced absorption for joint health.',
    price: 38.99,
    category: 'herbs',
    imageUrl: PRODUCT_IMAGES.turmeric,
    isBestSeller: true,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  },
  {
    id: '10',
    name: 'BCAA Recovery Complex',
    description: '2:1:1 ratio of branched-chain amino acids for muscle recovery and endurance.',
    price: 36.99,
    category: 'supplements',
    imageUrl: PRODUCT_IMAGES.bcaa,
    isBestSeller: false,
    inStock: true,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW)
  }
]

export const getBestSellers = () => products.filter(product => product.isBestSeller) 