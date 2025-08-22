import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  readTime: string
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Evolution of Hip-Hop Fashion: From the Bronx to Global Influence",
    excerpt: "Explore how hip-hop fashion evolved from the streets of the Bronx to become a global cultural phenomenon that influences high fashion today.",
    content: "Hip-hop fashion has come a long way since its humble beginnings in the Bronx...",
    author: "Marcus Johnson",
    date: "December 15, 2024",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "Graffiti Culture: The Art of Urban Expression",
    excerpt: "Dive deep into the world of graffiti culture, its origins, techniques, and the ongoing debate about street art versus vandalism.",
    content: "Graffiti has been a form of urban expression for decades...",
    author: "Sofia Rodriguez",
    date: "December 12, 2024",
    category: "Art",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "Vinyl Revival: Why Physical Music Still Matters",
    excerpt: "In our digital streaming age, vinyl records are experiencing an unprecedented comeback. Discover why collectors and music lovers are returning to analog.",
    content: "The vinyl revival is more than just nostalgia...",
    author: "DJ Apex",
    date: "December 10, 2024",
    category: "Music",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    readTime: "5 min read"
  },
  {
    id: "4",
    title: "Underground Hip-Hop: The Artists Shaping Tomorrow's Sound",
    excerpt: "Meet the underground hip-hop artists who are pushing boundaries and creating the sounds that will define the next generation of rap music.",
    content: "Underground hip-hop continues to be the breeding ground for innovation...",
    author: "Alex Thompson",
    date: "December 8, 2024",
    category: "Music",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "Streetwear Brands That Changed the Game",
    excerpt: "From Supreme to Off-White, explore the streetwear brands that transformed fashion and created billion-dollar empires from underground culture.",
    content: "Streetwear has evolved from niche subculture to mainstream fashion...",
    author: "Jordan Kim",
    date: "December 5, 2024",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    readTime: "9 min read"
  },
  {
    id: "6",
    title: "The Psychology of Street Art: Why We Create on Walls",
    excerpt: "Understanding the psychological and social motivations behind street art and graffiti culture in urban environments.",
    content: "Street art is more than decoration - it's communication...",
    author: "Dr. Maya Patel",
    date: "December 3, 2024",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    readTime: "6 min read"
  }
]

const categories = ["All", "Fashion", "Music", "Art", "Culture"]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 street-text urban-shadow">
          STREET CULTURE BLOG
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Stories from the underground. Deep dives into hip-hop culture, street art, fashion, and the voices that shape our world.
        </p>
      </section>

      {/* Category Filter */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="px-4 py-2 text-sm font-bold uppercase cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      <section className="mb-16">
        <Card className="overflow-hidden bg-card border border-border hover:shadow-2xl transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Image
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground font-bold uppercase">
                  Featured
                </Badge>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[0].date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </div>
                <Badge variant="outline" className="text-xs">
                  {blogPosts[0].category}
                </Badge>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-foreground leading-tight">
                {blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary font-bold">{blogPosts[0].readTime}</span>
                <Link
                  href={`/blog/${blogPosts[0].id}`}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold uppercase transition-colors duration-300"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <Card
              key={post.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-card border border-border hover:border-primary animate-in fade-in zoom-in-90 duration-700"
              style={{ animationDelay: `${100 * index}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs font-bold uppercase">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                </div>
                <h3 className="text-lg font-black mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-bold">{post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-bold text-sm uppercase transition-colors duration-300"
                  >
                    Read
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Load More */}
      <section className="text-center mt-16">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase px-8 py-3 rounded-md">
          Load More Posts
        </button>
      </section>
    </div>
  )
}
