// Shared helpers for the blog post storage layer.
// Posts live in the same QUERIES KV namespace under the `post:` prefix so we
// don't need to bind a second namespace. The seed posts (originally in
// src/data/blogPosts.js) are written on the first list request so existing
// hardcoded content survives in the new system.

const POST_PREFIX = "post:"
const POST_ORDER_PREFIX = "post_order:"
const POST_SLUG_PREFIX = "post_slug:"
const SEED_MARKER_KEY = "meta:blog_seed_migrated_v2"
const MAX_LIMIT = 100

const SEED_POSTS = [
  {
    id: "seed-local-seo-guide",
    slug: "local-seo-guide-service-businesses-2026",
    category: "Local SEO",
    title: "The Complete Local SEO Guide for Service Businesses in 2026",
    excerpt:
      "How to dominate Google's local pack and the Map results in your city — real strategies we use for our clients across the USA.",
    author: "Muhammad Talha",
    date: "2026-05-02",
    readTime: "11 min",
    coverImage: "/services/google-maps.jpg",
    hero: {
      subtitle:
        "Practical playbook for ranking on Google Maps and the local 3-pack.",
      showRating: true,
      rating: "4.9",
      ratingCount: "87",
      phone: "+1 (201) 304-0657",
    },
    imageStrip: [],
    serviceCards: [],
    showQuoteForm: true,
    sections: [
      {
        heading: "Optimize Your Google Business Profile (GBP)",
        body:
          "Your GBP is now the most valuable real estate in local search. A fully optimized profile can drive 60–80% of your phone calls and direction requests. Fill out every field, add 30+ photos, post weekly updates, and respond to every review within 24 hours.",
        image: "",
        imageSide: "right",
      },
      {
        heading: "Build Citations That Match Exactly",
        body:
          "Inconsistent NAP (Name, Address, Phone) data on directory listings tanks your rankings. We audit and fix every citation across Yelp, BBB, Apple Maps, Bing Places, and 50+ other relevant directories.",
        image: "",
        imageSide: "left",
      },
      {
        heading: "Earn Reviews Strategically",
        body:
          "Star ratings affect both your ranking and click-through rate. Set up an automated SMS follow-up after every job that asks for a Google review. Aim for at least 50 reviews in your first 6 months, with a 4.5+ average.",
        image: "",
        imageSide: "right",
      },
      {
        heading: "Create Hyper-Local Content",
        body:
          "City pages, neighborhood landing pages, and blog posts about local events or seasonal services boost relevance. Don't just say 'we serve California' — name every city, suburb, and ZIP code where you operate.",
        image: "",
        imageSide: "left",
      },
      {
        heading: "Build Local Backlinks",
        body:
          "Sponsorships, chamber of commerce listings, and partnerships with non-competing local businesses build domain authority faster than any generic SEO tactic.",
        image: "",
        imageSide: "right",
      },
    ],
    faq: [
      {
        question: "How long until I see local SEO results?",
        answer:
          "Most clients see visible movement in 30–60 days and meaningful traffic gains by month 3. Local SEO compounds — by month 6 most are in the top 3.",
      },
      {
        question: "Do I need a Google Business Profile?",
        answer:
          "Absolutely. It's the #1 factor for showing up in Map results and the local 3-pack.",
      },
    ],
    cta: {
      heading: "Ready to dominate local search?",
      subtitle:
        "Book a free 30-minute strategy call — we'll audit your local presence and give you 3 specific wins.",
    },
    seo: {
      metaTitle: "The Complete Local SEO Guide for Service Businesses in 2026",
      metaDescription:
        "How to dominate Google's local pack and Map results — real strategies we use for service businesses across the USA.",
      keywords: [
        "local seo",
        "google maps optimization",
        "google business profile",
        "service business marketing",
      ],
    },
    createdAt: "2026-05-02T00:00:00.000Z",
    updatedAt: "2026-05-02T00:00:00.000Z",
  },
  {
    id: "seed-website-development-cost",
    slug: "website-development-cost-usa-2026",
    category: "Web Development",
    title: "How Much Does Website Development Cost in the USA in 2026?",
    excerpt:
      "Real numbers from over 120 projects we've delivered. What you should pay for a custom site, e-commerce store, or web app.",
    author: "James Wilson",
    date: "2026-04-28",
    readTime: "9 min",
    coverImage: "/services/web-dev.jpg",
    hero: {
      subtitle: "Transparent pricing based on 120+ real client projects.",
      showRating: true,
      rating: "4.9",
      ratingCount: "87",
      phone: "+1 (201) 304-0657",
    },
    imageStrip: [],
    serviceCards: [],
    showQuoteForm: true,
    sections: [
      {
        heading: "Brochure / Service Business Site (5–15 pages): $1,500 – $6,000",
        body:
          "Custom design, mobile-responsive, basic local SEO foundations, contact forms, Google Business Profile integration. This is where most service businesses (limos, taxis, contractors, dental, salons) should start.",
        image: "",
        imageSide: "right",
      },
      {
        heading: "E-Commerce Store on Shopify: $3,500 – $12,000",
        body:
          "Custom theme or theme customization, up to 100 products imported, payment gateway setup, shipping rules, SEO-optimized collections, and conversion-optimized checkout.",
        image: "",
        imageSide: "left",
      },
      {
        heading: "Custom Web Application: $15,000 – $80,000+",
        body:
          "Bookings, dashboards, multi-tenant SaaS, real-time data — anything that requires a database and authentication. Pricing scales with feature complexity.",
        image: "",
        imageSide: "right",
      },
    ],
    faq: [
      {
        question: "Do you charge hourly or fixed-price?",
        answer:
          "We always quote a fixed price after our discovery call. You'll know the total before we start.",
      },
      {
        question: "How long does development take?",
        answer:
          "Most brochure sites ship in 2–4 weeks. E-commerce and custom apps run 6–12 weeks depending on scope.",
      },
    ],
    cta: {
      heading: "Want a custom quote?",
      subtitle:
        "We'll review your needs in a free 30-min call and send a fixed-scope proposal — no boilerplate.",
    },
    seo: {
      metaTitle: "Website Development Cost in the USA — 2026 Pricing Guide",
      metaDescription:
        "Real prices from 120+ projects. What custom websites, e-commerce stores, and web apps actually cost in the USA in 2026.",
      keywords: [
        "website development cost",
        "custom website pricing",
        "web development usa",
        "ecommerce website cost",
      ],
    },
    createdAt: "2026-04-28T00:00:00.000Z",
    updatedAt: "2026-04-28T00:00:00.000Z",
  },
  {
    id: "seed-google-ads-vs-seo",
    slug: "google-ads-vs-seo-which-is-better",
    category: "Digital Marketing",
    title: "Google Ads vs SEO: Which Should Your Business Invest In First?",
    excerpt:
      "The honest answer most agencies won't give you. When to use Google Ads, when to invest in SEO, and how to combine both for maximum ROI.",
    author: "Maya Patel",
    date: "2026-04-21",
    readTime: "8 min",
    coverImage: "/services/google-ads.jpg",
    hero: {
      subtitle: "An honest comparison from an agency that does both.",
      showRating: true,
      rating: "4.9",
      ratingCount: "87",
      phone: "+1 (201) 304-0657",
    },
    imageStrip: [],
    serviceCards: [],
    showQuoteForm: true,
    sections: [
      {
        heading: "When Google Ads Wins",
        body:
          "Need leads this week? Google Ads. The moment your campaign goes live, your phone starts ringing. The downside: you stop paying, the leads stop. It's renting traffic, not owning it.",
        image: "",
        imageSide: "right",
      },
      {
        heading: "When SEO Wins",
        body:
          "Need sustainable growth? SEO. Initial investment is higher in time (90–180 days to see real movement), but compounds for years. Once you rank, the leads are essentially free.",
        image: "",
        imageSide: "left",
      },
      {
        heading: "Why Smart Businesses Use Both",
        body:
          "Google Ads gives you immediate visibility while SEO builds. Then as organic traffic grows, you can dial down ad spend without losing leads. The combined approach is what we recommend to 90% of our service business clients.",
        image: "",
        imageSide: "right",
      },
    ],
    faq: [
      {
        question: "What's the minimum Google Ads budget?",
        answer:
          "Most service businesses see real results starting at $1,500/month in ad spend, plus management.",
      },
      {
        question: "How long until SEO pays off?",
        answer:
          "3–6 months for noticeable lifts, 12 months for SEO to fully outperform paid ads on cost-per-lead.",
      },
    ],
    cta: {
      heading: "Not sure which fits your business?",
      subtitle:
        "Book a free strategy call. We'll look at your industry, geography, and goals — and give you a straight answer.",
    },
    seo: {
      metaTitle: "Google Ads vs SEO: Which Should Your Business Invest In First?",
      metaDescription:
        "An honest comparison of Google Ads vs SEO for small businesses. When to use each, how to combine them, and what the ROI actually looks like.",
      keywords: [
        "google ads vs seo",
        "ppc vs seo",
        "digital marketing strategy",
        "small business marketing",
      ],
    },
    createdAt: "2026-04-21T00:00:00.000Z",
    updatedAt: "2026-04-21T00:00:00.000Z",
  },
]

// One-time seed migration + index backfill. This does NOT resurrect deleted
// seed posts after the migration marker is set.
export async function ensureSeedPosts(env) {
  if (!env.QUERIES) return
  const migrated = await env.QUERIES.get(SEED_MARKER_KEY)
  if (migrated === "1") return

  const hasAnyPosts = await hasAnyPost(env)
  if (!hasAnyPosts) {
    for (const seed of SEED_POSTS) {
      await savePost(env, seed)
    }
  } else {
    await backfillIndexes(env)
  }

  await env.QUERIES.put(SEED_MARKER_KEY, "1")
}

export async function listPostsPage(env, { cursor, limit = 20, summary = false } = {}) {
  if (!env.QUERIES) return { posts: [], nextCursor: null, hasMore: false }

  const safeLimit = clamp(limit, 1, MAX_LIMIT)
  const list = await env.QUERIES.list({
    prefix: POST_ORDER_PREFIX,
    cursor: cursor || undefined,
    limit: safeLimit,
  })

  const ids = list.keys.map((k) => parseIdFromOrderKey(k.name)).filter(Boolean)
  const posts = (
    await Promise.all(ids.map((id) => getPostById(env, id)))
  ).filter(Boolean)

  const mapped = summary
    ? posts.map((p) => toSummary(p))
    : posts

  return {
    posts: mapped,
    nextCursor: list.list_complete ? null : list.cursor,
    hasMore: !list.list_complete,
  }
}

// Newest-first list of all posts.
export async function listAllPosts(env) {
  const all = []
  let cursor
  do {
    const page = await listPostsPage(env, { cursor, limit: MAX_LIMIT, summary: false })
    all.push(...page.posts)
    cursor = page.nextCursor
  } while (cursor)
  return all
}

export async function getPostById(env, id) {
  if (!env.QUERIES) return null
  const raw = await env.QUERIES.get(`${POST_PREFIX}${id}`)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function getPostBySlug(env, slug) {
  if (!env.QUERIES || !slug) return null

  const id = await env.QUERIES.get(slugIndexKey(slug))
  if (id) {
    return await getPostById(env, id)
  }

  // Fallback for old records before slug index exists.
  const posts = await listAllPosts(env)
  const post = posts.find((p) => p.slug === slug) || null
  if (post) {
    await env.QUERIES.put(slugIndexKey(post.slug), post.id)
  }
  return post
}

export async function savePost(env, post) {
  if (!env.QUERIES) throw new Error("QUERIES KV not bound")

  const existing = await getPostById(env, post.id)
  const persisted = {
    ...post,
    updatedAt: post.updatedAt || new Date().toISOString(),
  }

  const newOrderKey = orderKeyForPost(persisted)
  persisted.orderKey = newOrderKey

  await env.QUERIES.put(postKey(persisted.id), JSON.stringify(persisted))
  await env.QUERIES.put(slugIndexKey(persisted.slug), persisted.id)
  await env.QUERIES.put(newOrderKey, persisted.id)

  if (existing?.slug && existing.slug !== persisted.slug) {
    await env.QUERIES.delete(slugIndexKey(existing.slug))
  }

  const oldOrderKey = existing?.orderKey || (existing ? orderKeyForPost(existing) : null)
  if (oldOrderKey && oldOrderKey !== newOrderKey) {
    await env.QUERIES.delete(oldOrderKey)
  }
}

export async function deletePost(env, id) {
  if (!env.QUERIES) throw new Error("QUERIES KV not bound")
  const existing = await getPostById(env, id)
  await env.QUERIES.delete(postKey(id))
  if (existing?.slug) {
    await env.QUERIES.delete(slugIndexKey(existing.slug))
  }
  const orderKey = existing?.orderKey || (existing ? orderKeyForPost(existing) : null)
  if (orderKey) {
    await env.QUERIES.delete(orderKey)
  }
}

export function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export function isAuthorized(request, env) {
  const auth = request.headers.get("authorization") || ""
  return auth === `Bearer ${env.ADMIN_PASSWORD || ""}` && !!env.ADMIN_PASSWORD
}

function postKey(id) {
  return `${POST_PREFIX}${id}`
}

function slugIndexKey(slug) {
  return `${POST_SLUG_PREFIX}${slug}`
}

function orderKeyForPost(post) {
  const ts = resolveTimestamp(post)
  const reverseTs = String(9999999999999 - ts).padStart(13, "0")
  return `${POST_ORDER_PREFIX}${reverseTs}:${post.id}`
}

function resolveTimestamp(post) {
  const fromUpdated = Date.parse(post?.updatedAt || "")
  if (!Number.isNaN(fromUpdated)) return fromUpdated
  const fromCreated = Date.parse(post?.createdAt || "")
  if (!Number.isNaN(fromCreated)) return fromCreated
  const fromDate = Date.parse(post?.date || "")
  if (!Number.isNaN(fromDate)) return fromDate
  return Date.now()
}

function parseIdFromOrderKey(key) {
  const parts = String(key || "").split(":")
  return parts.length >= 3 ? parts[2] : null
}

function clamp(n, min, max) {
  const num = Number(n)
  if (!Number.isFinite(num)) return min
  return Math.min(Math.max(Math.trunc(num), min), max)
}

function toSummary(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: post.date,
    readTime: post.readTime,
    coverImage: post.coverImage,
    updatedAt: post.updatedAt,
  }
}

async function hasAnyPost(env) {
  const list = await env.QUERIES.list({ prefix: POST_PREFIX, limit: 1 })
  return list.keys.length > 0
}

async function backfillIndexes(env) {
  let cursor
  do {
    const list = await env.QUERIES.list({
      prefix: POST_PREFIX,
      limit: MAX_LIMIT,
      cursor,
    })
    for (const key of list.keys) {
      const raw = await env.QUERIES.get(key.name)
      if (!raw) continue
      try {
        const post = JSON.parse(raw)
        if (!post?.id || !post?.slug) continue
        const orderKey = post.orderKey || orderKeyForPost(post)
        await env.QUERIES.put(slugIndexKey(post.slug), post.id)
        await env.QUERIES.put(orderKey, post.id)
        if (!post.orderKey) {
          post.orderKey = orderKey
          await env.QUERIES.put(postKey(post.id), JSON.stringify(post))
        }
      } catch {
        // Ignore malformed values and continue index backfill.
      }
    }
    cursor = list.list_complete ? null : list.cursor
  } while (cursor)
}
