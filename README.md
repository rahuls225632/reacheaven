# Agency Site

A premium software/website development agency marketing site built with Next.js
(App Router), Tailwind CSS v4 and Motion (Framer Motion). Fully static — there is
no backend, database or API route in this project; the enquiry form hands off to
WhatsApp instead of posting to a server.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## Before launch — replace placeholder content

1. **Business identity & contact details** — [lib/config.js](lib/config.js).
   Every value here is a placeholder: business name, email, phone, WhatsApp
   number, location, business hours. Set `NEXT_PUBLIC_SITE_URL` to your real
   domain (used for canonical URLs, sitemap.xml and JSON-LD).
2. **Legal pages** — [app/privacy-policy/page.js](app/privacy-policy/page.js) and
   [app/terms-and-conditions/page.js](app/terms-and-conditions/page.js) contain
   bracketed `[...]` placeholders. Have the real wording reviewed before
   publishing; don't ship the placeholder text as-is.
3. **Pricing** — [data/pricing.js](data/pricing.js) has starting-from figures
   only. Update them to match what you're actually willing to commit to.

## Adding or editing content

Everything content-related lives in `data/` as plain arrays/objects, kept
separate from the UI components that render them:

| File | Powers |
|---|---|
| `data/services.js` | Homepage services grid, `/services`, and `/services/[slug]` detail pages. A service needs a `slug` to get its own detail page — leave it `null` to just link to `/contact`. |
| `data/faqs.js` | FAQ accordion + FAQPage structured data on the homepage. |
| `data/pricing.js` | The three pricing tiers. |
| `data/why-choose-us.js`, `data/trust.js`, `data/process.js`, `data/showcase.js`, `data/technology.js` | Their matching homepage sections. |
| `data/nav.js` | Navbar links and footer columns. |
| `data/contact-options.js` | Business type / budget dropdown options on the enquiry form. |

Icons are referenced by name (e.g. `"Globe"`) and resolved against
[lucide-react](https://lucide.dev/icons/)'s export map via
[components/ui/Icon.jsx](components/ui/Icon.jsx) — any exported lucide icon
name works.

### Adding a new service detail page

Add an entry to `data/services.js` with a unique `slug`; a page at
`/services/<slug>` is generated automatically (see
[app/services/[slug]/page.js](app/services/[slug]/page.js)) and it's picked up
by `app/sitemap.js` without further changes.

### Portfolio, case studies, blog and industries

Not included in this build. If you add them later, follow the same pattern as
`/services`: a data file, a listing page, and (if needed) a `[slug]` detail
route — then add the new routes to `app/sitemap.js`.

## SEO setup

- **Metadata** — global defaults in [app/layout.js](app/layout.js); each route
  overrides `title`/`description`/`alternates.canonical` in its own
  `page.js`.
- **Structured data** — Organization + WebSite JSON-LD sitewide (layout),
  FAQPage JSON-LD on the homepage FAQ section, Service + BreadcrumbList
  JSON-LD on each service detail page. See [lib/seo.jsx](lib/seo.jsx).
- **Sitemap & robots** — generated at build time from
  [app/sitemap.js](app/sitemap.js) / [app/robots.js](app/robots.js), served at
  `/sitemap.xml` and `/robots.txt`.

### Connecting Google Search Console

1. Deploy the site with `NEXT_PUBLIC_SITE_URL` set to your real domain.
2. In [Search Console](https://search.google.com/search-console), add your
   domain as a property and verify ownership (DNS TXT record, or an HTML file
   in `public/` if you use the URL-prefix method).
3. Under **Sitemaps**, submit `sitemap.xml` (Search Console will resolve
   `https://yourdomain.com/sitemap.xml`).

### Connecting Google Analytics

Not wired up yet (no analytics ID has been added). Once you have a GA4
measurement ID, add the official `@next/third-parties` `GoogleAnalytics`
component (or the GA `<script>` snippet) to `app/layout.js`, and keep the ID in
an environment variable rather than hard-coding it.

### Google Business Profile

Not a code integration — create/claim your listing at
[business.google.com](https://business.google.com) using the same business
name, address and phone number as in `lib/config.js`, so the two stay
consistent.

## Notes

- This site was scaffolded against a locally installed Next.js 16.3.5, which
  ships its own docs under `node_modules/next/dist/docs/` — check there first
  if something behaves differently from what you'd expect from an older
  Next.js version (async `params`/`searchParams`, metadata file conventions,
  etc.).
- Animations use [Motion](https://motion.dev) (`motion/react`) and respect
  `prefers-reduced-motion` via [components/ui/Reveal.jsx](components/ui/Reveal.jsx).
