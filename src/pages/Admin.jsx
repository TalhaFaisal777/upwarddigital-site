import { useEffect, useState, useMemo } from "react"
import { Lock, RefreshCw, Trash2, Mail, Phone, Globe, Search, LogOut, Inbox } from "lucide-react"
import { useNoIndex } from "@/hooks/useNoIndex"

const TOKEN_KEY = "ud_admin_token"

export default function Admin() {
  useNoIndex()

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null
  )
  const [loginError, setLoginError] = useState("")
  const [submissions, setSubmissions] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [filterSource, setFilterSource] = useState("all")
  const [selected, setSelected] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get("password")
    if (!password) return
    setLoginError("")
    try {
      const res = await fetch("/api/queries", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.status === 401) {
        setLoginError("Wrong password.")
        return
      }
      // Detect "API not running" — Vite dev returns the SPA index.html
      const ct = res.headers.get("content-type") || ""
      if (!ct.includes("application/json")) {
        setLoginError(
          "API endpoint not reachable. The admin panel only works on the deployed site (upwarddigitalco.com) or via `wrangler pages dev`. The Vite dev server doesn't run Cloudflare Pages Functions."
        )
        return
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setLoginError(data.error || `Server error (${res.status})`)
        return
      }
      sessionStorage.setItem(TOKEN_KEY, password)
      setToken(password)
    } catch (err) {
      setLoginError("Network error: " + err.message)
    }
  }

  const fetchSubmissions = async () => {
    if (!token) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/queries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY)
        setToken(null)
        return
      }
      const ct = res.headers.get("content-type") || ""
      if (!ct.includes("application/json")) {
        setError(
          "API endpoint returned non-JSON. Admin only works on the deployed site or via `wrangler pages dev` — the Vite dev server doesn't run Cloudflare Pages Functions."
        )
        return
      }
      const data = await res.json()
      if (!data.ok) {
        setError(data.error || "Failed to load")
        return
      }
      setSubmissions(data.submissions || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchSubmissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setSubmissions(null)
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission permanently?")) return
    // Find the KV key from the submission's id and created_at — but the
    // function uses the full key; we don't have that on the client.
    // Server keys are `query:{epoch}:{uuid}` so we reconstruct.
    const sub = submissions.find((s) => s.id === id)
    if (!sub) return
    const epoch = new Date(sub.created_at).getTime()
    const key = `query:${epoch}:${id}`
    try {
      const res = await fetch(`/api/queries/${encodeURIComponent(key)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        alert("Delete failed.")
        return
      }
      setSubmissions((curr) => curr.filter((s) => s.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      alert("Delete failed: " + err.message)
    }
  }

  const filtered = useMemo(() => {
    if (!submissions) return []
    let list = submissions
    if (filterSource !== "all") list = list.filter((s) => s.source === filterSource)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (s) =>
          (s.name || "").toLowerCase().includes(q) ||
          (s.email || "").toLowerCase().includes(q) ||
          (s.phone || "").toLowerCase().includes(q) ||
          (s.message || "").toLowerCase().includes(q) ||
          (s.company || "").toLowerCase().includes(q) ||
          (s.service || "").toLowerCase().includes(q)
      )
    }
    return list
  }, [submissions, filterSource, search])

  const sources = useMemo(() => {
    if (!submissions) return []
    return Array.from(new Set(submissions.map((s) => s.source).filter(Boolean)))
  }, [submissions])

  // ─── Login screen ───
  if (!token) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white mb-5 mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 text-center mb-2 tracking-tight">
            Admin Access
          </h1>
          <p className="text-stone-600 text-sm text-center mb-7">
            Enter the admin password to view form submissions.
          </p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              name="password"
              placeholder="Admin password"
              autoComplete="current-password"
              autoFocus
              className="w-full h-11 rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {loginError && (
              <p className="text-red-600 text-xs">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-primary transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    )
  }

  // ─── Dashboard ───
  return (
    <main className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
            <div>
              <div className="text-sm font-bold text-stone-900">Admin</div>
              <div className="text-xs text-stone-500 -mt-0.5">Form submissions</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchSubmissions}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-stone-600 text-sm hover:text-stone-900 hover:bg-stone-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        {/* Stats + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900">
                {submissions?.length ?? "—"}
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Total submissions
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, message..."
                className="pl-9 pr-4 h-10 w-full sm:w-72 rounded-lg border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="h-10 px-3 rounded-lg border border-stone-300 bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="all">All sources</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Empty / Loading */}
        {!error && submissions === null && (
          <div className="text-center py-16 text-stone-500">Loading…</div>
        )}
        {!error && submissions !== null && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <Inbox className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <div className="text-stone-700 font-semibold">No submissions yet</div>
            <div className="text-stone-500 text-sm mt-1">
              When someone fills out a form, it will show up here.
            </div>
          </div>
        )}

        {/* Table */}
        {filtered.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold">Service</th>
                    <th className="text-left py-3 px-4 font-semibold">Source</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => setSelected(s)}
                      className="border-t border-stone-200 hover:bg-stone-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-stone-900">
                        {s.name || "—"}
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {s.email ? (
                          <a
                            href={`mailto:${s.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-primary hover:underline"
                          >
                            {s.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {s.phone ? (
                          <a
                            href={`tel:${s.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-primary hover:underline"
                          >
                            {s.phone}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-3 px-4 text-stone-700">
                        {s.service || "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-stone-100 text-stone-700 text-[11px] font-semibold px-2 py-1 rounded-full">
                          {s.source}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-600 text-xs whitespace-nowrap">
                        {new Date(s.created_at).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(s.id)
                          }}
                          aria-label="Delete"
                          className="text-stone-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-stone-900/50"
            onClick={() => setSelected(null)}
          />
          <div className="ml-auto relative w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-5 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-stone-900">Submission details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-stone-500 hover:text-stone-900"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-5 text-sm">
              <Detail label="Name" value={selected.name} />
              <Detail
                label="Email"
                value={selected.email}
                href={selected.email ? `mailto:${selected.email}` : undefined}
                icon={Mail}
              />
              <Detail
                label="Phone"
                value={selected.phone}
                href={selected.phone ? `tel:${selected.phone}` : undefined}
                icon={Phone}
              />
              <Detail label="Company" value={selected.company} />
              <Detail label="Service" value={selected.service} />
              <Detail label="Budget" value={selected.budget} />
              <Detail
                label="Website"
                value={selected.website}
                href={selected.website || undefined}
                icon={Globe}
              />
              {selected.message && (
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                    Message
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-800 whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200">
                <Detail label="Source" value={selected.source} />
                <Detail
                  label="Submitted"
                  value={new Date(selected.created_at).toLocaleString()}
                />
                <Detail label="IP" value={selected.ip} />
                <Detail
                  label="Referer"
                  value={selected.referer}
                  small
                />
              </div>
              <button
                onClick={() => handleDelete(selected.id)}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 h-10 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete submission
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

function Detail({ label, value, href, icon: Icon, small }) {
  if (!value) return null
  const content = (
    <span className={`text-stone-800 ${small ? "text-xs break-all" : "break-words"}`}>
      {value}
    </span>
  )
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-1 flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>
      {href ? (
        <a href={href} className="text-primary hover:underline break-all">
          {value}
        </a>
      ) : (
        content
      )}
    </div>
  )
}
