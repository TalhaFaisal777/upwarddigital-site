import { useEffect, useState } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpRight,
  Phone,
  Calendar,
  Clock,
  Tag,
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"
import { trackContact, trackBlogPostClick, trackLead } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/15812947936"

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [status, setStatus] = useState("loading") // loading | ok | notfound | error

  useEffect(() => {
    let cancelled = false
    setStatus("loading")
    fetch(`/api/posts/${encodeURIComponent(slug)}`)
      .then(async (r) => {
        if (r.status === 404) return { ok: false, notfound: true }
        if (!r.ok) throw new Error(`Server ${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        if (data?.notfound) return setStatus("notfound")
        if (data?.ok && data.post) {
          setPost(data.post)
          setStatus("ok")
          trackBlogPostClick(data.post.title)
          updateMeta(data.post)
        } else setStatus("error")
      })
      .catch(() => !cancelled && setStatus("error"))
    return () => {
      cancelled = true
    }
  }, [slug])

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-stone-500">Loading…</div>
      </main>
    )
  }
  if (status === "notfound") return <Navigate to="/blog" replace />
  if (status === "error" || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-stone-700 mb-4">Couldn't load this post.</p>
          <Link to="/blog" className="text-primary underline">
            Back to all articles
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream">
      <HeroSection post={post} />
      {post.imageStrip?.length > 0 && <ImageStripSection images={post.imageStrip} />}
      {post.serviceCards?.length > 0 && (
        <ServiceCardsSection cards={post.serviceCards} />
      )}
      {post.showQuoteForm && <QuoteFormSection slug={post.slug} />}
      {post.sections?.length > 0 && <ContentSections sections={post.sections} />}
      {post.faq?.length > 0 && <FaqSection faq={post.faq} />}
      <CtaSection cta={post.cta} />
      {post.seo?.keywords?.length > 0 && <KeywordsSection keywords={post.seo.keywords} />}
    </main>
  )
}

// ─── Hero ────────────────────────────────────────────────────────
function HeroSection({ post }) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 sm:pb-16 overflow-hidden">
      {post.coverImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={post.coverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/85 to-cream" />
        </div>
      )}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
          <Tag className="w-3 h-3" />
          {post.category}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-stone-900 mb-5"
        >
          {post.title}
        </motion.h1>

        {post.hero?.subtitle && (
          <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-7">
            {post.hero.subtitle}
          </p>
        )}

        {(post.hero?.showRating || post.hero?.phone) && (
          <div className="flex flex-wrap items-center gap-4 mb-7">
            {post.hero?.showRating && (
              <div className="inline-flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-full">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-stone-900">
                  {post.hero.rating || "4.9"}/5
                </span>
                {post.hero.ratingCount && (
                  <span className="text-xs text-stone-500">
                    · {post.hero.ratingCount} reviews
                  </span>
                )}
              </div>
            )}
            {post.hero?.phone && (
              <a
                href={`tel:${post.hero.phone.replace(/\D/g, "")}`}
                onClick={() => trackContact({ method: "phone", source: "blog_hero" })}
                className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-primary"
              >
                <Phone className="w-4 h-4" />
                {post.hero.phone}
              </a>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600 pb-2">
          <span className="flex items-center gap-1.5">
            <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Image strip ─────────────────────────────────────────────────
function ImageStripSection({ images }) {
  return (
    <section className="py-8 md:py-10 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, minmax(0, 1fr))`,
          }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Service cards ───────────────────────────────────────────────
function ServiceCardsSection({ cards }) {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-stone-900 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-1">
                {card.title}
              </h3>
              {card.description && (
                <p className="text-stone-600 text-xs leading-relaxed">
                  {card.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Embedded quote form ─────────────────────────────────────────
function QuoteFormSection({ slug }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const handle = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    trackLead({ content_name: "Blog Quote Form", content_category: "lead_form" })
    setSubmitted(true)
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: `blog:${slug}`, ...form }),
      })
    } catch (err) {
      console.error(err)
    }
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" })
      setSubmitted(false)
    }, 4000)
  }
  return (
    <section className="py-14 md:py-20 bg-blue-50/40">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-10">
          <div className="text-center mb-7">
            <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-2">
              Get a free consultation
            </h2>
            <p className="text-stone-600 text-sm">
              Tell us about your project and we'll get back within 24 hours.
            </p>
          </div>
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <p className="text-stone-900 font-bold">Thank you!</p>
              <p className="text-stone-600 text-sm">
                We'll reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
              <input
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <select
                name="service"
                required
                value={form.service}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white cursor-pointer"
              >
                <option value="">Select a service</option>
                <option>Website Development</option>
                <option>SEO Services</option>
                <option>Local SEO / Google Maps</option>
                <option>Google Ads (PPC)</option>
                <option>Social Media Marketing</option>
                <option>Branding & Design</option>
                <option>Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Project details (optional)"
                rows={3}
                value={form.message}
                onChange={handle}
                className="sm:col-span-2 rounded-lg border border-stone-300 px-4 py-2 text-sm bg-white"
              />
              <button
                type="submit"
                className="sm:col-span-2 h-11 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-blue-700"
              >
                Get my free consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Content sections (image + heading + body) ───────────────────
function ContentSections({ sections }) {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 space-y-14 md:space-y-20">
        {sections.map((s, i) => (
          <ContentSection key={i} section={s} index={i} />
        ))}
      </div>
    </section>
  )
}

function ContentSection({ section, index }) {
  if (section.imageSide === "full" || !section.image) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 leading-snug tracking-tight mb-4">
          {section.heading}
        </h3>
        <BodyText text={section.body} />
        {section.image && (
          <img
            src={section.image}
            alt=""
            className="w-full rounded-3xl mt-6 object-cover"
          />
        )}
      </motion.div>
    )
  }
  const imageRight = section.imageSide === "right"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      <div className={imageRight ? "" : "md:order-2"}>
        <h3 className="text-2xl md:text-3xl font-bold text-stone-900 leading-snug tracking-tight mb-4">
          {section.heading}
        </h3>
        <BodyText text={section.body} />
      </div>
      <div className={imageRight ? "md:order-2" : ""}>
        <img
          src={section.image}
          alt=""
          className="w-full aspect-[4/3] object-cover rounded-3xl"
        />
      </div>
    </motion.div>
  )
}

// Render paragraphs with bold + inline links from a simple markdown subset.
function BodyText({ text }) {
  if (!text) return null
  const paragraphs = text.split(/\n\s*\n/)
  return (
    <div className="space-y-4 text-stone-700 text-base md:text-lg leading-relaxed">
      {paragraphs.map((p, i) => (
        <p key={i}>{renderInline(p)}</p>
      ))}
    </div>
  )
}

// Inline parser for **bold**, [text](url), and bare URLs.
function renderInline(text) {
  // Tokenize: [text](url), **bold**, plain
  const tokens = []
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) })
    }
    if (match[1]) {
      tokens.push({ type: "link", text: match[2], href: match[3] })
    } else if (match[4]) {
      tokens.push({ type: "bold", value: match[5] })
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) })
  }

  return tokens.map((tok, i) => {
    if (tok.type === "link") {
      const isInternal = tok.href.startsWith("/")
      return (
        <a
          key={i}
          href={tok.href}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          {tok.text}
        </a>
      )
    }
    if (tok.type === "bold") {
      return (
        <strong key={i} className="text-stone-900">
          {tok.value}
        </strong>
      )
    }
    return <span key={i}>{tok.value}</span>
  })
}

// ─── FAQ ─────────────────────────────────────────────────────────
function FaqSection({ faq }) {
  return (
    <section className="py-14 md:py-20 bg-white border-y border-stone-200">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-stone-900 mb-10 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details
              key={i}
              className="group bg-stone-50 border border-stone-200 rounded-2xl p-5 cursor-pointer"
            >
              <summary className="font-semibold text-stone-900 text-base md:text-lg flex items-center justify-between gap-4 list-none">
                {item.question}
                <span className="text-stone-400 group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </span>
              </summary>
              <div className="mt-3 text-stone-600 leading-relaxed">
                {renderInline(item.answer)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ─────────────────────────────────────────────────
function CtaSection({ cta }) {
  if (!cta) return null
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            {cta.heading}
          </h2>
          {cta.subtitle && (
            <p className="text-stone-300 mb-7 max-w-2xl mx-auto leading-relaxed">
              {cta.subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={PHONE_HREF}
              onClick={() => trackContact({ method: "phone", source: "blog_bottom_cta" })}
              className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3.5 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact({ method: "whatsapp", source: "blog_bottom_cta" })}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#1ebe5d] transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Topics (keywords) ──────────────────────────────────────────
function KeywordsSection({ keywords }) {
  return (
    <section className="py-10 border-t border-stone-200 bg-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-3 font-semibold">
          Topics
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((k) => (
            <span
              key={k}
              className="px-3 py-1.5 bg-stone-100 text-stone-700 text-xs rounded-full font-medium"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Utils ──────────────────────────────────────────────────────
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

// Set <title> + meta description for SEO when the post loads.
function updateMeta(post) {
  const seo = post.seo || {}
  if (typeof document === "undefined") return
  document.title = seo.metaTitle || post.title
  setMeta("description", seo.metaDescription || post.excerpt)
  setMeta("keywords", (seo.keywords || []).join(", "))
}

function setMeta(name, content) {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}
