"use server"

import { createClient } from "@/lib/server"
import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long."),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  const validation = contactFormSchema.safeParse({ name, email, subject, message })

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.from("contact_messages").insert({
      name: validation.data.name,
      email: validation.data.email,
      subject: validation.data.subject,
      message: validation.data.message,
    })

    if (error) {
      console.error("Error submitting contact form:", error)
      return { success: false, message: "Failed to send message. Please try again." }
    }

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
