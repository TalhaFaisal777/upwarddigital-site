import { motion } from "framer-motion"
import { Search, TrendingUp, MapPin, Link2, FileText, BarChart3, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"

const services = [
  { icon: Search, title: "Technical SEO Audits", description: "We crawl your site like Google does — fixing crawl errors, indexation issues, site structure, schema markup, and Core Web Vitals." },
  { icon: FileText, title: "Keyword Research & Strategy", description: "Data-driven keyword mapping that targets high-intent searches your competitors are missing." },
  { icon: TrendingUp, title: "On-Page Optimization", description: "Title tags, meta descriptions, header hierarchy, internal linking, and content optimization done right." },
  { icon: MapPin, title: "Local SEO & Google Maps", description: "Dominate local search results and the Google Maps 3-pack. Perfect for service-area businesses." },
  { icon: Link2, title: "Link Building & Authority", description: "White-hat link acquisition from relevant, high-authority sites that move rankings sustainably." },
  { icon: BarChart3, title: "Content SEO Strategy", description: "Topic clusters, pillar pages, and SEO content that ranks and converts — not just filler." },
]

const results = [
  { value: "3x", label: "Avg. organic traffic growth" },
  { value: "Top 3", label: "Rankings for target keywords" },
  { value: "6–12mo", label: "Typical timeframe for results" },
  { value: "200+", label: "SEO clients served" },
]

const whyUs = [
  "No black-hat tactics — everything we do is Google-compliant and sustainable",
  "Monthly reporting with clear, plain-English metrics",
  "Dedicated SEO strategist for your account",
  "Full technical + content + authority building in one package",
  "Experience across local, national, and e-commerce SEO",
  "Proven results in competitive niches across the USA",
]

export default function SeoServices() {
  useSeoMeta({
    title: "Google SEO Services USA | Top SEO Agency | Upward Digital",
    description: "Expert Google SEO services in the USA. Technical SEO, local SEO, link building, and content strategy that drives sustainable organic growth. Free SEO audit.",
    keywords: "SEO services USA, Google SEO agency, local SEO services, technical SEO, keyword research, link building USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="SEO Services"
        title={<>Rank Higher. <em className="not-italic font-bold text-stone-900">Get Found.</em> Grow.</>}
        description="Data-driven SEO strategies that bring sustained organic growth — not gimmicks. We've helped 200+ businesses across the USA climb Google and stay there."
      />

      {/* Stats */}
      <section className="bg-white border-y border-stone-100 py-12">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {results.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</div>
              <div className="text-stone-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="What's included"
            title={<>Full-spectrum <em className="not-italic font-bold text-stone-900">SEO coverage</em>.</>}
            description="Every engagement covers technical, on-page, off-page, and content SEO — not just one slice."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="bg-cream border border-stone-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Why Upward Digital"
            title="SEO done the right way."
            description="We don't sell you rankings. We build the organic presence your business deserves through honest, technical, and creative work."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 bg-white border border-stone-200 rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-stone-700 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Get a free SEO audit today.</h2>
            <p className="text-stone-600 text-lg mb-8">We'll analyse your site, show you exactly what's holding you back, and map out a strategy — no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "seo_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Free SEO Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
