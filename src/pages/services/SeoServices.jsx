import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
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
    title: "Local SEO Agency",
    titleBlue: true,
    body: "Upward Digital is a professional local SEO agency helping businesses improve local search visibility, rank higher on Google Maps, and attract more nearby customers. As a trusted local SEO agency, Upward Digital focuses on Google Business Profile optimization, Google Maps SEO, local citations, business listings, NAP consistency, local keyword targeting, and local search engine optimization. Our local SEO agency helps your business appear in local search results, near me searches, and the Google local 3-pack. With a results-driven local SEO strategy, Upward Digital provides local SEO audit, competitor analysis, review management, local landing pages, service area SEO, and location-based SEO. For small businesses, contractors, doctors, restaurants, law firms, dentists, plumbers, and service-based companies, our local SEO agency can increase calls, website traffic, direction requests, and local leads. Upward Digital understands how to optimize your online presence, improve Google Maps ranking, build local authority, and grow your business online. If you want more local customers, more Google visibility, and more business from your area, Upward Digital is the local SEO agency that can help.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=65&auto=format&fit=crop",
    reverse: false,
  },
  {
    title: "Local SEO Services to Rank on Google Maps",
    titleBlue: true,
    body: "Local SEO services to rank on Google Maps help local businesses improve online visibility, attract nearby customers, and appear in local search results. With professional local SEO services, your business can optimize Google Business Profile, improve Google Maps ranking, build local citations, and target location-based keywords. Local SEO focuses on Google Maps SEO, local business listings, NAP consistency, customer reviews, and near me search optimization to help your company rank higher when people search for your services. A strong local SEO strategy also includes local keyword targeting, local landing pages, service area SEO, local schema markup, and local competitor analysis. Whether you run a small business, restaurant, clinic, law firm, contractor service, or home service company, local SEO services can increase calls, website visits, direction requests, and real local leads. Google Maps SEO and local search optimization make your business more visible, trusted, and easy to find.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=65&auto=format&fit=crop",
    reverse: true,
  },
]

const process = [
  { title: "Local SEO Strategy for Small Businesses", body: "To rank a website with local SEO, start with a clear local SEO strategy. Focus on your target city, service area, customer needs, and local search intent. Your website should clearly tell Google what services you offer and where you offer them." },
  { title: "Google Business Profile Optimization", body: "Google Business Profile is one of the most important parts of local SEO. Complete your profile with business name, category, phone number, website, address, service areas, business hours, photos, products, services, and regular posts. Google says local rankings are mainly based on relevance, distance, and prominence." },
  { title: "Google Maps SEO", body: "Google Maps SEO helps your business appear in the Google Map Pack. To improve Google Maps ranking, keep your business details accurate, add high-quality photos, collect customer reviews, and use local keywords in your business description, services, and website pages." },
  { title: "Local Keyword Research", body: "Find keywords people use in your area, such as \"SEO agency near me,\" \"local SEO services in New York,\" \"best dentist in Chicago,\" or \"website development company in Dallas.\" Use city-based, service-based, and near me keywords naturally in your content." },
  { title: "On-Page SEO for Local Businesses", body: "Optimize your homepage, service pages, title tags, meta descriptions, headings, URLs, and image alt text with local keywords. For example, instead of only writing \"SEO services,\" use \"local SEO services in [city].\"" },
  { title: "Location Pages SEO", body: "If your business serves multiple cities, create separate location pages. Each page should include unique content, local services, FAQs, testimonials, map embed, business contact details, and city-specific keywords." },
  { title: "Local Business Schema Markup", body: "Add Local Business schema to help Google understand your business name, address, phone number, opening hours, reviews, and services. Google's LocalBusiness structured data can help search engines understand important business details for Search and Maps results." },
  { title: "NAP Consistency", body: "NAP means Name, Address, and Phone Number. Keep your business information exactly the same on your website, Google Business Profile, directories, social media pages, and local listings." },
  { title: "Local Citations and Business Listings", body: "Submit your business to trusted directories like Yelp, Bing Places, Apple Maps, Yellow Pages, Chamber of Commerce sites, and niche directories. Local citations help build trust and improve local search visibility." },
  { title: "Customer Reviews and Reputation Management", body: "Reviews are powerful for local SEO. Ask happy customers to leave reviews on Google. Reply to all reviews professionally and include natural keywords where possible, such as your service name or city." },
  { title: "Local Link Building", body: "Get backlinks from local websites, blogs, newspapers, business directories, sponsorship pages, and community websites. Local backlinks help improve your website authority and local ranking." },
  { title: "Mobile-Friendly Website Design", body: "Most local searches happen on mobile. Your website should load fast, look professional, be easy to navigate, and have clear call buttons. A mobile-friendly website can increase calls, leads, and conversions." },
  { title: "Local Content Marketing", body: "Publish helpful local content, such as \"Best SEO Tips for Small Businesses in [City],\" \"How to Choose a Local SEO Agency,\" or \"Why Google Maps SEO Matters for Local Businesses.\" This helps attract local traffic and build authority." },
  { title: "Technical SEO for Local Websites", body: "Fix broken links, improve page speed, add SSL, optimize Core Web Vitals, submit your sitemap, and use Google Search Console. Google Search Console can help monitor search performance, Core Web Vitals, and rich results." },
  { title: "Local SEO Tracking and Reporting", body: "Track your local rankings, Google Business Profile insights, website traffic, phone calls, form submissions, and keyword positions. Local SEO takes consistent work, but tracking helps you improve faster." },
]

const SIMPLEICON = "https://cdn.simpleicons.org"

const toolPlatforms = [
  { name: "Google Analytics", url: `${SIMPLEICON}/googleanalytics` },
  { name: "Search Console", url: `${SIMPLEICON}/googlesearchconsole` },
  { name: "Google Ads", url: `${SIMPLEICON}/googleads` },
  { name: "Tag Manager", url: `${SIMPLEICON}/googletagmanager` },
  { name: "Semrush", url: `${SIMPLEICON}/semrush` },
  { name: "Yoast SEO", url: `${SIMPLEICON}/yoast` },
]

const faqItems = [
  {
    question: "What is Local SEO?",
    answer: "Local SEO helps your business show up on Google when people nearby search for your services.",
  },
  {
    question: "Why is Local SEO important?",
    answer: "Local SEO helps you get more local customers, calls, website visits, and leads from Google.",
  },
  {
    question: "What is NAP in Local SEO?",
    answer: "NAP means your business Name, Address, and Phone Number. It should be the same everywhere online.",
  },
  {
    question: "Do reviews help Local SEO?",
    answer: "Yes, positive Google reviews build trust and can help improve your local ranking.",
  },
  {
    question: "Why hire a Local SEO agency?",
    answer: "Hiring Upward Digital Co as your Local SEO agency helps improve your Google ranking, Google Maps visibility, website traffic, phone calls, and quality leads from local customers.",
  },
]

export default function SeoServices() {
  useSeoMeta({
    title: "SEO Services | USA's Best Search Engine Optimization Agency",
    description: "SEO services to improve Google rankings, increase organic traffic, generate quality leads, and grow your business with smart optimization.",
    keywords: "SEO services USA, Google SEO agency, local SEO services, technical SEO, keyword research USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="SEO Services"
        title="SEO Services"
        description="SEO services to improve Google rankings, increase organic traffic, generate quality leads, and grow your business with smart optimization."
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
              <div className="flex-1 max-w-xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${s.titleBlue ? "text-primary" : "text-stone-900"}`}>{s.title}</h2>
                <p className="text-stone-600 text-lg leading-relaxed">{s.body}</p>
              </div>
              <div className="flex-1 w-full rounded-3xl shadow-md overflow-hidden" style={{ minHeight: "480px" }}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: "480px" }}
                />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* SEO Tools */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white">SEO Tools and Platforms We Use</h3>
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

      {/* Process */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="space-y-12 md:space-y-16">
            {process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
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
          <h5 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-10">Frequently Asked Questions</h5>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Get a Free SEO Audit Today</h2>
            <p className="text-stone-600 text-lg mb-8">We will analyze your website, show you what is holding you back on Google, and map out a strategy to grow your rankings.</p>
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
