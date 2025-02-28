import { getBestSellers } from '@/data/products'
import CarouselWrapper from './CarouselWrapper'

export default function BestSellersCarousel() {
  const bestSellers = getBestSellers()
  return <CarouselWrapper products={bestSellers} />
} 