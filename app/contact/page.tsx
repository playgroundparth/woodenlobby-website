import { Button } from "@/components/ui/button"

const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || "Kali Devi Rd, Mochi Mohalla, Hansi, Haryana 125033"
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "999-222-1888"

export const revalidate = 600

export const metadata = {
  title: "Contact",
  description: "Get in touch with Woodenlobby.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "919992221888"
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent("Hi Woodenlobby, I have a question.")}`
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Woodenlobby",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kali Devi Rd, Mochi Mohalla",
      addressLocality: "Hansi",
      addressRegion: "Haryana",
      postalCode: "125033",
      addressCountry: "IN",
    },
    telephone: "+91 9992221888",
    sameAs: [
      process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/wooden_lobby/",
      process.env.NEXT_PUBLIC_FACEBOOK || "https://www.facebook.com/woodenlobby/",
      process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@WoodenlobbybyLalitpaposa",
    ],
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 font-serif text-3xl text-gray-900">Contact Us</h1>
        <div className="space-y-4">
          <p className="text-gray-700">
            Address: <span className="text-gray-900">{ADDRESS}</span>
          </p>
          <p className="text-gray-700">
            Phone/WhatsApp: <span className="text-gray-900">{PHONE_DISPLAY}</span>
          </p>
          <div>
            <Button asChild className="bg-amber-600 text-white hover:bg-amber-700" aria-label="Chat on WhatsApp">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </>
  )
}
