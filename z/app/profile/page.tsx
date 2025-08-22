"use client"

import Link from "next/link"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/client"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import Image from "next/image"

interface OrderItem {
  id: string
  quantity: number
  price_at_purchase: number
  products: {
    name: string
    image_url: string
  } | null
}

interface Order {
  id: string
  total_amount: number
  status: string
  created_at: string
  order_items: OrderItem[]
  payment_method: string
  shipping_info: {
    name: string
    phone: string
    address: string
    pincode: string
  } | null
}

interface WishlistItem {
  id: string
  name: string
  price: number
  imageUrl: string
}

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [updateName, setUpdateName] = useState("")
  const [updatePhone, setUpdatePhone] = useState("")
  const [updatePassword, setUpdatePassword] = useState("")
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user: fetchedUser },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !fetchedUser) {
        toast.error("Please log in to view your profile.")
        router.push("/auth")
        return
      }

      setUser(fetchedUser)
      setUpdateName(fetchedUser.user_metadata.full_name || "")
      setUpdatePhone(fetchedUser.user_metadata.phone_number || "")

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          `
          id,
          total_amount,
          status,
          created_at,
          payment_method,
          shipping_info,
          order_items (
            id,
            quantity,
            price_at_purchase,
            products (
              name,
              image_url
            )
          )
        `,
        )
        .eq("user_id", fetchedUser.id)
        .order("created_at", { ascending: false })

      if (ordersError) {
        console.error("Error fetching orders:", ordersError)
        toast.error("Failed to load past orders.")
      } else {
        setOrders(ordersData || [])
      }

      // Fetch wishlist items from Supabase
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlist")
        .select(
          `
          id,
          products (
            id,
            name,
            price,
            image_url
          )
        `,
        )
        .eq("user_id", fetchedUser.id)

      if (wishlistError) {
        console.error("Error fetching wishlist:", wishlistError)
        toast.error("Failed to load wishlist.")
      } else {
        // Map the fetched data to the WishlistItem interface
        const formattedWishlist: WishlistItem[] = (wishlistData || [])
          .map((item) => ({
            id: item.products?.id || "",
            name: item.products?.name || "Unknown Product",
            price: item.products?.price || 0,
            imageUrl: item.products?.image_url || "/placeholder.svg",
          }))
          .filter((item) => item.id !== "") // Filter out items where product data might be missing
        setWishlist(formattedWishlist)
      }

      setLoading(false)
    }

    fetchUserData()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/auth")
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router, supabase])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Failed to log out: " + error.message)
    } else {
      toast.success("Logged out successfully!")
      router.push("/")
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: updateName,
        phone_number: updatePhone,
      },
    })

    if (error) {
      toast.error("Failed to update profile: " + error.message)
    } else if (data.user) {
      setUser(data.user)
      toast.success("Profile updated successfully!")
    }
    setIsUpdatingProfile(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingPassword(true)
    const { error } = await supabase.auth.updateUser({
      password: updatePassword,
    })

    if (error) {
      toast.error("Failed to update password: " + error.message)
    } else {
      toast.success("Password updated successfully! Please log in again with your new password.")
      await supabase.auth.signOut()
      router.push("/auth")
    }
    setIsUpdatingPassword(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
        <p className="text-foreground">Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 bg-background">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-foreground leading-tight uppercase">
          {"Welcome Back"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium mt-4">
          Manage your Zensi account and track your orders.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Information Card */}
        <Card className="lg:col-span-1 bg-card border-border shadow-md tracking-normal leading-7 border w-auto h-fit">
          <CardHeader>
            <CardTitle className="text-foreground">Account Information</CardTitle>
            <CardDescription className="text-muted-foreground">Manage your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={handleUpdateProfile} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="profile-name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="profile-name"
                  type="text"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="bg-muted/20 border-border text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profile-phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  placeholder="e.g., +1234567890"
                  value={updatePhone}
                  onChange={(e) => setUpdatePhone(e.target.value)}
                  className="bg-input border-border text-foreground focus:ring-primary"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </Button>
            </form>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full mt-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300 font-bold uppercase"
            >
              Logout
            </Button>
          </CardContent>
        </Card>

        {/* Profile Management Tabs (Password Change) */}
        <Card className="lg:col-span-2 bg-card border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-foreground">Security Settings</CardTitle>
            <CardDescription className="text-muted-foreground">Change your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="change-password" className="w-full">
              <TabsList className="grid w-full grid-cols-1 bg-secondary border border-border">
                <TabsTrigger
                  value="change-password"
                  className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
                >
                  Change Password
                </TabsTrigger>
              </TabsList>
              <TabsContent value="change-password" className="mt-6">
                <form onSubmit={handleUpdatePassword} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="new-password" className="text-foreground">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      required
                      value={updatePassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-input border-border text-foreground focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? "Updating..." : "Change Password"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Past Orders Section */}
      <Card className="mt-8 bg-card border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">Past Orders</CardTitle>
          <CardDescription className="text-muted-foreground">View your previous purchases.</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You have no past orders.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary border-border">
                    <TableHead className="text-foreground font-bold uppercase">Order ID</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Date</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Items</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Total</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Status</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Payment</TableHead>
                    <TableHead className="text-foreground font-bold uppercase">Shipping To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50 transition-colors border-border">
                      <TableCell className="font-medium text-foreground">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside space-y-2">
                          {order.order_items.map((item) => (
                            <li key={item.id} className="flex items-center gap-2 text-muted-foreground">
                              {item.products?.image_url && (
                                <Image
                                  src={item.products.image_url || "/placeholder.svg"}
                                  alt={item.products.name || "Product image"}
                                  width={40}
                                  height={40}
                                  className="rounded-md object-cover border border-border"
                                />
                              )}
                              <span>
                                {item.quantity} x {item.products?.name || "Unknown Product"} (
                                <span className="text-primary">${item.price_at_purchase.toFixed(2)}</span>)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell className="font-bold text-primary">${order.total_amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                            order.status === "Delivered"
                              ? "bg-primary/20 text-primary"
                              : order.status === "Pending"
                                ? "bg-cta-highlight/20 text-cta-highlight"
                                : "bg-secondary/20 text-secondary"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.payment_method === "cash_on_delivery" ? "COD" : order.payment_method.toUpperCase()}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {order.shipping_info?.name}
                        <br />
                        {order.shipping_info?.address}
                        <br />
                        {order.shipping_info?.pincode}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wishlist Section */}
      <Card className="mt-8 bg-card border border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-foreground">Your Wishlist</CardTitle>
          <CardDescription className="text-muted-foreground">Items you've saved for later.</CardDescription>
        </CardHeader>
        <CardContent>
          {wishlist.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Your wishlist is empty. Start adding items!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <Card
                  key={item.id}
                  className="flex flex-col items-center text-center p-4 bg-background border border-border shadow-sm"
                >
                  <div className="relative w-32 h-32 mb-4 rounded-md overflow-hidden">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{item.name}</h3>
                  <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
                  <Link href={`/products/${item.id}`} className="mt-4 w-full">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase">
                      Shop Now
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
