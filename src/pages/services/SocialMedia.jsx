import { motion } from "framer-motion"
import { Share2, Users, TrendingUp, Camera, MessageSquare, BarChart3, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"

const services = [
  { icon: Share2, title: "Social Media Strategy", description: "Platform-specific strategies for Instagram, Facebook, LinkedIn, TikTok, and X — built around your audience and business goals." },
  { icon: Camera, title: "Content Creation", description: "Scroll-stopping graphics, video reels, carousels, and copy that builds your brand and drives engagement." },
  { icon: MessageSquare, title: "Community Management", description: "Daily monitoring, comment replies, DM handling, and reputation management so no conversation gets missed." },
  { icon: TrendingUp, title: "Growth & Engagement", description: "Organic growth strategies that build real, targeted followers who actually care about your brand." },
  { icon: Users, title: "Influencer Outreach", description: "Identifying and partnering with relevant micro and macro influencers to expand your reach authentically." },
  { icon: BarChart3, title: "Analytics & Reporting", description: "Monthly performance reports with clear metrics — reach, engagement, follower growth, and conversions." },
]

const platforms = ["Instagram", "Facebook", "LinkedIn", "TikTok", "X (Twitter)", "YouTube", "Pinterest", "Threads"]

const stats = [
  { value: "5x", label: "Avg. engagement increase" },
  { value: "10k+", label: "Avg. monthly reach growth" },
  { value: "30+", label: "Industries served" },
  { value: "100%", label: "Monthly reporting" },
]

const included = [
  "Full social media audit and competitor analysis",
  "Custom content calendar (30 posts/month)",
  "Platform-specific content creation",
  "Daily community management",
  "Hashtag strategy and optimisation",
  "Monthly performance report and strategy review",
]

export default function SocialMedia() {
  useSeoMeta({
    title: "Social Media Marketing Services USA | Upward Digital",
    description: "Professional social media marketing services across Instagram, Facebook, LinkedIn, TikTok and more. Content creation, community management, and growth strategies.",
    keywords: "social media marketing USA, social media management, Instagram marketing, Facebook marketing, content creation agency USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="Social Media Marketing"
        title={<>Build a Brand People <em className="font-serif italic font-medium text-primary">Actually Follow</em>.</>}
        description="Strategic social media management that grows your audience, builds genuine engagement, and drives real business results across every platform."
      />

      {/* Stats */}
      <section className="bg-white border-y border-stone-100 py-12">
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
              <div className="text-stone-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="What we do"
            title={<>Social media that <em className="font-serif italic font-medium text-primary">works for you</em>.</>}
            description="End-to-end social media management — from strategy and content to community management and analytics."
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

      {/* Platforms */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-6">Platforms we manage</p>
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((p) => (
              <span key={p} className="px-4 py-2 bg-cream border border-stone-200 rounded-full text-sm font-medium text-stone-700">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Every package includes"
            title="No hidden extras."
            description="Every social media management package comes with the full stack — content, community, reporting, and strategy."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item, i) => (
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
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Let's grow your social presence.</h2>
            <p className="text-white/70 text-lg mb-8">Book a free strategy call and we'll show you exactly how we'd grow your brand on social.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "social_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/30 transition-colors"
              >
                Free Strategy Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
