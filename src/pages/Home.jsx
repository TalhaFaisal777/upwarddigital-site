import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
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
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/common/SectionHeading"
import AnimatedCounter from "@/components/common/AnimatedCounter"
import ServiceCard from "@/components/common/ServiceCard"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/18302241590"

const services = [
  { icon: Globe, title: "Web Development", description: "Custom websites, web apps, and e-commerce platforms built for performance and scale.", link: "/services" },
  { icon: Search, title: "SEO Optimization", description: "Data-driven SEO strategies that boost visibility and drive sustained organic growth.", link: "/services" },
  { icon: BarChart3, title: "Digital Marketing", description: "Multi-channel campaigns across social, paid, email, and content marketing.", link: "/services" },
  { icon: Palette, title: "Brand Strategy", description: "Compelling brand identities and strategies that resonate with your audience.", link: "/services" },
]

const stats = [
  { end: 9, suffix: "+", label: "Years building brands" },
  { end: 120, suffix: "+", label: "Projects delivered" },
  { end: 98, suffix: "%", label: "Client retention" },
  { end: 4, suffix: "×", label: "Avg. organic growth" },
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

  return (
    <main className="overflow-hidden bg-cream">
      {/* ==================== HERO ==================== */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #1c1917 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Floating accent blurs */}
        <div className="absolute top-20 -left-16 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-16 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-stone-900/5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase mb-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Digital agency · Est. 2015
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-tight font-bold mb-8 max-w-5xl text-stone-900"
          >
            Brands that <em className="font-serif italic font-medium text-primary">grow</em>,
            <br />
            sites that <em className="font-serif italic font-medium text-primary">convert</em>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl text-stone-600 max-w-2xl mb-12 leading-relaxed"
          >
            We're a full-service digital studio building high-performance websites,
            data-driven SEO, and marketing strategies for ambitious businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-stone-900 text-white px-7 py-4 rounded-full text-base font-medium hover:bg-primary transition-colors group">
              <Phone className="w-5 h-5" />
              Book a free strategy call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <Link to="/portfolio" className="inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 px-7 py-4 rounded-full text-base font-medium hover:bg-stone-900 hover:text-white transition-colors">
              View our work
            </Link>
          </motion.div>
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

      {/* ==================== STATS ==================== */}
      <section className="px-6 md:px-8 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-stone-600">{stat.label}</div>
            </motion.div>
          ))}
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

      {/* ==================== STILL NOT SURE ==================== */}
      <section className="py-24 px-6 md:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-stone-900 leading-[1.1]">
            Still not sure which plan is <em className="font-serif italic font-medium text-primary">right</em>?
          </h2>
          <p className="text-stone-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Schedule a free 30-minute consultation. We'll review your goals and recommend the perfect path forward — no pressure, no commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-stone-900 text-white px-7 py-4 rounded-full text-base font-medium hover:bg-primary transition-colors">
              <Phone className="w-5 h-5" />
              Call us now
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-4 rounded-full text-base font-medium hover:bg-[#1ebe5d] transition-colors">
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
