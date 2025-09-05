"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const NAV = [
  { label: "Home", href: "/" },
  { label: "Beds", href: "/c/Beds" },
  { label: "Sofas", href: "/c/Sofas" },
  { label: "Dining", href: "/c/Dining" },
  { label: "Storage", href: "/c/Storage" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container-padding flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="flex items-center" aria-label="Woodenlobby home">
          <Image
            src="/brand/woodenlobby-logo-full.svg"
            alt="Woodenlobby logo"
            width={180}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-warm transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[380px] bg-background border-border">
            <div className="mt-12 flex flex-col gap-6">
              {NAV.map((n) => (
                <Link 
                  onClick={() => setOpen(false)} 
                  className="text-xl font-medium text-foreground hover:text-warm transition-colors px-4" 
                  key={n.href} 
                  href={n.href}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
