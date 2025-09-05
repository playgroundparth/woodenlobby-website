import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://woodenlobby.example.com"),
  title: {
    default: "Woodenlobby — Handcrafted Solid Wood Furniture",
    template: "%s | Woodenlobby",
  },
  description: "Premium, made-to-order solid wood furniture for living, dining, and bedroom. Handcrafted in India.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "Woodenlobby",
    type: "website",
    title: "Woodenlobby — Handcrafted Solid Wood Furniture",
    description: "Premium, made-to-order solid wood furniture for living, dining, and bedroom.",
  },
  alternates: {
    canonical: "/",
  },
  generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>}>
          <SiteHeader />
          <main className="min-h-[60vh]">{children}</main>
          <SiteFooter />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
