import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from 'next/font/google'

import "./globals.css"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zensi Street – Authentic Hip-Hop Culture & Streetwear",
  description: "Discover authentic hip-hop fashion, vinyl records, and graffiti gear from underground culture. Real streetwear for real people.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
