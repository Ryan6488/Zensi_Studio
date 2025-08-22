"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterIcon } from 'lucide-react'
import { ShopFilters } from "@/components/shop-filters"
import React from "react"

interface MobileFilterSheetProps {
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

export function MobileFilterSheet({ onFilterChange, initialFilters, availableCategories }: MobileFilterSheetProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 font-bold uppercase">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0 bg-card border-r border-border">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="text-foreground">Filter Products</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
          <ShopFilters
            onFilterChange={(filters) => {
              onFilterChange(filters)
              setOpen(false) // Close sheet after applying filters
            }}
            initialFilters={initialFilters}
            availableCategories={availableCategories}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
