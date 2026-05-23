import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Info, Briefcase, BookOpen, Phone, Tag, Globe, Search, Share2, Server, Megaphone, ArrowUpRight } from "lucide-react"
import { useSeoMeta } from "@/hooks/useSeoMeta"

const mainPages = [
  { label: "Home", path: "/", icon: Home, description: "Welcome to UpwardDigital" },
  { label: "About", path: "/about", icon: Info, description: "Our story, team, and mission" },
  { label: "Portfolio", path: "/portfolio", icon: Briefcase, description: "Our work and case studies" },
  { label: "Blog", path: "/blog", icon: BookOpen, description: "Insights, tips, and industry news" },
  { label: "Pricing", path: "/pricing", icon: Tag, description: "Transparent plans for every budget" },
  { label: "Contact", path: "/contact", icon: Phone, description: "Get in touch with our team" },
]

const servicePages = [
  { label: "Website Development", path: "/website-development", icon: Globe, description: "Custom, fast, SEO-ready websites" },
  { label: "SEO Services", path: "/seo-services", icon: Search, description: "Rank higher and drive organic traffic" },
  { label: "Social Media Marketing", path: "/social-media-marketing", icon: Share2, description: "Grow your brand on social platforms" },
  { label: "Web Hosting Services", path: "/web-hosting-services", icon: Server, description: "Reliable hosting with 99.9% uptime" },
  { label: "Meta & Google Ads", path: "/meta-google-ads", icon: Megaphone, description: "Paid advertising that drives real ROI" },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function SitemapGroup({ title, pages, accent }) {
  return (
    <div className="mb-16">
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 ${accent}`}>
        {title}
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {pages.map((page) => {
          const Icon = page.icon
          return (
            <motion.div key={page.path} variants={cardVariants}>
              <Link
                to={page.path}
                className="group flex items-start gap-4 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-stone-900 group-hover:text-primary transition-colors truncate">{page.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-primary flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-sm text-stone-500 mt-0.5 leading-snug">{page.description}</p>
                  <span className="text-xs text-stone-400 mt-1 block font-mono">{page.path}</span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function Sitemap() {
  useSeoMeta({
    title: "Sitemap | UpwardDigital",
    description: "Full sitemap for UpwardDigital — find all pages including services, blog, pricing, and contact.",
  })

  return (
    <main className="bg-cream min-h-screen">
      <section className="pt-24 pb-16 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Navigation Guide</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Site Map</h1>
            <p className="text-stone-400 text-lg max-w-xl mx-auto">
              Every page on UpwardDigital, organized so you can find exactly what you need.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <SitemapGroup
            title="Main Pages"
            pages={mainPages}
            accent="bg-stone-900 text-white"
          />
          <SitemapGroup
            title="Services"
            pages={servicePages}
            accent="bg-primary/10 text-primary"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-8 bg-white border border-stone-200 rounded-3xl text-center"
          >
            <p className="text-stone-500 text-sm mb-1">Can't find what you're looking for?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Contact us and we'll help <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
