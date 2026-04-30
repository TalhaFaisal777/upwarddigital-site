import { motion } from "framer-motion"
import {
  Code2,
  Search,
  BarChart3,
  Palette,
  CheckCircle2,
  Phone,
  ArrowUpRight,
  FileText,
  Mail,
  Share2,
  Megaphone,
  PenTool,
  Users,
} from "lucide-react"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { Badge } from "@/components/ui/badge"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/18302241590"

const serviceBlocks = [
  {
    icon: Code2,
    badge: "Web Design & Development",
    title: "Websites built for performance, not just pretty pictures.",
    description:
      "We build custom websites, e-commerce platforms, and web applications that load fast, rank well, and convert visitors into customers.",
    features: [
      "Custom Website Design",
      "E-Commerce Development",
      "Web Application Development",
      "CMS Integration (WordPress, Shopify)",
      "Performance Optimization",
      "Responsive & Mobile-First Design",
    ],
    techs: ["React", "Next.js", "Vue.js", "WordPress", "Shopify", "Node.js"],
  },
  {
    icon: Search,
    badge: "SEO Services",
    title: "Rank where your customers are actually searching.",
    description:
      "Technical SEO, on-page optimization, local SEO, and content strategy that brings sustained organic growth — not gimmicks.",
    features: [
      "Technical SEO Audits",
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Local SEO",
      "Link Building & Authority",
      "Content SEO Strategy",
    ],
    techs: ["Ahrefs", "SEMrush", "Google Search Console", "GA4", "Screaming Frog"],
  },
  {
    icon: BarChart3,
    badge: "Digital Marketing",
    title: "Full-funnel marketing that pays for itself.",
    description:
      "Paid media on Google, Meta, and LinkedIn — paired with email automation and content — to build a system that brings in customers every month.",
    features: [
      "Google Ads (Search, Display, YouTube)",
      "Meta Ads (Facebook & Instagram)",
      "LinkedIn Ads for B2B campaigns",
      "Email Marketing Automation",
      "Conversion Rate Optimization",
      "Retargeting & Funnel Strategy",
    ],
    techs: ["Google Ads", "Meta Business", "Klaviyo", "Mailchimp", "HubSpot"],
  },
  {
    icon: Palette,
    badge: "Brand Strategy & Design",
    title: "A brand identity that finally reflects your value.",
    description:
      "From logo and visual system to brand guidelines and messaging — we create cohesive identities that stand out in your market.",
    features: [
      "Brand Strategy & Positioning",
      "Logo & Visual Identity",
      "Brand Guidelines",
      "Marketing Collateral",
      "Social Media Design",
      "Print & Packaging",
    ],
    techs: ["Figma", "Adobe Creative Suite", "Webflow"],
  },
]

const microServices = [
  { icon: PenTool, title: "Content Creation", description: "Blog posts, case studies, and landing-page copy that converts." },
  { icon: Mail, title: "Email Marketing", description: "Sequences, broadcasts, and automation that nurture and sell." },
  { icon: Share2, title: "Social Media", description: "Strategy, content, and community for the platforms that matter." },
  { icon: Megaphone, title: "PR & Outreach", description: "Authority building through guest posts, podcasts, and features." },
  { icon: FileText, title: "Copywriting", description: "Words that sound like you — and convince your customers." },
  { icon: Users, title: "Consulting", description: "Strategic advisory for in-house teams who need senior input." },
]

export default function Services() {
  return (
    <main className="bg-cream">
      <PageHero
        title={<>Services that <em className="font-serif italic font-medium text-primary">drive growth</em>.</>}
        subtitle="What we offer"
        description="Comprehensive digital solutions tailored to your business goals — under one roof, with one accountable team."
      />

      {serviceBlocks.map((service, idx) => {
        const Icon = service.icon
        const isWhite = idx % 2 === 1
        return (
          <section
            key={service.badge}
            className={`py-24 ${isWhite ? "bg-white border-y border-stone-900/10" : ""}`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6">{service.badge}</Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-stone-900">
                  {service.title}
                </h2>
                <p className="text-stone-600 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-stone-700">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.techs.map((t) => (
                    <Badge key={t} variant="secondary">{t}</Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:sticky lg:top-32"
              >
                <div className={`rounded-3xl p-12 md:p-16 flex flex-col justify-end aspect-[4/5] relative overflow-hidden ${
                  isWhite ? "bg-cream" : "bg-stone-900"
                }`}>
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${isWhite ? 'rgba(28,25,23,0.15)' : 'rgba(59,130,246,0.4)'} 1px, transparent 1px)`,
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className={`absolute top-12 left-12 w-32 h-32 rounded-full border ${isWhite ? "border-stone-900/15" : "border-blue-400/30"}`} />
                  <div className={`absolute bottom-32 right-12 w-48 h-48 rounded-full border ${isWhite ? "border-stone-900/10" : "border-blue-400/20"}`} />
                  <div className="relative">
                    <Icon className={`w-16 h-16 mb-6 ${isWhite ? "text-stone-900" : "text-blue-400"}`} />
                    <div className={`text-5xl md:text-6xl font-bold tracking-tight mb-2 ${isWhite ? "text-stone-900" : "text-white"}`}>
                      0{idx + 1}
                    </div>
                    <div className={`text-lg ${isWhite ? "text-stone-600" : "text-blue-300"}`}>
                      {service.badge}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Micro-services grid */}
      <section className="py-24 border-t border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="And more"
            title={<>The <em className="font-serif italic font-medium text-primary">smaller things</em> that add up to big results.</>}
            description="From content to consulting, we cover every digital function so you don't have to manage 5 different vendors."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {microServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-stone-200 rounded-3xl p-7 hover:border-stone-900 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 tracking-tight">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
            Ready to transform your <em className="font-serif italic font-medium text-blue-400">digital presence</em>?
          </h2>
          <p className="text-stone-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your project and create a strategy tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-4 rounded-full text-base font-medium hover:bg-blue-400 hover:text-white transition-colors group">
              <Phone className="w-5 h-5" />
              Call us now
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
