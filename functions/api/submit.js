// Cloudflare Pages Function — receives form submissions, stores them in KV,
// and (best-effort) emails the admin via Resend.
//
// Required env bindings (set in CF Pages → Settings → Bindings):
//   QUERIES            — KV namespace for storage
//   ADMIN_PASSWORD     — used by /api/queries
//   RESEND_API_KEY     — Resend API key (resend.com)  [optional but recommended]
//   NOTIFICATION_EMAIL — recipient email for new-submission alerts  [optional]

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

    // 1. Store in KV
    if (env.QUERIES) {
      const key = `query:${Date.now()}:${id}`
      await env.QUERIES.put(key, JSON.stringify(submission))
    } else {
      console.error("QUERIES KV namespace not bound — submission not stored.")
    }

    // 2. Email notification — best-effort, never blocks the response
    console.log(
      "[email-debug] RESEND_API_KEY present:",
      !!env.RESEND_API_KEY,
      "NOTIFICATION_EMAIL:",
      env.NOTIFICATION_EMAIL || "(not set)"
    )
    if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
      try {
        await sendNotificationEmail(
          env.RESEND_API_KEY,
          env.NOTIFICATION_EMAIL,
          submission
        )
        console.log("[email-debug] Notification email sent successfully")
      } catch (err) {
        console.error("[email-debug] Email notification failed:", err.message || err)
      }
    } else {
      console.warn(
        "[email-debug] Skipping email — required env vars missing"
      )
    }

    return jsonResponse({ ok: true, stored: !!env.QUERIES })
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500)
  }
}

async function sendNotificationEmail(apiKey, to, s) {
  const subject = `New ${s.source.replace(/_/g, " ")} submission — ${s.name || s.email || "anonymous"}`

  const fields = [
    ["Source", s.source],
    ["Name", s.name],
    ["Email", s.email],
    ["Phone", s.phone],
    ["Company", s.company],
    ["Service", s.service],
    ["Budget", s.budget],
    ["Website", s.website],
    ["Submitted", new Date(s.created_at).toLocaleString("en-US", { timeZone: "America/New_York" }) + " ET"],
    ["IP", s.ip],
  ].filter(([, v]) => v)

  const fieldsHtml = fields
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 16px 8px 0;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;white-space:nowrap;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:8px 0;color:#1c1917;font-size:14px;word-break:break-word;">${linkify(escapeHtml(v))}</td>
      </tr>`
    )
    .join("")

  const messageBlock = s.message
    ? `
      <div style="margin-top:24px;padding:16px;background:#f5f5f4;border-radius:12px;border-left:4px solid #1d4ed8;">
        <div style="color:#78716c;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin-bottom:8px;">Message</div>
        <div style="color:#1c1917;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(s.message)}</div>
      </div>`
    : ""

  const html = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:24px;background:#F7F4EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:16px;overflow:hidden;border:1px solid rgba(28,25,23,0.1);">
          <div style="padding:24px;background:#1c1917;color:white;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#60a5fa;font-weight:600;margin-bottom:6px;">UpwardDigital · New Lead</div>
            <div style="font-size:20px;font-weight:bold;line-height:1.3;">${escapeHtml(s.name || s.email || "Anonymous submission")}</div>
            ${s.service ? `<div style="margin-top:6px;font-size:14px;color:#a8a29e;">Interested in: ${escapeHtml(s.service)}</div>` : ""}
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;">${fieldsHtml}</table>
            ${messageBlock}
            ${s.email ? `<div style="margin-top:24px;"><a href="mailto:${escapeHtml(s.email)}" style="display:inline-block;background:#1c1917;color:white;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;font-size:14px;">Reply by email</a></div>` : ""}
          </div>
          <div style="padding:16px 24px;background:#f5f5f4;border-top:1px solid #e7e5e4;color:#78716c;font-size:11px;">
            View all submissions: <a href="https://upwarddigitalco.com/admin" style="color:#1d4ed8;text-decoration:none;">upwarddigitalco.com/admin</a>
          </div>
        </div>
      </body>
    </html>`

  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (s.message ? `\n\nMessage:\n${s.message}` : "")

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "UpwardDigital Leads <onboarding@resend.dev>",
      to,
      reply_to: s.email || undefined,
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend ${res.status}: ${body}`)
  }
}

function escapeHtml(str) {
  if (!str) return ""
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function linkify(escaped) {
  // After escaping, & is &amp; — match plain emails/URLs
  if (/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(escaped)) {
    return `<a href="mailto:${escaped}" style="color:#1d4ed8;text-decoration:none;">${escaped}</a>`
  }
  if (/^https?:\/\//.test(escaped) || /^www\./.test(escaped)) {
    const href = escaped.startsWith("http") ? escaped : `https://${escaped}`
    return `<a href="${href}" style="color:#1d4ed8;text-decoration:none;" target="_blank" rel="noopener">${escaped}</a>`
  }
  // Phone-like
  if (/^\+?[\d\s().-]{7,}$/.test(escaped)) {
    return `<a href="tel:${escaped.replace(/\s/g, "")}" style="color:#1d4ed8;text-decoration:none;">${escaped}</a>`
  }
  return escaped
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
