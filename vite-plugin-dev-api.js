import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_FILE = path.join(__dirname, ".dev-submissions.json")

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"))
  } catch {
    return {}
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

export default function devApiPlugin() {
  return {
    name: "dev-api",
    configureServer(server) {
      const password = process.env.ADMIN_PASSWORD || "admin"

      function json(res, body, status = 200) {
        res.statusCode = status
        res.setHeader("Content-Type", "application/json")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(JSON.stringify(body))
      }

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, "http://localhost")

        // OPTIONS preflight
        if (req.method === "OPTIONS") {
          res.setHeader("Access-Control-Allow-Origin", "*")
          res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
          res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
          res.statusCode = 204
          res.end()
          return
        }

        // POST /api/submit
        if (req.method === "POST" && url.pathname === "/api/submit") {
          let body = ""
          req.on("data", (c) => (body += c))
          req.on("end", () => {
            try {
              const data = JSON.parse(body)
              if (!data || (!data.name && !data.email)) {
                return json(res, { ok: false, error: "Missing required fields" }, 400)
              }
              const id = crypto.randomUUID()
              const epoch = Date.now()
              const kvKey = `query:${epoch}:${id}`
              const truncate = (s, max = 2000) => (typeof s === "string" ? s.slice(0, max) : s)
              const submission = {
                id,
                _kvKey: kvKey,
                source: truncate(data.source || "unknown", 100),
                name: truncate(data.name || "", 200),
                email: truncate(data.email || "", 200),
                phone: truncate(data.phone || "", 100),
                company: truncate(data.company || "", 200),
                service: truncate(data.service || "", 100),
                budget: truncate(data.budget || "", 100),
                website: truncate(data.website || "", 300),
                message: truncate(data.message || "", 5000),
                created_at: new Date(epoch).toISOString(),
              }
              const db = readDb()
              db[kvKey] = submission
              writeDb(db)
              json(res, { ok: true, stored: true })
            } catch (e) {
              json(res, { ok: false, error: String(e) }, 500)
            }
          })
          return
        }

        // GET /api/queries
        if (req.method === "GET" && url.pathname === "/api/queries") {
          const auth = req.headers["authorization"] || ""
          if (auth !== `Bearer ${password}`) return json(res, { ok: false, error: "Unauthorized" }, 401)
          const db = readDb()
          const submissions = Object.entries(db)
            .sort(([a], [b]) => (a < b ? 1 : -1))
            .map(([, v]) => v)
          json(res, { ok: true, count: submissions.length, submissions })
          return
        }

        // DELETE /api/queries/:key
        if (req.method === "DELETE" && url.pathname.startsWith("/api/queries/")) {
          const auth = req.headers["authorization"] || ""
          if (auth !== `Bearer ${password}`) return json(res, { ok: false, error: "Unauthorized" }, 401)
          const key = decodeURIComponent(url.pathname.replace("/api/queries/", ""))
          const db = readDb()
          delete db[key]
          writeDb(db)
          json(res, { ok: true })
          return
        }

        next()
      })
    },
  }
}
