import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"

const ADDRESS = process.env.NEXT_PUBLIC_ADDRESS || "Kali Devi Rd, Mochi Mohalla, Hansi, Haryana 125033"
const PHONE_DISPLAY = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "999-222-1888"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-padding grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-light text-foreground">Woodenlobby</h3>
          <p className="text-muted-foreground leading-relaxed max-w-sm">{ADDRESS}</p>
          <p className="text-muted-foreground">Phone/WhatsApp: {PHONE_DISPLAY}</p>
        </div>
        <div>
          <h4 className="mb-6 font-serif text-lg font-light text-foreground">Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-warm transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-warm transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/wooden_lobby/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-warm transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK || "https://www.facebook.com/woodenlobby/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-warm transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@WoodenlobbybyLalitpaposa"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-warm transition-colors"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 font-serif text-lg font-light text-foreground">Follow</h4>
          <div className="flex gap-6 text-muted-foreground">
            <a
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/wooden_lobby/"}
              className="hover:text-warm transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.NEXT_PUBLIC_FACEBOOK || "https://www.facebook.com/woodenlobby/"}
              className="hover:text-warm transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
              href={process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@WoodenlobbybyLalitpaposa"}
              className="hover:text-warm transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center">
        <p className="text-sm text-muted-foreground">© {year} Woodenlobby. All rights reserved.</p>
      </div>
    </footer>
  )
}
