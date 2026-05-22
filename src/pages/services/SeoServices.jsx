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
    title: "Google SEO Services Company",
    titleBlue: true,
    body: "Upward Digital Co is a leading Google SEO services company providing professional SEO services to businesses across the USA. Our expert SEO team delivers data-driven SEO strategies including technical SEO audits, on-page SEO optimization, local SEO, and white-hat link building to help your business rank higher on Google and attract consistent organic traffic. Whether you are a local business targeting nearby customers or a national brand competing in competitive markets, our SEO services are designed to improve your online visibility, build domain authority, and drive qualified leads that grow your revenue.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=80",
    reverse: false,
  },
  {
    title: "Professional SEO Services",
    titleBlue: true,
    body: "At Upward Digital Co, we provide comprehensive professional SEO services that cover every aspect of search engine optimization. As a trusted SEO agency and SEO company, we offer complete SEO solutions including keyword research and strategy, technical SEO fixes, on-page content optimization, local SEO for Google Maps, and authority link building. Our SEO specialists work to improve your Google rankings, increase organic traffic, and build long-term online authority for your business. We provide monthly SEO reports with transparent metrics so you always know exactly what we are doing and the results it is delivering for your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    reverse: true,
  },
]

const process = [
  {
    title: "SEO Audit and Website Analysis",
    body: "Every successful SEO campaign begins with a thorough SEO audit and website analysis. At Upward Digital Co, we conduct a comprehensive technical SEO audit to identify all issues that may be affecting your website's performance in Google search results. Our team analyzes your site's crawlability, indexation, page speed, mobile-friendliness, site structure, and on-page SEO factors. We also analyze your competitors, current keyword rankings, and backlink profile to create a clear picture of where you stand and what opportunities exist to grow your organic presence.",
  },
  {
    title: "Keyword Research and SEO Strategy",
    body: "Keyword research is the foundation of a successful SEO strategy. Our SEO team conducts in-depth keyword research to identify the most valuable, high-intent search terms that your target customers are using to find businesses like yours. We analyze search volume, competition level, and business relevance to build a strategic keyword map that targets the right opportunities for your specific market. Our SEO strategy covers short-tail keywords for brand awareness, long-tail keywords for targeted traffic, and local SEO keywords for geographic targeting to maximize your visibility across all relevant searches.",
  },
  {
    title: "On-Page SEO Optimization",
    body: "On-page SEO optimization is the process of optimizing individual pages on your website to rank higher in search engines and earn more relevant organic traffic. Our team optimizes every element of your web pages including title tags, meta descriptions, header tags, image alt text, internal linking structure, URL structure, and page content. We ensure that every page on your website clearly communicates its topic to search engines while delivering a valuable, engaging experience to your human visitors. Our on-page SEO work helps search engines understand your content and rank your pages for the keywords your target audience is searching for.",
  },
  {
    title: "Technical SEO Fixes and Improvements",
    body: "Technical SEO refers to the behind-the-scenes elements of your website that affect how search engines crawl, index, and rank your pages. Our technical SEO specialists identify and fix all technical issues including slow page speed, broken links, duplicate content, missing sitemaps, crawl errors, improper redirects, and poor Core Web Vitals scores. We also implement structured data markup, optimize your site architecture, and ensure your website is fully mobile-friendly and secure with HTTPS. Strong technical SEO gives your website the solid foundation it needs for all other SEO efforts to perform at their best.",
  },
  {
    title: "Link Building and Domain Authority",
    body: "Link building is one of the most important factors in Google's ranking algorithm. Our white-hat link building services help you earn high-quality backlinks from authoritative, relevant websites in your industry that signal to Google your website is trustworthy and valuable. We use ethical link building strategies including digital PR, guest posting, resource link building, and competitor backlink analysis to build your domain authority over time. Every link we build is from a real, relevant website that passes genuine SEO value to your site. Our link building approach is designed for long-term sustainable ranking improvements, not quick fixes that can get your site penalized.",
  },
  {
    title: "SEO Reporting and Continuous Optimization",
    body: "SEO is not a one-time task but an ongoing process of monitoring, analysis, and improvement. At Upward Digital Co, we provide detailed monthly SEO reports that show you exactly how your campaign is performing, including keyword rankings, organic traffic growth, backlinks earned, and conversion data. Our team continuously monitors your website's performance and Google algorithm updates to make proactive adjustments to your SEO strategy. We track what is working, identify new opportunities, and optimize underperforming pages to ensure your website continues to climb search rankings and generate more leads for your business month after month.",
  },
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
    question: "What is SEO and why does it matter?",
    answer: "SEO (Search Engine Optimization) is the process of improving your website's visibility in Google and other search engines. It matters because most people click on the first results they see. Good SEO brings more organic traffic, better leads, and long-term growth without paying for every click.",
  },
  {
    question: "How long does SEO take to show results?",
    answer: "SEO typically takes 3 to 6 months to show significant results, though some improvements can be seen sooner. The timeline depends on your website's current state, competition level, and how aggressively you invest in SEO. It is a long-term strategy that builds sustainable organic traffic over time.",
  },
  {
    question: "What is local SEO?",
    answer: "Local SEO is the process of optimizing your online presence to attract more customers from local searches on Google. It includes optimizing your Google Business Profile, building local citations, getting local reviews, and creating location-specific content so your business appears in Google Maps and local search results.",
  },
  {
    question: "What is the difference between on-page and off-page SEO?",
    answer: "On-page SEO refers to optimizations done on your own website, including content, title tags, meta descriptions, and site structure. Off-page SEO refers to actions taken outside your website, primarily link building and brand mentions, to improve your domain authority and search rankings.",
  },
  {
    question: "Do you provide monthly SEO reports?",
    answer: "Yes, we provide detailed monthly SEO reports covering keyword rankings, organic traffic growth, backlinks earned, technical health, and conversion data. Our reports are written in plain English so you always know exactly what is happening with your SEO campaign and the results it is delivering.",
  },
  {
    question: "Can SEO help my business get more leads?",
    answer: "Yes, SEO is one of the most effective ways to generate consistent, high-quality leads for your business. By ranking your website for keywords your customers are actively searching, SEO drives targeted visitors who are already interested in your products or services, resulting in more calls, form submissions, and sales.",
  },
]

export default function SeoServices() {
  useSeoMeta({
    title: "Google SEO Services USA | Top SEO Agency | Upward Digital",
    description: "Expert Google SEO services in the USA. Technical SEO, local SEO, link building, and content strategy that drives sustainable organic growth. Free SEO audit.",
    keywords: "SEO services USA, Google SEO agency, local SEO services, technical SEO, keyword research USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="SEO Services"
        title="SEO Services"
        description="Our professional SEO services help businesses rank higher on Google, attract more organic traffic, and grow online through data-driven strategies and proven techniques."
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
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-72 md:h-105 object-cover rounded-3xl shadow-md"
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

      {/* Process heading full width strip */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-4xl md:text-5xl font-bold text-white">Our Six-Step SEO Process</h4>
        </div>
      </div>

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
          <h4 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-10">Frequently Asked Questions</h4>
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
