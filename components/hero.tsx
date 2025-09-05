import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-background">
      <div className="container-padding relative py-20 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-balance font-serif text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl font-light">
                Handcrafted
                <br />
                <span className="text-warm italic">Solid Wood</span>
                <br />
                Furniture
              </h1>
              <p className="text-pretty text-muted-foreground text-lg md:text-xl leading-relaxed max-w-md">
                Premium, made-to-order pieces for your living, dining, and bedroom. Thoughtfully designed and meticulously finished with timeless craftsmanship.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="warm" size="lg">
                <Link href="/c/Beds" aria-label="Browse collections">
                  Browse Collections
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a 
                  href={`https://wa.me/919992221888?text=${encodeURIComponent("Hi! I'm interested in custom furniture designs.\n\n🪑 I would like to discuss:\n• Custom furniture requirements\n• Dimensions and specifications\n• Design preferences\n• Material options\n\nPlease help me create something unique for my space!")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Custom designs via WhatsApp"
                >
                  Custom Designs
                </a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden bg-muted/20">
              <img
                alt="Elegant wooden furniture in a modern living space"
                src={"/placeholder.svg?height=800&width=640&query=elegant%20wooden%20furniture%20modern%20living%20space"}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-warm/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-warm/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
