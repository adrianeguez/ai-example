'use client'

import { Product } from '@/types/models'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, CheckCircle2, XCircle, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const { addToCart, removeFromCart, isInCart } = useCartStore()
  const isProductInCart = isInCart(product.id)

  const handleCartAction = () => {
    if (isProductInCart) {
      removeFromCart(product.id)
      toast('Product removed from cart', {
        description: `${product.name} has been removed from your cart.`,
        action: {
          label: 'Undo',
          onClick: () => addToCart(product)
        }
      })
    } else {
      addToCart(product)
      toast('Product added to cart', {
        description: `${product.name} has been added to your cart.`,
        action: {
          label: 'Undo',
          onClick: () => removeFromCart(product.id)
        }
      })
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="space-y-0 p-0">
        {/* Badges Container */}
        <div className="px-6 pt-6 pb-2 flex justify-between">
          <div className="flex flex-col gap-2">
            {product.isBestSeller && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600 flex gap-1 items-center">
                <Star className="h-3 w-3" />
                Best Seller
              </Badge>
            )}
            <Badge 
              className="capitalize" 
              variant="outline"
            >
              {product.category}
            </Badge>
          </div>
          <div>
            {product.inStock ? (
              <Badge className="bg-green-500 hover:bg-green-600 flex gap-1 items-center">
                <CheckCircle2 className="h-3 w-3" />
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex gap-1 items-center">
                <XCircle className="h-3 w-3" />
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-100 rounded-md overflow-hidden px-6">
          <Image
            src={imageError ? '/images/placeholder-product.jpg' : product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-md transition-opacity duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.isBestSeller}
          />
        </div>

        <CardTitle className="px-6 pt-4 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow pt-2">
        <p className="text-gray-600 line-clamp-2 text-sm mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </p>
          {product.isBestSeller && (
            <Badge variant="outline" className="text-yellow-600 border-yellow-300">
              Top Rated
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button 
          className={`flex-1 ${isProductInCart ? 'bg-red-600 hover:bg-red-700' : ''}`}
          disabled={!product.inStock}
          onClick={handleCartAction}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isProductInCart ? 'Remove' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
} 