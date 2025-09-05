"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import type { Product } from "@/lib/catalog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  products: Product[]
  onChange: (list: Product[]) => void
}

function priceToNumber(p: Product) {
  const n = Number(String(p.price_display || "").replace(/[^0-9.]/g, ""))
  return Number.isFinite(n) ? n : Number.NaN
}

export function SearchAndSort({ products, onChange }: Props) {
  const [q, setQ] = useState("")
  const [sort, setSort] = useState<"default" | "asc" | "desc">("default")

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    let list = products
    if (query) {
      list = products.filter((p) => p.product_name.toLowerCase().includes(query))
    }
    if (sort !== "default") {
      const withPrice = [...list].sort((a, b) => {
        const pa = priceToNumber(a)
        const pb = priceToNumber(b)
        if (Number.isNaN(pa) && Number.isNaN(pb)) return 0
        if (Number.isNaN(pa)) return 1 // NaNs to end
        if (Number.isNaN(pb)) return -1
        return sort === "asc" ? pa - pb : pb - pa
      })
      return withPrice
    }
    return list
  }, [products, q, sort])

  // Only emit when list actually changes (by slug signature) to avoid unnecessary parent updates.
  const lastSigRef = useRef<string>("")
  useEffect(() => {
    const sig = filtered.map((p) => p.product_slug).join("|")
    if (sig !== lastSigRef.current) {
      lastSigRef.current = sig
      onChange(filtered)
    }
  }, [filtered, onChange])

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <Label htmlFor="search" className="text-sm text-gray-700">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search by product name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="w-full md:w-64">
        <Label className="text-sm text-gray-700">Sort</Label>
        <Select value={sort} onValueChange={(v: "default" | "asc" | "desc") => setSort(v)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="asc">Price: Low to High</SelectItem>
            <SelectItem value="desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
