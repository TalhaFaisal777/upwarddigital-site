import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Code2,
  Search,
  BarChart3,
  Palette,
  CheckCircle2,
  Compass,
  Target,
  Rocket,
  TrendingUp,
  ArrowRight,
  Globe,
  FileText,
  Users,
  Mail,
  Share2,
  Megaphone,
  PenTool,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import SectionHeading from "@/components/common/SectionHeading"
import FloatingShapes from "@/components/common/FloatingShapes"

const typedWords = ["Growth", "Success", "Results", "Impact"]

function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
          if (displayText.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}

export default function Services() {
  const typedText = useTypingEffect(typedWords)

  return (
    <main className="bg-dark min-h-screen">
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mesh-gradient">
        <FloatingShapes />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center pt-36 pb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Services Drive{" "}
            <span className="gradient-text typing-cursor">{typedText}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive digital solutions tailored to your business goals
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      </section>

      {/* ===== 2. WEB DESIGN & DEVELOPMENT SECTION ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Web Design & Development
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We build custom websites, powerful e-commerce platforms, and
                sophisticated web applications that deliver exceptional user
                experiences. From initial concept to final deployment, every
                project is crafted with precision, performance, and scalability
                in mind.
              </p>

              {/* Feature List */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Custom Website Design",
                  "E-Commerce Development",
                  "Web Application Development",
                  "CMS Integration (WordPress, Shopify)",
                  "Performance Optimization",
                  "Responsive & Mobile-First Design",
                ].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technology Badges */}
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Vue.js", "WordPress", "Shopify", "Node.js", "Python", "AWS"].map(
                  (tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  )
                )}
              </div>
            </motion.div>

            {/* Visual Right - Browser Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 ml-3">
                    <div className="h-6 bg-dark-lighter rounded-md max-w-xs flex items-center px-3">
                      <span className="text-gray-500 text-xs">https://yoursite.com</span>
                    </div>
                  </div>
                </div>
                {/* Code/Website Content */}
                <div className="p-6 space-y-4">
                  {/* Nav placeholder */}
                  <div className="flex items-center justify-between">
                    <div className="w-24 h-4 rounded bg-gradient-to-r from-primary/40 to-primary/20" />
                    <div className="flex gap-3">
                      <div className="w-12 h-3 rounded bg-gray-700" />
                      <div className="w-12 h-3 rounded bg-gray-700" />
                      <div className="w-12 h-3 rounded bg-gray-700" />
                    </div>
                  </div>
                  {/* Hero placeholder */}
                  <div className="mt-6 space-y-3">
                    <div className="w-3/4 h-6 rounded bg-gradient-to-r from-primary/30 to-cyan-accent/20" />
                    <div className="w-1/2 h-4 rounded bg-gray-800" />
                    <div className="w-2/3 h-4 rounded bg-gray-800" />
                  </div>
                  {/* Cards placeholder */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className="rounded-lg border border-dark-border p-3 space-y-2"
                      >
                        <div className="w-8 h-8 rounded bg-primary/20" />
                        <div className="w-full h-3 rounded bg-gray-800" />
                        <div className="w-2/3 h-2 rounded bg-gray-800/60" />
                      </div>
                    ))}
                  </div>
                  {/* Code lines */}
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="flex gap-2">
                      <span className="text-gray-600">1</span>
                      <span className="text-primary/60">{"<div"}</span>
                      <span className="text-cyan-accent/50">className</span>
                      <span className="text-gray-500">{"="}</span>
                      <span className="text-green-400/50">{'"hero"'}</span>
                      <span className="text-primary/60">{">"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">2</span>
                      <span className="text-primary/60 pl-4">{"<h1>"}</span>
                      <span className="text-gray-400">Your Brand</span>
                      <span className="text-primary/60">{"</h1>"}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-600">3</span>
                      <span className="text-primary/60">{"</div>"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 3. SEO SERVICES SECTION ===== */}
      <section className="py-24 bg-dark-lighter/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Left - SEO Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-6">
                {/* Analytics chart mockup */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">Organic Traffic</span>
                  <span className="text-xs text-green-400 font-semibold">+300%</span>
                </div>
                <div className="flex items-end gap-1 h-32">
                  {[20, 25, 22, 30, 35, 42, 38, 55, 60, 72, 68, 85].map(
                    (height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary/30"
                      />
                    )
                  )}
                </div>
                {/* Keyword rankings */}
                <div className="space-y-3 pt-4 border-t border-dark-border">
                  <span className="text-sm font-medium text-gray-300">Keyword Rankings</span>
                  {[
                    { keyword: "digital marketing agency", pos: 3, change: "+12" },
                    { keyword: "web design services", pos: 5, change: "+8" },
                    { keyword: "seo company near me", pos: 1, change: "+15" },
                  ].map((item) => (
                    <div key={item.keyword} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{item.keyword}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">#{item.pos}</span>
                        <span className="text-green-400 text-xs">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">SEO Services</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Our comprehensive SEO strategies are designed to boost your
                search engine visibility, drive qualified organic traffic, and
                deliver sustainable long-term growth for your business.
              </p>

              {/* Sub-services */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  {
                    title: "On-Page SEO",
                    desc: "Content optimization, meta tags, structured data, and keyword targeting.",
                  },
                  {
                    title: "Off-Page SEO",
                    desc: "Link building, brand mentions, and authority development strategies.",
                  },
                  {
                    title: "Technical SEO",
                    desc: "Site speed, crawlability, indexation, and Core Web Vitals optimization.",
                  },
                  {
                    title: "Local SEO",
                    desc: "Google Business Profile, local citations, and geo-targeted optimization.",
                  },
                ].map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="p-4 rounded-xl bg-dark-card border border-dark-border"
                  >
                    <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Process Stepper */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  {["Audit", "Strategy", "Execute", "Monitor"].map(
                    (step, i) => (
                      <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-sm font-bold text-primary mb-2">
                          {i + 1}
                        </div>
                        <span className="text-xs font-semibold text-white">{step}</span>
                      </div>
                    )
                  )}
                </div>
                {/* Connecting line */}
                <div className="absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-primary/30" />
                {/* Step descriptions */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[
                    "Comprehensive analysis of your current digital presence",
                    "Custom SEO strategy aligned with your goals",
                    "Implementation of on-page, off-page, and technical optimizations",
                    "Ongoing tracking, reporting, and strategy refinement",
                  ].map((desc, i) => (
                    <p key={i} className="text-gray-500 text-xs text-center leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* Stats Callout */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-accent/10 border border-primary/20 text-center"
              >
                <span className="text-3xl font-bold gradient-text">300%</span>
                <p className="text-gray-300 text-sm mt-1">
                  Average Organic Traffic Increase
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. DIGITAL MARKETING SECTION ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Content Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Digital Marketing
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Drive measurable results with our data-driven digital marketing
                strategies. We combine creative storytelling with analytical
                precision to maximize your ROI across every channel.
              </p>

              <Tabs defaultValue="social" className="w-full">
                <TabsList className="w-full flex-wrap">
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="ppc">PPC & Ads</TabsTrigger>
                  <TabsTrigger value="email">Email Marketing</TabsTrigger>
                  <TabsTrigger value="content">Content Marketing</TabsTrigger>
                </TabsList>

                <TabsContent value="social">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        Social Media Marketing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        Build a powerful social media presence that engages your
                        audience and drives conversions. We manage your platforms
                        end-to-end, from strategy to execution.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Platform management & growth strategy",
                          "Custom content creation & scheduling",
                          "Community engagement & reputation management",
                          "Performance analytics & monthly reporting",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ppc">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-primary" />
                        PPC & Paid Advertising
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        Maximize your advertising budget with precision-targeted
                        campaigns across all major platforms. We optimize every
                        dollar for maximum return.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Google Ads (Search, Display, Shopping)",
                          "Meta Ads (Facebook & Instagram)",
                          "LinkedIn Ads for B2B campaigns",
                          "Retargeting campaigns & conversion optimization",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="email">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        Email Marketing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        Nurture leads and drive sales with targeted email
                        campaigns that resonate with your audience. From
                        automation flows to one-off campaigns, we handle it all.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Campaign strategy & template design",
                          "Marketing automation & drip sequences",
                          "Audience segmentation & personalization",
                          "A/B testing & performance optimization",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="content">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Content Marketing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        Establish thought leadership and drive organic growth
                        with compelling content that educates, engages, and
                        converts your target audience.
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Blog posts & long-form articles",
                          "Whitepapers & case studies",
                          "Infographics & visual content",
                          "Video content & multimedia production",
                        ].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Platform Badges */}
              <div className="flex flex-wrap gap-2 mt-8">
                {["Google", "Meta", "LinkedIn", "TikTok", "YouTube"].map(
                  (platform) => (
                    <Badge key={platform}>{platform}</Badge>
                  )
                )}
              </div>
            </motion.div>

            {/* Visual Right - Marketing Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-6">
                {/* Metrics row */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Impressions", value: "2.4M", change: "+34%" },
                    { label: "Conversions", value: "12,847", change: "+28%" },
                    { label: "Click Rate", value: "4.7%", change: "+12%" },
                    { label: "ROAS", value: "5.2x", change: "+41%" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-xl bg-dark-lighter border border-dark-border"
                    >
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                        {metric.label}
                      </p>
                      <p className="text-xl font-bold text-white">{metric.value}</p>
                      <span className="text-green-400 text-xs font-medium">
                        {metric.change}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Campaign performance */}
                <div className="space-y-3">
                  <span className="text-sm font-medium text-gray-300">
                    Campaign Performance
                  </span>
                  {[
                    { name: "Brand Awareness", progress: 87, color: "bg-primary" },
                    { name: "Lead Generation", progress: 74, color: "bg-cyan-accent" },
                    { name: "Retargeting", progress: 92, color: "bg-primary" },
                  ].map((campaign) => (
                    <div key={campaign.name} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">{campaign.name}</span>
                        <span className="text-white font-medium">{campaign.progress}%</span>
                      </div>
                      <div className="h-2 bg-dark-lighter rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${campaign.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={`h-full rounded-full ${campaign.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Platform breakdown */}
                <div className="pt-4 border-t border-dark-border">
                  <span className="text-sm font-medium text-gray-300 mb-3 block">
                    Platform Breakdown
                  </span>
                  <div className="flex items-center gap-3">
                    {[
                      { name: "Google", pct: "42%" },
                      { name: "Meta", pct: "31%" },
                      { name: "LinkedIn", pct: "18%" },
                      { name: "Other", pct: "9%" },
                    ].map((p) => (
                      <div key={p.name} className="text-center flex-1">
                        <div className="text-sm font-bold text-white">{p.pct}</div>
                        <div className="text-xs text-gray-500">{p.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 5. BRAND STRATEGY & DESIGN SECTION ===== */}
      <section className="py-24 bg-dark-lighter/30">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Left - Before/After */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Before Card */}
                <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Before
                  </span>
                  <div className="space-y-4">
                    {/* Old logo placeholder */}
                    <div className="w-20 h-20 rounded-xl bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-2xl font-bold">Ab</span>
                    </div>
                    {/* Old color palette */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-600" />
                      <div className="w-8 h-8 rounded-full bg-gray-700" />
                      <div className="w-8 h-8 rounded-full bg-gray-500" />
                    </div>
                    {/* Old typography */}
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-700 rounded" />
                      <div className="w-3/4 h-2 bg-gray-800 rounded" />
                      <div className="w-1/2 h-2 bg-gray-800 rounded" />
                    </div>
                    {/* Old card element */}
                    <div className="w-full h-16 rounded-lg bg-gray-800/50 border border-gray-700" />
                  </div>
                </div>

                {/* After Card */}
                <div className="rounded-2xl bg-dark-card border border-primary/30 p-6 space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-accent/5" />
                  <div className="relative z-10 space-y-4">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      After
                    </span>
                    {/* New logo placeholder */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-cyan-accent flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">Ab</span>
                    </div>
                    {/* New color palette */}
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary" />
                      <div className="w-8 h-8 rounded-full bg-cyan-accent" />
                      <div className="w-8 h-8 rounded-full bg-primary-light" />
                    </div>
                    {/* New typography */}
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gradient-to-r from-primary/40 to-cyan-accent/30 rounded" />
                      <div className="w-3/4 h-2 bg-gray-600 rounded" />
                      <div className="w-1/2 h-2 bg-gray-600 rounded" />
                    </div>
                    {/* New card element */}
                    <div className="w-full h-16 rounded-lg bg-gradient-to-r from-primary/10 to-cyan-accent/10 border border-primary/20" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Brand Strategy & Design
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Your brand is more than a logo -- it's the entire experience
                your audience has with your business. We craft comprehensive
                brand strategies and stunning visual identities that resonate
                with your target market and set you apart from the competition.
              </p>

              {/* Services List */}
              <div className="space-y-4">
                {[
                  {
                    icon: PenTool,
                    title: "Logo Design",
                    desc: "Distinctive, memorable logos that capture your brand essence.",
                  },
                  {
                    icon: FileText,
                    title: "Brand Guidelines",
                    desc: "Comprehensive brand books ensuring consistency across all touchpoints.",
                  },
                  {
                    icon: Layers,
                    title: "Visual Identity",
                    desc: "Color palettes, typography, imagery, and design systems.",
                  },
                  {
                    icon: Globe,
                    title: "UI/UX Design",
                    desc: "User-centered digital experiences that delight and convert.",
                  },
                  {
                    icon: Users,
                    title: "Marketing Collateral",
                    desc: "Business cards, brochures, presentations, and sales materials.",
                  },
                ].map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-dark-card transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 6. PROCESS SECTION ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="Our Process"
            title="How We Work"
            description="A proven four-step methodology that turns your vision into measurable results."
          />

          <div className="relative">
            {/* Horizontal connecting line - desktop */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />
            {/* Vertical connecting line - mobile */}
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />

            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {[
                {
                  icon: Compass,
                  title: "Discovery",
                  description:
                    "We dive deep into your business, audience, and goals to build a solid foundation.",
                },
                {
                  icon: Target,
                  title: "Strategy",
                  description:
                    "We craft a tailored roadmap with clear milestones and measurable KPIs.",
                },
                {
                  icon: Rocket,
                  title: "Execution",
                  description:
                    "Our team brings the strategy to life with precision, creativity, and agility.",
                },
                {
                  icon: TrendingUp,
                  title: "Growth",
                  description:
                    "We optimize continuously, scaling what works and refining for maximum impact.",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0"
                >
                  {/* Step number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-dark-card border-2 border-primary flex items-center justify-center blue-glow-sm">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <div className="md:mt-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. CTA SECTION ===== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-primary/30 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-accent/5" />
              <div className="relative z-10 p-10 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
                  Let's discuss your project and create a strategy tailored to
                  your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/contact">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
