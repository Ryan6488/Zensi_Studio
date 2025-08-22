"use client"

import type React from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, Music, Zap } from 'lucide-react'
import { useCart } from "@/context/cart-context"
import { createClient } from "@/lib/client"
import { useEffect, useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

function HeaderContent() {
  const { cartItemCount } = useCart()
  const supabase = createClient()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/90 shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 font-serif font-extrabold">
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-2xl md:text-3xl tracking-tighter text-primary hover:text-primary/90 transition-all duration-300 urban-shadow"
        >
          <Zap className="h-6 w-6 md:h-8 md:w-8" />
          ZENSI
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/products" className="text-sm font-bold hover:text-primary transition-colors duration-300 uppercase tracking-wide">
            Shop
          </Link>
          <Link href="/blog" className="text-sm font-bold hover:text-primary transition-colors duration-300 uppercase tracking-wide">
            {"Blog"}
          </Link>
          <Link href="/about" className="text-sm font-bold hover:text-primary transition-colors duration-300 uppercase tracking-wide">
            About
          </Link>
          <Link href="/contact" className="text-sm font-bold hover:text-primary transition-colors duration-300 uppercase tracking-wide">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/cart" className="relative group">
            <ShoppingCart className="h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300" />
            <span className="sr-only">Shopping Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground font-bold street-pulse">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          <Link href={isLoggedIn ? "/profile" : "/auth"} className="group">
            <User className="h-5 w-5 text-foreground group-hover:text-primary transition-colors duration-300" />
            <span className="sr-only">Account</span>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card border-border">
              <nav className="grid gap-6 text-lg font-bold pt-6">
                <Link href="/products" className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  Shop
                </Link>
                <Link href="/blog" className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  Culture
                </Link>
                <Link href="/about" className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  About
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  Contact
                </Link>
                <Link href="/cart" className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  Cart ({cartItemCount})
                </Link>
                <Link href={isLoggedIn ? "/profile" : "/auth"} className="hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                  Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export { HeaderContent }
