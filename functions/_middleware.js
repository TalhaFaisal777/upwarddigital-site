import { getPostBySlug } from "./_shared/blog"

const STATIC_ROUTES = new Set([
  "/", "/about", "/portfolio", "/blog", "/contact", "/pricing",
  "/website-development", "/seo-services", "/social-media-marketing",
  "/web-hosting-services", "/meta-google-ads", "/sitemap",
])

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url)
  const path = url.pathname

  if (
    path.startsWith("/api/") ||
    path.startsWith("/admin") ||
    path.startsWith("/ads/") ||
    path.includes(".")
  ) return next()

  if (STATIC_ROUTES.has(path)) return next()

  const slug = path.replace(/^\//, "")
  if (!slug || !env.QUERIES) return next()

  let post
  try {
    post = await getPostBySlug(env, slug)
  } catch {
    return next()
  }

  if (!post) return next()

  const response = await next()
  const seo = post.seo || {}
  const title = esc(seo.metaTitle || post.title || "")
  const description = esc(seo.metaDescription || post.excerpt || "")
  const canonical = `https://upwarddigitalco.com${path}`
  const articleSchema = buildArticleSchema(post, title, description, canonical)
  const bodyHtml = buildBodyHtml(post, title, description)

  return new HTMLRewriter()
    .on("title", { element(el) { el.setInnerContent(title) } })
    .on('meta[name="description"]', { element(el) { el.setAttribute("content", description) } })
    .on('meta[name="keywords"]', {
      element(el) {
        const kw = Array.isArray(seo.keywords) ? seo.keywords.join(", ") : ""
        if (kw) el.setAttribute("content", kw)
      },
    })
    .on('meta[property="og:title"]', { element(el) { el.setAttribute("content", title) } })
    .on('meta[property="og:description"]', { element(el) { el.setAttribute("content", description) } })
    .on('meta[property="og:url"]', { element(el) { el.setAttribute("content", canonical) } })
    .on('meta[property="og:type"]', { element(el) { el.setAttribute("content", "article") } })
    .on('meta[name="twitter:title"]', { element(el) { el.setAttribute("content", title) } })
    .on('meta[name="twitter:description"]', { element(el) { el.setAttribute("content", description) } })
    .on('link[rel="canonical"]', { element(el) { el.setAttribute("href", canonical) } })
    .on("head", {
      element(el) { el.append(articleSchema, { html: true }) }
    })
    .on("noscript", {
      element(el) { el.after(bodyHtml, { html: true }) }
    })
    .transform(response)
}

function buildBodyHtml(post, title, description) {
  const parts = [`<div id="sr-content" style="font-size:1px;line-height:0;color:transparent;overflow:hidden;height:0;pointer-events:none" aria-hidden="true">`]
  parts.push(`<h1>${title}</h1>`)
  if (description) parts.push(`<p>${description}</p>`)

  if (post.intro?.heading) parts.push(`<h2>${esc(post.intro.heading)}</h2>`)
  if (post.intro?.body) parts.push(`<p>${esc(post.intro.body)}</p>`)

  if (Array.isArray(post.detailSections)) {
    for (const s of post.detailSections) {
      if (s.title) parts.push(`<h3>${esc(s.title)}</h3>`)
      if (s.body) parts.push(`<p>${esc(s.body)}</p>`)
    }
  }

  if (Array.isArray(post.processSections)) {
    for (const s of post.processSections) {
      if (s.title) parts.push(`<h3>${esc(s.title)}</h3>`)
      if (s.body) parts.push(`<p>${esc(s.body)}</p>`)
    }
  }

  if (Array.isArray(post.faq)) {
    for (const item of post.faq) {
      if (item.question) parts.push(`<h4>${esc(item.question)}</h4>`)
      if (item.answer) parts.push(`<p>${esc(item.answer)}</p>`)
    }
  }

  parts.push(`</div>`)
  return parts.join("")
}

function buildArticleSchema(post, title, description, url) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url,
    datePublished: post.date || post.createdAt || "",
    dateModified: post.updatedAt || post.date || "",
    author: { "@type": "Organization", name: post.author || "UpwardDigital" },
    publisher: {
      "@type": "Organization",
      name: "UpwardDigital",
      logo: { "@type": "ImageObject", url: "https://upwarddigitalco.com/logo.png" },
    },
  }
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}
