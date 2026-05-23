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
    title: "Google Ads and Meta Ads Agency",
    titleBlue: true,
    body: "Upward Digital Co is a certified Google Ads and Meta Ads agency providing professional paid advertising services for businesses across the USA. As a Google Partner and Meta Business Partner, we manage Google Ads campaigns, Facebook Ads, and Instagram Ads that deliver real, measurable results. Our paid advertising specialists create data-driven ad campaigns including Search Ads, Shopping Ads, Display Ads, Retargeting Ads, and Social Media Ads designed to drive leads, sales, and revenue for your business. We focus on maximizing your return on ad spend while minimizing cost-per-lead through continuous optimization and strategic audience targeting.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=65&auto=format&fit=crop",
    reverse: false,
  },
  {
    title: "PPC and Paid Advertising Services",
    titleBlue: true,
    body: "At Upward Digital Co, we provide comprehensive PPC and paid advertising services to help businesses reach the right audience at the right time with the right message. As a trusted paid ads agency, we offer Google Ads management, Meta Ads management, campaign strategy, ad copywriting, audience research, conversion tracking, landing page optimization, and detailed performance reporting. Our certified ads specialists monitor and optimize your campaigns daily to ensure every dollar of your ad budget is working as hard as possible. Whether you need local lead generation or national brand awareness, our paid advertising strategies are built to deliver consistent and profitable results.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=65&auto=format&fit=crop",
    reverse: true,
  },
]

const process = [
  {
    title: "Ads Audit and Competitor Research",
    body: "Every successful paid advertising campaign starts with a thorough audit and research phase. At Upward Digital Co, we begin by auditing your existing ad accounts to identify wasted spend, missed opportunities, and technical issues affecting performance. We analyze your competitors' ad strategies, messaging, and targeting approaches to understand the competitive landscape. Our team also researches your target audience demographics, interests, behaviors, and purchase intent to build a comprehensive understanding of who we need to reach and how to reach them most effectively with your ads.",
  },
  {
    title: "Campaign Strategy and Structure",
    body: "With research complete, our team builds a detailed paid advertising strategy and campaign structure designed to achieve your specific business goals. We determine the right campaign types, budget allocation, bidding strategies, and ad formats for your objectives whether that is generating leads, driving e-commerce sales, building brand awareness, or promoting a specific product or service. We structure your campaigns logically with tightly themed ad groups, relevant keywords, and organized audience segments to ensure maximum relevance and quality scores that keep your cost-per-click as low as possible.",
  },
  {
    title: "Ad Creative and Copywriting",
    body: "High-converting ads require compelling creative and persuasive copy that grabs attention and drives action. Our creative team produces professional ad assets including eye-catching display banners, engaging video ads, compelling social media ad visuals, and persuasive ad copy that communicates your unique value proposition clearly and effectively. We write multiple variations of ad headlines, descriptions, and calls-to-action to enable thorough A/B testing and continuous performance improvement. Every ad we create is designed to capture attention, communicate value, and motivate your target audience to click and convert.",
  },
  {
    title: "Audience Targeting and Bid Management",
    body: "Precise audience targeting is what separates profitable ad campaigns from wasted budget. Our specialists configure detailed targeting parameters including demographics, interests, behaviors, keywords, geographic locations, device types, and custom audiences built from your existing customer data. For Google Ads, we manage bidding strategies including Target CPA, Target ROAS, and Enhanced CPC to optimize for your specific conversion goals. For Meta Ads, we build and test custom audiences, lookalike audiences, and retargeting audiences to ensure your ads are reaching the people most likely to become customers for your business.",
  },
  {
    title: "Campaign Launch and Daily Optimization",
    body: "Once your campaigns are set up and approved, we launch them and monitor performance closely, especially in the critical first days when the ad platforms are learning and collecting data. Our team makes daily adjustments to bids, budgets, targeting, ad copy, and creative based on real performance data to continuously improve results. We identify underperforming ads and pause them, scale up successful campaigns, test new audiences and creative variations, and refine bidding strategies based on which keywords and audiences are driving the best return on investment for your specific business goals.",
  },
  {
    title: "Performance Reporting and Scaling",
    body: "Transparent reporting is a core part of our paid advertising service. We provide weekly performance updates and detailed monthly reports covering all key metrics including impressions, clicks, click-through rate, cost-per-click, conversions, cost-per-lead, and return on ad spend. Our reports are clear and easy to understand, showing you exactly what your ad budget is achieving. As campaigns prove profitable, we work with you to scale budgets strategically to capture more market share and grow your revenue. Our reporting process ensures you always have full visibility into how your advertising investment is performing.",
  },
]

const SIMPLEICON = "https://cdn.simpleicons.org"

const toolPlatforms = [
  { name: "Google Ads", url: `${SIMPLEICON}/googleads` },
  { name: "Meta Ads", url: `${SIMPLEICON}/meta/0866FF` },
  { name: "Facebook", url: `${SIMPLEICON}/facebook/1877F2` },
  { name: "Instagram", url: `${SIMPLEICON}/instagram` },
]

const faqItems = [
  {
    question: "What are Google Ads and how do they work?",
    answer: "Google Ads is a paid advertising platform where your business pays to show ads at the top of Google search results when people search for your products or services. You pay per click (PPC) and only when someone clicks your ad. Google Ads delivers immediate visibility and targeted traffic to your website.",
  },
  {
    question: "What are Meta Ads (Facebook and Instagram Ads)?",
    answer: "Meta Ads are paid advertisements that appear on Facebook and Instagram. They allow businesses to target specific audiences based on demographics, interests, behaviors, and more. Meta Ads are powerful for building brand awareness, generating leads, and driving sales through highly visual and targeted ad campaigns.",
  },
  {
    question: "How much should I budget for paid advertising?",
    answer: "Ad budgets depend on your industry, competition, and goals. Most small businesses start with $500 to $2,000 per month for Google Ads or Meta Ads. Our team analyzes your market and recommends a budget that can deliver meaningful results while maximizing your return on ad spend.",
  },
  {
    question: "How long does it take to see results from paid ads?",
    answer: "Paid advertising can deliver results very quickly, often within days of launching your campaigns. However, optimal performance typically takes 2 to 4 weeks as the ad platforms optimize delivery and our team refines targeting and bidding based on real performance data.",
  },
  {
    question: "What is retargeting and why is it important?",
    answer: "Retargeting shows ads to people who have previously visited your website but did not convert. These audiences are highly valuable because they already know your brand. Retargeting campaigns typically have much lower costs and higher conversion rates than cold audience campaigns, making them an essential part of any paid advertising strategy.",
  },
  {
    question: "Do you own the ad accounts or do we?",
    answer: "You always own your ad accounts. We operate as managers within your Google Ads and Meta Ads accounts, never taking ownership. This means all your campaign data, history, and results stay with you. If you ever decide to stop working with us, you keep everything we built.",
  },
]

export default function AdsServices() {
  useSeoMeta({
    title: "Meta Ads & Google Ads | Generate Quality leads & calls",
    description: "Meta Ads & Google Ads services to increase traffic, leads, calls, and sales with targeted campaigns for business growth.",
    keywords: "Google Ads management USA, Meta Ads agency, Facebook Ads, PPC management, paid advertising USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        title="Meta Ads & Google Ads"
        description="Meta Ads & Google Ads services to increase traffic, leads, calls, and sales with targeted campaigns for business growth."
      />

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

      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white">Advertising Platforms We Manage</h3>
        </div>
      </div>
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {toolPlatforms.map((tool) => (
              <div key={tool.name} className="bg-cream border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm w-36">
                <img src={tool.url} alt={tool.name} className="w-10 h-10 object-contain" />
                <span className="text-xs font-medium text-stone-700 text-center leading-tight">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Ready to Make Your Ads Work Harder?</h2>
            <p className="text-stone-600 text-lg mb-8">Get a free paid ads audit and we will show you where your budget is leaking and how to fix it for better ROI.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "ads_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
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
