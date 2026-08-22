# Sunlit Network

Marketing and customer-facing website for **Sunlit Network**, an internet service
provider serving Khulna Division, Bangladesh (Jashore, Satkhira, Chuadanga, Khulna,
Narail, Jhenaidah).

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4, with a
Prisma/SQLite-backed admin panel for coverage/PoP management.

## Getting Started

```bash
npm install          # also runs `prisma generate` via postinstall
cp .env.example .env # fill in AUTH_SECRET, ADMIN_SEED_EMAIL/PASSWORD
npm run db:migrate   # create the SQLite database
npm run db:seed      # seed sample PoPs + the admin user
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the
NOC admin panel (credentials come from `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`
in your `.env`).

```bash
npm run build       # production build + type-check
npm run start       # serve the production build
npm run lint        # ESLint
npm run db:studio   # browse the database with Prisma Studio
```

## Content management

Most business content lives in `src/data/*.ts` — edit these files to update
the site without touching component code:

- `company.ts` — company info, contact details, nav links, social links
- `packages.ts` — internet package speeds, pricing and features
- `services.ts` — service catalog (broadband, business, IP telephony, etc.)
- `faqs.ts` — FAQ questions and answers
- `testimonials.ts` — customer testimonials
- `stats.ts` — trust stats, performance metrics, network layers, business features

**Coverage areas are the one exception** — they are *not* a data file. They
live in the database and are managed entirely through `/admin/coverage` (see
below), because the public Coverage page must reflect real PoP data without
a code change or redeploy.

## Coverage / PoP system

```
Admin (/admin/coverage) → Prisma/SQLite → /api/coverage/public → Public /coverage page + homepage
```

- `prisma/schema.prisma` — `PointOfPresence` model. Only `district`,
  `generalArea` and `status` are ever public; every BTRC/NTTN/IP/GPS/topology
  field stays internal.
- `src/lib/coverage.ts` — `getPublicCoverageData()` is the **only** query path
  to public data. It explicitly `select`s just `district`/`generalArea` from
  active PoPs and aggregates them into district-level counts — there is no
  code path where sensitive fields could leak through it.
- `src/app/api/coverage/public/route.ts` — public JSON API wrapping the above.
- `/coverage` and the homepage's coverage section both call
  `getPublicCoverageData()` directly (server-rendered, `dynamic = "force-dynamic"`)
  so admin changes appear immediately, with no caching to bust.
- `/admin/coverage` — protected PoP CRUD (add/edit/enable/disable/delete),
  showing every internal field a NOC would need.

**Auth**: a signed HTTP-only JWT cookie (`src/lib/auth.ts`, via `jose` +
`bcryptjs`), checked in `src/proxy.ts` (Next's proxy/middleware) for every
`/admin/*` and `/api/admin/*` request, and re-checked independently inside
each admin route handler and the admin layout — so a proxy misconfiguration
alone can't expose the panel. All admin input is validated server-side with
Zod (`src/lib/validation.ts`) before touching the database.

To add a real admin user beyond the seeded one, use `npm run db:studio` or
insert via a script using `hashPassword()` from `src/lib/auth.ts`.

## Project structure

```
src/
  app/
    (site)/       Public marketing pages (nav+footer layout)
    admin/        NOC admin panel (own layout, no marketing chrome)
    api/          Route handlers (admin CRUD + public coverage API)
  components/     Reusable UI, organized by domain (home, pricing, coverage, admin, ...)
  data/           Central content/config files (see above)
  lib/            Utilities, SEO helpers, Prisma client, auth, coverage aggregation
  types/          Shared TypeScript types
prisma/
  schema.prisma   Database schema
  seed.ts         Sample PoPs + admin user
```

## Backend integration

Beyond the coverage/PoP system above, the frontend is API-ready but ships
with no mock backend for billing/CRM. `src/lib/api.ts` defines typed service
functions (`coverageApi.checkAvailability`, `contactApi`, `billingApi`) that
call `NEXT_PUBLIC_API_URL`. Until that env var points at a real ISP
billing/CRM backend, forms surface a clear "not connected yet" message with a
fallback phone/WhatsApp contact instead of silently failing. Customer
authentication (the customer-facing portal, distinct from the NOC admin
panel above) is handled entirely by the external self-care portal
(`company.customerPortalUrl`), not by this app.

## SEO

Metadata, Open Graph/Twitter cards, `sitemap.xml` and `robots.txt` are
generated via Next.js metadata routes (`src/app/sitemap.ts`,
`src/app/robots.ts`, `src/app/opengraph-image.tsx`). Organization and
ISP/LocalBusiness JSON-LD structured data is built in `src/lib/seo.ts`.
Admin routes are excluded via `robots: { index: false }`.
