import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function ProductCard({
  slug,
  name,
  price,
  mrp,
  badge,
  image,
}: {
  slug: string
  name: string
  price: string
  mrp?: string
  badge?: string
  image?: string
}) {
  return (
    <Link href={`/p/${slug}`} className="group block">
      <div className="furniture-card overflow-hidden">
        <div className="relative aspect-[3/4] w-full bg-muted/30">
          {image ? (
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          ) : (
            <img
              alt={name}
              src={"/placeholder.svg?height=600&width=800&query=product%20image"}
              className="h-full w-full object-cover"
            />
          )}
          {badge ? (
            <div className="absolute left-3 top-3">
              <Badge className="bg-warm text-warm-foreground hover:bg-warm/90 font-medium text-xs px-2 py-1">
                {badge}
              </Badge>
            </div>
          ) : null}
        </div>
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 font-serif text-lg leading-tight text-foreground group-hover:text-warm transition-colors">{name}</h3>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground text-base">{price}</span>
            {mrp ? <span className="text-sm text-muted-foreground line-through">{mrp}</span> : null}
          </div>
        </div>
      </div>
    </Link>
  )
}
