"use server"

import { createClient } from "@/lib/server"
import { z } from "zod"
import type { CartItem } from "@/context/cart-context" // Import CartItem type

const shippingAddressSchema = z.object({
  name: z.string().min(1, "Full Name is required."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").max(15, "Phone number is too long."),
  address: z.string().min(5, "Address is required."),
  pincode: z.string().min(4, "Pincode is required.").max(10, "Pincode is too long."),
  paymentMethod: z.enum(["cash_on_delivery", "upi"], {
    errorMap: () => ({ message: "Invalid payment method." }),
  }),
})

export async function placeOrder(prevState: any, formData: FormData) {
  const supabase = createClient()
  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    return { success: false, message: "You must be logged in to place an order." }
  }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string
  const pincode = formData.get("pincode") as string
  const paymentMethod = formData.get("paymentMethod") as "cash_on_delivery" | "upi"

  const cartItemsString = formData.get("cartItems") as string
  const cartTotalString = formData.get("cartTotal") as string
  const shippingCostString = formData.get("shippingCost") as string

  let cartItems: CartItem[] = []
  let cartTotal = 0
  let shippingCost = 0

  try {
    cartItems = JSON.parse(cartItemsString)
    cartTotal = Number.parseFloat(cartTotalString)
    shippingCost = Number.parseFloat(shippingCostString)
  } catch (e) {
    console.error("Error parsing cart data:", e)
    return { success: false, message: "Invalid cart data. Please try again." }
  }

  if (cartItems.length === 0) {
    return { success: false, message: "Your cart is empty. Please add items before checking out." }
  }

  const validation = shippingAddressSchema.safeParse({ name, phone, address, pincode, paymentMethod })

  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message }
  }

  const totalAmount = cartTotal + shippingCost

  try {
    // 1. Insert into orders table
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userData.user.id,
        total_amount: totalAmount,
        status: "Pending", // Initial status
        shipping_info: {
          name: validation.data.name,
          phone: validation.data.phone,
          address: validation.data.address,
          pincode: validation.data.pincode,
        },
        payment_method: validation.data.paymentMethod, // Add payment method to orders table
      })
      .select("id")
      .single()

    if (orderError || !orderData) {
      console.error("Error creating order:", orderError)
      return { success: false, message: "Failed to place order. Please try again." }
    }

    const orderId = orderData.id

    // 2. Insert into order_items table
    const orderItemsToInsert = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }))

    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItemsToInsert)

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError)
      // Optionally, roll back the order if order items fail
      await supabase.from("orders").delete().eq("id", orderId)
      return { success: false, message: "Failed to add order items. Order cancelled." }
    }

    // 3. (Optional) Update product stock - this would require a more complex transaction or trigger
    // For now, we'll skip stock updates in this simple example.

    return {
      success: true,
      message: "Your order has been placed successfully!",
      order: {
        orderId: orderId,
        totalAmount: totalAmount,
        shippingAddress: {
          name: validation.data.name,
          phone: validation.data.phone,
          address: validation.data.address,
          pincode: validation.data.pincode,
        },
        paymentMethod: validation.data.paymentMethod,
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
      },
    }
  } catch (error) {
    console.error("Unexpected error placing order:", error)
    return { success: false, message: "An unexpected error occurred while placing your order." }
  }
}
