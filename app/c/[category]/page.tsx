import { notFound } from "next/navigation"
import { getActiveProductsFromSheet } from "@/lib/catalog-server"
import { getProducts } from "@/lib/catalog"
import CategoryClient from "./CategoryClient"

export const revalidate = 600

export async function generateStaticParams() {
  const rows = await getActiveProductsFromSheet()
  if (!rows.length) return [] // no SSG when sheet not configured
  const cats = Array.from(new Set(rows.map((r) => r.category)))
  return cats.map((c) => ({ category: c }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return {
    title: `${category} Furniture | Woodenlobby`,
    description: `Explore ${category} by Woodenlobby.`,
    alternates: { canonical: `/c/${encodeURIComponent(category)}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const all = await getProducts()
  const list = all.filter((p) => p.category === category)
  if (!list.length) return notFound()
  return (
    <div className="container-padding section-padding">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">{category} Collection</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover our handcrafted {category.toLowerCase()} pieces, each thoughtfully designed for modern living.
        </p>
      </div>
      {/* @ts-expect-error Server/Client boundary */}
      <CategoryClient initial={list} />
    </div>
  )
}
