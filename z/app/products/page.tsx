"use client"

import React from "react"
import { ProductCard } from "@/components/product-card"
import { ShopFilters } from "@/components/shop-filters"
import { createClient } from "@/lib/client"
import { Card } from "@/components/ui/card"
import { useSearchParams, useRouter } from "next/navigation"
import { MobileFilterSheet } from "@/components/mobile-filter-sheet"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  rating: number
  review_count?: number | null
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [allProducts, setAllProducts] = React.useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [availableCategories, setAvailableCategories] = React.useState<string[]>([])

  const initialSearchQuery = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || ""
  const initialMinPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
  const initialMaxPrice = Number.parseFloat(searchParams.get("maxPrice") || "200")
  const initialRating = Number.parseFloat(searchParams.get("rating") || "0")

  const [filters, setFilters] = React.useState({
    searchQuery: initialSearchQuery,
    category: initialCategory,
    priceRange: [initialMinPrice, initialMaxPrice] as [number, number],
    rating: initialRating,
  })

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*")

      if (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
        return
      }

      const fetchedProducts: Product[] = data || []
      setAllProducts(fetchedProducts)

      const categories = Array.from(new Set(fetchedProducts.map((p) => p.category))).filter(Boolean)
      setAvailableCategories(categories as string[])

      setLoading(false)
    }

    fetchProducts()
  }, [])

  React.useEffect(() => {
    const applyFilters = () => {
      let tempProducts = [...allProducts]

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        tempProducts = tempProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            (product.description && product.description.toLowerCase().includes(query)),
        )
      }

      if (filters.category && filters.category !== "all") {
        tempProducts = tempProducts.filter((product) => product.category === filters.category)
      }

      tempProducts = tempProducts.filter(
        (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
      )

      if (filters.rating > 0) {
        tempProducts = tempProducts.filter((product) => product.rating >= filters.rating)
      }

      setFilteredProducts(tempProducts)

      const newParams = new URLSearchParams()
      if (filters.searchQuery) newParams.set("search", filters.searchQuery)
      if (filters.category && filters.category !== "all") newParams.set("category", filters.category)
      if (filters.priceRange[0] !== 0) newParams.set("minPrice", filters.priceRange[0].toString())
      if (filters.priceRange[1] !== 200) newParams.set("maxPrice", filters.priceRange[1].toString())
      if (filters.rating !== 0) newParams.set("rating", filters.rating.toString())

      router.replace(`/products?${newParams.toString()}`, { scroll: false })
    }

    applyFilters()
  }, [allProducts, filters, router])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-background flex-col lg:flex-row">
      {/* Desktop Filters */}
      <div className="hidden lg:block lg:w-64 border-r border-border">
        <ShopFilters
          onFilterChange={handleFilterChange}
          initialFilters={filters}
          availableCategories={availableCategories}
        />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden w-full p-4 border-b border-border bg-card">
        <MobileFilterSheet
          initialFilters={filters}
          availableCategories={availableCategories}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="flex-1 p-4 md:p-8 font-serif">
        <h1 className="text-4xl font-extrabold mb-8 text-foreground font-serif">Shop All Products</h1>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="aspect-[3/4] animate-pulse bg-muted border border-border" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No products found matching your criteria.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.image_url}
                description={product.description}
                category={product.category}
                rating={product.rating}
                reviewCount={product.review_count}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
