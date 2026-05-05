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
import { trackContact, trackSchedule, trackServiceInterest, trackLead } from "@/lib/pixel"
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
  { icon: Globe, title: "Web Development", description: "Custom websites, web apps, and e-commerce platforms built for performance and scale.", link: "/services" },
  { icon: Search, title: "SEO Optimization", description: "Data-driven SEO strategies that boost visibility and drive sustained organic growth.", link: "/services" },
  { icon: BarChart3, title: "Digital Marketing", description: "Multi-channel campaigns across social, paid, email, and content marketing.", link: "/services" },
  { icon: Palette, title: "Brand Strategy", description: "Compelling brand identities and strategies that resonate with your audience.", link: "/services" },
]

const whyUsPoints = [
  { title: "Industry-Leading Expertise", description: "Our team of seasoned professionals brings deep knowledge across every digital discipline, ensuring best-in-class solutions." },
  { title: "Data-Driven Approach", description: "Every decision we make is backed by analytics and insights, maximizing ROI and minimizing guesswork." },
  { title: "Transparent Communication", description: "We keep you informed at every step with regular updates, detailed reports, and open dialogue." },
  { title: "Proven Track Record", description: "With hundreds of successful projects and long-term client partnerships, our results speak for themselves." },
]

const testimonials = [
  {
    quote: "UpwardDigital completely transformed our online presence. Our new website not only looks stunning but has increased our conversion rate by 340%. Their development team is world-class.",
    name: "Sarah Johnson", role: "CEO", company: "TechVentures", initials: "SJ",
  },
  {
    quote: "The SEO results have been nothing short of remarkable. We went from page 5 to the top 3 positions for our target keywords within six months. Organic traffic is up 280% year-over-year.",
    name: "Michael Chen", role: "Marketing Director", company: "GrowthLabs", initials: "MC",
  },
  {
    quote: "Their brand strategy work gave us a completely new identity that truly resonates with our audience. Customer engagement has skyrocketed and our brand recognition has never been stronger.",
    name: "Emily Rodriguez", role: "Founder", company: "StyleHouse", initials: "ER",
  },
  {
    quote: "Working with UpwardDigital has been a game-changer for our business. Their comprehensive approach to digital marketing and development has streamlined our entire digital ecosystem.",
    name: "David Park", role: "CTO", company: "DataFlow", initials: "DP",
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
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((p) => (p + 1) % testimonials.length)
  }, [])
  const prevTestimonial = useCallback(() => {
    setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(nextTestimonial, 6000)
    return () => clearInterval(id)
  }, [nextTestimonial])

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
            className="font-serif italic text-blue-400 text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8"
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
            subtitle="What we do"
            title={
              <>
                Everything for <em className="font-serif italic font-medium text-primary">your brand</em>.
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

      {/* ==================== WHY US ==================== */}
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="inline-block text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              — Why work with us —
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight max-w-3xl">
              We deliver <em className="font-serif italic font-medium text-blue-400">results</em>, not deliverables.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {whyUsPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5"
              >
                <CheckCircle2 className="w-6 h-6 text-blue-400 mt-1 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="What clients say"
            title="Words from those we've grown."
          />
          <div className="relative bg-white border border-stone-200 rounded-3xl p-10 md:p-14">
            <Quote className="absolute -top-5 left-10 w-10 h-10 text-primary bg-cream p-1.5" />
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <blockquote className="text-xl md:text-2xl leading-relaxed text-stone-800 mb-8 font-medium">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {testimonials[activeTestimonial].initials}
                </div>
                <div>
                  <div className="font-bold text-stone-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-stone-600">
                    {testimonials[activeTestimonial].role} · {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-stone-200">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeTestimonial ? "w-8 bg-stone-900" : "w-1.5 bg-stone-300"}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-stone-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-stone-300 hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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

  const handleSubmit = (e) => {
    e.preventDefault()
    trackLead({
      content_name: "Home Free Consultation",
      content_category: "lead_form",
      service: form.service || "unspecified",
    })
    setSubmitted(true)
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] tracking-tight mb-6 text-stone-900">
            <span className="text-primary">Upward Digital LLC</span>, USA's
            Leading <em className="font-serif italic font-medium text-primary">Web Development</em> & SEO Agency
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
              <em className="font-serif italic text-primary">
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
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 tracking-tight">
                Contact Us — Free Consultation
              </h3>
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
