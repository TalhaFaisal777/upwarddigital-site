import { useState } from "react"
import { motion } from "framer-motion"
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { useNoIndex } from "@/hooks/useNoIndex"
import { trackLead, trackContact } from "@/lib/pixel"

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "digitalupwardco@gmail.com",
    note: "We respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (201) 304-0657",
    note: "Mon-Fri 9AM-6PM PST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "1001 S. Main St. STE 500",
    note: "Kalispell, MT 59901, USA",
  },
]

const serviceOptions = [
  "Web Development",
  "SEO Services",
  "Digital Marketing",
  "Brand Strategy",
  "Other",
]

const budgetOptions = [
  "Under $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
]

const faqItems = [
  {
    question: "What services does UpwardDigital offer?",
    answer:
      "We offer comprehensive digital solutions including web design & development, SEO optimization, digital marketing (social media, PPC, email), brand strategy & design, and content marketing. Each service is tailored to your specific business needs and goals.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A standard website typically takes 6-8 weeks, while comprehensive digital marketing campaigns run on 3-6 month cycles. During our initial consultation, we'll provide a detailed timeline tailored to your project.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing models including project-based pricing, monthly retainers, and custom packages. Our starter plans begin at $499/month. Visit our pricing page for detailed information, or contact us for a custom quote.",
  },
  {
    question: "Do you work with small businesses?",
    answer:
      "We work with businesses of all sizes, from startups to enterprise organizations. Our scalable solutions are designed to grow with your business, and we offer packages tailored to different budgets and needs.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We establish clear KPIs at the start of every engagement. We provide detailed monthly reports covering metrics like traffic growth, conversion rates, ROI, search rankings, and engagement metrics. Transparency is core to our approach.",
  },
  {
    question: "Can I see examples of your work?",
    answer:
      "Absolutely! Visit our portfolio page to see case studies and examples of our work across different industries and service areas. We're happy to share specific examples relevant to your industry during our consultation.",
  },
  {
    question: "What makes UpwardDigital different?",
    answer:
      "Our combination of data-driven strategy, creative excellence, and transparent communication sets us apart. We don't just execute tactics \u2014 we build comprehensive digital strategies aligned with your business objectives, backed by 10+ years of experience and a 98% client retention rate.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply fill out the contact form on this page, give us a call, or send an email. We'll schedule a free 30-minute consultation to discuss your goals and how we can help you achieve them.",
  },
]

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/upwarddigitalllcagency",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/upwarddigital.agency/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/upward-digital-90b7a2406/",
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    trackLead({
      content_name: "Contact Form",
      content_category: "lead_form",
      service: formData.service || "unspecified",
      budget: formData.budget || "unspecified",
    })

    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact_page",
          ...formData,
        }),
      })
    } catch (err) {
      console.error("Submission failed:", err)
    }

    alert("Thank you! We'll get back to you within 24 hours.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    })
  }

  const selectClasses =
    "flex h-11 w-full rounded-full border border-stone-300 bg-white px-5 py-2 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-stone-700 mb-2">
                Company
              </label>
              <Input
                id="company"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-2">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled className="bg-white text-stone-500">
                  Select a service
                </option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option} className="bg-white text-stone-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-stone-700 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled className="bg-white text-stone-500">
                  Select budget range
                </option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option} className="bg-white text-stone-900">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              className="min-h-[140px]"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            Send Message
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}

function ContactInfoCards() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Info Cards */}
      {contactInfo.map((info, i) => {
        const Icon = info.icon
        return (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="p-6 hover:border-primary transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-1">{info.title}</h4>
                  <p className="text-stone-700 text-sm">{info.value}</p>
                  <p className="text-stone-500 text-xs mt-1">{info.note}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}

      {/* Office Hours Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="p-6 hover:border-primary transition-all duration-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 mb-2">Office Hours</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between gap-6">
                  <span className="text-stone-600">Monday - Friday</span>
                  <span className="text-stone-700">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-stone-600">Saturday</span>
                  <span className="text-stone-700">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-stone-600">Sunday</span>
                  <span className="text-stone-700">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52871637.32961116!2d-161.68771742620467!3d36.01959388156759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2suk!4v1779396647514!5m2!1sen!2suk"
          width="100%"
          height="280"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Upward Digital location"
        />
      </motion.div>
    </motion.div>
  )
}

function ContactSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Contact Form */}
          <ContactForm />

          {/* Right - Contact Info */}
          <ContactInfoCards />
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-stone-200 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

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
  )
}

function SocialLinksSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Connect With Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact({ method: "social", source: `contact_${social.label.toLowerCase()}` })}
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="w-12 h-12 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)] transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Contact() {
  useNoIndex()
  return (
    <main className="bg-cream">
      {/* 1. Hero */}
      <PageHero
        title={<>Let's start something <em className="not-italic font-bold text-stone-900">great</em> together.</>}
        subtitle="Contact Us"
        description="Ready to elevate your digital presence? Get in touch and let's discuss how we can help your business grow."
      />

      {/* 2. Two Column Contact Section */}
      <ContactSection />

      {/* 3. FAQ Accordion */}
      <FAQSection />

      {/* 4. Social Links */}
      <SocialLinksSection />
    </main>
  )
}
