"use server"

import { createClient } from "@/lib/server"
import { z } from "zod"

const emailSchema = z.string().email("Invalid email address.")

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string

  const validation = emailSchema.safeParse(email)

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.from("newsletter_subscribers").insert({ email })

    if (error) {
      if (error.code === "23505") {
        // Unique violation error code
        return { success: false, message: "This email is already subscribed." }
      }
      console.error("Error subscribing to newsletter:", error)
      return { success: false, message: "Failed to subscribe. Please try again." }
    }

    return { success: true, message: "Successfully subscribed to our newsletter!" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
