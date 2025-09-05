import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/catalog"
import { getActiveProductsFromSheet } from "@/lib/catalog-server"
import { ProductGallery } from "@/components/product-gallery"
import { EnquiryButton, WhatsAppShareButton } from "@/components/enquiry-button"
import { ProductSpecifications } from "@/components/product-specifications"

export const revalidate = 600

export async function generateStaticParams() {
  const rows = await getActiveProductsFromSheet()
  if (!rows.length) return []
  return rows.map((r) => ({ slug: r.product_slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.product_name} | Woodenlobby`,
    description: product.short_desc || `${product.product_name} by Woodenlobby`,
    alternates: { canonical: `/p/${product.product_slug}` },
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
      type: "website",
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.product_name,
    image: product.images,
    description: product.short_desc,
    brand: { "@type": "Brand", name: "Woodenlobby" },
    areaServed: "India",
    offers: product.price_display
      ? {
          "@type": "Offer",
          priceCurrency: "INR",
          price: Number(String(product.price_display).replace(/[^0-9.]/g, "")) || undefined,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  }

  return (
    <>
      <div className="container-padding py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="md:sticky md:top-8 md:self-start">
            <ProductGallery images={product.images} alt={product.product_name} />
          </div>
          <div className="space-y-8">
            {/* Product badge if available */}
            {product.badge && (
              <div className="inline-flex">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warm/10 text-warm">
                  {product.badge}
                </span>
              </div>
            )}
            
            {/* Product title */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
                  {product.product_name}
                </h1>
                <WhatsAppShareButton 
                  productName={product.product_name} 
                  slug={product.product_slug}
                  priceDisplay={product.price_display}
                />
              </div>
              
              {/* Pricing */}
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-semibold text-foreground">{product.price_display}</span>
                {product.mrp_optional ? (
                  <span className="text-lg text-muted-foreground line-through">{product.mrp_optional}</span>
                ) : null}
              </div>
            </div>
            
            {/* Product description */}
            {product.short_desc && (
              <div className="space-y-4">
                <p className="text-lg text-foreground/80 leading-relaxed max-w-md">
                  {product.short_desc}
                </p>
              </div>
            )}
            
            {/* Handcrafted badge */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-warm rounded-full"></div>
              <span className="text-sm font-medium">Handcrafted • Made to Order</span>
            </div>
            
            {/* CTA Button */}
            <div className="pt-4">
              <EnquiryButton 
                productName={product.product_name} 
                slug={product.product_slug}
                priceDisplay={product.price_display}
              />
            </div>
            
            {/* Product Specifications in Right Sidebar */}
            <ProductSpecifications product={product} />
          </div>
        </div>
      </div>

      {/* Sticky enquiry bar on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md p-4 md:hidden">
        <div className="container-padding">
          <EnquiryButton 
            productName={product.product_name} 
            slug={product.product_slug}
            priceDisplay={product.price_display}
          />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
