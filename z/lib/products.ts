import { createClient } from "@/lib/server"
import { cache } from 'react'

export const getProducts = cache(async ({ search, category, minPrice, maxPrice, sortBy }: { search?: string; category?: string; minPrice?: number; maxPrice?: number; sortBy?: string } = {}) => {
  const supabase = createClient()

  let query = supabase
    .from("products")
    .select("*")

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  if (minPrice !== undefined) {
    query = query.gte("price", minPrice)
  }

  if (maxPrice !== undefined) {
    query = query.lte("price", maxPrice)
  }

  if (sortBy === "price-asc") {
    query = query.order("price", { ascending: true })
  } else if (sortBy === "price-desc") {
    query = query.order("price", { ascending: false })
  } else if (sortBy === "name-asc") {
    query = query.order("name", { ascending: true })
  } else if (sortBy === "name-desc") {
    query = query.order("name", { ascending: false })
  } else if (sortBy === "rating-desc") {
    query = query.order("rating", { ascending: false })
  } else if (sortBy === "newest") {
    query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return { data: [], error }
  }

  return { data, error: null }
})

export const getCategories = cache(async () => {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select("*")

  if (error) {
    console.error("Error fetching categories:", error)
    return { data: [], error }
  }

  return { data, error: null }
})

export const getMinMaxPrice = cache(async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("price")
    .order("price", { ascending: true })

  if (error) {
    console.error("Error fetching price range:", error)
    return { min: 0, max: 500, error }
  }

  if (!data || data.length === 0) {
    return { min: 0, max: 500, error: null }
  }

  const prices = data.map((p) => p.price).filter((price) => typeof price === "number") as number[]
  const min = Math.min(...prices)
  const max = Math.max(...prices)

  return { min, max, error: null }
})

export const getProductById = cache(async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return { data: null, error }
  }

  return { data, error: null }
})

export const getProductReviews = cache(async (productId: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    return { data: null, error }
  }

  return { data, error: null }
})

export const getRelatedProducts = cache(async (productId: string, category: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", productId)
    .limit(4)

  if (error) {
    console.error("Error fetching related products:", error)
    return { data: null, error }
  }

  return { data, error: null }
})
