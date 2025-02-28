'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/all-products' },
    { name: 'Proteins', href: '/all-products?category=protein' },
    { name: 'Vitamins', href: '/all-products?category=vitamins' },
    { name: 'Minerals', href: '/all-products?category=minerals' },
    { name: 'Supplements', href: '/all-products?category=supplements' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
  support: [
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Track Order', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            <p className="text-base text-gray-600 mb-4">
              Follow us on social media for updates, tips, and special offers.
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 hover:text-purple-600 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                Supplement Store
              </Link>
            </div>
            <p className="mt-4 md:mt-0 text-base text-gray-500">
              © {currentYear} Supplement Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 