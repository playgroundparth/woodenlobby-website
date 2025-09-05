import Papa from "papaparse"
import { slugify } from "@/lib/slug"
import { toGoogleCSVUrl } from "@/lib/sheet"
import type { Product } from "./catalog"

export type BuildProduct = {
  category: string
  product_slug: string
}

type RawRow = {
  category: string
  product_name: string
  price_display: string
  mrp_optional?: string
  badge?: string
  short_desc?: string
  image_1_url?: string
  image_2_url?: string
  image_3_url?: string
  product_slug?: string
  status: string
  specifications_content?: string
  overview_content?: string
}

/**
 * Load products directly from the published Google Sheet at build-time.
 * Returns [] if NEXT_PUBLIC_SHEET_CSV_URL is not set (so we skip SSG and use ISR instead).
 */
export async function getActiveProductsFromSheet(): Promise<BuildProduct[]> {
  const raw = process.env.NEXT_PUBLIC_SHEET_CSV_URL
  if (!raw) return []
  const sheetUrl = toGoogleCSVUrl(raw)

  try {
    const r = await fetch(sheetUrl, { cache: "no-store" })
    if (!r.ok) return []
    const csvText = await r.text()
    // If we accidentally got HTML, treat as missing
    if (/<!doctype html>|<html/i.test(csvText)) return []

    const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true })
    const rows = (parsed.data || []).filter(Boolean)
    return rows
      .map((r: Record<string, string>) => {
        const status = (r.status || "").trim()
        const category = (r.category || "").trim()
        const product_name = (r.product_name || "").trim()
        const providedSlug = (r.product_slug || "").trim()
        const slug = providedSlug || slugify(product_name)
        return { category, product_slug: slug, status }
      })
      .filter((p: any) => p.status === "Active")
      .map(({ category, product_slug }: { category: string, product_slug: string }) => ({ category, product_slug }))
  } catch {
    return []
  }
}

/**
 * Get full product data from sheets during build time
 */
export async function getFullProductsFromSheet(): Promise<Product[]> {
  const raw = process.env.NEXT_PUBLIC_SHEET_CSV_URL
  if (!raw) return []
  
  const sheetUrl = toGoogleCSVUrl(raw)

  try {
    const r = await fetch(sheetUrl, { cache: "no-store" })
    if (!r.ok) return []
    const csvText = await r.text()
    // If we accidentally got HTML, treat as missing
    if (/<!doctype html>|<html/i.test(csvText)) return []

    const parsed = Papa.parse<RawRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h: string) => h.trim(),
    })

    const rows = (parsed.data || []).filter(Boolean)
    const products = rows
      .map((r: RawRow) => {
        const images = [r.image_1_url, r.image_2_url, r.image_3_url].filter(
          (u): u is string => !!(u && u.trim().length > 0),
        )
        const slug = (r.product_slug && r.product_slug.trim()) || slugify(r.product_name || "")
        return {
          category: (r.category || "").trim(),
          product_name: (r.product_name || "").trim(),
          price_display: (r.price_display || "").trim(),
          mrp_optional: (r.mrp_optional || "").trim() || undefined,
          badge: (r.badge || "").trim() || undefined,
          short_desc: (r.short_desc || "").trim() || undefined,
          images,
          product_slug: slug,
          status: (r.status || "Hidden").trim() === "Active" ? ("Active" as const) : ("Hidden" as const),
          specifications_content: (r.specifications_content || "").trim() || undefined,
          overview_content: (r.overview_content || "").trim() || undefined,
        }
      })
      .filter((p: any) => p.status === "Active")

    return products
  } catch {
    return []
  }
}
