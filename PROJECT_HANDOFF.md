# UpwardDigital — Project Handoff

A reference doc so any new Claude (or human) coming into this project can ramp
up fast. Skim this first; deep-dive code second.

---

## What this is

The marketing website for **Upward Digital LLC** — a USA-based web development
& SEO agency. Live at **https://upwarddigitalco.com** (and `www.` redirects to
apex). Founded 2015. Owner email: `digitalupwardco@gmail.com`. Notification
inbox: `upwarddigitalco@gmail.com`.

GitHub repo: `TalhaFaisal777/upwarddigital-site` (master branch auto-deploys to
Cloudflare Pages).

---

## Tech stack

- **React 18 + Vite 7** (`npm run dev` → port 5173)
- **Tailwind CSS v4** (theme tokens in [src/index.css](src/index.css))
- **React Router v7** — SPA with `_redirects` fallback to `/index.html`
- **Framer Motion** — page transitions, sliders, scroll animations
- **lucide-react** — icons (plus a custom inline WhatsApp SVG at
  [src/components/common/WhatsAppIcon.jsx](src/components/common/WhatsAppIcon.jsx))
- **Cloudflare Pages** for hosting + **Pages Functions** for backend
- **Cloudflare KV** (namespace: `QUERIES`) for storage — both form submissions
  AND blog posts live here (different key prefixes)
- **Resend** for transactional email
- **Meta Pixel** for ads tracking (ID `2519075205215454`)

---

## Visual / brand language

Editorial cream + blue theme (think Locomotive / Mucho-inspired layouts):

| Token | Value | Used for |
|---|---|---|
| `bg-cream` | `#F7F4EE` | Page background |
| `bg-white` | `#ffffff` | Alternating sections, cards |
| `text-stone-900` | near-black | Body + headings |
| `text-stone-600` | mid gray | Secondary text |
| `text-primary` / `bg-primary` | `#1d4ed8` (blue-700) | Accents, links, CTAs |
| `bg-stone-900` | dark navy | Inverse sections (dark "Why us" bands, footer) |

Type:
- **Inter** sans-serif everywhere
- **Instrument Serif italic** for the "accent word" treatment
  (`<em className="font-serif italic font-medium text-primary">word</em>`)
- All major section headings use the same scale:
  `text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight`

Section eyebrows are rendered with surrounding em-dashes:
`— Section name —` in `text-primary text-xs tracking-[0.2em] uppercase`.

---

## Site structure

### Public pages (in nav)

| Path | File | Notes |
|---|---|---|
| `/` | [src/pages/Home.jsx](src/pages/Home.jsx) | Hero carousel, trust strip, About+ContactForm, services grid, testimonials slider (auto-loop), blog teaser |
| `/services` | [src/pages/Services.jsx](src/pages/Services.jsx) | 4 service deep-dives with outcome stats cards |
| `/portfolio` | [src/pages/Portfolio.jsx](src/pages/Portfolio.jsx) | 7 real client sites with screenshots |
| `/blog` | [src/pages/Blog.jsx](src/pages/Blog.jsx) | Fetches from `/api/posts` |
| `/blog/:slug` | [src/pages/BlogPost.jsx](src/pages/BlogPost.jsx) | Pillar template — see "Blog CMS" |
| `/pricing` | [src/pages/Pricing.jsx](src/pages/Pricing.jsx) | 3 tiers — Starter, Growth, Enterprise. **noindex** |
| `/contact` | [src/pages/Contact.jsx](src/pages/Contact.jsx) | Lead form. **noindex** |

### Hidden / utility pages

| Path | File | Notes |
|---|---|---|
| `/about` | [src/pages/About.jsx](src/pages/About.jsx) | **noindex** — not in nav, kept for direct visits only |
| `/admin` | [src/pages/Admin.jsx](src/pages/Admin.jsx) | Password-gated form submissions table |
| `/admin/blog` | [src/pages/AdminBlogList.jsx](src/pages/AdminBlogList.jsx) | Password-gated blog post manager |
| `/admin/blog/new` | [src/pages/AdminBlogEditor.jsx](src/pages/AdminBlogEditor.jsx) | New post form |
| `/admin/blog/:id` | (same file) | Edit existing post |
| `/ads/preview` | [src/pages/ads/AdMeta.jsx](src/pages/ads/AdMeta.jsx) | 4 Meta ad creatives rendered at 1080×1080 — screenshot for ads |

---

## Layout components

- **Navbar** — [src/components/layout/Navbar.jsx](src/components/layout/Navbar.jsx)
  Route-aware styling: white text on dark hero (home only, top of page),
  dark text on cream background elsewhere or after scroll. Logo image only,
  no text duplicate. Mobile drawer.
- **Footer** — [src/components/layout/Footer.jsx](src/components/layout/Footer.jsx)
  Dark `stone-900` band with full logo image. CTA strip + 4 columns.
- **FloatingActions** — [src/components/common/FloatingActions.jsx](src/components/common/FloatingActions.jsx)
  Bottom-right Call + WhatsApp buttons — **mobile only** (`lg:hidden`).
- **LoadingScreen** — full logo + spinner, fades after 1.5s.

---

## Contact info (hardcoded constants per file)

```js
const PHONE_HREF    = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/15812947936"
```

- **Phone (display):** `+1 (201) 304-0657`
- **WhatsApp (display):** `+1 (581) 294-7936`
- **Email:** `digitalupwardco@gmail.com`
- **Notification inbox:** `upwarddigitalco@gmail.com`

If updating, search/replace these strings across `src/` since they live in
each page that has a Call/WhatsApp CTA.

---

## Social profiles

- Facebook: https://www.facebook.com/upwarddigitalllcagency
- Instagram: https://www.instagram.com/upwarddigital.agency/
- LinkedIn: https://www.linkedin.com/in/upward-digital-90b7a2406/

(Used in Footer + Contact page social icons.)

---

## Backend / Cloudflare Pages Functions

All backend code lives in [functions/](functions/). Cloudflare runs these on
every request to matching paths.

### Shared

- [functions/_shared/blog.js](functions/_shared/blog.js) — blog storage
  helpers + seed-on-first-list-call for the 3 migrated posts.

### Form submissions

- `POST /api/submit` → [functions/api/submit.js](functions/api/submit.js)
  Writes submission to KV as `query:{epoch}:{uuid}` and emails via Resend.
- `GET /api/queries` → [functions/api/queries.js](functions/api/queries.js)
  Lists all `query:` keys (newest first). **Auth:** `Bearer ADMIN_PASSWORD`.
- `DELETE /api/queries/[key]` → [functions/api/queries/[key].js](functions/api/queries/[key].js)
  Deletes one submission. Same auth.

### Blog posts

- `GET /api/posts` → public list (summary fields only)
- `GET /api/posts/[slug]` → public single post (full payload)
- `GET /api/admin/posts` → admin list (full payload). Auth required.
- `POST /api/admin/posts` → create. Auth required.
- `GET|PUT|DELETE /api/admin/posts/[id]` → single post CRUD. Auth required.

Posts are stored as `post:{uuid}` keys. Schema is defined in
[functions/api/admin/posts.js](functions/api/admin/posts.js) `normalizePost()`.

---

## Required Cloudflare Pages bindings & env vars

Set in **Workers & Pages → upwarddigital-site → Settings**:

| Name | Type | Where set |
|---|---|---|
| `QUERIES` | KV namespace | Settings → Bindings |
| `ADMIN_PASSWORD` | Secret | Variables and Secrets |
| `RESEND_API_KEY` | Secret | Variables and Secrets |
| `NOTIFICATION_EMAIL` | Plaintext | Variables and Secrets |

⚠️ After ANY env var or binding change, **redeploy** (Deployments → ⋯ →
Retry deployment). Pages caches bindings per deployment.

**Important Resend quirk:** with the free `onboarding@resend.dev` sender,
emails can only be delivered to the email address used to sign up at
Resend. `NOTIFICATION_EMAIL` must match the Resend account email. To send
to a different address or use a custom `from:`, verify
`upwarddigitalco.com` in Resend (DNS TXT records).

Local dev uses [.dev.vars](.dev.vars) (gitignored) when running
`npx wrangler pages dev dist`.

---

## Blog CMS — how it works

The blog uses a **pillar-page template** modeled after
https://formosabathrooms.co.uk/bathrooms-in-west-yorkshire/. Every post has
the same structural blocks; the admin fills in fields, the site renders.

**Block types** (all optional except hero):
1. **Hero** — H1 title, subtitle, cover image, optional ⭐ rating + phone badge
2. **Image strip** — up to 6 horizontal images
3. **Service cards** — repeatable {title, description}
4. **Quote form** — toggle on/off (renders the embedded lead form)
5. **Content sections** — repeatable {heading, body, image, imageSide}
   - `imageSide`: `"left"`, `"right"`, or `"full"`
   - body supports inline markdown: `**bold**` and `[text](url)` (internal
     paths like `/pricing` stay on-site; external open in new tab)
6. **FAQ** — repeatable {question, answer}
7. **Bottom CTA** — heading + subtitle (Call/WhatsApp buttons auto-added)
8. **SEO** — meta title, meta description, keywords, slug, category

### Images

User picks files from their computer. [src/lib/imageUpload.js](src/lib/imageUpload.js)
compresses to max 1600px wide, JPEG q=0.82, then stores as base64 data URL
embedded in the post JSON. Typical image ~100–250 KB. KV value limit is
25 MB so 50+ images per post is fine.

### Seeded posts

3 hardcoded posts from `src/data/blogPosts.js` are auto-written to KV the
first time `/api/posts` is called. After that they're editable like any
other post. Source still lives in
[src/data/blogPosts.js](src/data/blogPosts.js) but the runtime reads from KV.

---

## Form submission flow

1. User fills form (home consultation OR contact page OR blog quote form)
2. JS POSTs to `/api/submit` with `source` tag (`home_consultation`,
   `contact_page`, `blog:{slug}`)
3. Function writes to KV (key prefix `query:`), fires `Lead` Meta Pixel
   event, sends email via Resend
4. Owner views all submissions at `/admin`
5. Search, filter by source, click row → side drawer with full details,
   delete with trash icon

Form submit is **optimistic** — the success screen shows immediately even
if the API/email fails. Failures are logged to Cloudflare → Functions →
Real-time logs. The submission is still saved to KV unless KV is unbound.

---

## SEO

- **Title + meta description**: in [index.html](index.html) for the site
  shell; per-page `useNoIndex()` hook for hidden pages; BlogPost dynamically
  updates `<title>` and meta description from `post.seo.*`
- **Sitemap**: [public/sitemap.xml](public/sitemap.xml) — only indexable
  pages (NOT about, pricing, contact, admin)
- **robots.txt**: [public/robots.txt](public/robots.txt) — points to sitemap
- **OG image**: [public/og-image.jpg](public/og-image.jpg)
- **Favicons**: `favicon-32.png`, `favicon-64.png`, `favicon-192.png`
- **Structured data**: JSON-LD Organization + WebSite schema in index.html
- **Google Search Console**: verified via meta tag
  (`googlee8cacc681e8df16a`) AND `/googlee8cacc681e8df16a.html`

---

## Meta Pixel events

Wired up in [src/lib/pixel.js](src/lib/pixel.js) and
[src/hooks/usePixelTracking.js](src/hooks/usePixelTracking.js):

Standard: `PageView`, `Contact`, `Schedule`, `Lead`, `ViewContent`,
`InitiateCheckout`. Custom: `ScrollDepth` (25/50/75/100), `TimeOnSite`
(30/60/180/300), `ServiceInterest`, `PortfolioClick`, `PricingTierClick`,
`OutboundClick`, `FooterCTAClick`, `BlogPostClick`.

---

## Important conventions / preferences (learned from owner)

- **NEVER add Co-Authored-By: Claude or AI mentions in commit messages.**
  Commit messages should look human-written. See
  [~/.claude/CLAUDE.md](~/.claude/CLAUDE.md) for the full rule.
- **Comments**: max 2 lines, only when WHY is non-obvious. Default to no
  comment.
- **Don't auto-commit or auto-push** in auto mode. Owner explicitly requests
  push each time.
- **About page is hidden** — owner deliberately removed it from nav.
- The 4 ad creatives at `/ads/preview` are owner-facing only — they're how
  the owner gets ready-to-upload Meta ad images.

---

## Common commands

```bash
# Dev server (Vite — note: Pages Functions don't run here, /api routes 404)
npm run dev          # http://localhost:5173

# Local with Pages Functions (for admin testing)
npm run build
npx wrangler pages dev dist   # http://localhost:8788

# Production build
npm run build        # → dist/

# Lint (optional — config is permissive)
npx eslint src/
```

---

## Known quirks / gotchas

1. **Tailwind v4 canonical-class warnings** — the linter complains about
   `aspect-[4/5]` etc. They work fine; ignore unless you want to migrate to
   canonical forms (`aspect-4/5`).
2. **KV eventual consistency** — admin might not see a new submission for
   30–60s on rare requests. Just refresh.
3. **Resend recipient restriction on free tier** — see "Bindings" section.
4. **localhost admin gives "Unexpected token '<'"** — Vite returns
   index.html for `/api/*` paths. Use Wrangler or test on production.
5. **`max-w-7xl`** is the standard container width for full-width sections.
   `max-w-3xl` / `max-w-4xl` for narrow text sections.

---

## Where to start when picking up this project

1. Read this file (you're doing it).
2. Skim [src/App.jsx](src/App.jsx) to see all routes.
3. Read [src/pages/Home.jsx](src/pages/Home.jsx) — the most complex page;
   contains the visual language for the whole site.
4. Look at [functions/_shared/blog.js](functions/_shared/blog.js) +
   [src/pages/BlogPost.jsx](src/pages/BlogPost.jsx) together — that's the
   data → render flow for posts.
5. Check `git log --oneline` for the last 20 commits — recent activity
   tells you what's being iterated on.
