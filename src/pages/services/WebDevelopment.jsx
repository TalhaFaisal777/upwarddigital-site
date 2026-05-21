import { motion } from "framer-motion"
import { Code2, CheckCircle2, ArrowUpRight, Zap, ShoppingCart, Layers, Smartphone, Globe, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"

const features = [
  { icon: Code2, title: "Custom Website Design", description: "Pixel-perfect, brand-aligned websites built from scratch — no templates, no shortcuts." },
  { icon: ShoppingCart, title: "E-Commerce Development", description: "High-converting online stores on Shopify, WooCommerce, or fully custom solutions." },
  { icon: Layers, title: "Web Application Development", description: "Scalable web apps using React, Next.js, and Node.js for complex business needs." },
  { icon: Settings, title: "CMS Integration", description: "WordPress, Shopify, and headless CMS setups your team can manage without developers." },
  { icon: Zap, title: "Performance Optimization", description: "95+ PageSpeed scores, sub-2s load times, and Core Web Vitals that Google rewards." },
  { icon: Smartphone, title: "Responsive & Mobile-First", description: "Every site we build looks and works flawlessly on every screen size." },
]

const stats = [
  { value: "95+", label: "Avg. PageSpeed Score" },
  { value: "<2s", label: "Time to Interactive" },
  { value: "500+", label: "Sites Launched" },
  { value: "100%", label: "Mobile-First" },
]

const process = [
  { step: "01", title: "Discovery & Strategy", description: "We learn your business, goals, and competitors to build a site that does real work." },
  { step: "02", title: "Design & Prototype", description: "Custom wireframes and high-fidelity mockups before a single line of code is written." },
  { step: "03", title: "Development", description: "Clean, semantic, SEO-ready code built for speed, security, and scalability." },
  { step: "04", title: "QA & Launch", description: "Rigorous cross-browser and device testing, then a smooth, zero-downtime launch." },
  { step: "05", title: "Ongoing Support", description: "Maintenance, updates, and performance monitoring after go-live — we don't disappear." },
]

const techStack = ["React", "Next.js", "Vue.js", "WordPress", "Shopify", "Node.js", "Tailwind CSS", "PostgreSQL"]

export default function WebDevelopment() {
  useSeoMeta({
    title: "Web Development Services USA | Custom Websites | Upward Digital",
    description: "Professional web development services in the USA. Custom websites, e-commerce, and web apps built for speed, SEO, and conversions. Get a free quote today.",
    keywords: "web development services USA, custom website development, e-commerce development, React development agency, website design USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="Web Development"
        title={<>Custom Websites Built to <em className="font-serif italic font-medium text-primary">Perform</em>.</>}
        description="High-performance websites and web applications that load fast, rank well, and turn visitors into customers. No templates — built for your business."
      />

      {/* Stats */}
      <section className="bg-stone-900 py-12">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-stone-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="What we build"
            title={<>Everything your <em className="font-serif italic font-medium text-primary">website needs</em>.</>}
            description="From landing pages to full-scale web platforms, we cover the complete spectrum of web development."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="bg-cream border border-stone-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Our process"
            title="How we build your site."
          />
          <div className="space-y-6">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 bg-white border border-stone-200 rounded-2xl p-6"
              >
                <div className="text-3xl font-bold text-primary/20 shrink-0 w-12 text-right">{p.step}</div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 mb-1">{p.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-6">Technologies we use</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span key={t} className="px-4 py-2 bg-cream border border-stone-200 rounded-full text-sm font-medium text-stone-700">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-stone-900">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Ready to build something great?</h2>
            <p className="text-stone-400 text-lg mb-8">Get a free consultation and custom quote — no commitment required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "web_dev_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
