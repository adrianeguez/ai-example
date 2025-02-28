'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Product } from '@/types/models'
import { products } from '@/data/products'
import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowLeft, CheckCircle2, XCircle, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const { addToCart, isInCart, removeFromCart } = useCartStore()

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id)
    setProduct(foundProduct || null)
  }, [params.id])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    )
  }

  const handleCartAction = () => {
    if (isInCart(product.id)) {
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
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex gap-2 mb-4">
              <Badge variant="outline" className="capitalize">
                {product.category}
              </Badge>
              {product.isBestSeller && (
                <Badge className="bg-yellow-500">
                  <Star className="h-3 w-3 mr-1" />
                  Best Seller
                </Badge>
              )}
              {product.inStock ? (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <XCircle className="h-3 w-3 mr-1" />
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-3xl font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </div>

          <Button
            size="lg"
            className={`w-full ${isInCart(product.id) ? 'bg-red-600 hover:bg-red-700' : ''}`}
            onClick={handleCartAction}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isInCart(product.id) ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
} 