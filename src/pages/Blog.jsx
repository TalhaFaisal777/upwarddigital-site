import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Clock, ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import { CardContent } from "@/components/ui/card"

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextCursor, setNextCursor] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [error, setError] = useState("")

  const fetchPage = (cursor = null) => {
    const query = new URLSearchParams({ limit: "24" })
    if (cursor) query.set("cursor", cursor)

    return fetch(`/api/posts?${query.toString()}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`Server ${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (!data.ok) {
          setError(data.error || "Failed to load posts")
          return
        }
        const incoming = data.posts || []
        setPosts((curr) => {
          if (!cursor) return incoming
          const seen = new Set(curr.map((p) => p.id || p.slug))
          const appended = incoming.filter((p) => !seen.has(p.id || p.slug))
          return [...curr, ...appended]
        })
        setNextCursor(data.nextCursor || null)
        setHasMore(!!data.hasMore)
      })
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    fetchPage().finally(() => setInitialLoading(false))
  }, [])

  const filtered = useMemo(() => posts, [posts])

  const [featured, ...rest] = filtered

  return (
    <main className="min-h-screen bg-cream text-stone-900">
      <PageHero
        title="Blogs"
      />


      {error && (
        <div className="max-w-3xl mx-auto px-6 mt-10">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm text-center">
            {error}
          </div>
        </div>
      )}

      {initialLoading && !error && (
        <div className="text-center py-24 text-stone-400 text-sm">Loading posts…</div>
      )}

      {!initialLoading && filtered.length === 0 && (
        <div className="text-center py-24 text-stone-500 px-6">
          No posts found. Try a different search or category.
        </div>
      )}

      {/* Featured */}
      {featured && (
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pt-10 pb-8 md:pt-14 md:pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/${featured.slug}`}
              className="group block bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-stone-300 transition-[border-color,box-shadow] duration-200"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[4/3] md:aspect-auto bg-stone-100 overflow-hidden">
                  {featured.coverImage ? (
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 will-change-transform"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-block bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-primary/10">
                      {featured.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold leading-[1.12] tracking-tight mb-4 text-stone-900 group-hover:text-primary transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-stone-500 leading-relaxed mb-7 text-sm md:text-base line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-5 text-xs text-stone-400 mb-7">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="self-start inline-flex items-center gap-2 bg-stone-900 group-hover:bg-primary text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors duration-300">
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
        <section className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {rest.map((post) => (
              <article key={post.id || post.slug}>
                <Link
                  to={`/${post.slug}`}
                  className="group flex flex-col h-full bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-stone-300 transition-[border-color,box-shadow] duration-200"
                >
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 will-change-transform"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/95 backdrop-blur-sm text-stone-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-stone-900 leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </article>
            ))}
          </div>

          {hasMore && activeCategory === "All" && !searchQuery && (
            <div className="text-center mt-14">
              <button
                onClick={() => {
                  if (!nextCursor || loadingMore) return
                  setLoadingMore(true)
                  fetchPage(nextCursor).finally(() => setLoadingMore(false))
                }}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-primary transition-colors duration-300 disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : "Load more articles"}
              </button>
            </div>
          )}
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
