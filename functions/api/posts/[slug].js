// Public — return a single blog post by slug.
import { getPostBySlug, ensureSeedPosts, jsonResponse } from "../../_shared/blog"

export async function onRequestGet({ params, env }) {
  await ensureSeedPosts(env)
  const post = await getPostBySlug(env, params.slug)
  if (!post) return jsonResponse({ ok: false, error: "Not found" }, 404)
  return jsonResponse({ ok: true, post })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  })
}
