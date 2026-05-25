import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  LogOut,
  Inbox,
  FileText,
  ExternalLink,
} from "lucide-react"
import { useNoIndex } from "@/hooks/useNoIndex"
import { toast } from "sonner"

const TOKEN_KEY = "ud_admin_token"

export default function AdminBlogList() {
  useNoIndex()
  const navigate = useNavigate()
  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null
  )
  const [loginError, setLoginError] = useState("")
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get("password")
    if (!password) return
    setLoginError("")
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.status === 401) {
        setLoginError("Wrong password.")
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

  const fetchPosts = async () => {
    if (!token) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY)
        setToken(null)
        return
      }
      const data = await res.json()
      if (!data.ok) {
        setError(data.error || "Failed to load")
        return
      }
      setPosts(data.posts || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setPosts(null)
  }

  const handleDelete = (post) => {
    toast(`Delete "${post.title}" permanently?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await fetch(`/api/admin/posts/${encodeURIComponent(post.id)}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            })
            if (!res.ok) { toast.error("Delete failed."); return }
            setPosts((curr) => curr.filter((p) => p.id !== post.id))
            toast.success("Post deleted.")
          } catch (err) {
            toast.error("Delete failed: " + err.message)
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    })
  }

  if (!token) {
    return <LoginScreen onSubmit={handleLogin} error={loginError} />
  }

  return (
    <main className="min-h-screen bg-cream">
      <AdminTopBar onLogout={handleLogout}>
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </AdminTopBar>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <AdminTabs />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-stone-900">
                {posts?.length ?? "—"}
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Blog posts
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/admin/blog/new")}
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        {!error && posts === null && (
          <div className="text-center py-16 text-stone-500">Loading…</div>
        )}

        {posts !== null && posts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <div className="text-stone-700 font-semibold">No posts yet</div>
            <div className="text-stone-500 text-sm mt-1 mb-4">
              Create your first blog post.
            </div>
            <button
              onClick={() => navigate("/admin/blog/new")}
              className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Title</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Author</th>
                    <th className="text-left py-3 px-4 font-semibold">Updated</th>
                    <th className="px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-stone-200 hover:bg-stone-50"
                    >
                      <td className="py-3 px-4">
                        <Link
                          to={`/admin/blog/${p.id}`}
                          className="font-semibold text-stone-900 hover:text-primary"
                        >
                          {p.title}
                        </Link>
                        <div className="text-xs text-stone-500 mt-0.5">
                          /blog/{p.slug}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-stone-100 text-stone-700 text-[11px] font-semibold px-2 py-1 rounded-full">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-700">{p.author}</td>
                      <td className="py-3 px-4 text-stone-600 text-xs whitespace-nowrap">
                        {p.updatedAt
                          ? new Date(p.updatedAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 justify-end">
                          <a
                            href={`/${p.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View live"
                            className="text-stone-400 hover:text-primary"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link
                            to={`/admin/blog/${p.id}`}
                            title="Edit"
                            className="text-stone-400 hover:text-primary"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p)}
                            title="Delete"
                            className="text-stone-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

// ─── Shared admin UI helpers ─────────────────────────────────────

export function LoginScreen({ onSubmit, error }) {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm bg-white border border-stone-200 rounded-3xl p-8 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white mb-5 mx-auto">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 text-center mb-2 tracking-tight">
          Admin Access
        </h1>
        <p className="text-stone-600 text-sm text-center mb-7">
          Enter the admin password.
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            autoComplete="current-password"
            autoFocus
            className="w-full h-11 rounded-xl border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
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

export function AdminTopBar({ children, onLogout }) {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
          <div>
            <div className="text-sm font-bold text-stone-900">Admin</div>
            <div className="text-xs text-stone-500 -mt-0.5">
              UpwardDigital dashboard
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {children}
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-stone-600 text-sm hover:text-stone-900 hover:bg-stone-100"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export function AdminTabs() {
  const path =
    typeof window !== "undefined" ? window.location.pathname : "/admin"
  const tabs = [
    { name: "Form Submissions", path: "/admin", icon: Inbox },
    { name: "Blog Posts", path: "/admin/blog", icon: FileText },
  ]
  return (
    <div className="flex items-center gap-1 mb-8 border-b border-stone-200">
      {tabs.map((t) => {
        const active = t.path === "/admin"
          ? path === "/admin"
          : path === t.path || path.startsWith(t.path + "/")
        return (
          <Link
            key={t.path}
            to={t.path}
            className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              active
                ? "border-stone-900 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.name}
          </Link>
        )
      })}
    </div>
  )
}
