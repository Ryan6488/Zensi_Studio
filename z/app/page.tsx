"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/client"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { NewsletterForm } from "@/components/newsletter-form"
import { Music, Palette, Shirt, Headphones, Star, ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category?: string
  rating?: number
  review_count?: number | null
}

interface Category {
  name: string
  description: string
  imageUrl: string
  link: string
  icon: React.ReactNode
}

interface Testimonial {
  id: number
  name: string
  feedback: string
  rating: number
  location: string
}

const categories: Category[] = [
  {
    name: "Hip-Hop Fashion",
    description: "Authentic streetwear inspired by hip-hop legends and underground culture.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop",
    link: "/products?category=Hip-Hop Fashion",
    icon: <Shirt className="h-6 w-6" />,
  },
  {
    name: "Vinyl Records",
    description: "Classic and rare vinyl from underground artists and hip-hop pioneers.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=400&fit=crop",
    link: "/products?category=Vinyl Records",
    icon: <Music className="h-6 w-6" />,
  },
  {
    name: "Graffiti Gear",
    description: "Tools and apparel for street artists and graffiti culture enthusiasts.",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
    link: "/products?category=Graffiti Gear",
    icon: <Palette className="h-6 w-6" />,
  },
  {
    name: "Audio Equipment",
    description: "Professional headphones, speakers, and gear for the ultimate sound experience.",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop",
    link: "/products?category=Audio Equipment",
    icon: <Headphones className="h-6 w-6" />,
  },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus 'MC Flow' Johnson",
    feedback: "Zensi Street gets it. Real streetwear for real people. The quality is insane and the designs are straight fire.",
    rating: 5,
    location: "Brooklyn, NY"
  },
  {
    id: 2,
    name: "Sofia 'Graf Queen' Rodriguez",
    feedback: "Finally found a brand that understands street culture. Their graffiti gear is legit and the vinyl selection is unmatched.",
    rating: 5,
    location: "Los Angeles, CA"
  },
  {
    id: 3,
    name: "DJ Apex",
    feedback: "Been shopping here for months. The hip-hop fashion is authentic and the customer service is on point. Respect.",
    rating: 5,
    location: "Atlanta, GA"
  },
]

const heroSlides = [
  {
    imageUrl: "https://www.neweracap.co.uk/cdn/shop/files/MLB_FLORAL-_DESKTOP.webp?v=1753778509&width=1946",
    tagline: "AUTHENTIC STREET CULTURE. REAL HIP-HOP FASHION.",
    ctaText: "Shop the Underground",
    ctaLink: "/products",
  },
  {
    imageUrl: "https://www.neweracap.co.uk/cdn/shop/files/OVOxMLB_2880x1214_5a8b0a21-a90b-4e79-90aa-059fa6863d65.webp?v=1753368123&width=1946",
    tagline: "VINYL THAT SPEAKS TO YOUR SOUL. BEATS THAT MOVE THE STREETS.",
    ctaText: "Discover Vinyl",
    ctaLink: "/products?category=Vinyl Records",
  },
  {
    imageUrl: "https://www.neweracap.co.uk/cdn/shop/files/2880x1214_5-_courtside.webp?v=1752050564&width=1946",
    tagline: "FROM THE WALLS TO YOUR WARDROBE. GRAFFITI CULTURE LIVES.",
    ctaText: "Explore Graffiti Gear",
    ctaLink: "/products?category=Graffiti Gear",
  },
]

export default function HomePage() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = React.useState(true)

  React.useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("products").select("*").limit(6)
      if (error) {
        console.error("Error fetching products:", error)
      } else {
        setProducts(data || [])
      }
      setLoadingProducts(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSlideshow slides={heroSlides} interval={6000} />

      {/* Featured Products Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background font-serif">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 street-text font-serif">
              FEATURED DROPS
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
              Handpicked pieces from the underground. Limited quantities, maximum impact.
            </p>
          </div>
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="aspect-[3/4] animate-pulse bg-muted border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image_url}
                  description={product.description}
                />
              ))}
            </div>
          )}
          <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase px-8 py-3 street-pulse"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 font-serif">
              SHOP BY CULTURE
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100 font-serif font-semibold">
              Dive deep into the elements that define street culture.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-0">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.link}
                className="group block overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl animate-in fade-in zoom-in-90 duration-700"
                style={{ animationDelay: `${150 * index}ms` }}
              >
                <Card className="h-full flex flex-col bg-background border border-border hover:border-primary transition-colors duration-300">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-4 left-4 p-2 bg-primary rounded-full text-primary-foreground">
                      {category.icon}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-300 mb-2 uppercase font-serif">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-serif">{category.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="mt-4 self-start p-0 h-auto text-primary hover:text-primary/80 transition-colors duration-300 font-bold uppercase font-serif"
                    >
                      Explore {category.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Blog Preview */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 font-serif">
              STREET CULTURE BLOG
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100 font-mono">
              Stories from the underground. Culture, music, art, and the streets that inspire us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Evolution of Hip-Hop Fashion",
                excerpt: "From the Bronx to the world: How hip-hop transformed street fashion forever.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                date: "Dec 15, 2024"
              },
              {
                title: "Graffiti: Art or Vandalism?",
                excerpt: "Exploring the controversial world of street art and its impact on urban culture.",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
                date: "Dec 12, 2024"
              },
              {
                title: "Vinyl Revival in the Digital Age",
                excerpt: "Why physical music still matters in our streaming world.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                date: "Dec 10, 2024"
              }
            ].map((post, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border border-border">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-primary font-bold mb-2 uppercase font-serif">{post.date}</p>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors duration-300 font-serif">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-serif">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold uppercase px-8 py-3 font-serif"
              >
                Read More Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-card border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 font-serif">
              VOICES FROM THE STREET
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100 font-serif">
              Real feedback from real people in the culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="flex flex-col p-6 bg-background border border-border hover:border-primary transition-colors duration-300 animate-in fade-in zoom-in-90 duration-700"
                style={{ animationDelay: `${150 * index}ms` }}
              >
                <CardContent className="p-0 flex-1">
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground mb-4 font-serif">"{testimonial.feedback}"</p>
                </CardContent>
                <CardHeader className="p-0 border-t border-border pt-4">
                  <CardTitle className="text-base font-bold text-primary font-serif">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-serif">{testimonial.location}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 flex flex-col text-center space-y-6 items-center justify-center md:px-6 font-serif">
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl text-foreground animate-in fade-in slide-in-from-bottom-10 duration-700 street-text font-serif">
            STAY IN THE LOOP
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
            Get the latest drops, culture updates, and exclusive access to underground releases.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
