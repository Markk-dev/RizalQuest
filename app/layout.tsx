import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./global.css"
import ErrorBoundary from "@/components/ui/error-boundary"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rizal Quest - Learn Philippine History Through Games",
  description: "A gamified learning platform about José Rizal and Philippine history designed for students",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <ErrorBoundary>{children}</ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}
