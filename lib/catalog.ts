export type Product = {
  category: string
  product_name: string
  price_display: string
  mrp_optional?: string
  badge?: string
  short_desc?: string
  images: string[]
  product_slug: string
  status: "Active" | "Hidden"
  // Product content sections (both support markdown)
  overview_content?: string
  specifications_content?: string
  // derived
  priceNumber?: number | null
}

export type GenericContent = {
  merchant_details?: string
  care_instructions?: string
  delivery_installation?: string
  warranty_info?: string
  terms_conditions?: string
  faqs?: string
  disclaimer?: string
}

function toNumber(price: string | undefined | null): number | null {
  if (!price) return null
  const n = Number(String(price).replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : null
}

export async function getProducts(): Promise<Product[]> {
  // During build time, fetch directly from sheets instead of API route
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_URL) {
    // Build time - use sheet data directly
    const { getFullProductsFromSheet } = await import('./catalog-server')
    const products = await getFullProductsFromSheet()
    return products.map(parsePriceNumber)
  }
  
  // Runtime - use API route
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
  
  const res = await fetch(`${baseUrl}/api/catalog`, { next: { revalidate: 600 } })
  if (!res.ok) throw new Error("Failed to load catalog")
  const products = (await res.json()) as Product[]
  return products
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts()
  const set = new Set(products.map((p) => p.category))
  return Array.from(set)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((p) => p.product_slug === slug) || null
}

export async function getFeatured(limit = 8): Promise<Product[]> {
  const products = await getProducts()
  const featured = products.filter((p) => ["New", "Sale", "Bestseller"].includes(p.badge || "")).slice(0, limit)
  // if not enough, pad with first actives
  if (featured.length < limit) {
    const rest = products.filter((p) => !featured.includes(p)).slice(0, limit - featured.length)
    return [...featured, ...rest]
  }
  return featured.slice(0, limit)
}

export function parsePriceNumber(p: Product): Product {
  return { ...p, priceNumber: toNumber(p.price_display) }
}
