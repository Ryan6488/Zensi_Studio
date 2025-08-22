"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { StarIcon } from 'lucide-react'

interface ShopFiltersProps {
  onFilterChange: (filters: {
    searchQuery: string
    category: string
    priceRange: [number, number]
    rating: number
  }) => void
  initialFilters: {
    searchQuery: string
    category: string
    priceRange: [number, number]
    rating: number
  }
  availableCategories: string[]
}

export function ShopFilters({ onFilterChange, initialFilters, availableCategories }: ShopFiltersProps) {
  const [searchQuery, setSearchQuery] = React.useState(initialFilters.searchQuery)
  const [category, setCategory] = React.useState(initialFilters.category)
  const [priceRange, setPriceRange] = React.useState(initialFilters.priceRange)
  const [rating, setRating] = React.useState(initialFilters.rating.toString())

  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange({
        searchQuery,
        category,
        priceRange,
        rating: Number.parseFloat(rating),
      })
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, category, priceRange, rating, onFilterChange])

  const handleResetFilters = () => {
    setSearchQuery("")
    setCategory("")
    setPriceRange([0, 200])
    setRating("0")
  }

  return (
    <div className="p-6 bg-card flex flex-col gap-6 font-serif">
      <h3 className="text-lg font-bold text-foreground font-serif">Filters</h3>
      {/* Search Bar */}
      <div className="grid gap-2">
        <Label htmlFor="search" className="text-muted-foreground">
          Search Products
        </Label>
        <Input
          id="search"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-input border-border text-foreground focus:ring-primary"
        />
      </div>
      {/* Category Filter */}
      <div className="grid gap-2">
        <Label htmlFor="category" className="text-muted-foreground">
          Category
        </Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="bg-input border-border text-foreground focus:ring-primary">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            <SelectItem value="all">All Categories</SelectItem>
            {availableCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Price Filter */}
      <div className="grid gap-2">
        <Label htmlFor="price-range" className="text-muted-foreground">
          Price Range
        </Label>
        <Slider
          id="price-range"
          min={0}
          max={200}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-[90%] [&>span:first-child]:bg-primary [&>span:first-child]:text-primary"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0].toFixed(2)}</span>
          <span>${priceRange[1].toFixed(2)}</span>
        </div>
      </div>
      {/* Rating Filter */}
      <div className="grid gap-2">
        <Label className="text-muted-foreground">Minimum Rating</Label>
        <RadioGroup value={rating} onValueChange={setRating} className="grid gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="rating-0" className="border-border text-primary" />
            <Label htmlFor="rating-0" className="text-foreground">
              Any Rating
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="rating-4" className="border-border text-primary" />
            <Label htmlFor="rating-4" className="flex items-center gap-1 text-foreground">
              4 <StarIcon className="w-4 h-4 fill-cta-highlight text-cta-highlight" /> & Up
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="rating-3" className="border-border text-primary" />
            <Label htmlFor="rating-3" className="flex items-center gap-1 text-foreground">
              3 <StarIcon className="w-4 h-4 fill-cta-highlight text-cta-highlight" /> & Up
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        variant="outline"
        onClick={handleResetFilters}
        className="border-primary text-primary hover:bg-primary hover:text-background bg-transparent transition-all duration-300 font-bold uppercase"
      >
        Reset Filters
      </Button>
    </div>
  )
}
