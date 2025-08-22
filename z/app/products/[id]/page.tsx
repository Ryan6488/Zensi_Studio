"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { StarIcon, Minus, Plus, Heart } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { ImageGallery } from "@/components/image-gallery"
import { useActionState } from "react"
import { toggleWishlist } from "@/actions/wishlist"
import { submitReview } from "@/actions/reviews"
import { toast } from "sonner"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number | null
  image_url: string
  category: string
  rating: number | null
  artisan_info?: string
  stock: number | null
  tags: string[] | null
  image_urls?: string[]
  review_count?: number | null
}

interface Review {
  id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
  user_id: string | null
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = React.useState<Product | null>(null)
  const [reviews, setReviews] = React.useState<Review[]>([])
  const [similarProducts, setSimilarProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [quantity, setQuantity] = React.useState(1)
  const [isProductInWishlist, setIsProductInWishlist] = React.useState(false)
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)

  const { addToCart } = useCart()
  const supabase = createClient()

  const [wishlistState, wishlistAction, isWishlistPending] = useActionState(toggleWishlist, null)

  const [reviewState, reviewAction, isReviewPending] = useActionState(submitReview, null)
  const [reviewRating, setReviewRating] = React.useState(0)
  const [reviewComment, setReviewComment] = React.useState("")

  React.useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true)

      const { data: fetchedUser, error: userError } = await supabase.auth.getUser()
      setUserLoggedIn(!!fetchedUser.user)

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single()

      if (productError || !productData) {
        console.error("Error fetching product:", productError)
        setLoading(false)
        return
      }
      setProduct(productData)

      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", params.id)
        .order("created_at", { ascending: false })

      if (reviewsError) {
        console.error("Error fetching reviews:", reviewsError)
      } else {
        setReviews(reviewsData || [])
      }

      if (fetchedUser.user) {
        const { data: wishlistData, error: wishlistError } = await supabase
          .from("wishlist")
          .select("id")
          .eq("user_id", fetchedUser.user.id)
          .eq("product_id", params.id)
          .single()

        if (wishlistError && wishlistError.code !== "PGRST116") {
          console.error("Error checking wishlist:", wishlistError)
        }
        setIsProductInWishlist(!!wishlistData)
      }

      const { data: similarProductsData, error: similarProductsError } = await supabase
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", params.id)
        .limit(4)

      if (similarProductsError) {
        console.error("Error fetching similar products:", similarProductsError)
      } else {
        setSimilarProducts(similarProductsData || [])
      }

      setLoading(false)
    }

    fetchProductData()
  }, [params.id, supabase])

  React.useEffect(() => {
    if (wishlistState?.success) {
      toast.success(wishlistState.message)
      setIsProductInWishlist((prev) => !prev)
    } else if (wishlistState?.success === false) {
      toast.error(wishlistState.message)
    }
  }, [wishlistState])

  React.useEffect(() => {
    if (reviewState?.success) {
      toast.success(reviewState.message)
      setReviewRating(0)
      setReviewComment("")
    } else if (reviewState?.success === false) {
      toast.error(reviewState.message)
    }
  }, [reviewState])

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price ?? 0,
          imageUrl: product.image_url,
        },
        quantity,
      )
    }
  }

  const handleReviewRatingChange = (rating: number) => {
    setReviewRating(rating)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <p className="text-foreground">Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground">Product Not Found</h1>
        <p className="text-muted-foreground mt-4">The product you are looking for does not exist.</p>
      </div>
    )
  }

  const displayRating = product.rating ?? 0
  const productImages = product.image_urls && product.image_urls.length > 0 ? product.image_urls : [product.image_url]

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <ImageGallery images={productImages} alt={product.name} />

        {/* Product Info */}
        <div className="flex flex-col justify-center font-serif">
          <h1 className="text-4xl font-extrabold tracking-tighter mb-4 text-foreground font-serif">{product.name}</h1>
          <p className="text-3xl font-extrabold text-primary mb-6">${(product.price ?? 0).toFixed(2)}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-cta-highlight mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${i < Math.floor(displayRating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
              />
            ))}
            <span className="text-muted-foreground text-sm ml-1">
              ({displayRating.toFixed(1)} / 5) - {reviews.length} Reviews
            </span>
          </div>

          {/* Stock and Tags */}
          <div className="mb-6 text-sm text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">Availability:</span>{" "}
              {product.stock !== null && product.stock > 0 ? (
                <span className="text-primary">In Stock ({product.stock})</span>
              ) : (
                <span className="text-destructive">Out of Stock</span>
              )}
            </p>
            {product.tags && product.tags.length > 0 && (
              <p className="mt-1">
                <span className="font-bold text-foreground">Tags:</span>{" "}
                <span className="text-muted-foreground">{product.tags.join(", ")}</span>
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <Label htmlFor="quantity" className="text-base font-bold text-foreground">
              Quantity:
            </Label>
            <div className="flex items-center border border-border rounded-md bg-input">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="border-r border-border text-foreground hover:bg-secondary hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-16 text-center border-x-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-foreground"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="border-l border-border text-foreground hover:bg-secondary hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
              onClick={handleAddToCart}
              disabled={product.stock !== null && product.stock <= 0}
            >
              {product.stock !== null && product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <form action={wishlistAction}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="isAdded" value={isProductInWishlist.toString()} />
              <Button
                type="submit"
                size="lg"
                variant="outline"
                className={`flex-1 transition-all duration-300 font-bold uppercase ${isProductInWishlist ? "bg-cta-highlight text-background hover:bg-cta-highlight/90 border-cta-highlight" : "bg-transparent border-primary text-primary hover:bg-primary hover:text-background"}`}
                disabled={isWishlistPending || !userLoggedIn}
              >
                <Heart className={`h-5 w-5 mr-2 ${isProductInWishlist ? "fill-background" : ""}`} />
                {isWishlistPending
                  ? isProductInWishlist
                    ? "Removing..."
                    : "Adding..."
                  : isProductInWishlist
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
              </Button>
            </form>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              <span className="font-bold text-foreground">Category:</span>{" "}
              <span className="text-muted-foreground">{product.category}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabbed Info Section */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary border border-border">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="artisan-story"
              className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
            >
              Artisan Story
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="description"
            className="py-6 text-muted-foreground leading-relaxed bg-card p-6 rounded-b-lg border border-t-0 border-border"
          >
            {product.description}
          </TabsContent>
          <TabsContent value="reviews" className="py-6 bg-card p-6 rounded-b-lg border border-t-0 border-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Customer Reviews</h3>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            ) : (
              <div className="space-y-6 mb-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{review.reviewer_name}</span>
                      <div className="flex items-center gap-0.5 text-cta-highlight">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(review.rating) ? "fill-current" : "fill-muted stroke-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Review Form */}
            <h3 className="text-2xl font-bold mb-4 mt-8 text-foreground">Submit Your Review</h3>
            {!userLoggedIn ? (
              <p className="text-muted-foreground">
                Please{" "}
                <Link href="/auth" className="text-primary hover:underline">
                  log in
                </Link>{" "}
                to submit a review.
              </p>
            ) : (
              <form action={reviewAction} className="grid gap-4">
                <input type="hidden" name="productId" value={product.id} />
                <div className="grid gap-2">
                  <Label htmlFor="review-rating" className="text-foreground">
                    Your Rating
                  </Label>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                          i < reviewRating
                            ? "fill-cta-highlight text-cta-highlight"
                            : "fill-muted stroke-muted-foreground hover:fill-primary"
                        }`}
                        onClick={() => handleReviewRatingChange(i + 1)}
                      />
                    ))}
                    <input type="hidden" name="rating" value={reviewRating} required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="review-comment" className="text-foreground">
                    Your Comment
                  </Label>
                  <Textarea
                    id="review-comment"
                    name="comment"
                    placeholder="Share your thoughts on this product..."
                    rows={5}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
                  disabled={isReviewPending || reviewRating === 0 || reviewComment.length < 10}
                >
                  {isReviewPending ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            )}
          </TabsContent>
          <TabsContent
            value="artisan-story"
            className="py-6 text-muted-foreground leading-relaxed bg-card p-6 rounded-b-lg border border-t-0 border-border"
          >
            {product.artisan_info || "No artisan story available for this product yet."}
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="mt-16 py-8 border-t border-border">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground font-serif">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {similarProducts.map((similarProduct) => (
              <ProductCard
                key={similarProduct.id}
                id={similarProduct.id}
                name={similarProduct.name}
                price={similarProduct.price}
                imageUrl={similarProduct.image_url}
                description={similarProduct.description}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
