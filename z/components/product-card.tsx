"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  id: string
  name: string
  price: number | null
  imageUrl: string
  description?: string
  category?: string
  rating?: number
}

export function ProductCard({ id, name, price, imageUrl, description }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ id, name, price: price ?? 0, imageUrl })
  }

  return (
    <Link
      href={`/products/${id}`}
      className="group block overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-card border border-border"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4 bg-card flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-serif">
            {name}
          </h3>
          {description && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>}
          <p className="mt-3 text-xl font-extrabold text-primary">${(price ?? 0).toFixed(2)}</p>
        </div>
        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  )
}
