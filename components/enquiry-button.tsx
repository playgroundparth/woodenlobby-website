"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Share2 } from "lucide-react"

export function EnquiryButton({
  productName,
  slug,
  priceDisplay,
}: {
  productName: string
  slug: string
  priceDisplay?: string
}) {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "919992221888" // Default WhatsApp number
  const form = process.env.NEXT_PUBLIC_ENQUIRY_FORM_URL
  const label = "Order on WhatsApp"
  let href = "#"

  if (wa) {
    const orderMessage = `Hi! I would like to order:\n\n📦 *${productName}*\n💰 Price: ${priceDisplay || 'Please quote'}\n🔗 Product: ${typeof window !== 'undefined' ? window.location.origin : ''}/p/${slug}\n\nPlease provide delivery details and confirm the order. Thank you!`
    const txt = encodeURIComponent(orderMessage)
    href = `https://wa.me/${wa}?text=${txt}`
  } else if (form) {
    const q = new URLSearchParams({ product_name: productName, slug }).toString()
    href = `${form}?${q}`
  }

  return (
    <Button asChild variant="warm" size="lg" className="w-full md:w-auto" aria-label={label}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-5 h-5 mr-2" />
        {label}
      </a>
    </Button>
  )
}

export function WhatsAppShareButton({
  productName,
  slug,
  priceDisplay,
}: {
  productName: string
  slug: string
  priceDisplay?: string
}) {
  const handleShare = () => {
    const shareMessage = `Check out this amazing furniture piece!\n\n📦 *${productName}*\n💰 ${priceDisplay || 'Contact for price'}\n🔗 ${typeof window !== 'undefined' ? window.location.href : ''}\n\nHandcrafted by Woodenlobby 🪑✨`
    const txt = encodeURIComponent(shareMessage)
    const shareUrl = `https://wa.me/?text=${txt}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleShare}
      className="p-2 w-10 h-10"
      aria-label="Share on WhatsApp"
    >
      <Share2 className="w-4 h-4" />
    </Button>
  )
}
