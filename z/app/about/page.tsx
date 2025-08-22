import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Palette, Shirt, Users, Target, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 street-text urban-shadow">
          ABOUT ZENSI STREET
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Born from the streets, built for the culture. We're more than a brand – we're a movement.
        </p>
      </section>

      {/* Origin Story */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-black mb-6 text-foreground font-serif text-2xl">FROM THE UNDERGROUND UP</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Zensi Street was born in the underground hip-hop scene of Brooklyn, where authentic culture meets raw creativity. 
                We started as a collective of artists, DJs, graffiti writers, and fashion enthusiasts who were tired of seeing 
                our culture commercialized and watered down by mainstream brands.
              </p>
              <p>
                In 2020, we decided to take matters into our own hands. What began as custom tees for local crews evolved into 
                a full-scale movement celebrating authentic street culture. We source directly from underground artists, 
                support local vinyl shops, and collaborate with graffiti legends to bring you gear that's as real as it gets.
              </p>
              <p>
                Every piece we sell tells a story. Every artist we work with shares our vision. Every customer becomes part 
                of our extended family. This isn't just commerce – it's culture preservation.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=450&fit=crop"
              alt="Street art and culture"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16 bg-card py-16 px-8 rounded-lg border border-border">
        <h2 className="text-3xl font-black mb-12 text-center text-foreground font-serif">OUR VALUES</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-background border border-border text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-black text-foreground">AUTHENTICITY</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground">
                We keep it 100% real. No fake culture, no manufactured hype. Just authentic street culture from the source.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background border border-border text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-black text-foreground">COMMUNITY</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground">
                We support underground artists, local scenes, and the global hip-hop community that raised us.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-background border border-border text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-black text-foreground">QUALITY</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground">
                Premium materials, attention to detail, and craftsmanship that honors the culture we represent.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What We Offer */}
      <section className="mb-16 font-serif">
        <h2 className="text-3xl font-black mb-12 text-center text-foreground font-serif">WHAT WE BRING TO THE STREETS</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-card border border-border hover:border-primary transition-colors duration-300 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Shirt className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-black mb-3 text-foreground font-serif text-base">HIP-HOP FASHION</h3>
            <p className="text-muted-foreground text-sm">
              Authentic streetwear inspired by hip-hop legends and underground culture. From oversized tees to limited drops.
            </p>
          </Card>

          <Card className="bg-card border border-border hover:border-primary transition-colors duration-300 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Music className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-black mb-3 text-foreground font-serif text-base">VINYL RECORDS</h3>
            <p className="text-muted-foreground text-sm">
              Rare finds, underground releases, and classic hip-hop vinyl. Curated by DJs who know the culture.
            </p>
          </Card>

          <Card className="bg-card border border-border hover:border-primary transition-colors duration-300 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Palette className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-black mb-3 text-foreground font-serif">GRAFFITI GEAR</h3>
            <p className="text-muted-foreground text-sm">
              Tools, apparel, and accessories for street artists. Quality gear that respects the craft.
            </p>
          </Card>

          <Card className="bg-card border border-border hover:border-primary transition-colors duration-300 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-xl font-black mb-3 text-foreground font-serif">CULTURE</h3>
            <p className="text-muted-foreground text-sm">
              Stories, interviews, and content that celebrates the voices and artists shaping street culture.
            </p>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 bg-card py-16 px-8 rounded-lg border border-border">
        <h2 className="text-3xl font-black mb-12 text-center text-foreground font-serif">THE CREW</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Marcus 'Flow' Johnson"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2 font-serif">MARCUS "FLOW" JOHNSON</h3>
            <p className="text-primary font-bold mb-2 uppercase text-sm">Founder & Creative Director</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Brooklyn-born hip-hop head with 15 years in the underground scene. Marcus brings authentic street credibility 
              and creative vision to everything we do.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                alt="Sofia 'Graf Queen' Rodriguez"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2 font-serif">SOFIA "GRAF QUEEN" RODRIGUEZ</h3>
            <p className="text-primary font-bold mb-2 uppercase text-sm">Head of Artist Relations</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Legendary graffiti artist and curator who connects us with the most talented underground artists 
              and ensures our collaborations stay true to the culture.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                alt="DJ Apex"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2 font-serif">DJ APEX</h3>
            <p className="text-primary font-bold mb-2 uppercase text-sm">Music & Vinyl Curator</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Veteran DJ and vinyl collector who curates our music selection. If it's in our store, 
              you know it's been approved by someone who lives and breathes hip-hop.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-black mb-6 text-foreground font-serif">JOIN THE MOVEMENT</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Ready to rep authentic street culture? Explore our collections and become part of the Zensi Street family.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase px-8 py-3 street-pulse"
            >
              Shop the Collection
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold uppercase px-8 py-3"
            >
              Read Our Stories
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
