"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartItemCount } = useCart()

  const shippingCost = cartTotal > 0 ? 5.0 : 0

  const handleQuantityChange = (id: string, amount: number) => {
    const item = cartItems.find((i) => i.id === id)
    if (item) {
      updateQuantity(id, item.quantity + amount)
    }
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background font-serif">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-foreground font-serif">
        Your Shopping Cart ({cartItemCount} items)
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">Your cart is empty. Time to fill it up!</p>
          <Link href="/products">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col sm:flex-row items-center p-4 gap-4 bg-card border border-border shadow-md"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 grid gap-1 text-center sm:text-left">
                  <h2 className="font-bold text-lg text-foreground font-serif">{item.name}</h2>
                  <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="border-border text-foreground hover:bg-secondary hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center bg-input border-border text-foreground"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="border-border text-foreground hover:bg-secondary hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-bold text-lg w-24 text-right text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-destructive hover:bg-destructive/20 hover:text-destructive transition-colors duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <Card className="lg:col-span-1 h-fit bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between text-muted-foreground">
                <p>Subtotal ({cartItemCount} items)</p>
                <p className="font-medium text-foreground">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <p>Shipping</p>
                <p className="font-medium text-foreground">${shippingCost.toFixed(2)}</p>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <p>Total</p>
                <p className="text-primary">${(cartTotal + shippingCost).toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/checkout" className="w-full">
                <Button
                  size="lg"
                  className="w-full bg-cta-highlight text-background hover:bg-cta-highlight/90 transition-all duration-300 font-bold uppercase"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
