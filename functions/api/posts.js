// Public — list all blog posts (newest first).
import { listAllPosts, ensureSeedPosts, jsonResponse } from "../_shared/blog"

export async function onRequestGet({ env }) {
  await ensureSeedPosts(env)
  const posts = await listAllPosts(env)

  // For the index list, strip heavy fields (sections, faq, images) to keep
  // payload small. The detail endpoint returns the full post.
  const summary = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    coverImage: p.coverImage,
    updatedAt: p.updatedAt,
  }))

  return jsonResponse({ ok: true, posts: summary })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  })
}
