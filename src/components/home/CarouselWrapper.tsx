'use client'

import dynamic from 'next/dynamic'
import { Product } from '@/types/models'

const ClientCarousel = dynamic(() => import('./ClientCarousel'), {
  ssr: false,
})

interface CarouselWrapperProps {
  products: Product[]
}

export default function CarouselWrapper({ products }: CarouselWrapperProps) {
  return <ClientCarousel products={products} />
} 