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
    title: "Social Media Marketing Company",
    titleBlue: true,
    body: "Upward Digital Co is a professional social media marketing company offering expert social media management services, social media content creation, and social media strategy for businesses across the USA. We help brands grow their online presence, build engaged communities, and drive real business results through Instagram, Facebook, LinkedIn, TikTok, YouTube, and other major platforms. Whether you need social media management for a small business or a large brand, our team delivers consistent, high-quality content and proven strategies to increase your followers, engagement, and conversions.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    reverse: false,
  },
  {
    title: "Social Media Management Services",
    titleBlue: true,
    body: "At Upward Digital Co, we provide complete social media management services to help businesses build a strong and consistent brand presence online. As a trusted social media agency, we offer content creation, social media strategy, community management, hashtag research, platform optimization, and monthly analytics reporting. Our social media experts create scroll-stopping content tailored to each platform to engage your audience and grow your following. We also manage your comments, messages, and brand reputation to ensure your business stays responsive and professional across all social channels.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80",
    reverse: true,
  },
]

const process = [
  {
    title: "Social Media Audit and Competitor Analysis",
    body: "Every effective social media strategy starts with a comprehensive audit of your current social media presence. At Upward Digital Co, we analyze your existing profiles, content performance, audience demographics, and engagement rates to identify what is working and what needs improvement. We also conduct a detailed competitor analysis to understand what content strategies are driving results in your industry. Our social media audit gives us the insights we need to build a targeted strategy that positions your brand to stand out from competitors and connect with your ideal customers on every platform.",
  },
  {
    title: "Social Media Strategy and Content Planning",
    body: "With the audit complete, our team develops a customized social media strategy and content plan designed to achieve your specific business goals. We create a detailed content calendar that outlines post frequency, content themes, platform-specific formats, and optimal posting times for maximum reach and engagement. Our strategy covers all aspects of your social media presence including organic content, community engagement, hashtag strategy, and platform-specific best practices. We make sure every piece of content aligns with your brand voice, visual identity, and business objectives to create a cohesive and professional social media presence.",
  },
  {
    title: "Professional Content Creation",
    body: "High-quality content is the foundation of a successful social media presence. Our creative team produces professional social media content including eye-catching graphics, engaging video reels, informative carousels, compelling captions, and strategic stories tailored to each platform. We create content that reflects your brand identity, communicates your value proposition, and resonates with your target audience. Every piece of content we create is designed to stop the scroll, drive engagement, and encourage your followers to take action. Our content creation process ensures that your social media consistently looks professional, polished, and on-brand.",
  },
  {
    title: "Content Publishing and Scheduling",
    body: "Consistent posting is essential for social media growth and algorithm visibility. Our team handles all content publishing and scheduling across your social media platforms using professional social media management tools to ensure posts go live at the optimal times for your specific audience. We manage posting schedules for Instagram, Facebook, LinkedIn, TikTok, YouTube, and X to maintain a consistent and active presence without you having to worry about timing or logistics. Our scheduling process ensures your content reaches the maximum number of followers at the times when they are most active and engaged.",
  },
  {
    title: "Community Management and Engagement",
    body: "Building a loyal social media following requires active community management and genuine engagement with your audience. Our team monitors all your social media profiles daily, responding to comments, answering direct messages, engaging with followers, and managing your brand reputation across all platforms. We ensure no customer question or comment goes unanswered, which builds trust and loyalty with your audience. Our community management services also include monitoring brand mentions, handling negative feedback professionally, and fostering a positive community around your brand that keeps followers engaged and coming back.",
  },
  {
    title: "Analytics Reporting and Strategy Refinement",
    body: "Social media success requires continuous monitoring and optimization based on real performance data. At Upward Digital Co, we provide detailed monthly social media reports covering all key metrics including follower growth, reach, impressions, engagement rate, profile visits, website clicks, and lead conversions. Our team analyzes what content is performing best, which platforms are driving the most value, and where there are opportunities to improve. We use these insights to continuously refine your content strategy, test new formats, and optimize your social media campaigns to deliver better results month after month.",
  },
]

const SIMPLEICON = "https://cdn.simpleicons.org"

const toolPlatforms = [
  { name: "Instagram", url: `${SIMPLEICON}/instagram` },
  { name: "Facebook", url: `${SIMPLEICON}/facebook/1877F2` },
  { name: "LinkedIn", url: `${SIMPLEICON}/linkedin/0A66C2` },
  { name: "TikTok", url: `${SIMPLEICON}/tiktok/000000` },
  { name: "YouTube", url: `${SIMPLEICON}/youtube` },
  { name: "X (Twitter)", url: `${SIMPLEICON}/x/000000` },
]

const faqItems = [
  {
    question: "What is social media marketing?",
    answer: "Social media marketing is the process of using social media platforms like Instagram, Facebook, LinkedIn, and TikTok to promote your business, build brand awareness, engage your audience, and drive leads and sales. It includes creating and posting content, managing your profiles, running ads, and analyzing performance.",
  },
  {
    question: "Why does my business need social media marketing?",
    answer: "Your business needs social media marketing to reach customers where they spend their time online. Social media builds brand awareness, creates trust, drives website traffic, and generates leads. Businesses with active social media presence are seen as more credible and accessible to potential customers.",
  },
  {
    question: "Which social media platforms should my business be on?",
    answer: "The best platforms depend on your business type and target audience. Most businesses benefit from having a presence on Instagram and Facebook. LinkedIn is essential for B2B companies. TikTok and YouTube are powerful for visual brands and younger audiences. We recommend starting with 2-3 platforms and doing them well.",
  },
  {
    question: "How long does it take to see social media results?",
    answer: "Organic social media growth typically takes 3 to 6 months to show meaningful results in terms of follower growth and engagement. Paid social media advertising can generate leads much faster, often within days of launching. Consistency and quality content are the biggest factors in social media success.",
  },
  {
    question: "What is included in your social media management service?",
    answer: "Our social media management service includes a full audit, custom strategy, content calendar, professional content creation, daily publishing, community management, hashtag research, monthly analytics reporting, and ongoing strategy refinement. Everything you need to build and grow a professional social media presence.",
  },
  {
    question: "Can social media marketing help generate leads?",
    answer: "Yes, social media marketing is a powerful tool for lead generation. Through targeted content, strong calls-to-action, link-in-bio strategies, and paid social advertising, we drive qualified visitors to your website and landing pages where they can become leads and customers for your business.",
  },
]

export default function SocialMedia() {
  useSeoMeta({
    title: "Social Media Marketing Services USA | Upward Digital",
    description: "Professional social media marketing and management services in the USA. Content creation, community management, and growth strategies for Instagram, Facebook, LinkedIn, TikTok, and more.",
    keywords: "social media marketing USA, social media management, Instagram marketing, Facebook marketing, content creation agency",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        title="Social Media Marketing"
        description="Our professional social media marketing services help businesses build brand awareness, grow engaged audiences, and drive real business results across all major social platforms."
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
              className={`flex flex-col ${s.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-20 items-start`}
            >
              <div className="flex-1 max-w-xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${s.titleBlue ? "text-primary" : "text-stone-900"}`}>{s.title}</h2>
                <p className="text-stone-600 text-lg leading-relaxed">{s.body}</p>
              </div>
              <div className="flex-1 w-full">
                <img src={s.image} alt={s.title} className="w-full h-72 md:h-105 object-cover rounded-3xl shadow-md" />
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
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {toolPlatforms.map((tool) => (
              <div key={tool.name} className="bg-cream border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                <img src={tool.url} alt={tool.name} className="w-10 h-10 object-contain" />
                <span className="text-xs font-medium text-stone-700 text-center leading-tight">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process strip */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-4xl md:text-5xl font-bold text-white">Our Six-Step Social Media Process</h4>
        </div>
      </div>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="space-y-12 md:space-y-16">
            {process.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.07 }} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5">{p.title}</h3>
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
          <h4 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-10">Frequently Asked Questions</h4>
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
