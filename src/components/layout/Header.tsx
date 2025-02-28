'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/all-products' },
  { name: 'Provider Portal', href: '/all-orders' },
]

export default function Header() {
  const pathname = usePathname()
  const { items } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            Supplement Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  pathname === item.href ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-purple-50"
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-purple-50"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header with Logo */}
                  <SheetHeader className="border-b px-6 py-4">
                    <SheetTitle>
                      <Link 
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        Supplement Store
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-medium transition-colors hover:text-purple-600 ${
                          pathname === item.href 
                            ? 'text-purple-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-600' 
                            : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Footer with Cart Info */}
                  <div className="border-t px-6 py-4">
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="font-medium">Cart ({items.length})</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
} 