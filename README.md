# Woodenlobby — Minimal, Elegant Furniture Showroom

A Next.js App Router site for Woodenlobby with homepage, category pages, product pages, About, and Contact. Data is read-only from a Google Sheet CSV (with local CSV fallback), and enquiries go to WhatsApp (or a form URL if configured).

## Tech
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- CSV loader via `/api/catalog` using PapaParse
- Pages: `/`, `/c/[category]`, `/p/[slug]`, `/about`, `/contact`


## Update Products
- Non-technical users can edit the Google Sheet. Changes reflect after cache expires (revalidate ~10 minutes) or on next deploy.
- Without the Sheet env var, the app falls back to `/public/data/catalog.csv`.


## Accessibility & SEO
- Alt text from product names, visible focus states, mobile-first layout.
- Structured data: LocalBusiness on home/contact; Product schema on product pages.
