import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search, Clock, ArrowRight, ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function Blog() {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/posts")
      .then(async (r) => {
        if (!r.ok) throw new Error(`Server ${r.status}`)
        const ct = r.headers.get("content-type") || ""
        if (!ct.includes("application/json")) {
          throw new Error("API not reachable in dev — deploy or use wrangler.")
        }
        return r.json()
      })
      .then((data) => {
        if (data.ok) setPosts(data.posts || [])
        else setError(data.error || "Failed to load posts")
      })
      .catch((err) => setError(err.message))
  }, [])

  const categories = useMemo(() => {
    if (!posts) return ["All"]
    const set = new Set(posts.map((p) => p.category).filter(Boolean))
    return ["All", ...Array.from(set)]
  }, [posts])

  const filtered = useMemo(() => {
    if (!posts) return []
    return posts.filter((p) => {
      const matchesCat =
        activeCategory === "All" || p.category === activeCategory
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [posts, activeCategory, searchQuery])

  const [featured, ...rest] = filtered

  return (
    <main className="min-h-screen bg-cream text-stone-900">
      <PageHero
        title={
          <>
            Insights &{" "}
            <em className="font-serif italic font-medium text-primary">
              resources
            </em>
            .
          </>
        }
        subtitle="Our Blog"
        description="Stay ahead with the latest trends, strategies, and insights in digital marketing, web development, and SEO."
      />

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === category
                    ? "bg-primary text-white shadow"
                    : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
      </section>

      {error && (
        <div className="max-w-3xl mx-auto px-6 mt-10">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm text-center">
            {error}
          </div>
        </div>
      )}

      {posts === null && !error && (
        <div className="text-center py-24 text-stone-500">Loading posts…</div>
      )}

      {posts && filtered.length === 0 && (
        <div className="text-center py-24 text-stone-500 px-6">
          No posts found. Try a different search or category.
        </div>
      )}

      {/* Featured */}
      {featured && (
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group block bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-stone-900 transition-colors"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto bg-stone-100">
                  {featured.coverImage ? (
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700" />
                  )}
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge>Featured</Badge>
                    <Badge variant="secondary">{featured.category}</Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-stone-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-stone-900 text-sm font-semibold">
                    Read article
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((post, i) => (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-stone-900 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/95 backdrop-blur text-stone-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-stone-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs text-stone-500">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </CardContent>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

function formatDate(d) {
  if (!d) return ""
  try {
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return d
  }
}
