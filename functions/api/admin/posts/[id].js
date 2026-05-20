// Admin — single post: get, update, delete.
import {
  getPostById,
  savePost,
  deletePost,
  isAuthorized,
  jsonResponse,
} from "../../../_shared/blog"

export async function onRequestGet({ request, env, params }) {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  const post = await getPostById(env, params.id)
  if (!post) return jsonResponse({ ok: false, error: "Not found" }, 404)
  return jsonResponse({ ok: true, post })
}

export async function onRequestPut({ request, env, params }) {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  try {
    const incoming = await request.json()
    const existing = await getPostById(env, params.id)
    if (!existing) {
      return jsonResponse({ ok: false, error: "Not found" }, 404)
    }
    const merged = {
      ...existing,
      ...incoming,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
      slug: slugify(incoming.slug || existing.slug),
    }
    await savePost(env, merged)
    return jsonResponse({ ok: true, post: merged })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err.message || err) }, 500)
  }
}

export async function onRequestDelete({ request, env, params }) {
  if (!isAuthorized(request, env)) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  await deletePost(env, params.id)
  return jsonResponse({ ok: true })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  })
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
