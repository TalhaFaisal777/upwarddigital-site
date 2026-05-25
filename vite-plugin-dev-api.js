import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SUBMISSIONS_FILE = path.join(__dirname, ".dev-submissions.json")
const POSTS_FILE = path.join(__dirname, ".dev-posts.json")

// ── persistence helpers ──────────────────────────────────────────────────────

function readFile(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")) } catch { return {} }
}
function writeFile(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

// ── blog helpers (mirrors _shared/blog.js logic) ────────────────────────────

const SEED_POSTS = [
  {
    id: "seed-local-seo-guide",
    slug: "local-seo-guide-service-businesses-2026",
    category: "Local SEO",
    title: "The Complete Local SEO Guide for Service Businesses in 2026",
    excerpt: "How to dominate Google's local pack and the Map results in your city — real strategies we use for our clients across the USA.",
    author: "Muhammad Talha", date: "2026-05-02", readTime: "11 min",
    coverImage: "/services/google-maps.jpg",
    hero: { subtitle: "Practical playbook for ranking on Google Maps.", showRating: true, rating: "4.9", ratingCount: "87", phone: "+1 (201) 304-0657" },
    sections: [], faq: [], imageStrip: [], serviceCards: [], showQuoteForm: true,
    cta: { heading: "Ready to dominate local search?", subtitle: "" },
    seo: { metaTitle: "The Complete Local SEO Guide for Service Businesses in 2026", metaDescription: "", keywords: [] },
    createdAt: "2026-05-02T00:00:00.000Z", updatedAt: "2026-05-02T00:00:00.000Z",
  },
  {
    id: "seed-website-development-cost",
    slug: "website-development-cost-usa-2026",
    category: "Web Development",
    title: "How Much Does Website Development Cost in the USA in 2026?",
    excerpt: "Real numbers from over 120 projects we've delivered.",
    author: "James Wilson", date: "2026-04-28", readTime: "9 min",
    coverImage: "/services/web-dev.jpg",
    hero: { subtitle: "Transparent pricing based on 120+ real client projects.", showRating: true, rating: "4.9", ratingCount: "87", phone: "+1 (201) 304-0657" },
    sections: [], faq: [], imageStrip: [], serviceCards: [], showQuoteForm: true,
    cta: { heading: "Want a custom quote?", subtitle: "" },
    seo: { metaTitle: "Website Development Cost in the USA — 2026 Pricing Guide", metaDescription: "", keywords: [] },
    createdAt: "2026-04-28T00:00:00.000Z", updatedAt: "2026-04-28T00:00:00.000Z",
  },
  {
    id: "seed-google-ads-vs-seo",
    slug: "google-ads-vs-seo-which-is-better",
    category: "Digital Marketing",
    title: "Google Ads vs SEO: Which Should Your Business Invest In First?",
    excerpt: "The honest answer most agencies won't give you.",
    author: "Maya Patel", date: "2026-04-21", readTime: "8 min",
    coverImage: "/services/google-ads.jpg",
    hero: { subtitle: "An honest comparison from an agency that does both.", showRating: true, rating: "4.9", ratingCount: "87", phone: "+1 (201) 304-0657" },
    sections: [], faq: [], imageStrip: [], serviceCards: [], showQuoteForm: true,
    cta: { heading: "Not sure which fits your business?", subtitle: "" },
    seo: { metaTitle: "Google Ads vs SEO: Which Should Your Business Invest In First?", metaDescription: "", keywords: [] },
    createdAt: "2026-04-21T00:00:00.000Z", updatedAt: "2026-04-21T00:00:00.000Z",
  },
]

function getPostsDb() {
  // Only seed when the file doesn't exist yet — never re-seed after manual deletes
  if (!fs.existsSync(POSTS_FILE)) {
    const db = {}
    for (const p of SEED_POSTS) db[p.id] = p
    writeFile(POSTS_FILE, db)
    return db
  }
  return readFile(POSTS_FILE)
}

function slugify(s) {
  return String(s).toLowerCase().normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").replace(/-+/g, "-")
}

function normalizePost(input, existing = null) {
  const now = new Date().toISOString()
  return {
    id: input.id || crypto.randomUUID(),
    slug: slugify(input.slug || input.title || ""),
    title: input.title || "",
    excerpt: input.excerpt || "",
    category: input.category || "Insights",
    author: input.author || "UpwardDigital",
    date: input.date || now.slice(0, 10),
    readTime: input.readTime || "5 min",
    coverImage: input.coverImage || "",
    hero: { subtitle: input.hero?.subtitle || "", showRating: !!input.hero?.showRating, rating: input.hero?.rating || "4.9", ratingCount: input.hero?.ratingCount || "87", phone: input.hero?.phone || "" },
    intro: { heading: input.intro?.heading || "", body: input.intro?.body || "" },
    detailHeading: input.detailHeading || "",
    detailSections: Array.isArray(input.detailSections) ? input.detailSections : [],
    imageStrip: Array.isArray(input.imageStrip) ? input.imageStrip : [],
    serviceCards: Array.isArray(input.serviceCards) ? input.serviceCards : [],
    showQuoteForm: input.showQuoteForm !== false,
    sections: Array.isArray(input.sections) ? input.sections : [],
    faq: Array.isArray(input.faq) ? input.faq : [],
    cta: { heading: input.cta?.heading || "Ready to grow your business?", subtitle: input.cta?.subtitle || "" },
    seo: { metaTitle: input.seo?.metaTitle || input.title || "", metaDescription: input.seo?.metaDescription || input.excerpt || "", keywords: Array.isArray(input.seo?.keywords) ? input.seo.keywords : [] },
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }
}

// ── body reader ──────────────────────────────────────────────────────────────

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (c) => (body += c))
    req.on("end", () => {
      try { resolve(JSON.parse(body)) } catch (e) { reject(e) }
    })
    req.on("error", reject)
  })
}

// ── plugin ───────────────────────────────────────────────────────────────────

export default function devApiPlugin() {
  return {
    name: "dev-api",
    configureServer(server) {
      const password = process.env.ADMIN_PASSWORD || "admin"

      function json(res, body, status = 200) {
        res.statusCode = status
        res.setHeader("Content-Type", "application/json")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify(body))
      }

      function isAuth(req) {
        return (req.headers["authorization"] || "") === `Bearer ${password}`
      }

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, "http://localhost")
        const p = url.pathname

        // OPTIONS preflight
        if (req.method === "OPTIONS") {
          res.setHeader("Access-Control-Allow-Origin", "*")
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
          res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
          res.statusCode = 204
          res.end()
          return
        }

        try {
          // ── POST /api/submit ─────────────────────────────────────────────
          if (req.method === "POST" && p === "/api/submit") {
            const data = await readBody(req)
            if (!data || (!data.name && !data.email))
              return json(res, { ok: false, error: "Missing required fields" }, 400)
            const id = crypto.randomUUID()
            const epoch = Date.now()
            const kvKey = `query:${epoch}:${id}`
            const t = (s, max = 2000) => (typeof s === "string" ? s.slice(0, max) : s)
            const submission = {
              id, _kvKey: kvKey,
              source: t(data.source || "unknown", 100), name: t(data.name || "", 200),
              email: t(data.email || "", 200), phone: t(data.phone || "", 100),
              company: t(data.company || "", 200), service: t(data.service || "", 100),
              budget: t(data.budget || "", 100), website: t(data.website || "", 300),
              message: t(data.message || "", 5000), created_at: new Date(epoch).toISOString(),
            }
            const db = readFile(SUBMISSIONS_FILE)
            db[kvKey] = submission
            writeFile(SUBMISSIONS_FILE, db)
            return json(res, { ok: true, stored: true })
          }

          // ── GET /api/queries ─────────────────────────────────────────────
          if (req.method === "GET" && p === "/api/queries") {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const db = readFile(SUBMISSIONS_FILE)
            const submissions = Object.entries(db).sort(([a], [b]) => (a < b ? 1 : -1)).map(([, v]) => v)
            return json(res, { ok: true, count: submissions.length, submissions })
          }

          // ── DELETE /api/queries/:key ─────────────────────────────────────
          if (req.method === "DELETE" && p.startsWith("/api/queries/")) {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const key = decodeURIComponent(p.replace("/api/queries/", ""))
            const db = readFile(SUBMISSIONS_FILE)
            delete db[key]
            writeFile(SUBMISSIONS_FILE, db)
            return json(res, { ok: true })
          }

          // ── GET /api/posts (public blog listing) ────────────────────────
          if (req.method === "GET" && p === "/api/posts") {
            const db = getPostsDb()
            const all = Object.values(db).sort((a, b) =>
              new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
            const limit = Math.min(Number(url.searchParams.get("limit")) || 24, 100)
            const cursorParam = url.searchParams.get("cursor")
            const startIdx = cursorParam ? parseInt(cursorParam, 10) : 0
            const page = all.slice(startIdx, startIdx + limit)
            const nextIdx = startIdx + limit
            const hasMore = nextIdx < all.length
            return json(res, {
              ok: true,
              posts: page.map((p) => ({
                id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt,
                category: p.category, author: p.author, date: p.date,
                readTime: p.readTime, coverImage: p.coverImage, updatedAt: p.updatedAt,
              })),
              nextCursor: hasMore ? String(nextIdx) : null,
              hasMore,
            })
          }

          // ── GET /api/posts/:slug (public single post) ───────────────────
          if (req.method === "GET" && /^\/api\/posts\/[^/]+$/.test(p)) {
            const slug = decodeURIComponent(p.replace("/api/posts/", ""))
            const db = getPostsDb()
            const post = Object.values(db).find((p) => p.slug === slug || p.id === slug) || null
            if (!post) return json(res, { ok: false, error: "Not found" }, 404)
            return json(res, { ok: true, post })
          }

          // ── GET /api/admin/posts ─────────────────────────────────────────
          if (req.method === "GET" && p === "/api/admin/posts") {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const db = getPostsDb()
            const posts = Object.values(db).sort((a, b) =>
              new Date(b.updatedAt) - new Date(a.updatedAt))
            return json(res, { ok: true, posts })
          }

          // ── POST /api/admin/posts ────────────────────────────────────────
          if (req.method === "POST" && p === "/api/admin/posts") {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const body = await readBody(req)
            const post = normalizePost(body)
            if (!post.title || !post.slug)
              return json(res, { ok: false, error: "Title and slug are required" }, 400)
            const db = getPostsDb()
            db[post.id] = post
            writeFile(POSTS_FILE, db)
            return json(res, { ok: true, post })
          }

          // ── GET /api/admin/posts/:id ─────────────────────────────────────
          if (req.method === "GET" && p.startsWith("/api/admin/posts/")) {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const id = decodeURIComponent(p.replace("/api/admin/posts/", ""))
            const db = getPostsDb()
            const post = db[id]
            if (!post) return json(res, { ok: false, error: "Not found" }, 404)
            return json(res, { ok: true, post })
          }

          // ── PUT /api/admin/posts/:id ─────────────────────────────────────
          if (req.method === "PUT" && p.startsWith("/api/admin/posts/")) {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const id = decodeURIComponent(p.replace("/api/admin/posts/", ""))
            const body = await readBody(req)
            const db = getPostsDb()
            const existing = db[id]
            if (!existing) return json(res, { ok: false, error: "Not found" }, 404)
            const post = normalizePost({ ...existing, ...body, id: existing.id }, existing)
            db[id] = post
            writeFile(POSTS_FILE, db)
            return json(res, { ok: true, post })
          }

          // ── DELETE /api/admin/posts/:id ──────────────────────────────────
          if (req.method === "DELETE" && p.startsWith("/api/admin/posts/")) {
            if (!isAuth(req)) return json(res, { ok: false, error: "Unauthorized" }, 401)
            const id = decodeURIComponent(p.replace("/api/admin/posts/", ""))
            const db = getPostsDb()
            delete db[id]
            writeFile(POSTS_FILE, db)
            return json(res, { ok: true })
          }

        } catch (e) {
          return json(res, { ok: false, error: String(e) }, 500)
        }

        next()
      })
    },
  }
}
