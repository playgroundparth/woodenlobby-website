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
  // During build time (static generation), fetch directly from sheets instead of API route
  // Vercel sets CI=true during build, and we're in a server context during SSG
  const isBuildTime = typeof window === 'undefined' && (
    process.env.CI === 'true' || 
    process.env.VERCEL === '1' || 
    process.env.NODE_ENV === 'production'
  )
  
  if (isBuildTime) {
    // Build time - fetch directly from Google Sheets or use local fallback
    try {
      const { getFullProductsFromSheet } = await import('./catalog-server')
      const products = await getFullProductsFromSheet()
      if (products.length > 0) {
        return products.map(parsePriceNumber)
      }
    } catch (error) {
      console.warn('Failed to fetch from Google Sheets during build, using local fallback:', error)
    }
    
    // Fallback to local CSV during build
    try {
      const fs = await import('fs')
      const path = await import('path')
      const Papa = await import('papaparse')
      const { slugify } = await import('./slug')
      
      const csvPath = path.join(process.cwd(), 'woodenstreet-catalog-data.csv')
      const csvContent = fs.readFileSync(csvPath, 'utf-8')
      
      const parsed = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h: string) => h.trim(),
      })
      
      const products = parsed.data.map((row: any) => {
        const images = [row.image1, row.image2, row.image3].filter(Boolean)
        return {
          category: (row.category || '').trim(),
          product_name: (row.name || row.product_name || '').trim(),
          price_display: (row.price_display || row.price || '').trim(),
          mrp_optional: (row.mrp_optional || '').trim() || undefined,
          badge: (row.badge || '').trim() || undefined,
          short_desc: (row.short_description || row.short_desc || '').trim() || undefined,
          images,
          product_slug: (row.product_slug || '').trim() || slugify(row.name || row.product_name || ''),
          status: (row.status || '').trim() === 'Active' ? 'Active' as const : 'Hidden' as const,
          specifications_content: (row.specifications_content || '').trim() || undefined,
          overview_content: (row.overview_content || '').trim() || undefined,
        }
      }).filter((p: any) => p.status === 'Active')
      
      return products.map(parsePriceNumber)
    } catch (error) {
      console.error('Failed to load local CSV fallback:', error)
      return []
    }
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
