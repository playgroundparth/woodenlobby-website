import Link from "next/link"

export function CategoryTile({
  title,
  href,
  imageSrc,
}: {
  title: string
  href: string
  imageSrc: string
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-lg bg-gray-100 shadow-sm"
      aria-label={`Explore ${title}`}
    >
      <img
        alt={`${title} category`}
        src={imageSrc || "/placeholder.svg"}
        className="h-48 w-full transform object-cover transition duration-300 group-hover:scale-105 md:h-64"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute bottom-3 left-3 rounded bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 shadow">
        {title}
      </div>
    </Link>
  )
}
