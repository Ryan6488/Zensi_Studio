"use client"

import React from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { subscribeToNewsletter } from "@/actions/newsletter"
import { toast } from "sonner"

export function NewsletterForm() {
  const [newsletterState, newsletterAction, isNewsletterPending] = useActionState(subscribeToNewsletter, null)
  const [email, setEmail] = React.useState("")

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address.")
      return
    }
    const formData = new FormData()
    formData.append("email", email)
    const result = await subscribeToNewsletter(formData)
    if (result.success) {
      toast.success(result.message)
      setEmail("")
    } else {
      toast.error(result.message)
    }
  }

  return (
    <form
      action={newsletterAction}
      className="w-full max-w-md space-y-4 animate-in fade-in zoom-in-90 duration-700 delay-200 mx-auto" // Added mx-auto here
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 rounded-md border border-border focus:ring-2 focus:ring-primary focus:outline-none bg-transparent text-foreground"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-cta-highlight text-background hover:bg-cta-highlight/90 transition-all duration-300 font-bold uppercase"
        disabled={isNewsletterPending}
      >
        {isNewsletterPending ? "Subscribing..." : "Subscribe"}
      </Button>
      {newsletterState && (
        <p className={`text-sm ${newsletterState.success ? "text-primary" : "text-destructive"}`}>
          {newsletterState.message}
        </p>
      )}
    </form>
  )
}
