import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  Upload,
  X,
  GripVertical,
  ExternalLink,
  Eye,
} from "lucide-react"
import { useNoIndex } from "@/hooks/useNoIndex"
import { uploadImage } from "@/lib/imageUpload"
import { LoginScreen, AdminTopBar, AdminTabs } from "@/pages/AdminBlogList"

const TOKEN_KEY = "ud_admin_token"

const CATEGORIES = [
  "Website Development",
  "SEO Services",
  "Local SEO",
  "Google Ads (PPC)",
  "Social Media Marketing",
  "Digital Marketing",
  "Branding & Design",
  "Web Development",
  "Insights",
]

const EMPTY_POST = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Insights",
  author: "UpwardDigital",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min",
  coverImage: "",
  hero: {
    subtitle: "",
    showRating: true,
    rating: "4.9",
    ratingCount: "87",
    phone: "+1 (201) 304-0657",
  },
  imageStrip: [],
  serviceCards: [],
  showQuoteForm: true,
  sections: [],
  faq: [],
  cta: { heading: "Ready to grow your business?", subtitle: "" },
  seo: { metaTitle: "", metaDescription: "", keywords: [] },
}

export default function AdminBlogEditor() {
  useNoIndex()
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = !id || id === "new"

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null
  )
  const [loginError, setLoginError] = useState("")
  const [post, setPost] = useState(isNew ? EMPTY_POST : null)
  const [loadingPost, setLoadingPost] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    const password = new FormData(e.currentTarget).get("password")
    if (!password) return
    setLoginError("")
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      })
      if (res.status === 401) return setLoginError("Wrong password.")
      const ct = res.headers.get("content-type") || ""
      if (!ct.includes("application/json")) {
        return setLoginError("API not reachable — deploy or run wrangler.")
      }
      sessionStorage.setItem(TOKEN_KEY, password)
      setToken(password)
    } catch (err) {
      setLoginError("Network error: " + err.message)
    }
  }

  // Load existing post
  useEffect(() => {
    if (!token || isNew) return
    setLoadingPost(true)
    fetch(`/api/admin/posts/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setPost({ ...EMPTY_POST, ...data.post, hero: { ...EMPTY_POST.hero, ...data.post.hero }, cta: { ...EMPTY_POST.cta, ...data.post.cta }, seo: { ...EMPTY_POST.seo, ...data.post.seo } })
        else alert("Post not found")
      })
      .catch((err) => alert("Load failed: " + err.message))
      .finally(() => setLoadingPost(false))
  }, [token, id, isNew])

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  const updateField = useCallback((path, value) => {
    setPost((curr) => {
      const next = { ...curr }
      const parts = path.split(".")
      let target = next
      for (let i = 0; i < parts.length - 1; i++) {
        target[parts[i]] = { ...target[parts[i]] }
        target = target[parts[i]]
      }
      target[parts[parts.length - 1]] = value
      return next
    })
  }, [])

  const save = async () => {
    setSaving(true)
    setSaveError("")
    try {
      const url = isNew
        ? "/api/admin/posts"
        : `/api/admin/posts/${encodeURIComponent(post.id)}`
      const method = isNew ? "POST" : "PUT"
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error || "Save failed")
      navigate("/admin/blog")
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!token) {
    return <LoginScreen onSubmit={handleLogin} error={loginError} />
  }
  if (loadingPost || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-stone-500">Loading post…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream pb-20">
      <AdminTopBar onLogout={handleLogout}>
        {post.slug && !isNew && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </a>
        )}
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Publish"}
        </button>
      </AdminTopBar>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <Link
          to="/admin/blog"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All posts
        </Link>

        <AdminTabs />

        {saveError && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {saveError}
          </div>
        )}

        <div className="space-y-7">
          {/* ─── Hero / Cover ─── */}
          <Card title="Hero" description="The big header at the top of the post.">
            <Field label="Title (H1)" required>
              <Input
                value={post.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Bathrooms in West Yorkshire"
              />
            </Field>
            <Field label="Subtitle">
              <Input
                value={post.hero.subtitle}
                onChange={(e) => updateField("hero.subtitle", e.target.value)}
                placeholder="Professional installation services across the region."
              />
            </Field>
            <Field
              label="Cover image"
              description="Shown behind the hero title and on the blog index card."
            >
              <ImagePicker
                value={post.coverImage}
                onChange={(v) => updateField("coverImage", v)}
              />
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Show rating badge">
                <Toggle
                  checked={post.hero.showRating}
                  onChange={(v) => updateField("hero.showRating", v)}
                />
              </Field>
              {post.hero.showRating && (
                <>
                  <Field label="Rating">
                    <Input
                      value={post.hero.rating}
                      onChange={(e) => updateField("hero.rating", e.target.value)}
                    />
                  </Field>
                  <Field label="Review count">
                    <Input
                      value={post.hero.ratingCount}
                      onChange={(e) =>
                        updateField("hero.ratingCount", e.target.value)
                      }
                    />
                  </Field>
                </>
              )}
            </div>
            <Field label="Phone (shown in hero)">
              <Input
                value={post.hero.phone}
                onChange={(e) => updateField("hero.phone", e.target.value)}
                placeholder="+1 (201) 304-0657"
              />
            </Field>
          </Card>

          {/* ─── Image strip ─── */}
          <Card
            title="Image strip"
            description="Up to 6 images shown as a horizontal row beneath the intro."
          >
            <ImageStripEditor
              images={post.imageStrip}
              onChange={(v) => updateField("imageStrip", v)}
            />
          </Card>

          {/* ─── Service icon cards ─── */}
          <Card
            title="Service cards"
            description="Optional grid of service tiles. Add a title and short description for each."
          >
            <RepeaterList
              items={post.serviceCards}
              onChange={(v) => updateField("serviceCards", v)}
              emptyValue={{ title: "", description: "" }}
              renderItem={(item, update) => (
                <>
                  <Input
                    value={item.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Bathroom Installations"
                  />
                  <Input
                    value={item.description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="One-line description"
                  />
                </>
              )}
              addLabel="Add service card"
            />
          </Card>

          {/* ─── Quote form toggle ─── */}
          <Card
            title="Embedded quote form"
            description="The free-consultation form will appear below the image strip."
          >
            <Toggle
              checked={post.showQuoteForm}
              onChange={(v) => updateField("showQuoteForm", v)}
              label="Show the quote form on this post"
            />
          </Card>

          {/* ─── Content sections ─── */}
          <Card
            title="Content sections"
            description="Each section gets a heading, paragraph, and an image. Pick which side the image sits on."
          >
            <RepeaterList
              items={post.sections}
              onChange={(v) => updateField("sections", v)}
              emptyValue={{
                heading: "",
                body: "",
                image: "",
                imageSide: "right",
              }}
              renderItem={(item, update) => (
                <>
                  <Field label="Heading (H3)">
                    <Input
                      value={item.heading}
                      onChange={(e) => update("heading", e.target.value)}
                      placeholder="Fitted bathrooms in Yorkshire"
                    />
                  </Field>
                  <Field
                    label="Body"
                    description="Add links inline with markdown: [click here](https://example.com) or [pricing](/pricing). **bold text** uses asterisks."
                  >
                    <Textarea
                      value={item.body}
                      onChange={(e) => update("body", e.target.value)}
                      rows={5}
                      placeholder="Tell your story. Mix in **bold** and [external links](https://...) or [internal pages](/services)."
                    />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Image">
                      <ImagePicker
                        value={item.image}
                        onChange={(v) => update("image", v)}
                      />
                    </Field>
                    <Field label="Image side">
                      <select
                        value={item.imageSide}
                        onChange={(e) => update("imageSide", e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 cursor-pointer"
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                        <option value="full">Full width (no image side)</option>
                      </select>
                    </Field>
                  </div>
                </>
              )}
              addLabel="Add content section"
            />
          </Card>

          {/* ─── FAQ ─── */}
          <Card title="FAQ" description="Q&A pairs at the bottom of the post.">
            <RepeaterList
              items={post.faq}
              onChange={(v) => updateField("faq", v)}
              emptyValue={{ question: "", answer: "" }}
              renderItem={(item, update) => (
                <>
                  <Field label="Question">
                    <Input
                      value={item.question}
                      onChange={(e) => update("question", e.target.value)}
                    />
                  </Field>
                  <Field label="Answer">
                    <Textarea
                      value={item.answer}
                      onChange={(e) => update("answer", e.target.value)}
                      rows={3}
                    />
                  </Field>
                </>
              )}
              addLabel="Add FAQ"
            />
          </Card>

          {/* ─── Bottom CTA ─── */}
          <Card title="Bottom CTA" description="Final call-to-action block.">
            <Field label="Heading">
              <Input
                value={post.cta.heading}
                onChange={(e) => updateField("cta.heading", e.target.value)}
              />
            </Field>
            <Field label="Subtitle">
              <Textarea
                value={post.cta.subtitle}
                onChange={(e) => updateField("cta.subtitle", e.target.value)}
                rows={2}
              />
            </Field>
          </Card>

          {/* ─── Meta + SEO ─── */}
          <Card title="Meta &amp; SEO" description="How the post appears in lists and Google search.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Slug" description="URL path. Auto-generated from title.">
                <Input
                  value={post.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="my-blog-post"
                />
              </Field>
              <Field label="Category">
                <select
                  value={post.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Author">
                <Input
                  value={post.author}
                  onChange={(e) => updateField("author", e.target.value)}
                />
              </Field>
              <Field label="Read time">
                <Input
                  value={post.readTime}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  placeholder="8 min"
                />
              </Field>
              <Field label="Publish date">
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Excerpt" description="Shown on the blog index card.">
              <Textarea
                value={post.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={2}
              />
            </Field>
            <Field
              label="Meta title"
              description="Browser tab + Google title (60 chars max recommended)."
            >
              <Input
                value={post.seo.metaTitle}
                onChange={(e) => updateField("seo.metaTitle", e.target.value)}
                placeholder="Falls back to the post title if empty"
              />
            </Field>
            <Field
              label="Meta description"
              description="Google search result snippet (160 chars max recommended)."
            >
              <Textarea
                value={post.seo.metaDescription}
                onChange={(e) =>
                  updateField("seo.metaDescription", e.target.value)
                }
                rows={3}
                placeholder="Falls back to the excerpt if empty"
              />
            </Field>
            <Field
              label="Keywords"
              description="Comma-separated. Used for SEO meta keywords + topic tags."
            >
              <Input
                value={(post.seo.keywords || []).join(", ")}
                onChange={(e) =>
                  updateField(
                    "seo.keywords",
                    e.target.value
                      .split(",")
                      .map((k) => k.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="local seo, google maps, small business marketing"
              />
            </Field>
          </Card>

          {/* ─── Save bar (sticky bottom) ─── */}
          <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 bg-white border border-stone-200 rounded-2xl px-5 py-3 shadow-lg">
            <div className="text-sm text-stone-600">
              {isNew ? "Creating new post" : "Editing existing post"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/admin/blog")}
                className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Publishing…" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── Building-block components ────────────────────────────────────

function Card({ title, description, children }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      <div className="mb-5 pb-5 border-b border-stone-100">
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
        {description && (
          <p className="text-sm text-stone-500 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Field({ label, description, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-stone-500 mb-2">{description}</p>
      )}
      {children}
    </div>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    />
  )
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary leading-relaxed"
    />
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <span
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${
          checked ? "bg-stone-900" : "bg-stone-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </span>
      {label && <span className="text-sm text-stone-700">{label}</span>}
    </label>
  )
}

function ImagePicker({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const dataUrl = await uploadImage(file)
      onChange(dataUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt=""
            className="rounded-lg border border-stone-200 max-h-48 object-contain"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-red-600 shadow-md"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 h-24 border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-primary hover:text-primary cursor-pointer transition-colors">
          <Upload className="w-5 h-5" />
          <span className="text-sm font-medium">
            {uploading ? "Uploading…" : "Upload image from your computer"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  )
}

function ImageStripEditor({ images, onChange }) {
  const [uploading, setUploading] = useState(false)
  const addImage = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const dataUrl = await uploadImage(file)
      onChange([...images, dataUrl].slice(0, 6))
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }
  const removeAt = (i) => onChange(images.filter((_, idx) => idx !== i))
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img}
              alt=""
              className="w-full aspect-[4/3] object-cover rounded-lg border border-stone-200"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 w-7 h-7 rounded-full bg-stone-900/85 text-white flex items-center justify-center hover:bg-red-600"
              aria-label="Remove"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {images.length < 6 && (
          <label className="flex flex-col items-center justify-center gap-1 aspect-[4/3] border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-primary hover:text-primary cursor-pointer transition-colors">
            <Upload className="w-5 h-5" />
            <span className="text-xs font-medium">
              {uploading ? "Uploading…" : "Add image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => addImage(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-xs text-stone-500">{images.length} / 6 images</p>
    </div>
  )
}

function RepeaterList({
  items,
  onChange,
  emptyValue,
  renderItem,
  addLabel,
}) {
  const updateAt = (i, key, value) => {
    const next = [...items]
    next[i] = { ...next[i], [key]: value }
    onChange(next)
  }
  const removeAt = (i) => onChange(items.filter((_, idx) => idx !== i))
  const moveUp = (i) => {
    if (i === 0) return
    const next = [...items]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }
  const moveDown = (i) => {
    if (i === items.length - 1) return
    const next = [...items]
    ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
    onChange(next)
  }
  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-stone-500 italic">None added yet.</p>
      )}
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-stone-50 border border-stone-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              #{i + 1}
            </span>
            <div className="flex items-center gap-2 text-stone-400">
              <button
                onClick={() => moveUp(i)}
                disabled={i === 0}
                className="hover:text-stone-900 disabled:opacity-30"
                title="Move up"
                type="button"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(i)}
                disabled={i === items.length - 1}
                className="hover:text-stone-900 disabled:opacity-30"
                title="Move down"
                type="button"
              >
                ↓
              </button>
              <button
                onClick={() => removeAt(i)}
                className="hover:text-red-600"
                type="button"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {renderItem(item, (key, value) => updateAt(i, key, value))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { ...emptyValue }])}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-stone-300 text-sm font-medium text-stone-600 hover:border-primary hover:text-primary"
      >
        <Plus className="w-4 h-4" />
        {addLabel || "Add item"}
      </button>
    </div>
  )
}
