import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  Search,
  BarChart3,
  Palette,
  CheckCircle2,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowUpRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { trackContact, trackSchedule, trackServiceInterest, trackLead, trackBlogPostClick } from "@/lib/pixel"
import { blogPosts } from "@/data/blogPosts"
import SectionHeading from "@/components/common/SectionHeading"
import ServiceCard from "@/components/common/ServiceCard"
const PHONE_HREF = "tel:+12013040657"

const heroSlides = [
  {
    image: "/hero/team.jpg",
    eyebrow: "Real Work · Real Numbers",
  },
  {
    image: "/hero/analytics.jpg",
    eyebrow: "Trusted Since 2015",
  },
  {
    image: "/hero/laptop.jpg",
    eyebrow: "Service Business Specialists",
  },
  {
    image: "/hero/meeting.jpg",
    eyebrow: "Built To Get You Found",
  },
]

const services = [
  { icon: Globe, title: "Web Development", description: "Custom websites, web apps, and e-commerce platforms built for performance and scale.", link: "/website-development" },
  { icon: Search, title: "SEO Optimization", description: "Data-driven SEO strategies that boost visibility and drive sustained organic growth.", link: "/seo-services" },
  { icon: BarChart3, title: "Digital Marketing", description: "Multi-channel campaigns across social, paid, email, and content marketing.", link: "/meta-google-ads" },
  { icon: Palette, title: "Brand Strategy", description: "Compelling brand identities and strategies that resonate with your audience.", link: "/website-development" },
]

const offerings = [
  {
    title: "Google SEO",
    image: "/services/seo.jpg",
    description: "Improve your online visibility and search rankings with proven on-page, off-page, and technical SEO strategies built for sustained organic growth.",
    link: "/seo-services",
  },
  {
    title: "Google Ads",
    image: "/services/google-ads.jpg",
    description: "Targeted Google Ads campaigns (Search, Display, YouTube) that maximize ROI and bring qualified traffic to your business.",
    link: "/meta-google-ads",
  },
  {
    title: "Google Maps",
    image: "/services/google-maps.jpg",
    description: "Local SEO and Google Maps optimization to dominate your area, increase store visits, and capture high-intent local searches.",
    link: "/seo-services",
  },
  {
    title: "Social Media",
    image: "/services/social-media.jpg",
    description: "Social media management and paid social campaigns across Meta, Instagram, TikTok, and LinkedIn that grow your audience and engagement.",
    link: "/social-media-marketing",
  },
  {
    title: "Website Development",
    image: "/services/web-dev.jpg",
    description: "Custom-built websites that load fast, look beautiful, and turn visitors into customers — built with React, Next.js, WordPress, or Shopify.",
    link: "/website-development",
  },
  {
    title: "E-Commerce",
    image: "/services/ecommerce.jpg",
    description: "Scalable e-commerce stores on Shopify, WooCommerce, or custom platforms — optimized for conversions, speed, and seamless checkout.",
    link: "/website-development",
  },
]

const testimonials = [
  {
    quote: "Upward Digital completely transformed our online presence with their advanced SEO services and local SEO strategies. Our Google rankings improved significantly, and we're now seeing consistent growth in organic traffic and website visibility. Their expertise in technical SEO, keyword optimization, and content strategy is truly outstanding. Highly recommended for businesses looking to scale online.",
    name: "Michael Turner",
    role: "Owner",
    company: "BrightEdge Solutions",
    service: "SEO Services",
    initials: "MT",
    rating: 5,
  },
  {
    quote: "Upward Digital delivered a high-performance, responsive website that perfectly represents our brand. Their team focused on user experience, fast loading speed, and conversion-focused design. The result is a secure, mobile-friendly website that performs exceptionally well. If you need professional web development services, they are the right choice.",
    name: "Sophia Martinez",
    role: "Founder",
    company: "Elite Interiors",
    service: "Website Development",
    initials: "SM",
    rating: 5,
  },
  {
    quote: "Their Google Ads management and PPC campaigns have been a game changer for our business. Upward Digital optimised our campaigns with data-driven strategies, audience targeting, and conversion tracking, which improved our ROI and ad performance. Their approach to paid advertising and campaign optimisation is highly effective.",
    name: "David Collins",
    role: "Director",
    company: "Prime Auto Group",
    service: "Google Ads (PPC)",
    initials: "DC",
    rating: 4,
  },
  {
    quote: "Upward Digital helped us grow our brand with strategic social media marketing and content management. Their team created engaging campaigns that improved our brand visibility, audience engagement, and online presence. Their understanding of digital marketing trends and social media strategy is impressive.",
    name: "Emma Richardson",
    role: "Manager",
    company: "Urban Style Co.",
    service: "Social Media Marketing",
    initials: "ER",
    rating: 5,
  },
  {
    quote: "Thanks to Upward Digital's local SEO and Google Maps optimisation, our business now ranks higher in local search results. We've seen a noticeable increase in website traffic and online visibility. Their expertise in Google Business Profile optimisation and local search strategies has made a real difference.",
    name: "James Walker",
    role: "CEO",
    company: "Metro Services",
    service: "Local SEO & Google Maps",
    initials: "JW",
    rating: 5,
  },
  {
    quote: "Upward Digital delivered a high-performing website along with powerful SEO optimisation that improved our search rankings and online visibility. Their expertise in technical SEO, website speed optimisation, and responsive design made a huge impact. A reliable partner for long-term digital growth.",
    name: "Daniel Brooks",
    role: "Owner",
    company: "NextGen Contractors",
    service: "Web Development & SEO",
    initials: "DB",
    rating: 4,
  },
  {
    quote: "Their digital marketing strategies, including Google Ads and social media marketing, significantly improved our brand visibility and online reach. Upward Digital focuses on data-driven marketing and performance optimisation, which helped us achieve consistent business growth. Highly professional team.",
    name: "Laura Bennett",
    role: "Founder",
    company: "Wellness Hub",
    service: "Digital Marketing",
    initials: "LB",
    rating: 5,
  },
  {
    quote: "Upward Digital's local SEO services and Google Maps optimisation helped us rank higher in local search results. Our Google Business Profile is now fully optimised, and our online presence has improved across the USA market. Great results and excellent communication throughout the project.",
    name: "Ryan Mitchell",
    role: "CEO",
    company: "CityLine Services",
    service: "Local SEO",
    initials: "RM",
    rating: 4,
  },
]

const trustedBrands = [
  "Snowflake Limousine",
  "Dublin City Cab",
  "Tri-Valley Shuttle",
  "Direct Shopfront",
  "Formosa Bathrooms",
  "CR Glass",
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((p) => (p + 1) % heroSlides.length), 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="overflow-hidden bg-cream">
      {/* ==================== HERO BANNER (sliding background) ==================== */}
      <section className="relative min-h-[600px] md:min-h-screen flex items-center overflow-hidden">
        {/* Sliding image carousel */}
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${heroSlides[activeSlide].image})` }}
            />
          </AnimatePresence>
          {/* Gradient overlays for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/55 to-stone-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-6 md:px-8 pt-32 md:pt-32 pb-12 md:pb-24">
          {/* Eyebrow */}
          <motion.div
            key={`eb-${activeSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white mb-5 sm:mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {heroSlides[activeSlide].eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-5xl mb-3 sm:mb-4"
          >
            Upward Digital LLC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-blue-400 max-w-2xl mb-3 leading-relaxed"
          >
            Your growth partner.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-stone-200 max-w-2xl mb-8 sm:mb-10 leading-relaxed"
          >
            High-quality websites and data-driven SEO and marketing strategies
            that turn traffic into real business results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3"
          >
            <a
              href={PHONE_HREF}
              onClick={() => {
                trackContact({ method: "phone", source: "hero" })
                trackSchedule({ source: "hero", offer: "free_strategy_call" })
              }}
              className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-base font-semibold hover:bg-blue-400 hover:text-white transition-colors group"
            >
              <Phone className="w-5 h-5" />
              Book a free strategy call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link to="/portfolio" className="inline-flex items-center justify-center gap-2 text-white border border-white/30 hover:border-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-base font-semibold backdrop-blur-sm hover:bg-white/10 transition-colors">
              View our work
            </Link>
          </motion.div>

        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`h-1 rounded-full transition-all ${i === activeSlide ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==================== TRUST STRIP ==================== */}
      <section className="border-y border-stone-900/10 bg-white/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6">
            Trusted by brands worldwide
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4 items-center justify-center text-stone-700">
            {trustedBrands.map((c) => (
              <span key={c} className="text-lg md:text-xl font-medium tracking-tight opacity-70 hover:opacity-100 transition-opacity">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="bg-white py-16 md:py-24 border-y border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            title={
              <>
                <span className="text-primary">Upward Digital Marketing Agency</span>
              </>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT + CONTACT FORM ==================== */}
      <AboutAndContactSection />

      {/* ==================== WHAT WE OFFER ==================== */}
      <section className="py-16 md:py-24 bg-white border-y border-stone-900/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight mb-5 text-primary">
              Web Development & Digital Marketing Solutions
            </h2>
            <p className="text-stone-600 text-base md:text-lg leading-relaxed">
              We are a trusted website development and SEO agency in the USA,
              delivering comprehensive digital services including search engine
              optimization (SEO), Google Ads (PPC), Google Maps optimization,
              social media marketing, and custom website development. Our
              strategies are designed to increase online visibility, website
              traffic, and long-term business growth.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {offerings.map((o, i) => (
              <motion.article
                key={o.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-stone-900 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={o.image}
                    alt={o.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                </div>

                {/* Body */}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-stone-900 tracking-tight group-hover:text-primary transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-1">
                    {o.description}
                  </p>
                  <Link
                    to={o.link}
                    onClick={() => trackServiceInterest(o.title)}
                    className="inline-flex items-center gap-1.5 text-stone-900 text-sm font-semibold hover:text-primary transition-colors group/link"
                  >
                    Read more
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <TestimonialsSection />

      {/* ==================== BLOG TEASER ==================== */}
      <BlogTeaserSection />

    </main>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// About + Contact Form Section
// ────────────────────────────────────────────────────────────────────────────
function AboutAndContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    website: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    trackLead({
      content_name: "Home Free Consultation",
      content_category: "lead_form",
      service: form.service || "unspecified",
    })

    // Optimistically show success even if the API call is still in flight —
    // the user shouldn't have to wait, and any failure is logged for retry.
    setSubmitted(true)

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "home_consultation",
          ...form,
        }),
      })
    } catch (err) {
      console.error("Submission failed:", err)
    }

    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", website: "" })
      setSubmitted(false)
    }, 4000)
  }

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      {/* Subtle background dots */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
        {/* LEFT — About content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <span className="inline-block text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-3">
            About Us
          </span>
          <h2 className="text-2xl md:text-3xl font-bold leading-[1.2] tracking-tight mb-6 text-stone-900">
            Upward Digital LLC, USA's Leading Web Development & SEO Agency
          </h2>

          <div className="space-y-5 text-stone-600 text-base md:text-lg leading-relaxed">
            <p>
              Upward Digital is a leading website development and SEO agency in
              the USA, founded in 2015 to help businesses grow through powerful,
              results-driven digital solutions.
            </p>
            <p>
              We're a full-service digital agency specialising in{" "}
              <strong className="text-stone-900">
                web development, local SEO, technical SEO, and performance
                marketing
              </strong>
              . We build scalable, secure, user-friendly websites that turn
              visitors into loyal customers.
            </p>
            <p>
              Our SEO services are designed to improve Google rankings, increase
              organic traffic, and generate high-quality leads through proven
              on-page, off-page, and local SEO strategies that help businesses
              dominate search results.
            </p>
            <p className="text-stone-900 font-semibold pt-2">
              We don't just build websites. We create{" "}
              <em className="text-stone-900">
                growth-focused digital systems
              </em>{" "}
              that deliver long-term success.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-full"
        >
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-7 sm:p-10 h-full flex flex-col">
            <div className="text-center mb-7">
              <h4 className="text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight">
                Contact Us — Free Consultation
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                Book a free consultation and let the best{" "}
                <strong className="text-stone-900">
                  website development and SEO agency
                </strong>{" "}
                in USA manage your project.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16 flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-stone-900 font-bold text-lg mb-1">Thank you!</p>
                <p className="text-stone-600 text-sm">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  value={form.phone}
                  onChange={handleChange}
                  className="flex h-12 w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                />

                <div>
                  <label
                    htmlFor="hf-service"
                    className="block text-sm font-bold text-stone-900 mb-1.5"
                  >
                    What Service You Require?
                  </label>
                  <select
                    id="hf-service"
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className="flex h-12 w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2378716c' stroke-width='1.5' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                  >
                    <option value="">Select</option>
                    <option>Website Development</option>
                    <option>SEO Services</option>
                    <option>Local SEO / Google Maps</option>
                    <option>Google Ads (PPC)</option>
                    <option>Social Media Marketing</option>
                    <option>Branding &amp; Design</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-auto pt-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Click To Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Testimonials section — 3 cards on desktop with highlighted center, 1 on mobile
// ────────────────────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const total = testimonials.length
  // Track has [...testimonials, ...testimonials] = 2 copies for seamless looping
  const trackLength = total * 2
  const cardPct = 100 / trackLength
  // Position is a virtual index 0..trackLength-1; we snap from `total` back to 0 invisibly.
  const [position, setPosition] = useState(0)
  const [animate, setAnimate] = useState(true)

  const goNext = useCallback(() => setPosition((p) => p + 1), [])
  const goPrev = useCallback(() => setPosition((p) => p - 1), [])

  // Auto-advance forever — no end, no pause
  useEffect(() => {
    const id = setInterval(goNext, 4500)
    return () => clearInterval(id)
  }, [goNext])

  // Seamless wrap: when we cross into the second copy, jump back to the first
  // copy at the equivalent position with no animation. To the eye, nothing changes.
  useEffect(() => {
    if (position >= total) {
      const t = setTimeout(() => {
        setAnimate(false)
        setPosition((p) => p - total)
        // Re-enable animation on the next tick
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
      }, 700) // matches the slide duration
      return () => clearTimeout(t)
    }
    if (position < 0) {
      const t = setTimeout(() => {
        setAnimate(false)
        setPosition((p) => p + total)
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
      }, 700)
      return () => clearTimeout(t)
    }
  }, [position, total])

  // The "logical" highlighted card uses real-modulo to handle the wrap range.
  const activeIdx = ((position % total) + total) % total

  // The duplicated track lets us slide forwards through 2 copies before snapping.
  const trackCards = [...testimonials, ...testimonials]

  // Desktop: 3 visible (translate puts position+1 in middle since we offset by 1)
  // Mobile: 1 visible (translate by full card width per step)
  const desktopX = -((position - 1) * cardPct)
  const mobileX = -(position * cardPct)

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="mb-14 text-center">
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-primary">
            What Clients Say
          </h4>
        </div>

        {/* Desktop: 3 cards visible, center highlighted */}
        <div className="hidden md:block overflow-hidden py-8">
          <motion.div
            animate={{ x: `${desktopX}%` }}
            transition={
              animate
                ? { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
            className="flex"
            style={{ width: `${(trackLength * 100) / 3}%` }}
          >
            {trackCards.map((t, i) => (
              <div
                key={i}
                className="px-3 shrink-0 flex items-center"
                style={{ width: `${cardPct}%` }}
              >
                <TestimonialCard
                  t={t}
                  highlighted={i % total === activeIdx}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: 1 card at a time */}
        <div className="md:hidden overflow-hidden">
          <motion.div
            animate={{ x: `${mobileX}%` }}
            transition={
              animate
                ? { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
            className="flex"
            style={{ width: `${trackLength * 100}%` }}
          >
            {trackCards.map((t, i) => (
              <div
                key={i}
                className="px-2 shrink-0"
                style={{ width: `${cardPct}%` }}
              >
                <TestimonialCard t={t} highlighted={true} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-2 flex-wrap">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setPosition(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx
                    ? "w-8 bg-stone-900"
                    : "w-1.5 bg-stone-300 hover:bg-stone-500"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ t, highlighted }) {
  return (
    <div
      className={`relative w-full rounded-3xl border transition-all duration-700 ${
        highlighted
          ? "bg-white border-stone-900 shadow-2xl scale-100 p-9 md:p-10"
          : "bg-white/70 border-stone-200 shadow-sm scale-90 opacity-60 p-7 md:p-8"
      }`}
    >
      <Quote
        className={`w-9 h-9 mb-5 transition-colors ${
          highlighted ? "text-primary" : "text-primary/30"
        }`}
        strokeWidth={2.5}
      />
      <div className="flex items-center gap-1 mb-5">
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            className={`w-4 h-4 ${
              j < t.rating ? "text-amber-500 fill-current" : "text-stone-300 fill-current"
            }`}
          />
        ))}
      </div>
      <blockquote
        className={`leading-relaxed text-stone-700 mb-6 ${
          highlighted
            ? "text-base md:text-lg font-medium"
            : "text-sm line-clamp-4"
        }`}
      >
        "{t.quote}"
      </blockquote>
      <div className="flex items-center gap-4 pt-5 border-t border-stone-200">
        <div
          className={`rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 ${
            highlighted ? "w-12 h-12 text-sm" : "w-10 h-10 text-xs"
          }`}
        >
          {t.initials}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-stone-900 text-sm truncate">{t.name}</div>
          <div className="text-xs text-stone-600 truncate">
            {t.role} · {t.company}
          </div>
          <div className="text-[11px] text-primary font-semibold mt-0.5 uppercase tracking-wider truncate">
            {t.service}
          </div>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Blog teaser section — links to /blog/:slug detail pages
// ────────────────────────────────────────────────────────────────────────────
function BlogTeaserSection() {
  const featured = blogPosts.slice(0, 3)
  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h4 className="text-xl font-bold text-stone-900">Our Blogs</h4>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-900 font-semibold text-sm hover:text-primary transition-colors group shrink-0"
          >
            View all articles
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                onClick={() => trackBlogPostClick(post.title)}
                className="group flex flex-col h-full bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-stone-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/95 backdrop-blur text-stone-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-stone-900 leading-snug mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs text-stone-500">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
