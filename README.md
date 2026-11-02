# Utsava: Moments Made Personal

Next.js 14 (App Router) + TypeScript, Tailwind, Framer Motion, Firebase Firestore, Cloudinary, Resend + React Email.
No separate backend: everything runs through Server Actions.

## Folder structure
```
firestore.rules          lock Firestore from browsers
scripts/seed.mjs         seeds 8 sample templates
public/covers/*.svg      placeholder covers/screenshots (replace via /admin)
src/app/(site)/          home, /templates, /templates/[slug], /order, /order/success
src/app/admin/           login + panel (orders, templates add/edit/delete)
src/app/actions/         order.ts (customer), admin.ts (admin)
src/components/          UI + emails/
src/lib/                 fonts, supabase clients, validation, auth, email, data
src/middleware.ts        protects /admin
```

## Setup (100% free: Firebase Spark + Cloudinary free + Resend free + Vercel hobby)
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it.
3. Firebase: console.firebase.google.com -> new project -> Build -> Firestore Database -> Create database (production mode).
   Then Firestore -> Rules -> paste `firestore.rules` -> Publish.
   Project settings -> Service accounts -> Generate new private key. Copy project_id, client_email, private_key into `.env.local`.
4. `npm run seed` (Node 20.6+) adds 8 sample templates.
5. Cloudinary (optional, for uploads in /admin): free account -> Settings -> Upload -> add an UNSIGNED upload preset. Put cloud name and preset in `.env.local`. Without it, paste image URLs in the admin form.
6. Resend: create an API key. `onboarding@resend.dev` only emails your own account; verify a domain to email customers.
7. `npm run dev`, open http://localhost:3000. Admin: /admin.

## Deploy on Vercel
Push to GitHub, import in Vercel, add all `.env.example` variables, set `NEXT_PUBLIC_SITE_URL` to your domain.
For FIREBASE_PRIVATE_KEY paste the key as one line with `\n` for line breaks.

## Extra free features
Wishlist hearts (saved in the visitor's browser, /wishlist page), Share on WhatsApp, Order on WhatsApp (set NEXT_PUBLIC_WHATSAPP_NUMBER).

## Before launch
- Replace placeholder testimonials, rating line and FAQ copy (`src/lib/site.ts`, `src/components/Hero.tsx`).
- Replace seed demo links (example.com) and placeholder SVGs with real screenshots.
- Fonts: DM Serif Display, Kaushan Script, Poppins, Shadows Into Light (all free on Google Fonts).
