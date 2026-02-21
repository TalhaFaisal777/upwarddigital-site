import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Check, X, ShieldCheck } from "lucide-react"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

// ─── Data ────────────────────────────────────────────────────────────────────

const pricingTiers = [
  {
    name: "Starter",
    monthlyPrice: 499,
    annualPrice: 399,
    description: "Perfect for small businesses getting started",
    popular: false,
    features: [
      "Custom Website Design (up to 5 pages)",
      "Basic SEO Setup",
      "Social Media Setup (2 platforms)",
      "Monthly Performance Report",
      "Email Support",
      "SSL Certificate",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    linkTo: "/contact",
  },
  {
    name: "Growth",
    monthlyPrice: 999,
    annualPrice: 799,
    description: "For growing businesses ready to scale",
    popular: true,
    features: [
      "Custom Website (up to 15 pages)",
      "Advanced SEO Strategy",
      "Social Media Management (4 platforms)",
      "PPC Campaign Management",
      "Weekly Performance Reports",
      "Content Creation (4 posts/month)",
      "Email Marketing Setup",
      "Dedicated Account Manager",
      "Priority Support",
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    linkTo: "/contact",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "For established businesses seeking full-service solutions",
    popular: false,
    features: [
      "Unlimited Pages & Features",
      "Full SEO Suite",
      "All Social Platforms",
      "Advanced PPC & Retargeting",
      "Daily Performance Monitoring",
      "Unlimited Content Creation",
      "Custom Integrations",
      "Brand Strategy & Design",
      "24/7 Priority Support",
      "Quarterly Strategy Reviews",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    linkTo: "/contact",
  },
]

const comparisonFeatures = [
  { feature: "Custom Website", starter: "5 pages", growth: "15 pages", enterprise: "Unlimited" },
  { feature: "SEO Optimization", starter: "Basic", growth: "Advanced", enterprise: "Full Suite" },
  { feature: "Social Media", starter: "2 platforms", growth: "4 platforms", enterprise: "All platforms" },
  { feature: "PPC Management", starter: false, growth: true, enterprise: true },
  { feature: "Content Creation", starter: false, growth: "4 posts/mo", enterprise: "Unlimited" },
  { feature: "Email Marketing", starter: false, growth: true, enterprise: true },
  { feature: "Brand Strategy", starter: false, growth: false, enterprise: true },
  { feature: "Dedicated Manager", starter: false, growth: true, enterprise: true },
  { feature: "Custom Integrations", starter: false, growth: false, enterprise: true },
  { feature: "Support", starter: "Email", growth: "Priority", enterprise: "24/7 Priority" },
]

const faqItems = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "We offer both month-to-month and annual plans. Annual plans come with a 20% discount. There are no long-term contracts required for monthly plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), bank transfers, and PayPal. For Enterprise plans, we also offer invoice-based billing.",
  },
  {
    question: "Do you offer discounts for nonprofits?",
    answer:
      "Yes! We offer a 15% discount for registered nonprofit organizations. Contact us to learn more about our nonprofit pricing.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you when you're approaching your plan limits and discuss options for scaling up. We'll never charge you unexpectedly.",
  },
  {
    question: "Can I customize my plan?",
    answer:
      "Absolutely! Our Enterprise plan is fully customizable. We can also create custom packages for Growth plan clients. Contact our sales team to discuss your specific needs.",
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function PricingToggle({ isAnnual, setIsAnnual }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center gap-4 mb-16"
    >
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          !isAnnual ? "text-white" : "text-gray-500"
        }`}
      >
        Monthly
      </span>
      <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          isAnnual ? "text-white" : "text-gray-500"
        }`}
      >
        Annual
      </span>
      {isAnnual && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Badge>Save 20%</Badge>
        </motion.div>
      )}
    </motion.div>
  )
}

function PricingCard({ tier, isAnnual, index }) {
  const price = isAnnual ? tier.annualPrice : tier.monthlyPrice
  const isPopular = tier.popular

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative ${isPopular ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <Badge className="bg-primary/20 text-primary border-primary/30">Most Popular</Badge>
        </div>
      )}
      <Card
        className={`relative h-full flex flex-col overflow-hidden transition-all duration-500 ${
          isPopular
            ? "border-primary/60 blue-glow lg:scale-105"
            : "hover:border-primary/30"
        }`}
      >
        {/* Subtle glow behind popular card */}
        {isPopular && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        )}

        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-2xl">{tier.name}</CardTitle>
          <p className="text-gray-400 text-sm mt-1">{tier.description}</p>
        </CardHeader>

        <CardContent className="relative z-10 flex flex-col flex-1">
          {/* Price */}
          <div className="mb-8">
            {price !== null ? (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">${price}</span>
                <span className="text-gray-400 text-lg">/mo</span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">Custom</span>
                <span className="text-gray-400 text-lg">/mo</span>
              </div>
            )}
            {price !== null && isAnnual && (
              <p className="text-sm text-gray-500 mt-1">Billed annually</p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link to={tier.linkTo} className="mt-auto">
            <Button
              variant={tier.buttonVariant}
              size="lg"
              className="w-full"
            >
              {tier.buttonText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function PricingCardsSection({ isAnnual }) {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingTiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonCell({ value }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-primary mx-auto" />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-gray-600 mx-auto" />
  }
  return <span className="text-gray-300 text-sm">{value}</span>
}

function FeatureComparisonSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading subtitle="Compare Plans" title="Feature Comparison" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-2xl border border-dark-border"
        >
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-dark-card border-b border-dark-border">
                <th className="text-left py-5 px-6 text-sm font-semibold text-gray-300 w-1/4">
                  Feature
                </th>
                <th className="text-center py-5 px-6 text-sm font-semibold text-gray-300 w-1/4">
                  Starter
                </th>
                <th className="text-center py-5 px-6 text-sm font-semibold text-primary w-1/4">
                  Growth
                </th>
                <th className="text-center py-5 px-6 text-sm font-semibold text-gray-300 w-1/4">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-dark-border transition-colors ${
                    i % 2 === 0 ? "bg-dark-card/50" : "bg-dark/50"
                  }`}
                >
                  <td className="py-4 px-6 text-sm font-medium text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <ComparisonCell value={row.starter} />
                  </td>
                  <td className="py-4 px-6 text-center bg-primary/5">
                    <ComparisonCell value={row.growth} />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <ComparisonCell value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

function MoneyBackSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-12"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            We're confident in our services. If you're not satisfied within the first 30
            days, we'll provide a full refund — no questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading subtitle="FAQ" title="Pricing Questions" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

function CtaSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Still Not Sure Which Plan Is Right?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a free consultation and we'll recommend the perfect plan for your
            business goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button size="lg">Schedule a Call</Button>
            </Link>
            <Button variant="outline" size="lg" onClick={scrollToTop}>
              Compare Plans
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        title="Transparent Pricing for Every Business"
        subtitle="Pricing"
        description="Simple, transparent pricing that scales with your business. No hidden fees, no surprises."
      />

      {/* 2. Pricing Toggle + Pricing Cards */}
      <section className="pt-24 relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
        </div>
      </section>
      <PricingCardsSection isAnnual={isAnnual} />

      {/* 3. Feature Comparison Table */}
      <FeatureComparisonSection />

      {/* 4. Money-back Guarantee */}
      <MoneyBackSection />

      {/* 5. Pricing FAQ */}
      <FaqSection />

      {/* 6. CTA Section */}
      <CtaSection />
    </main>
  )
}
