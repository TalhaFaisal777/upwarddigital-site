// Public — list all blog posts (newest first).
import { listPostsPage, ensureSeedPosts, jsonResponse } from "../_shared/blog"

export async function onRequestGet({ env, request }) {
  await ensureSeedPosts(env)
  const url = new URL(request.url)
  const cursor = url.searchParams.get("cursor") || undefined
  const limitParam = Number(url.searchParams.get("limit"))
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 24

  const page = await listPostsPage(env, {
    cursor,
    limit,
    summary: true,
  })

  return jsonResponse({
    ok: true,
    posts: page.posts,
    nextCursor: page.nextCursor,
    hasMore: page.hasMore,
  })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  })
}
