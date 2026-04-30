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
  ShieldCheck,
  Award,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/common/SectionHeading"
import ServiceCard from "@/components/common/ServiceCard"
const PHONE_HREF = "tel:+12013040657"

const heroSlides = [
  {
    image: "/hero/team.jpg",
    eyebrow: "Strategy & Execution",
  },
  {
    image: "/hero/analytics.jpg",
    eyebrow: "Data-Driven Marketing",
  },
  {
    image: "/hero/laptop.jpg",
    eyebrow: "Performance That Scales",
  },
  {
    image: "/hero/meeting.jpg",
    eyebrow: "Built On Partnership",
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

const processSteps = [
  { num: "01", title: "Discover", description: "We start with deep listening — your goals, audience, market, and what's worked or hasn't." },
  { num: "02", title: "Strategize", description: "A tailored roadmap with measurable KPIs, timelines, and the channels that will move your numbers." },
  { num: "03", title: "Execute", description: "Our specialists build, write, design, and ship — with weekly check-ins and zero surprise costs." },
  { num: "04", title: "Optimize", description: "We measure, refine, and double down on what works. Growth compounds when you keep iterating." },
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
  "GA Konnect",
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
      <section className="relative min-h-[90vh] md:min-h-screen flex items-end overflow-hidden">
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
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-8 pt-40 pb-16 md:pb-24">
          {/* Eyebrow */}
          <motion.div
            key={`eb-${activeSlide}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase text-white mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {heroSlides[activeSlide].eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl mb-6"
          >
            Building digital experiences that drive
            <span className="block text-blue-400 mt-2">measurable growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-stone-200 max-w-2xl mb-10 leading-relaxed"
          >
            UpwardDigital is a full-service agency delivering high-performance websites,
            data-driven SEO, and digital marketing strategies for ambitious businesses worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-12"
          >
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-4 rounded-full text-base font-semibold hover:bg-blue-400 hover:text-white transition-colors group">
              <Phone className="w-5 h-5" />
              Book a free strategy call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white border border-white/30 hover:border-white px-7 py-4 rounded-full text-base font-semibold backdrop-blur-sm hover:bg-white/10 transition-colors">
              View our work
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-white/15"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-white text-sm">
                <span className="font-bold">4.9/5</span>
                <span className="text-stone-300 ml-1">from 87 reviews</span>
              </span>
            </div>
            <div className="hidden md:block w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2 text-white text-sm">
              <Users className="w-4 h-4 text-blue-400" />
              <span><span className="font-bold">120+</span> <span className="text-stone-300">businesses served</span></span>
            </div>
            <div className="hidden md:block w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2 text-white text-sm">
              <Award className="w-4 h-4 text-blue-400" />
              <span><span className="font-bold">9+ years</span> <span className="text-stone-300">in business</span></span>
            </div>
            <div className="hidden md:block w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2 text-white text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-stone-300">100% client satisfaction guarantee</span>
            </div>
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-6">
            Trusted by ambitious businesses across 4 continents
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-4 items-center text-stone-700">
            {trustedBrands.map((c) => (
              <span key={c} className="text-lg md:text-xl font-medium tracking-tight opacity-70 hover:opacity-100 transition-opacity">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="bg-white py-24 border-y border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="What we do"
            title={
              <>
                Everything your brand needs to <em className="font-serif italic font-medium text-primary">show up</em> and grow.
              </>
            }
            description="Full-service digital — design, development, SEO, and marketing — under one roof."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESS / HOW WE WORK ==================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="How we work"
            title={
              <>
                A clear, <em className="font-serif italic font-medium text-primary">honest</em> process — no surprises.
              </>
            }
            description="From first call to launch and beyond, every project follows the same proven path."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-3xl overflow-hidden">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 md:p-10 hover:bg-stone-50 transition-colors"
              >
                <div className="text-4xl font-bold text-primary mb-6 tracking-tight">{step.num}</div>
                <h3 className="text-xl font-bold mb-3 text-stone-900 tracking-tight">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-24">
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
