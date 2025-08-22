"use server"

import { createClient } from "@/lib/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const wishlistSchema = z.object({
  productId: z.string().uuid("Invalid product ID."),
})

export async function toggleWishlist(prevState: any, formData: FormData) {
  const supabase = createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return { success: false, message: "You must be logged in to manage your wishlist." }
  }

  const productId = formData.get("productId") as string
  const isAdded = formData.get("isAdded") === "true" // Check if currently in wishlist

  const validation = wishlistSchema.safeParse({ productId })

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message }
  }

  try {
    if (isAdded) {
      // Remove from wishlist
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", userData.user.id)
        .eq("product_id", validation.data.productId)

      if (error) {
        console.error("Error removing from wishlist:", error)
        return { success: false, message: "Failed to remove from wishlist. Please try again." }
      }
      revalidatePath(`/products/${validation.data.productId}`)
      revalidatePath("/profile") // Revalidate profile page to update wishlist section
      return { success: true, message: "Removed from wishlist." }
    } else {
      // Add to wishlist
      const { error } = await supabase.from("wishlist").insert({
        user_id: userData.user.id,
        product_id: validation.data.productId,
      })

      if (error) {
        if (error.code === "23505") {
          // Unique violation, already in wishlist
          return { success: false, message: "Product is already in your wishlist." }
        }
        console.error("Error adding to wishlist:", error)
        return { success: false, message: "Failed to add to wishlist. Please try again." }
      }
      revalidatePath(`/products/${validation.data.productId}`)
      revalidatePath("/profile") // Revalidate profile page to update wishlist section
      return { success: true, message: "Added to wishlist!" }
    }
  } catch (error) {
    console.error("Unexpected error toggling wishlist:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
