'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ViewAllButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push('/all-products')}
      className="group bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      View All Products
      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  )
} 