import type { NextRequest } from "next/server"
import Papa from "papaparse"
import { slugify } from "@/lib/slug"
import { toGoogleCSVUrl } from "@/lib/sheet"

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

export const revalidate = 600

export async function GET(request: NextRequest) {
  const raw = process.env.NEXT_PUBLIC_SHEET_CSV_URL
  const sheetUrl = raw ? toGoogleCSVUrl(raw) : null

  async function fetchLocalCSV() {
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : process.env.NEXT_PUBLIC_BASE_URL || request.url
    const localUrl = new URL("/data/catalog.csv", baseUrl)
    const r = await fetch(localUrl.toString(), { cache: "no-store" })
    if (!r.ok) throw new Error("Local CSV fetch failed")
    return await r.text()
  }

  let csvText: string | null = null

  if (sheetUrl) {
    try {
      const r = await fetch(sheetUrl, { cache: "no-store" })
      if (!r.ok) {
        csvText = await fetchLocalCSV()
      } else {
        const text = await r.text()
        if (/<!doctype html>|<html/i.test(text)) {
          // Sheet not published to CSV or wrong link → fallback
          csvText = await fetchLocalCSV()
        } else {
          csvText = text
        }
      }
    } catch {
      try {
        csvText = await fetchLocalCSV()
      } catch {
        return new Response(JSON.stringify({ error: "Unable to load CSV" }), { status: 500 })
      }
    }
  } else {
    try {
      csvText = await fetchLocalCSV()
    } catch {
      return new Response(JSON.stringify({ error: "Unable to load CSV" }), { status: 500 })
    }
  }

  const parsed = Papa.parse<RawRow>(csvText!, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })

  const rows = (parsed.data || []).filter(Boolean)
  const products = rows
    .map((r) => {
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
        status: (r.status || "Hidden").trim() === "Active" ? "Active" : "Hidden",
        specifications_content: (r.specifications_content || "").trim() || undefined,
        overview_content: (r.overview_content || "").trim() || undefined,
      }
    })
    .filter((p) => p.status === "Active")

  return Response.json(products)
}
