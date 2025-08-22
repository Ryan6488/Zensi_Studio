"use server"

import { createClient } from "@/lib/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  productId: z.string().uuid("Invalid product ID."),
  rating: z.coerce.number().min(1, "Rating is required.").max(5, "Rating must be between 1 and 5."),
  comment: z.string().min(10, "Comment must be at least 10 characters long.").max(500, "Comment is too long."),
})

export async function submitReview(prevState: any, formData: FormData) {
  const supabase = createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return { success: false, message: "You must be logged in to submit a review." }
  }

  const productId = formData.get("productId") as string
  const rating = formData.get("rating") as string
  const comment = formData.get("comment") as string

  const validation = reviewSchema.safeParse({ productId, rating, comment })

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message }
  }

  try {
    const { error } = await supabase.from("reviews").insert({
      product_id: validation.data.productId,
      user_id: userData.user.id, // Associate review with logged-in user
      reviewer_name: userData.user.user_metadata.full_name || userData.user.email, // Use full name or email
      rating: validation.data.rating,
      comment: validation.data.comment,
    })

    if (error) {
      console.error("Error submitting review:", error)
      return { success: false, message: "Failed to submit review. Please try again." }
    }

    revalidatePath(`/products/${validation.data.productId}`) // Revalidate the product page to show new review
    return { success: true, message: "Review submitted successfully!" }
  } catch (error) {
    console.error("Unexpected error submitting review:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
