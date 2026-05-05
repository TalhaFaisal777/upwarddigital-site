import { useEffect } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Phone, Calendar, Clock, Tag } from "lucide-react"
import { blogPostBySlug, blogPosts } from "@/data/blogPosts"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"
import { trackContact, trackBlogPostClick } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/18302241590"

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPostBySlug(slug)

  useEffect(() => {
    if (post) trackBlogPostClick(post.title)
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main className="bg-cream">
      {/* Hero */}
      <article className="pt-32 sm:pt-36 pb-12 sm:pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>

          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
            <Tag className="w-3 h-3" />
            {post.category}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-stone-900 mb-6">
            {post.title}
          </h1>

          <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600 pb-8 border-b border-stone-200">
            <span className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </span>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Cover image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 mt-10"
          >
            <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-stone-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 mt-12">
          <div className="prose prose-stone max-w-none text-stone-700 text-base md:text-lg leading-relaxed space-y-5">
            {post.body.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mt-10 mb-4 leading-snug"
                  >
                    {para.replace(/^## /, "")}
                  </h2>
                )
              }
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-stone-900">
                    {para.replace(/^\*\*/, "").replace(/\*\*$/, "")}
                  </p>
                )
              }
              // Allow simple **bold** runs and paragraphs
              const parts = para.split(/(\*\*[^*]+\*\*)/g)
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={j} className="text-stone-900">
                        {part.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              )
            })}
          </div>

          {/* Keywords */}
          {post.keywords?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-200">
              <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3">
                Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {post.keywords.map((k) => (
                  <span
                    key={k}
                    className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-full font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-stone-900 text-white rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Ready to grow your business?
            </h3>
            <p className="text-stone-300 mb-6 leading-relaxed">
              Book a free 30-minute strategy call. We'll review your goals
              and give you a custom plan — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "blog_post_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3.5 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact({ method: "whatsapp", source: "blog_post_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#1ebe5d] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-8">
              Continue reading
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-stone-900 transition-colors"
                >
                  <div className="aspect-[16/9] bg-stone-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
                      {p.category}
                    </div>
                    <h4 className="text-lg font-bold text-stone-900 mb-2 leading-tight">
                      {p.title}
                    </h4>
                    <p className="text-stone-600 text-sm">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
