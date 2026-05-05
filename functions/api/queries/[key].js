// Cloudflare Pages Function — DELETE a single submission by its KV key.
// Auth: same Bearer token as /api/queries.

export async function onRequestDelete({ params, request, env }) {
  const auth = request.headers.get("authorization") || ""
  if (auth !== `Bearer ${env.ADMIN_PASSWORD || ""}`) {
    return jsonResponse({ ok: false, error: "Unauthorized" }, 401)
  }
  if (!env.QUERIES) {
    return jsonResponse({ ok: false, error: "QUERIES KV not bound" }, 500)
  }
  await env.QUERIES.delete(params.key)
  return jsonResponse({ ok: true })
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
      "Access-Control-Allow-Methods": "DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  })
}
