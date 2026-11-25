# Upward Digital website

This is the website for Upward Digital, a small web development and SEO agency. It's live at [upwarddigitalco.com](https://upwarddigitalco.com).

It's a React app built with Vite, hosted on Cloudflare Pages. There's no separate backend server. The few backend bits it needs run as Cloudflare Pages Functions in the `functions/` folder:

- The contact and consultation forms post to `/api/submit`. Submissions are saved in Cloudflare KV and an email notification goes out through Resend.
- `/admin` is a password-protected page to read those submissions.
- `/admin/blog` is a small blog editor. Posts are stored in KV and the public blog reads them from `/api/posts`.

Other things in here: per-page SEO meta tags (and `noindex` on utility pages), a Meta Pixel hook for ad tracking, and page transitions and sliders with Framer Motion.

Stack: React 18, Vite, React Router, Tailwind CSS v4, Radix UI, Framer Motion, Cloudflare Pages Functions, Cloudflare KV, Resend.

## Running it locally

```bash
npm install
npm run dev
npm run build
```

The Cloudflare setup (the `QUERIES` KV binding and the env vars for the admin password and Resend) is written up in [ADMIN_SETUP.md](ADMIN_SETUP.md).
