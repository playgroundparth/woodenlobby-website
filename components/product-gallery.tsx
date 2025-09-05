"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const imgs = images && images.length ? images : ["/product-gallery.png"]
  const [index, setIndex] = useState(0)
  const startX = useRef<number | null>(null)

  useEffect(() => {
    if (index >= imgs.length) setIndex(0)
  }, [imgs.length, index])

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx > 40) setIndex((i) => Math.max(0, i - 1))
    if (dx < -40) setIndex((i) => Math.min(imgs.length - 1, i + 1))
    startX.current = null
  }

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={imgs[index] || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-all duration-300"
          sizes="(min-width: 1024px) 50vw, 100vw"
          unoptimized
        />
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                i === index 
                  ? "ring-2 ring-warm ring-offset-2 ring-offset-background" 
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
