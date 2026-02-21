import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ExternalLink, Target, Lightbulb, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/common/SectionHeading"
import PageHero from "@/components/common/PageHero"

const categories = ["All", "Web Design", "SEO", "Marketing", "Branding"]

const projects = [
  {
    id: 1,
    name: "TechVentures Platform",
    category: "Web Design",
    description:
      "A comprehensive SaaS platform redesign that increased user engagement by 40%.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    name: "GreenLeaf Organics",
    category: "SEO",
    description:
      "Organic search strategy that drove 350% traffic increase in 6 months.",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    name: "StyleHouse Boutique",
    category: "Web Design",
    description:
      "Luxury e-commerce experience with seamless checkout and 25% conversion boost.",
    gradient: "from-pink-500 to-purple-600",
  },
  {
    id: 4,
    name: "DataFlow Analytics",
    category: "Marketing",
    description:
      "Multi-channel campaign generating 200+ qualified leads monthly.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 5,
    name: "FitLife App",
    category: "Branding",
    description:
      "Complete brand identity and app design for a fitness tech startup.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 6,
    name: "CloudSync Solutions",
    category: "Web Design",
    description:
      "Enterprise dashboard with real-time analytics and intuitive UX.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 7,
    name: "EcoTravel Agency",
    category: "Marketing",
    description:
      "Social media strategy that grew following from 5K to 100K in 8 months.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: 8,
    name: "NovaTech Industries",
    category: "SEO",
    description:
      "Technical SEO overhaul resulting in #1 rankings for 50+ keywords.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    id: 9,
    name: "ArtisanBrew Co",
    category: "Branding",
    description:
      "Craft brewery rebrand that increased brand recognition by 60%.",
    gradient: "from-amber-500 to-orange-500",
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
        title="Our Work Speaks for Itself"
        subtitle="Portfolio"
        description="Explore our portfolio of successful projects across web development, SEO, digital marketing, and brand strategy."
      />

      {/* ── Section 2: Filter Tabs + Project Grid ── */}
      <section className="py-24 bg-dark">
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
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-dark-border"
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
                  <Card className="overflow-hidden group hover:border-primary/30 transition-all duration-500">
                    {/* Image / Gradient Area */}
                    <div className="relative h-56 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}
                      />
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:20px_20px]" />

                      {/* Dark hover overlay with button */}
                      <div className="absolute inset-0 bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <Button variant="outline" size="default" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View Project
                        </Button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="pt-5 pb-6 space-y-3">
                      <Badge>{project.category}</Badge>
                      <h3 className="text-lg font-semibold text-white">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Section 3: Case Study ── */}
      <section className="py-24 bg-dark-lighter/30">
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
                    <h3 className="text-xl font-semibold text-white">
                      Challenge
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    TechVentures had an outdated platform struggling with poor
                    user engagement, high bounce rates, and a complex onboarding
                    process that frustrated new users.
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
                    <h3 className="text-xl font-semibold text-white">
                      Solution
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    We redesigned the entire UX from the ground up, implementing
                    a modern React-based SPA, streamlining the onboarding flow,
                    and creating an intuitive dashboard experience.
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
                    <h3 className="text-xl font-semibold text-white">
                      Results
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {caseStudyResults.map((result, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-400"
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
      <section className="py-24 bg-dark">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Let's bring your vision to life with our expertise.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
