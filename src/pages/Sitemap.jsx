import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Home, Info, Briefcase, BookOpen, Phone, Tag,
  Globe, Search, Share2, Server, Megaphone, ArrowUpRight, Map, FileText,
} from "lucide-react"
import { useSeoMeta } from "@/hooks/useSeoMeta"

const mainPages = [
  { label: "Home", path: "/", icon: Home, description: "Welcome to UpwardDigital" },
  { label: "About", path: "/about", icon: Info, description: "Our story, team & mission" },
  { label: "Portfolio", path: "/portfolio", icon: Briefcase, description: "Our work and case studies" },
  { label: "Blog", path: "/blog", icon: BookOpen, description: "Insights, tips & industry news" },
  { label: "Pricing", path: "/pricing", icon: Tag, description: "Transparent plans for every budget" },
  { label: "Contact", path: "/contact", icon: Phone, description: "Get in touch with our team" },
]

const servicePages = [
  { label: "Website Development", path: "/website-development", icon: Globe, description: "Custom, fast, SEO-ready websites", color: "from-blue-500 to-blue-600" },
  { label: "SEO Services", path: "/seo-services", icon: Search, description: "Rank higher & drive organic traffic", color: "from-emerald-500 to-emerald-600" },
  { label: "Social Media Marketing", path: "/social-media-marketing", icon: Share2, description: "Grow your brand on social platforms", color: "from-violet-500 to-violet-600" },
  { label: "Web Hosting Services", path: "/web-hosting-services", icon: Server, description: "Reliable hosting with 99.9% uptime", color: "from-amber-500 to-amber-600" },
  { label: "Meta & Google Ads", path: "/meta-google-ads", icon: Megaphone, description: "Paid advertising that drives real ROI", color: "from-rose-500 to-rose-600" },
]

const blogPosts = [
  { label: "The Complete Local SEO Guide for Service Businesses in 2026", path: "/local-seo-guide-service-businesses-2026", description: "How to dominate Google's local pack and Map results." },
  { label: "How Much Does Website Development Cost in the USA in 2026?", path: "/website-development-cost-usa-2026", description: "Real numbers from over 120 projects we've delivered." },
  { label: "Google Ads vs SEO: Which Should Your Business Invest In First?", path: "/google-ads-vs-seo-which-is-better", description: "The honest answer most agencies won't give you." },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function Sitemap() {
  useSeoMeta({
    title: "Sitemap | UpwardDigital",
    description: "Full sitemap for UpwardDigital — find all pages including services, blog, pricing, and contact.",
  })

  return (
    <main className="bg-[#f7f5f2] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-stone-900 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.18),transparent)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <Map className="w-3.5 h-3.5" /> Site Navigation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
            Site<span className="text-primary">map</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-lg mx-auto leading-relaxed">
            Every page on UpwardDigital, neatly organized so you can find exactly what you need.
          </p>
        </motion.div>
      </section>

      {/* ── Main Pages ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-1 h-8 rounded-full bg-stone-900" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Main Pages</h2>
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">{mainPages.length} pages</span>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {mainPages.map((page) => {
              const Icon = page.icon
              return (
                <motion.div key={page.path} variants={fadeUp}>
                  <Link
                    to={page.path}
                    className="group relative flex flex-col justify-between h-full p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-300 hover:-translate-y-1 transition-all duration-250 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-stone-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-200">
                        <Icon className="w-5 h-5 text-stone-600 group-hover:text-primary transition-colors duration-200" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-primary transition-colors duration-200 mt-1" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 group-hover:text-primary transition-colors duration-200 mb-1">{page.label}</p>
                      <p className="text-sm text-stone-500 leading-snug mb-3">{page.description}</p>
                      <span className="text-xs text-stone-400 font-mono bg-stone-50 px-2 py-0.5 rounded-md">{page.path}</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Services ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-20 mb-10"
          >
            <div className="w-1 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Services</h2>
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">{servicePages.length} pages</span>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {servicePages.map((page) => {
              const Icon = page.icon
              return (
                <motion.div key={page.path} variants={fadeUp}>
                  <Link
                    to={page.path}
                    className="group relative flex flex-col justify-between h-full p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-250 overflow-hidden"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${page.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${page.color} flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-stone-700 transition-colors duration-200 mt-1" />
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 mb-1">{page.label}</p>
                      <p className="text-sm text-stone-500 leading-snug mb-3">{page.description}</p>
                      <span className="text-xs text-stone-400 font-mono bg-stone-50 px-2 py-0.5 rounded-md">{page.path}</span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ── Blog Posts ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-20 mb-10"
          >
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Blog Posts</h2>
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">{blogPosts.length} posts</span>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.path} variants={fadeUp}>
                <Link
                  to={post.path}
                  className="group relative flex flex-col justify-between h-full p-6 bg-white border border-stone-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-300 hover:-translate-y-1 transition-all duration-250 overflow-hidden"
                >
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors duration-200">
                      <FileText className="w-5 h-5 text-emerald-600" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-500 transition-colors duration-200 mt-1" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 group-hover:text-emerald-600 transition-colors duration-200 mb-1 leading-snug">{post.label}</p>
                    <p className="text-sm text-stone-500 leading-snug mb-3">{post.description}</p>
                    <span className="text-xs text-stone-400 font-mono bg-stone-50 px-2 py-0.5 rounded-md break-all">{post.path}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 rounded-3xl bg-stone-900 px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
            <div className="relative">
              <p className="text-white font-bold text-xl mb-1">Can't find what you're looking for?</p>
              <p className="text-stone-400 text-sm">Our team is happy to help you navigate.</p>
            </div>
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors shrink-0"
            >
              Contact Us <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </section>
    </main>
  )
}
