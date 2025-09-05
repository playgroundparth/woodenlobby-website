import Link from "next/link"
import Image from "next/image"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { getFeatured } from "@/lib/catalog"
import { Shield, Truck, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const revalidate = 600

export const metadata = {
  title: "Woodenlobby | Home",
  alternates: { canonical: "/" },
}

export default async function HomePage() {
  const featured = await getFeatured(8)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Woodenlobby",
    image: "/brand/woodenlobby-logo-full.svg",
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
    areaServed: "India",
  }

  return (
    <>
      <Hero />

      {/* Collections Section */}
      <section className="section-padding bg-background">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">Collections</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our curated collections of handcrafted furniture, each piece tells a story of timeless elegance.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Storage Collection */}
            <Link href="/c/Storage" className="group relative overflow-hidden bg-muted/20">
              <div className="aspect-[3/4] w-full">
                <Image
                  src="/storage-lifestyle-scene.png"
                  alt="Storage Collection"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-2xl font-light text-white mb-2">Storage</h3>
                <p className="text-white/90 text-sm">Organized living solutions</p>
              </div>
            </Link>

            {/* Dining Collection */}
            <Link href="/c/Dining" className="group relative overflow-hidden bg-muted/20">
              <div className="aspect-[3/4] w-full">
                <Image
                  src="/dining-lifestyle-scene.png"
                  alt="Dining Collection"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-2xl font-light text-white mb-2">Dining</h3>
                <p className="text-white/90 text-sm">Elegant dining experiences</p>
              </div>
            </Link>

            {/* Beds Collection */}
            <Link href="/c/Beds" className="group relative overflow-hidden bg-muted/20">
              <div className="aspect-[3/4] w-full">
                <Image
                  src="/beds-lifestyle-scene.png"
                  alt="Beds Collection"
                  width={400}
                  height={533}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-serif text-2xl font-light text-white mb-2">Beds</h3>
                <p className="text-white/90 text-sm">Restful sanctuary designs</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Made To Order Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-padding">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left side - Illustration */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative h-80 w-full max-w-lg">
                <svg viewBox="0 0 400 300" className="h-full w-full">
                  {/* Wood plank */}
                  <rect x="80" y="220" width="240" height="20" fill="var(--warm-light)" />
                  <rect x="80" y="240" width="240" height="15" fill="var(--warm)" />
                  
                  {/* Workbench legs */}
                  <rect x="90" y="250" width="8" height="40" fill="var(--warm)" />
                  <rect x="302" y="250" width="8" height="40" fill="var(--warm)" />
                  
                  {/* Craftsman figure */}
                  <circle cx="200" cy="120" r="25" fill="#F4C2A1" />
                  <ellipse cx="195" cy="115" rx="15" ry="20" fill="var(--warm-light)" />
                  
                  {/* Body */}
                  <rect x="175" y="145" width="50" height="60" rx="10" fill="var(--primary)" />
                  <rect x="160" y="155" width="80" height="40" rx="5" fill="var(--accent)" />
                  
                  {/* Arms */}
                  <rect x="145" y="160" width="30" height="15" rx="7" fill="#F4C2A1" />
                  <rect x="225" y="160" width="30" height="15" rx="7" fill="#F4C2A1" />
                  
                  {/* Tool in hand */}
                  <rect x="260" y="158" width="30" height="4" fill="var(--warm)" />
                  <rect x="285" y="155" width="8" height="10" fill="#C0C0C0" />
                  
                  {/* Wood piece being worked on */}
                  <rect x="120" y="200" width="160" height="20" rx="3" fill="var(--warm-light)" />
                  <path d="M 280 210 Q 300 205 320 210" stroke="var(--warm-light)" strokeWidth="3" fill="none" />
                  
                  {/* Wood shavings */}
                  <circle cx="250" cy="235" r="2" fill="var(--warm-light)" />
                  <circle cx="260" cy="238" r="1.5" fill="var(--warm)" />
                  <circle cx="240" cy="240" r="1" fill="var(--warm-light)" />
                </svg>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="mb-6 font-serif text-4xl md:text-5xl font-light text-foreground">Made To Order</h2>
              <p className="mb-6 text-xl text-foreground/80 leading-relaxed">
                Dream it and we'll bring it to life for you. Want the perfect coffee table or sofa, made{" "}
                <span className="font-serif italic text-warm">just for you</span>?
              </p>
              <p className="mb-8 text-muted-foreground text-lg leading-relaxed">
                With custom design and detailed craftsmanship, we can craft a bespoke piece, exactly the way you want it.
              </p>
              <a 
                href={`https://wa.me/919992221888?text=${encodeURIComponent("Hi! I'd like to get a free design consultation.\n\n✨ I'm interested in:\n• Professional design advice\n• Space planning assistance\n• Furniture recommendations\n• Custom design solutions\n\nCould we schedule a consultation to discuss my requirements?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Get free design consultation via WhatsApp"
              >
                Get Free Design Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="section-padding bg-foreground">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-background mb-4">Featured</h2>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">
              Discover our most popular handcrafted pieces, each designed with meticulous attention to detail and timeless elegance.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <Link key={product.product_slug} href={`/p/${product.product_slug}`} className="group block">
                <div className="furniture-card overflow-hidden bg-background">
                  <div className="relative aspect-[3/4] w-full bg-muted/20">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.product_name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                        unoptimized
                      />
                    ) : (
                      <img
                        alt={product.product_name}
                        src={"/placeholder.svg?height=600&width=450&query=product%20image"}
                        className="h-full w-full object-cover"
                      />
                    )}
                    {product.badge ? (
                      <div className="absolute left-3 top-3">
                        <Badge className="bg-warm text-warm-foreground hover:bg-warm/90 font-medium text-xs px-2 py-1">
                          {product.badge}
                        </Badge>
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4 text-center">
                    <h3 className="font-serif text-lg leading-tight text-foreground group-hover:text-warm transition-colors line-clamp-2">{product.product_name}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-semibold text-foreground text-base">{product.price_display}</span>
                      {product.mrp_optional ? (
                        <span className="text-sm text-muted-foreground line-through">{product.mrp_optional}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Badges Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">Our Promise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service with every piece of furniture.
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {/* Damage Covered */}
            <div className="text-center group">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-warm/10 group-hover:bg-warm/20 transition-colors">
                <Shield className="h-10 w-10 text-warm" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-foreground">Damage Covered</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                Be assured. Your order is in <strong className="text-foreground">safe hands</strong>. We provide replacement on damaged items.
              </p>
            </div>

            {/* 100% Genuine Products */}
            <div className="text-center group">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-warm/10 group-hover:bg-warm/20 transition-colors">
                <Star className="h-10 w-10 text-warm" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-foreground">100% Genuine Products</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                We manufacture 100% Genuine <strong className="text-foreground">Solid Wood</strong> Furniture because it's durable and has long life.
              </p>
            </div>

            {/* Free Delivery */}
            <div className="text-center group">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-warm/10 group-hover:bg-warm/20 transition-colors">
                <Truck className="h-10 w-10 text-warm" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-light text-foreground">Free Delivery</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                To provide you the best shopping experience, we provide <strong className="text-foreground">free delivery</strong> on every order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </>
  )
}
