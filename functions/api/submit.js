// Cloudflare Pages Function — receives form submissions and stores them in KV.
// Requires the QUERIES KV namespace bound in the CF Pages dashboard.

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json()

    // Basic validation — at least a name OR email must be present.
    if (!data || (!data.name && !data.email)) {
      return jsonResponse({ ok: false, error: "Missing required fields" }, 400)
    }

    // Cap field sizes to prevent abuse.
    const truncate = (str, max = 2000) =>
      typeof str === "string" ? str.slice(0, max) : str

    const id = crypto.randomUUID()
    const submission = {
      id,
      source: truncate(data.source || "unknown", 100),
      name: truncate(data.name || "", 200),
      email: truncate(data.email || "", 200),
      phone: truncate(data.phone || "", 100),
      company: truncate(data.company || "", 200),
      service: truncate(data.service || "", 100),
      budget: truncate(data.budget || "", 100),
      website: truncate(data.website || "", 300),
      message: truncate(data.message || "", 5000),
      created_at: new Date().toISOString(),
      ip: request.headers.get("cf-connecting-ip") || null,
      user_agent: truncate(request.headers.get("user-agent") || "", 400),
      referer: truncate(request.headers.get("referer") || "", 500),
    }

    if (!env.QUERIES) {
      // KV not bound yet — log and return success so the user UX still works.
      // The owner needs to bind a KV namespace called QUERIES in the
      // Cloudflare Pages dashboard for storage to actually happen.
      console.error("QUERIES KV namespace not bound — submission discarded:", submission)
      return jsonResponse({ ok: true, stored: false })
    }

    // Store under a sortable key so listing returns newest first naturally.
    // Format: `query:{epoch_ms}:{uuid}` — descending chronological listing
    // achieved by reversing the list afterwards.
    const key = `query:${Date.now()}:${id}`
    await env.QUERIES.put(key, JSON.stringify(submission))

    return jsonResponse({ ok: true, stored: true })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500)
  }
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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
