import { motion } from "framer-motion"
import { Megaphone, Target, TrendingUp, BarChart3, RefreshCw, Users, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"

const googleAdsServices = [
  { title: "Search Campaigns", description: "Capture high-intent buyers at the exact moment they're searching for what you offer." },
  { title: "Shopping Ads", description: "Product listings that appear directly in Google search results — perfect for e-commerce." },
  { title: "Display & Remarketing", description: "Re-engage visitors who didn't convert with strategic retargeting across the web." },
  { title: "Performance Max", description: "AI-driven campaigns across all Google channels — Search, Display, YouTube, Gmail, and Maps." },
  { title: "Local Service Ads", description: "Google-guaranteed ads for local service businesses that put you at the very top of results." },
  { title: "YouTube Ads", description: "Video advertising on the world's second-largest search engine to build brand awareness and drive action." },
]

const metaAdsServices = [
  { title: "Facebook & Instagram Ads", description: "Highly targeted campaigns on the world's largest social platforms, built for conversions and brand growth." },
  { title: "Lead Generation Ads", description: "Native lead forms that capture qualified leads without users ever leaving Facebook or Instagram." },
  { title: "Retargeting Campaigns", description: "Win back website visitors and abandoned carts with precision retargeting on Meta platforms." },
  { title: "Lookalike Audiences", description: "Find new customers who mirror your best existing customers using Meta's powerful audience tools." },
  { title: "Video & Reels Ads", description: "Short-form video ads optimised for mobile feeds and Reels — the fastest-growing ad format on Meta." },
  { title: "Catalogue & Dynamic Ads", description: "Automatically show the right products to the right people based on their browsing behaviour." },
]

const stats = [
  { value: "3.5x", label: "Avg. ROAS achieved" },
  { value: "-40%", label: "Avg. cost-per-lead reduction" },
  { value: "$2M+", label: "Ad spend managed monthly" },
  { value: "150+", label: "Active ad accounts" },
]

const whyUs = [
  "Google Partner & Meta Business Partner certified",
  "No long-term contracts — month-to-month flexibility",
  "Full transparency — you own your ad accounts",
  "Weekly performance updates, not monthly black boxes",
  "Dedicated paid ads specialist per account",
  "Landing page optimisation included to maximise conversions",
]

export default function AdsServices() {
  useSeoMeta({
    title: "Meta Ads & Google Ads Management USA | Upward Digital",
    description: "Expert Google Ads and Meta Ads management in the USA. PPC campaigns, retargeting, and paid social that deliver real ROI. Google Partner & Meta certified agency.",
    keywords: "Google Ads management USA, Meta Ads agency, Facebook Ads, PPC management, paid advertising USA, Google PPC agency",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="Meta Ads & Google Ads"
        title={<>Ads That <em className="font-serif italic font-medium text-primary">Actually Convert</em>.</>}
        description="Certified Google and Meta advertising specialists who manage your budget like it's their own. Data-driven campaigns built to deliver measurable ROI."
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

      {/* Google Ads */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Google Ads"
            title={<>Dominate Google <em className="font-serif italic font-medium text-primary">search results</em>.</>}
            description="From Search to Shopping to YouTube — we manage every Google Ads channel to capture demand and grow revenue."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleAdsServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="bg-cream border border-stone-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta Ads */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Meta Ads"
            title={<>Facebook & Instagram ads that <em className="font-serif italic font-medium text-primary">drive results</em>.</>}
            description="Meta's 3 billion+ users are waiting. We build campaigns that target the right people and turn them into customers."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metaAdsServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-stone-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Why Upward Digital"
            title="Your budget, maximised."
            description="We treat every dollar of ad spend like it's our own. No wasted budget, no vanity metrics — just results."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 bg-cream border border-stone-200 rounded-xl p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-stone-700 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-stone-900">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Ready to make your ads work harder?</h2>
            <p className="text-stone-400 text-lg mb-8">Get a free paid ads audit — we'll show you where your budget is leaking and how to fix it.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "ads_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Free Ads Audit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
