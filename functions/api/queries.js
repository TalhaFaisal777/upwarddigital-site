// Cloudflare Pages Function — returns all stored submissions, password-gated.
// Auth: pass `Authorization: Bearer <ADMIN_PASSWORD>` header.
// Requires QUERIES KV namespace + ADMIN_PASSWORD env var in CF Pages dashboard.

export async function onRequestGet({ request, env }) {
  const auth = request.headers.get("authorization") || ""
  const expected = `Bearer ${env.ADMIN_PASSWORD || ""}`

  if (!env.ADMIN_PASSWORD) {
    return jsonResponse(
      { ok: false, error: "ADMIN_PASSWORD env var not set in Cloudflare Pages settings." },
      500
    )
  }

  if (auth !== expected) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }

  if (!env.QUERIES) {
    return jsonResponse(
      { ok: false, error: "QUERIES KV namespace not bound. See README." },
      500
    )
  }

  // Paginate through KV keys (max 1000 per call), filtered to form submissions
  // only — the same namespace also stores blog posts under the `post:` prefix.
  const allKeys = []
  let cursor
  do {
    const list = await env.QUERIES.list({
      prefix: "query:",
      cursor,
      limit: 1000,
    })
    allKeys.push(...list.keys)
    cursor = list.list_complete ? null : list.cursor
  } while (cursor)

  // Newest first — keys are `query:{epoch_ms}:{uuid}`
  allKeys.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0))

  // Fetch all (parallel) — inject _kvKey so the client can delete without guessing
  const submissions = (
    await Promise.all(
      allKeys.map(async (k) => {
        const raw = await env.QUERIES.get(k.name)
        if (!raw) return null
        try {
          const parsed = JSON.parse(raw)
          parsed._kvKey = k.name
          return parsed
        } catch {
          return null
        }
      })
    )
  ).filter(Boolean)

  return jsonResponse({ ok: true, count: submissions.length, submissions })
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  })
}
