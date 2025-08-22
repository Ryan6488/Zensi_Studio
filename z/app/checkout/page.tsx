"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCart } from "@/context/cart-context"
import { placeOrder } from "@/actions/order"
import { toast } from "sonner"
import Image from "next/image"

interface OrderConfirmation {
  orderId: string
  totalAmount: number
  shippingAddress: {
    name: string
    phone: string
    address: string
    pincode: string
  }
  paymentMethod: string
  items: {
    name: string
    quantity: number
    price: number
    imageUrl: string
  }[]
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, cartTotal, cartItemCount, clearCart } = useCart()
  const shippingCost = cartTotal > 0 ? 5.0 : 0

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery")

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderConfirmationDetails, setOrderConfirmationDetails] = useState<OrderConfirmation | null>(null)

  const [state, formAction, isPending] = useActionState(placeOrder, null)

  useEffect(() => {
    if (cartItems.length === 0 && !showConfirmation) {
      router.push("/cart")
    }
  }, [cartItems, router, showConfirmation])

  useEffect(() => {
    if (state?.success) {
      setOrderConfirmationDetails(state.order)
      setShowConfirmation(true)
      clearCart()
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state, clearCart])

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    router.push("/products")
  }

  const totalPayable = cartTotal + shippingCost

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-foreground">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address Form */}
        <Card className="lg:col-span-2 bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Shipping Information</CardTitle>
            <CardDescription className="text-muted-foreground">Enter your delivery details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="grid gap-6">
              <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
              <input type="hidden" name="cartTotal" value={cartTotal.toFixed(2)} />
              <input type="hidden" name="shippingCost" value={shippingCost.toFixed(2)} />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />

              <div className="grid gap-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1234567890"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-foreground">
                  Shipping Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123 Main St, Apt 4B"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pincode" className="text-foreground">
                  Pincode
                </Label>
                <Input
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="12345"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>

              {/* Payment Method */}
              <div className="grid gap-2">
                <Label className="text-foreground">Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <Label
                    htmlFor="cash_on_delivery"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-border bg-secondary p-4 hover:bg-primary/20 hover:text-primary [&:has([data-state=checked])]:border-primary transition-colors duration-300 cursor-pointer"
                  >
                    <RadioGroupItem id="cash_on_delivery" value="cash_on_delivery" className="sr-only" />
                    <span className="font-bold text-foreground">Cash on Delivery</span>
                    <span className="text-sm text-muted-foreground text-center">Pay when you receive your order.</span>
                  </Label>
                  <Label
                    htmlFor="upi"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-border bg-secondary p-4 hover:bg-primary/20 hover:text-primary [&:has([data-state=checked])]:border-primary transition-colors duration-300 cursor-pointer"
                  >
                    <RadioGroupItem id="upi" value="upi" className="sr-only" />
                    <span className="font-bold text-foreground">UPI</span>
                    <span className="text-sm text-muted-foreground text-center">
                      Online payment via UPI (placeholder).
                    </span>
                  </Label>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-cta-highlight text-background hover:bg-cta-highlight/90 transition-all duration-300 font-bold uppercase"
                disabled={isPending || cartItems.length === 0}
              >
                {isPending ? "Placing Order..." : `Place Order - $${totalPayable.toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="lg:col-span-1 h-fit bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground">{item.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-sm text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="bg-border" />
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
              <p className="text-primary">${totalPayable.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px] bg-card border border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl font-extrabold">
              Order Placed Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Your order has been confirmed. Thank you for shopping with Zensi!
            </DialogDescription>
          </DialogHeader>
          {orderConfirmationDetails && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-foreground">Order ID:</Label>
                <span className="font-bold text-right text-primary">
                  {orderConfirmationDetails.orderId.substring(0, 8)}...
                </span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-foreground">Total Amount:</Label>
                <span className="font-bold text-right text-primary">
                  ${orderConfirmationDetails.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <Label className="text-foreground">Payment Method:</Label>
                <span className="font-bold text-right text-primary">
                  {orderConfirmationDetails.paymentMethod === "cash_on_delivery" ? "Cash on Delivery" : "UPI"}
                </span>
              </div>
              <Separator className="bg-border" />
              <h3 className="font-bold text-lg text-foreground">Shipping To:</h3>
              <p className="text-sm text-muted-foreground">
                {orderConfirmationDetails.shippingAddress.name}
                <br />
                {orderConfirmationDetails.shippingAddress.phone}
                <br />
                {orderConfirmationDetails.shippingAddress.address}
                <br />
                Pincode: {orderConfirmationDetails.shippingAddress.pincode}
              </p>
              <Separator className="bg-border" />
              <h3 className="font-bold text-lg text-foreground">Items:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {orderConfirmationDetails.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <p className="text-sm text-muted-foreground">
                      {item.name} (x{item.quantity}) - <span className="text-primary">${item.price.toFixed(2)}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={handleConfirmationClose}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
