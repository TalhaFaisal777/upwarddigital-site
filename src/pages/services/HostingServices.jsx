import { motion } from "framer-motion"
import { Server, Shield, Zap, RefreshCw, HeadphonesIcon, Globe, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"

const features = [
  { icon: Zap, title: "Lightning-Fast Servers", description: "SSD-powered servers with global CDN distribution for sub-second load times no matter where your visitors are." },
  { icon: Shield, title: "Enterprise Security", description: "Free SSL certificates, daily malware scanning, DDoS protection, and automated firewall rules keep your site safe 24/7." },
  { icon: RefreshCw, title: "Daily Backups", description: "Automated daily backups with one-click restore. Your data is always safe, always recoverable." },
  { icon: Globe, title: "99.9% Uptime Guarantee", description: "Redundant infrastructure and proactive monitoring ensure your site stays online — always." },
  { icon: Server, title: "Managed WordPress Hosting", description: "Optimised WordPress hosting with auto-updates, staging environments, and performance tuning built in." },
  { icon: HeadphonesIcon, title: "24/7 Expert Support", description: "Real people, real answers. Our team is available around the clock for technical issues and questions." },
]

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for small business websites and portfolios.",
    features: ["1 Website", "10 GB SSD Storage", "Free SSL Certificate", "Daily Backups", "99.9% Uptime SLA", "Email Support"],
  },
  {
    name: "Business",
    price: "$59",
    period: "/mo",
    description: "Ideal for growing businesses and e-commerce sites.",
    features: ["5 Websites", "50 GB SSD Storage", "Free SSL Certificates", "Daily Backups + CDN", "99.9% Uptime SLA", "Priority Support", "Staging Environment"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "High-traffic, mission-critical applications at scale.",
    features: ["Unlimited Sites", "Dedicated Resources", "Custom CDN Setup", "Hourly Backups", "99.99% Uptime SLA", "Dedicated Account Manager", "Custom Security Config"],
  },
]

const stats = [
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "<500ms", label: "Avg. server response" },
  { value: "24/7", label: "Expert support" },
  { value: "Daily", label: "Automated backups" },
]

export default function HostingServices() {
  useSeoMeta({
    title: "Web Hosting Services USA | Fast & Secure Hosting | Upward Digital",
    description: "Reliable, fast, and secure web hosting services in the USA. Managed WordPress hosting, daily backups, free SSL, and 24/7 expert support. 99.9% uptime guaranteed.",
    keywords: "web hosting services USA, managed WordPress hosting, secure web hosting, fast website hosting, business web hosting USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="Hosting Services"
        title={<>Fast. Secure. <em className="not-italic font-bold text-stone-900">Always On.</em></>}
        description="Enterprise-grade web hosting built for performance and reliability. SSL, CDN, daily backups, and 24/7 expert support — all included."
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

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="What's included"
            title={<>Hosting that <em className="not-italic font-bold text-stone-900">works as hard</em> as you do.</>}
            description="Every hosting plan comes with the performance and security features your business needs to stay online and fast."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="bg-cream border border-stone-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8">
          <SectionHeading
            subtitle="Hosting plans"
            title="Simple, transparent pricing."
            description="No hidden fees, no surprise bills. Pick the plan that fits your business."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-7 border ${plan.featured ? "bg-white border-primary ring-2 ring-primary" : "bg-white border-stone-200"}`}
              >
                {plan.featured && (
                  <span className="inline-block bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Most Popular</span>
                )}
                <h3 className="text-xl font-bold mb-1 text-stone-900">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.featured ? "text-primary" : "text-stone-900"}`}>{plan.price}</span>
                  <span className="text-sm mb-1 text-stone-500">{plan.period}</span>
                </div>
                <p className="text-sm mb-6 text-stone-600">{plan.description}</p>
                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
                      <span className="text-sm text-stone-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-3 rounded-full text-sm font-semibold transition-colors ${plan.featured ? "bg-primary text-white hover:bg-blue-700" : "bg-stone-900 text-white hover:bg-primary"}`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Ready for hosting that just works?</h2>
            <p className="text-stone-600 text-lg mb-8">Talk to our team about migrating your existing site or launching something new.</p>
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
