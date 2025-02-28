'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types/models'

interface ClientCarouselProps {
  products: Product[]
}

export default function ClientCarousel({ products }: ClientCarouselProps) {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
} 