# Woodenlobby — Minimal, Elegant Furniture Showroom

A Next.js App Router site for Woodenlobby with homepage, category pages, product pages, About, and Contact. Data is read-only from a Google Sheet CSV (with local CSV fallback), and enquiries go to WhatsApp (or a form URL if configured).

## Tech
- Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- CSV loader via `/api/catalog` using PapaParse
- Pages: `/`, `/c/[category]`, `/p/[slug]`, `/about`, `/contact`

## Environment Variables
Create `.env` in Vercel Project Settings (no local .env in v0 preview). Example values:

- `NEXT_PUBLIC_SHEET_CSV_URL=` Published Google Sheet CSV URL
- `NEXT_PUBLIC_WHATSAPP=919992221888`  India code 91 + number, no spaces/dashes
- `NEXT_PUBLIC_ENQUIRY_FORM_URL=` Optional fallback if WhatsApp unset
- `NEXT_PUBLIC_INSTAGRAM=https://www.instagram.com/wooden_lobby/`
- `NEXT_PUBLIC_FACEBOOK=https://www.facebook.com/woodenlobby/`
- `NEXT_PUBLIC_YOUTUBE=https://www.youtube.com/@WoodenlobbybyLalitpaposa`
- `NEXT_PUBLIC_ADDRESS="Kali Devi Rd, Mochi Mohalla, Hansi, Haryana 125033"`
- `NEXT_PUBLIC_PHONE_DISPLAY="999-222-1888"`

## Google Sheet → CSV
1. Put your catalog data in a Google Sheet with columns:  
   `category,product_name,price_display,mrp_optional,badge,short_desc,image_1_url,image_2_url,image_3_url,product_slug,status`
2. File → Share → Publish to web → select CSV → copy the link.
3. Set `NEXT_PUBLIC_SHEET_CSV_URL` to that published CSV URL.
4. Only rows with `status = Active` are shown.

## Update Products
- Non-technical users can edit the Google Sheet. Changes reflect after cache expires (revalidate ~10 minutes) or on next deploy.
- Without the Sheet env var, the app falls back to `/public/data/catalog.csv`.

## Enquiry CTA
- WhatsApp is preferred: set `NEXT_PUBLIC_WHATSAPP=countrycode+number`.  
  Example: `919992221888`
- If not set, the app uses `NEXT_PUBLIC_ENQUIRY_FORM_URL?product_name=...&slug=...`.

## Deployment
- Click Publish in v0 to deploy to Vercel.
- Use the GitHub button (top right) to export the project.
- After deploying, configure Environment Variables in Project Settings.

## Accessibility & SEO
- Alt text from product names, visible focus states, mobile-first layout.
- Structured data: LocalBusiness on home/contact; Product schema on product pages.
