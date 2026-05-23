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
    title: "Web Hosting Services Company",
    titleBlue: true,
    body: "Upward Digital Co provides reliable, fast, and secure web hosting services for businesses across the USA. As a trusted web hosting company, we offer managed WordPress hosting, business web hosting, and enterprise hosting solutions with 99.9% uptime, free SSL certificates, daily backups, and 24/7 expert support. Our hosting infrastructure is built for speed and security, using SSD servers, global CDN distribution, and advanced firewall protection to keep your website fast, safe, and always online. Whether you are launching a new website or migrating an existing one, our professional hosting services deliver the performance and reliability your business needs.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=65&auto=format&fit=crop",
    reverse: false,
  },
  {
    title: "Managed WordPress Hosting Services",
    titleBlue: true,
    body: "At Upward Digital Co, we specialize in managed WordPress hosting that takes the complexity out of running a high-performance website. Our managed hosting services include automatic WordPress updates, daily backups with one-click restore, malware scanning, staging environments, and server-level performance optimization. We handle all the technical server management so you can focus on running your business. Our hosting packages include free SSL certificates, DDoS protection, global CDN access, and priority support from real hosting experts who understand WordPress. Fast, secure, and fully managed hosting for businesses that need reliability they can count on.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=65&auto=format&fit=crop",
    reverse: true,
  },
]

const process = [
  {
    title: "Hosting Consultation and Requirements",
    body: "Every hosting setup begins with a thorough consultation to understand your website's specific requirements, expected traffic volumes, technical specifications, and growth plans. At Upward Digital Co, our hosting specialists work with you to identify the right hosting solution for your business. We analyze your current website performance, database needs, storage requirements, and security considerations to recommend a hosting plan that is perfectly matched to your needs and budget. Our goal is to ensure you get the right level of resources and support from day one without overpaying for capacity you do not need.",
  },
  {
    title: "Server Configuration and Setup",
    body: "Once we determine the right hosting solution for your business, our technical team handles all server configuration and setup. We configure your server environment including the web server software, PHP settings, database configuration, caching systems, and security rules to optimize performance for your specific website. Our servers are set up with SSD storage for fast read and write speeds, sufficient RAM for smooth performance under load, and optimized configurations for WordPress and other popular platforms. We ensure your hosting environment is properly configured from the start to deliver the best possible website speed and reliability.",
  },
  {
    title: "Website Migration and Domain Setup",
    body: "If you are moving from another hosting provider, our team manages the entire website migration process to ensure zero downtime and no data loss. We handle all aspects of the migration including copying your website files, exporting and importing your database, updating configuration files, and testing everything thoroughly before pointing your domain to the new server. We also assist with domain setup, DNS configuration, and email hosting setup to ensure all aspects of your online presence are properly configured and working correctly on your new hosting environment.",
  },
  {
    title: "SSL Certificate and Security Configuration",
    body: "Website security is a top priority for every hosting account we manage. Our team installs and configures a free SSL certificate on your website to ensure all data transmitted between your server and visitors is encrypted and secure. We also configure advanced security settings including firewall rules, malware scanning, DDoS protection, login rate limiting, and file integrity monitoring to protect your website from hacking attempts and malicious attacks. Regular security scans run automatically to detect and alert us to any potential threats before they can cause damage to your website or business.",
  },
  {
    title: "Performance Testing and Speed Optimization",
    body: "Before your website goes live on the new hosting, we conduct comprehensive performance testing to ensure everything is running at optimal speed. Our team tests page load times, server response times, database query performance, and resource usage under simulated traffic loads. We identify and resolve any performance bottlenecks including uncached database queries, unoptimized images, excessive plugin loads, and server resource constraints. We also configure server-level caching, CDN integration, and GZIP compression to deliver the fastest possible load times for your website visitors regardless of their geographic location.",
  },
  {
    title: "Ongoing Monitoring and Expert Support",
    body: "Our hosting service does not end at setup. We provide 24/7 server monitoring to detect and resolve any issues before they impact your website visitors. Our monitoring systems track server uptime, performance metrics, security threats, and resource usage around the clock. If any issue is detected, our team is alerted immediately and takes action to resolve it. We also perform regular maintenance including security updates, software patches, performance optimizations, and daily backups with offsite storage. Our expert support team is available whenever you need assistance with your hosting, ensuring your website stays fast, secure, and always online.",
  },
]

const SIMPLEICON = "https://cdn.simpleicons.org"

const toolPlatforms = [
  { name: "Amazon AWS", url: "https://img.icons8.com/color/96/amazon-web-services.png" },
  { name: "Cloudflare", url: `${SIMPLEICON}/cloudflare` },
  { name: "NGINX", url: `${SIMPLEICON}/nginx` },
  { name: "Let's Encrypt", url: `${SIMPLEICON}/letsencrypt` },
  { name: "WordPress", url: `${SIMPLEICON}/wordpress/21759B` },
  { name: "Ubuntu", url: `${SIMPLEICON}/ubuntu` },
]

const faqItems = [
  {
    question: "What is managed web hosting?",
    answer: "Managed web hosting means the hosting provider handles all the technical aspects of your server including setup, security, updates, backups, and performance optimization. You focus on running your business while we take care of everything behind the scenes to keep your website fast, secure, and always online.",
  },
  {
    question: "Why is web hosting speed important for my business?",
    answer: "Website speed directly affects user experience, bounce rate, and Google search rankings. A slow website loses visitors before they even see your content. Fast hosting ensures your pages load quickly, keeps visitors engaged, improves your SEO performance, and results in more leads and sales for your business.",
  },
  {
    question: "What is an SSL certificate and do I need one?",
    answer: "An SSL certificate encrypts data between your website and visitors, activating the padlock icon in browsers. It is essential for all websites because it protects user data, builds visitor trust, and is a Google ranking factor. All our hosting plans include free SSL certificates with automatic renewal.",
  },
  {
    question: "Do you provide website backups?",
    answer: "Yes, all our hosting plans include daily automated backups stored securely offsite. In the event of any issue including accidental data deletion, hacking, or server problems, we can restore your website to a previous version with a single click. Backups are retained for 30 days on most plans.",
  },
  {
    question: "Can you migrate my existing website to your hosting?",
    answer: "Yes, we handle complete website migrations from any hosting provider at no extra cost. Our team manages the entire process including file transfer, database migration, DNS configuration, and post-migration testing to ensure your website moves without any downtime or data loss.",
  },
  {
    question: "What is the uptime guarantee on your hosting?",
    answer: "We guarantee 99.9% uptime on all hosting plans, meaning your website will be online virtually all the time. Our redundant server infrastructure, proactive monitoring, and rapid response team ensure that any issues are resolved immediately, keeping your website accessible to your customers at all times.",
  },
]

export default function HostingServices() {
  useSeoMeta({
    title: "Web Hosting Services | Guaranteed Secure hosting",
    description: "Reliable web hosting services with fast speed, strong security, uptime support, and scalable hosting for business websites.",
    keywords: "web hosting services USA, managed WordPress hosting, secure web hosting, fast website hosting, business web hosting",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        title="Web Hosting Services"
        description="Reliable web hosting services with fast speed, strong security, uptime support, and scalable hosting for business websites."
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
          <h3 className="text-4xl md:text-5xl font-bold text-white">Hosting Technologies We Use</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Ready for Hosting That Just Works?</h2>
            <p className="text-stone-600 text-lg mb-8">Talk to our team about migrating your existing site or launching something new with enterprise-grade hosting.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "hosting_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
