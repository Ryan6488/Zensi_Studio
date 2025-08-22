"use client"

import type React from "react"
import { Toaster } from "sonner"
import { CartProvider } from "@/context/cart-context"
import { HeaderContent } from "@/components/header-content"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Music } from 'lucide-react'

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground font-serif">
        <HeaderContent />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-card mt-16">
          <div className="container mx-auto px-4 md:px-6 py-12 font-serif">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <h3 className="font-black text-2xl text-primary mb-4 urban-shadow font-serif">ZENSI STREET</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Where underground culture meets street fashion. Authentic hip-hop apparel, 
                  vinyl records, and graffiti-inspired gear for the real ones.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                  </Link>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Music className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-foreground mb-4 uppercase tracking-wide font-serif">Quick Links</h4>
                <nav className="grid gap-2 text-sm">
                  <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                    Shop All
                  </Link>
                  <Link href="/products?category=Hip-Hop Fashion" className="text-muted-foreground hover:text-primary transition-colors">
                    Hip-Hop Fashion
                  </Link>
                  <Link href="/products?category=Vinyl Records" className="text-muted-foreground hover:text-primary transition-colors">
                    Vinyl Records
                  </Link>
                  <Link href="/products?category=Graffiti Gear" className="text-muted-foreground hover:text-primary transition-colors">
                    Graffiti Gear
                  </Link>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Culture Blog
                  </Link>
                </nav>
              </div>
              
              {/* Support */}
              <div>
                <h4 className="font-bold text-foreground mb-4 uppercase tracking-wide font-serif">Support</h4>
                <nav className="grid gap-2 text-sm">
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </nav>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Zensi Street. All rights reserved. Keep it real.
              </p>
              <p className="text-sm text-muted-foreground font-serif">
                Made with ❤️ for the culture
              </p>
            </div>
          </div>
        </footer>
      </div>
      <Toaster theme="dark" />
    </CartProvider>
  )
}
