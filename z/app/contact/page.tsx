"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitContactForm } from "@/actions/contact"
import { toast } from "sonner"

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 street-text urban-shadow font-serif">
          GET IN TOUCH
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Got questions? Want to collaborate? Hit us up and let's talk culture.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground font-black uppercase">Send Us a Message</CardTitle>
            <CardDescription className="text-muted-foreground">
              We'd love to hear from you! Drop us a line below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-foreground font-bold uppercase text-sm">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-foreground font-bold uppercase text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@example.com"
                  required
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject" className="text-foreground font-bold uppercase text-sm">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message" className="text-foreground font-bold uppercase text-sm">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  rows={5}
                  required
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase street-pulse"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info & Map */}
        <div className="space-y-8">
          <Card className="bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground font-black uppercase">Find Us</CardTitle>
              <CardDescription className="text-muted-foreground">
                Our location and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <h3 className="font-bold text-foreground uppercase text-sm mb-2">Address</h3>
                <p className="text-muted-foreground">
                  Chadau Mohalla, Panipat<br />
                  Kabul Bagh, Haryana 132103<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground uppercase text-sm mb-2">Phone</h3>
                <p className="text-muted-foreground">+91-8397860619</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground uppercase text-sm mb-2">Email</h3>
                <p className="text-muted-foreground">ryanzensi32@gmail.com</p>
              </div>
              <div>
                <h3 className="font-bold text-foreground uppercase text-sm mb-2">Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground font-black uppercase">Connect With Us</CardTitle>
              <CardDescription className="text-muted-foreground">
                Follow us on social media for the latest drops and culture updates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                  Instagram
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                  Twitter
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                  YouTube
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase">
                  TikTok
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <Card className="bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground font-black uppercase text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="font-serif">
                <h4 className="font-bold text-foreground mb-2 uppercase text-sm font-serif">Shipping & Returns</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  We ship worldwide and offer free returns within 30 days. Check our shipping policy for details.
                </p>
                
                <h4 className="font-bold text-foreground mb-2 uppercase text-sm font-serif">Product Authenticity</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  All our products are authentic and sourced directly from artists and verified suppliers.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2 uppercase text-sm font-serif">Custom Orders</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  We accept custom orders for bulk purchases and special collaborations. Contact us for details.
                </p>
                
                <h4 className="font-bold text-foreground mb-2 uppercase text-sm font-serif">Artist Collaborations</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Interested in collaborating? We're always looking for authentic street artists to work with.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
