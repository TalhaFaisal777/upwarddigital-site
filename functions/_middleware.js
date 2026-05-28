const STATIC_ROUTES = new Set([
  "/", "/about", "/portfolio", "/blog", "/contact", "/pricing",
  "/website-development", "/seo-services", "/social-media-marketing",
  "/web-hosting-services", "/meta-google-ads", "/sitemap",
])

export async function onRequest({ request, env, next }) {
  try {
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

    const { getPostBySlug } = await import("./_shared/blog")
    const post = await getPostBySlug(env, slug)
    if (!post) return next()

    const response = await next()
    const seo = post.seo || {}
    const title = esc(seo.metaTitle || post.title || "")
    const description = esc(seo.metaDescription || post.excerpt || "")
    const canonical = `https://upwarddigitalco.com${path}`
    const schema = buildSchema(post, title, description, canonical)

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
      .on("head", { element(el) { el.append(schema, { html: true }) } })
      .transform(response)
  } catch {
    return next()
  }
}

function buildSchema(post, title, description, url) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
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
