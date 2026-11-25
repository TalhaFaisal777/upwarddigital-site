# Upward Digital — Agency Website

Marketing website for **Upward Digital**, a web development and SEO agency. Live at **[upwarddigitalco.com](https://upwarddigitalco.com)**.

It is a React single-page app with a small serverless backend on Cloudflare: lead forms, an admin panel and a blog CMS, without a separate server or database.

## Features

- **Lead capture**: home and contact forms post to a Cloudflare Pages Function, are stored in Cloudflare KV, and trigger an email notification through Resend.
- **Admin panel** (`/admin`): password-protected table of form submissions.
- **Blog CMS** (`/admin/blog`): create, edit and publish posts; posts are stored in KV and served from `/api/posts`.
- **SEO**: per-page meta tags, `noindex` on utility pages, sitemap page and SPA redirects.
- **Ads tracking**: Meta Pixel integration through a small React hook.
- **UI**: Tailwind CSS v4, Radix UI primitives, Framer Motion page transitions, sliders and scroll animations, responsive mobile drawer.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS v4, Radix UI, Framer Motion, lucide-react |
| Backend | Cloudflare Pages Functions (`functions/`) |
| Storage | Cloudflare KV |
| Email | Resend |
| Hosting | Cloudflare Pages (auto-deploys from `master`) |

## Project structure

```
src/
  pages/            Home, Services, Portfolio, Blog, Pricing, Contact, Admin, blog editor
  components/       layout (Navbar, Footer), common sections, ui primitives
  hooks/            SEO meta, noindex, pixel tracking
functions/
  api/submit.js     form submissions -> KV + email
  api/queries.js    admin: list submissions
  api/posts.js      public blog posts
  api/admin/posts   admin: create / update / delete posts
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Cloudflare setup (KV binding `QUERIES`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `NOTIFICATION_EMAIL`) is described in [ADMIN_SETUP.md](ADMIN_SETUP.md).
