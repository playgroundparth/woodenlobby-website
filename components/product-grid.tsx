import { ProductCard } from "./product-card"
import type { Product } from "@/lib/catalog"

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard
          key={p.product_slug}
          slug={p.product_slug}
          name={p.product_name}
          price={p.price_display}
          mrp={p.mrp_optional}
          badge={p.badge}
          image={p.images?.[0]}
        />
      ))}
    </div>
  )
}
