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
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/common/SectionHeading"
import AnimatedCounter from "@/components/common/AnimatedCounter"
import ServiceCard from "@/components/common/ServiceCard"
import FloatingShapes from "@/components/common/FloatingShapes"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
  viewport: { once: true, margin: "-50px" },
}

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
}

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Custom websites, web applications, and e-commerce solutions built with cutting-edge technology.",
    link: "/services",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Data-driven SEO strategies that boost your visibility and drive organic traffic growth.",
    link: "/services",
  },
  {
    icon: BarChart3,
    title: "Digital Marketing",
    description:
      "Comprehensive digital campaigns across social, PPC, email, and content marketing.",
    link: "/services",
  },
  {
    icon: Palette,
    title: "Brand Strategy",
    description:
      "Compelling brand identities and strategies that resonate with your target audience.",
    link: "/services",
  },
]

const stats = [
  { end: 500, suffix: "+", label: "Projects Delivered" },
  { end: 150, suffix: "+", label: "Happy Clients" },
  { end: 98, suffix: "%", label: "Client Retention" },
  { end: 10, suffix: "+", label: "Years Experience" },
]

const whyUsPoints = [
  {
    title: "Industry-Leading Expertise",
    description:
      "Our team of seasoned professionals brings deep knowledge across every digital discipline, ensuring best-in-class solutions.",
  },
  {
    title: "Data-Driven Approach",
    description:
      "Every decision we make is backed by analytics and insights, maximizing ROI and minimizing guesswork.",
  },
  {
    title: "Transparent Communication",
    description:
      "We keep you informed at every step with regular updates, detailed reports, and open dialogue throughout the process.",
  },
  {
    title: "Proven Track Record",
    description:
      "With hundreds of successful projects and long-term client partnerships, our results speak for themselves.",
  },
]

const testimonials = [
  {
    quote:
      "UpwardDigital completely transformed our online presence. Our new website not only looks stunning but has increased our conversion rate by 340%. Their development team is world-class.",
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechVentures",
    initials: "SJ",
    color: "bg-blue-500",
  },
  {
    quote:
      "The SEO results have been nothing short of remarkable. We went from page 5 to the top 3 positions for our target keywords within six months. Organic traffic is up 280% year-over-year.",
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthLabs",
    initials: "MC",
    color: "bg-emerald-500",
  },
  {
    quote:
      "Their brand strategy work gave us a completely new identity that truly resonates with our audience. Customer engagement has skyrocketed and our brand recognition has never been stronger.",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "StyleHouse",
    initials: "ER",
    color: "bg-purple-500",
  },
  {
    quote:
      "Working with UpwardDigital has been a game-changer for our business. Their comprehensive approach to digital marketing and development has streamlined our entire digital ecosystem.",
    name: "David Park",
    role: "CTO",
    company: "DataFlow",
    initials: "DP",
    color: "bg-cyan-500",
  },
]

const trustedBrands = [
  "Velocity",
  "NovaTech",
  "Apex Studios",
  "Horizon AI",
  "Quantum Labs",
  "Pinnacle",
  "Stratos",
  "Luminary",
]

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const nextTestimonial = useCallback(() => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [nextTestimonial])

  return (
    <main className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center mesh-gradient">
        <FloatingShapes />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center pt-36 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6">Digital Marketing Agency</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            We Build Digital Experiences{" "}
            <span className="gradient-text">That Drive Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We partner with ambitious brands to craft high-performance websites,
            data-driven marketing strategies, and compelling brand identities
            that deliver measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">Our Work</Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS COUNTER SECTION ===== */}
      <section className="py-20 md:py-28 bg-dark-lighter relative border-t border-dark-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden border-dark-border bg-dark-card">
                  {/* Blue accent left border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-cyan-accent" />
                  <CardContent className="p-6 pt-6 text-center">
                    <AnimatedCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2.5}
                    />
                    <p className="text-gray-400 mt-2 text-sm font-medium">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW SECTION ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="What We Do"
            title="Services That Drive Results"
            description="From concept to execution, we offer end-to-end digital solutions that help your business stand out and scale."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section className="py-24 md:py-32 bg-dark-lighter relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="Why Choose Us"
            title="What Sets Us Apart"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column - text + bullet points */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                We don't just build digital products -- we build lasting
                partnerships. Our commitment to excellence, innovation, and
                transparency has made us a trusted partner for businesses of
                every size.
              </p>

              <div className="space-y-6">
                {whyUsPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">
                        {point.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column - decorative mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/50 via-dark-border to-cyan-accent/50">
                <div className="rounded-2xl bg-dark-card p-8 space-y-6">
                  {/* Simulated dashboard header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="flex-1 h-6 rounded bg-dark-lighter ml-2" />
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Traffic", value: "+127%", color: "from-primary to-blue-400" },
                      { label: "Conversions", value: "+84%", color: "from-emerald-500 to-green-400" },
                      { label: "Revenue", value: "+215%", color: "from-purple-500 to-violet-400" },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: Math.random() * 2,
                        }}
                        className="rounded-xl bg-dark-lighter p-4 border border-dark-border"
                      >
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p
                          className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                        >
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Simulated chart area */}
                  <div className="rounded-xl bg-dark-lighter border border-dark-border p-4 h-40 flex items-end gap-2">
                    {[35, 55, 40, 70, 50, 80, 65, 90, 75, 95, 85, 100].map(
                      (height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${height}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5 + i * 0.05,
                            ease: "easeOut",
                          }}
                          className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-cyan-accent/40"
                        />
                      )
                    )}
                  </div>

                  {/* Bottom row */}
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl bg-dark-lighter border border-dark-border p-4">
                      <div className="w-16 h-2 rounded bg-primary/30 mb-3" />
                      <div className="w-full h-2 rounded bg-dark-border mb-2" />
                      <div className="w-3/4 h-2 rounded bg-dark-border" />
                    </div>
                    <div className="flex-1 rounded-xl bg-dark-lighter border border-dark-border p-4">
                      <div className="w-16 h-2 rounded bg-cyan-accent/30 mb-3" />
                      <div className="w-full h-2 rounded bg-dark-border mb-2" />
                      <div className="w-2/3 h-2 rounded bg-dark-border" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow effect behind card */}
              <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL SECTION ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our clients have to say about working with us."
          />

          <div className="relative max-w-5xl mx-auto">
            {/* Testimonial cards */}
            <div className="relative overflow-hidden">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-dark-border bg-dark-card p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    <Quote className="w-10 h-10 text-primary mb-6 opacity-50" />

                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                      "{testimonials[activeTestimonial].quote}"
                    </p>

                    {/* Star rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Avatar and info */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${testimonials[activeTestimonial].color} flex items-center justify-center text-white font-semibold text-sm`}
                      >
                        {testimonials[activeTestimonial].initials}
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold">
                          {testimonials[activeTestimonial].name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {testimonials[activeTestimonial].role},{" "}
                          {testimonials[activeTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Navigation arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-dark-border bg-dark-card hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === activeTestimonial
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-dark-border bg-dark-card hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER SECTION ===== */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              >
                Ready to Grow Your Business?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto"
              >
                Let's discuss how we can help you achieve your digital goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg shadow-black/20 hover:shadow-black/30 group"
                >
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUSTED BY / LOGOS SECTION ===== */}
      <section className="py-16 md:py-20 border-t border-dark-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <motion.p
            {...fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 text-sm font-medium tracking-wider uppercase mb-12"
          >
            Trusted by Leading Brands
          </motion.p>

          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-16 whitespace-nowrap w-max">
              {/* First set */}
              {trustedBrands.map((brand) => (
                <span
                  key={`a-${brand}`}
                  className="text-2xl md:text-3xl font-bold text-gray-700 hover:text-primary transition-colors duration-300 cursor-default select-none"
                >
                  {brand}
                </span>
              ))}
              {/* Duplicate set for seamless loop */}
              {trustedBrands.map((brand) => (
                <span
                  key={`b-${brand}`}
                  className="text-2xl md:text-3xl font-bold text-gray-700 hover:text-primary transition-colors duration-300 cursor-default select-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
