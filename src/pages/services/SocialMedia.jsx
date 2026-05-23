import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const PHONE_HREF = "tel:+12013040657"

const contentSections = [
  {
    title: "Social Media Agency",
    titleBlue: true,
    body: "Upward Digital Co is a professional social media agency helping businesses grow their online presence, attract customers, and build strong brand awareness. As a trusted social media marketing agency, we provide complete social media strategy services designed to improve engagement, followers, traffic, and conversions. Our team creates result-driven social media campaign management plans for platforms like Facebook, Instagram, LinkedIn, and TikTok. Whether you need content planning, paid ads, audience targeting, or brand growth, Upward Digital Co works as your reliable social media growth company. We are also a full-service digital marketing company and online marketing company, helping businesses improve visibility across social media, Google, and digital platforms. As an experienced social media advertising company, we create smart campaigns that reach the right audience, generate quality leads, and support long-term business growth through powerful online marketing strategies.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
    reverse: false,
  },
  {
    title: "Social Media Marketing Company in USA",
    titleBlue: true,
    body: "Upward Digital Co is a professional social media marketing company in USA helping businesses grow their online presence, reach more customers, and build trust. As a trusted social media agency for Facebook and Instagram ads, we create targeted ad campaigns that drive engagement, traffic, leads, and sales. Our team also works as a social media company for brand awareness, helping brands become more visible across popular platforms. We provide social media management services for local businesses, including content planning, posting, audience engagement, ad management, and performance tracking to help businesses grow faster online.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    reverse: true,
  },
]

const process = [
  {
    title: "Pinterest Marketing & Pin Optimization",
    body: "Our Pinterest marketing and pin optimization services help your business grow visibility, traffic, and brand awareness through high-quality Pinterest content. We manage your Pinterest account with SEO-friendly pin titles, keyword-rich pin descriptions, attractive graphics, and optimized boards. Our Pinterest management strategy focuses on Pinterest SEO, pin design, board optimization, content scheduling, and audience engagement. We create pins that drive website clicks, increase impressions, and improve social media growth. With the right Pinterest marketing strategy, your brand can reach users searching for ideas, products, services, and inspiration. Pinterest management helps turn visual content into traffic and real business leads.",
  },
  {
    title: "Facebook Page Management & Ad Strategy",
    body: "Our Facebook page management and ad strategy services help businesses build a strong online presence, increase engagement, and reach the right audience. We manage your Facebook business page with regular posting, content planning, creative captions, page optimization, and audience interaction. Our Facebook marketing strategy includes Facebook ads, boosted posts, brand awareness campaigns, lead generation ads, and social media advertising. We create engaging Facebook content that improves likes, comments, shares, and page growth. With professional Facebook management services, your business can attract local customers, improve visibility, and generate more leads through targeted Facebook advertising and smart social media management.",
  },
  {
    title: "Instagram Content Creation & Growth Management",
    body: "Our Instagram content creation and growth management services help your brand look professional, active, and attractive online. We manage your Instagram account with high-quality posts, reels, stories, captions, hashtags, and content calendars. Our Instagram marketing strategy focuses on Instagram growth, audience engagement, profile optimization, reel marketing, brand awareness, and social media content creation. We use keyword-rich captions, trending content ideas, and creative visuals to improve reach and visibility. With professional Instagram management services, your business can grow followers, increase engagement, build trust, and attract potential customers. Instagram marketing helps your brand stay active and competitive online.",
  },
  {
    title: "Twitter/X Posting & Brand Engagement",
    body: "Our Twitter/X posting and brand engagement services help your business stay active, relevant, and connected with your audience. We manage your Twitter/X account with regular tweets, trending topics, brand updates, hashtags, replies, and engagement posts. Our Twitter marketing strategy focuses on social media engagement, brand awareness, content sharing, audience interaction, and online reputation building. We create short, powerful, and keyword-rich posts that help improve visibility and communication. With professional Twitter/X management services, your business can join industry conversations, connect with customers, share updates, and grow online authority. Twitter/X marketing keeps your brand active and visible every day.",
  },
  {
    title: "YouTube Channel Management & Video SEO",
    body: "Our YouTube channel management and video SEO services help your business grow through powerful video marketing. We manage your YouTube channel with video titles, descriptions, tags, thumbnails, playlists, and channel optimization. Our YouTube marketing strategy focuses on YouTube SEO, video ranking, audience retention, keyword optimization, content planning, and subscriber growth. We create SEO-friendly video descriptions and engaging titles to help your videos appear in YouTube search and Google search. With professional YouTube management services, your brand can increase views, improve visibility, build trust, and generate leads through video content. YouTube marketing is powerful for long-term digital growth.",
  },
  {
    title: "TikTok Content Strategy & Short-Form Video Growth",
    body: "Our TikTok content strategy and short-form video growth services help your brand reach a wider audience with creative and engaging videos. We manage your TikTok account with content ideas, trending sounds, captions, hashtags, posting schedules, and short-form video strategy. Our TikTok marketing strategy focuses on TikTok growth, viral content, brand awareness, audience engagement, social media trends, and video marketing. We create short, catchy, and valuable videos that improve reach, followers, and engagement. With professional TikTok management services, your business can connect with modern audiences, increase visibility, and grow faster through creative short-form video content and social media marketing.",
  },
]

const SIMPLEICON = "https://cdn.simpleicons.org"

const toolPlatforms = [
  { name: "Instagram", url: `${SIMPLEICON}/instagram` },
  { name: "Facebook", url: `${SIMPLEICON}/facebook/1877F2` },
  { name: "LinkedIn", url: "https://img.icons8.com/color/96/linkedin.png" },
  { name: "TikTok", url: `${SIMPLEICON}/tiktok/000000` },
  { name: "YouTube", url: `${SIMPLEICON}/youtube` },
  { name: "X (Twitter)", url: `${SIMPLEICON}/x/000000` },
  { name: "Pinterest", url: `${SIMPLEICON}/pinterest/E60023` },
]

const faqItems = [
  {
    question: "Why hire a social media agency?",
    answer: "A social media agency saves time, creates better content, manages your accounts professionally, and helps grow your brand online.",
  },
  {
    question: "Does social media improve brand awareness?",
    answer: "Yes, social media marketing helps more people see your business, remember your brand, and trust your services.",
  },
  {
    question: "Is social media marketing good for local businesses?",
    answer: "Yes, social media marketing is great for local businesses because it helps reach nearby customers and promote products or services online.",
  },
  {
    question: "What is social media management?",
    answer: "Social media management means creating, posting, and managing content on Facebook, Instagram, TikTok, YouTube, Pinterest, and Twitter/X to grow your online presence.",
  },
  {
    question: "How often should I post on social media?",
    answer: "Posting consistently is important. Most businesses should post several times a week to stay active and visible online.",
  },
]

export default function SocialMedia() {
  useSeoMeta({
    title: "Social Media Marketing | USA's Top Marketing Agency",
    description: "Social media marketing services to grow your brand, reach more customers, boost engagement, drive traffic, and generate quality leads.",
    keywords: "social media marketing USA, social media management, Instagram marketing, Facebook marketing, content creation agency",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        title="Social Media Marketing"
        description="Social media marketing services to grow your brand, reach more customers, boost engagement, drive traffic, and generate quality leads."
      />

      {/* Content Sections */}
      {contentSections.map((s, i) => (
        <section key={s.title} className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-white" : "bg-cream border-t-4 border-stone-200"}`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${s.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-20 items-stretch`}
            >
              <div className="flex-1 max-w-xl flex flex-col justify-center">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${s.titleBlue ? "text-primary" : "text-stone-900"}`}>{s.title}</h2>
                <p className="text-stone-600 text-lg leading-relaxed">{s.body}</p>
              </div>
              <div className="flex-1 w-full rounded-3xl shadow-md overflow-hidden" style={{ minHeight: "420px" }}>
                <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center" style={{ minHeight: "420px" }} />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Tools strip */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white">Platforms We Manage</h3>
        </div>
      </div>
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {toolPlatforms.map((tool) => (
              <div key={tool.name} className="bg-cream border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                <img src={tool.url} alt={tool.name} className="w-10 h-10 object-contain" />
                <span className="text-xs font-medium text-stone-700 text-center leading-tight">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Process */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="space-y-12 md:space-y-16">
            {process.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.07 }} className="text-center">
                <h5 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5">{p.title}</h5>
                <p className="text-stone-600 text-lg leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-y border-stone-200 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h5 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-10">Frequently Asked Questions</h5>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Let's Grow Your Social Media Presence</h2>
            <p className="text-stone-600 text-lg mb-8">Book a free strategy call and we will show you exactly how we would grow your brand on social media.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={PHONE_HREF} onClick={() => trackContact({ method: "phone", source: "social_cta" })} className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors">
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors">
                Free Strategy Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
