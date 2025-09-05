"use client"
import { ProductGrid } from "@/components/product-grid"
import { SearchAndSort } from "@/components/search-and-sort"
import { useState, useCallback } from "react"

function CategoryClient({ initial }: { initial: any[] }) {
  const [list, setList] = useState(initial)
  const handleChange = useCallback((arr: any[]) => {
    setList((prev) => (prev === arr ? prev : arr))
  }, [])

  return (
    <div className="space-y-6">
      <SearchAndSort products={initial} onChange={handleChange} />
      <ProductGrid products={list} />
    </div>
  )
}

export default CategoryClient
