import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Target, Lightbulb, TrendingUp, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/common/SectionHeading"
import PageHero from "@/components/common/PageHero"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/18302241590"

const categories = ["All", "Web Design", "SEO"]

const projects = [
  {
    id: 1,
    name: "Snowflake Limousine",
    category: "Web Design",
    description:
      "Luxury chauffeur and airport transfer service across Colorado's mountain destinations.",
    url: "https://snowflakelimo.com/",
    image: "/portfolio/snowflake-limousine.jpg",
  },
  {
    id: 2,
    name: "Dublin City Cab",
    category: "SEO",
    description:
      "Taxi and airport transfer service for the Dublin, California area with strong local search presence.",
    url: "https://dublincitycab.com/",
    image: "/portfolio/dublin-city-cab.jpg",
  },
  {
    id: 3,
    name: "Tri-Valley Airport Shuttle",
    category: "SEO",
    description:
      "Reliable Bay Area airport shuttle serving SFO, OAK, and SJC with optimized local rankings.",
    url: "https://trivalleyairportshuttle.com/",
    image: "/portfolio/tri-valley-airport-shuttle.jpg",
  },
  {
    id: 4,
    name: "Direct Shopfront",
    category: "Web Design",
    description:
      "Architectural fabrication and glazing specialist delivering shopfronts, shutters, and partitions across the UK.",
    url: "https://directshopfront.com/",
    image: "/portfolio/direct-shopfront.jpg",
  },
  {
    id: 5,
    name: "Formosa Bathrooms & Kitchens",
    category: "Web Design",
    description:
      "Bathroom and kitchen design and installation specialist based in West Yorkshire.",
    url: "https://formosabathrooms.co.uk/",
    image: "/portfolio/formosa-bathrooms.jpg",
  },
  {
    id: 6,
    name: "CR Glass Door & Window",
    category: "SEO",
    description:
      "Toronto-based glass, door, and window installation and repair service ranking for local search.",
    url: "https://crglassdoorandwindow.ca/",
    image: "/portfolio/cr-glass-door-and-window.jpg",
  },
  {
    id: 7,
    name: "GA Konnect LLC",
    category: "Web Design",
    description:
      "Professional car and limo service across Atlanta with airport, executive, and event transportation.",
    url: "https://gakonnectllc.com/",
    image: "/portfolio/ga-konnect.jpg",
  },
]

const caseStudyResults = [
  "40% increase in user engagement",
  "60% reduction in bounce rate",
  "3x faster page load times",
  "250% increase in trial-to-paid conversion",
]

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* ── Section 1: Page Hero ── */}
      <PageHero
        title={<>Our work speaks for <em className="font-serif italic font-medium text-primary">itself</em>.</>}
        subtitle="Portfolio"
        description="Explore our portfolio of successful projects across web development, SEO, digital marketing, and brand strategy."
      />

      {/* ── Section 2: Filter Tabs + Project Grid ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-stone-900/5 text-stone-600 hover:bg-stone-900/10 hover:text-stone-900 border border-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="overflow-hidden group hover:border-primary transition-all duration-500 h-full">
                      {/* Screenshot Area */}
                      <div className="relative h-56 overflow-hidden bg-white">
                        <img
                          src={project.image}
                          alt={`${project.name} website screenshot`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Dark hover overlay with button */}
                        <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                          <Button variant="outline" size="default" className="gap-2 pointer-events-none">
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </Button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <CardContent className="pt-5 pb-6 space-y-3">
                        <Badge>{project.category}</Badge>
                        <h3 className="text-lg font-semibold text-stone-900">
                          {project.name}
                        </h3>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Case Study ── */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="Case Study"
            title="Featured Project Deep Dive"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card className="h-full border-t-2 border-t-red-500 hover:border-red-500/30 transition-all duration-500">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">
                      Challenge
                    </h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Snowflake Limousine needed a modern booking experience that
                    reflected their premium service and made it effortless for
                    travelers to reserve airport transfers across Colorado.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="h-full border-t-2 border-t-blue-500 hover:border-blue-500/30 transition-all duration-500">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">
                      Solution
                    </h3>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    We built a polished, mobile-first website with a streamlined
                    quote and booking flow, clear fleet presentation, and local
                    SEO foundations to capture high-intent travelers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-t-2 border-t-green-500 hover:border-green-500/30 transition-all duration-500">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-stone-900">
                      Results
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {caseStudyResults.map((result, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-stone-600"
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 4: CTA ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              Have a project <em className="font-serif italic font-medium text-primary">in mind</em>?
            </h2>
            <p className="text-stone-600 text-lg max-w-xl mx-auto">
              Let's bring your vision to life with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button asChild size="lg" className="gap-2">
                <a href={PHONE_HREF}>
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </Button>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-[#25D366] text-white text-base font-medium hover:bg-[#1ebe5d] transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
