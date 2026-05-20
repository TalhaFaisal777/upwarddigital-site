// Admin — list all posts (full payload), create a new post.
import {
  listAllPosts,
  savePost,
  ensureSeedPosts,
  isAuthorized,
  jsonResponse,
} from "../../_shared/blog"

export async function onRequestGet({ request, env }) {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  await ensureSeedPosts(env)
  const posts = await listAllPosts(env)
  return jsonResponse({ ok: true, posts })
}

export async function onRequestPost({ request, env }) {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  try {
    const body = await request.json()
    const post = normalizePost(body, /* isNew */ true)
    if (!post.title || !post.slug) {
      return jsonResponse(
        { ok: false, error: "Title and slug are required" },
        400
      )
    }
    await savePost(env, post)
    return jsonResponse({ ok: true, post })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err.message || err) }, 500)
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  })
}

// Fill in defaults + timestamps + sane structure for any incoming post.
function normalizePost(input, isNew) {
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
    hero: {
      subtitle: input.hero?.subtitle || "",
      showRating: !!input.hero?.showRating,
      rating: input.hero?.rating || "4.9",
      ratingCount: input.hero?.ratingCount || "87",
      phone: input.hero?.phone || "",
    },
    intro: {
      heading: input.intro?.heading || "",
      body: input.intro?.body || "",
    },
    detailHeading: input.detailHeading || "",
    detailSections: Array.isArray(input.detailSections)
      ? input.detailSections
      : [],
    imageStrip: Array.isArray(input.imageStrip) ? input.imageStrip : [],
    serviceCards: Array.isArray(input.serviceCards) ? input.serviceCards : [],
    showQuoteForm: input.showQuoteForm !== false,
    sections: Array.isArray(input.sections) ? input.sections : [],
    faq: Array.isArray(input.faq) ? input.faq : [],
    cta: {
      heading: input.cta?.heading || "Ready to grow your business?",
      subtitle: input.cta?.subtitle || "",
    },
    seo: {
      metaTitle: input.seo?.metaTitle || input.title || "",
      metaDescription: input.seo?.metaDescription || input.excerpt || "",
      keywords: Array.isArray(input.seo?.keywords) ? input.seo.keywords : [],
    },
    createdAt: isNew ? now : input.createdAt || now,
    updatedAt: now,
  }
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}
