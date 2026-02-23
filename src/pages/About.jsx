import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Target,
  Eye,
  Lightbulb,
  Shield,
  TrendingUp,
  Heart,
  Linkedin,
  Twitter,
} from "lucide-react"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"

// ─── Data ────────────────────────────────────────────────────────────────────

const teamMembers = [
  { name: "Muhammad Talha", title: "CEO & Founder", initials: "MT", gradient: "from-primary to-cyan-accent" },

  { name: "James Wilson", title: "Head of Development", initials: "JW", gradient: "from-emerald-500 to-teal-500" },
  { name: "Maya Patel", title: "SEO Director", initials: "MP", gradient: "from-orange-500 to-amber-500" },
  { name: "Ryan Cooper", title: "Marketing Strategist", initials: "RC", gradient: "from-primary to-indigo-500" },
  { name: "Lisa Tanaka", title: "UX/UI Designer", initials: "LT", gradient: "from-rose-500 to-pink-500" },
  { name: "David Okonkwo", title: "Content Lead", initials: "DO", gradient: "from-cyan-accent to-emerald-500" },
  { name: "Sophie Martin", title: "Client Relations", initials: "SM", gradient: "from-violet-500 to-purple-500" },
]

const milestones = [
  { year: "2015", title: "Founded", description: "Started with a small team of 3 passionate digital marketers in Kalispell, Montana." },
  { year: "2016", title: "First Major Client", description: "Landed our first enterprise client and grew to a team of 10." },
  { year: "2018", title: "100th Project", description: "Celebrated our 100th successful project with a 96% satisfaction rate." },
  { year: "2019", title: "Agency Award", description: "Recognized as a Top 50 Digital Agency by Marketing Weekly." },
  { year: "2021", title: "Global Expansion", description: "Expanded operations internationally with clients in 15+ countries." },
  { year: "2023", title: "500+ Projects", description: "Surpassed 500 successful projects with industry-leading retention rates." },
  { year: "2024", title: "Industry Leader", description: "Named Best Digital Agency for mid-market businesses." },
]

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay ahead of digital trends, constantly exploring new technologies and strategies to give our clients a competitive edge.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Open communication and honest reporting are at the core of every client relationship we build.",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven",
    description:
      "Every strategy we develop is backed by data and focused on delivering measurable, impactful results.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description:
      "Your success is our success. We treat every client's business as if it were our own.",
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function OurStorySection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left – copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Story
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              Founded in 2015 by a group of passionate digital marketers,
              UpwardDigitalCo was born from a simple belief: every business
              deserves access to world-class digital strategy, regardless of its
              size. What started as a scrappy three-person team in Kalispell, Montana
              quickly grew into something much bigger.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-5">
              Over the years we expanded our expertise across SEO, paid media,
              content strategy, UX design, and full-stack development. Each new
              discipline was added with the same guiding principle — deliver
              enterprise-level results without the enterprise-level price tag.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Today our mission remains unchanged: to democratize digital
              marketing and make cutting-edge strategies accessible to
              businesses of all sizes. From ambitious startups to established
              brands, we partner with companies ready to grow — and we grow
              right alongside them.
            </p>
          </motion.div>

          {/* Right – styled placeholder image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              {/* Dark gradient base */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-lighter to-dark-card" />

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Blue overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-cyan-accent/10" />

              {/* Abstract circles */}
              <div className="absolute top-12 left-12 w-32 h-32 rounded-full border border-primary/30 animate-float" />
              <div className="absolute bottom-16 right-16 w-48 h-48 rounded-full border border-cyan-accent/20 animate-float-delayed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5" />

              {/* Diagonal lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(59,130,246,0.2) 60px, rgba(59,130,246,0.2) 61px)",
                  }}
                />
              </div>

              {/* Glow spots */}
              <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-cyan-accent/10 rounded-full blur-3xl" />
            </div>

            {/* Floating stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 glass rounded-xl px-6 py-4 blue-glow-sm"
            >
              <span className="block text-2xl font-bold text-primary">10+</span>
              <span className="text-sm text-gray-300">Years of Excellence</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MissionVisionSection() {
  return (
    <section className="py-24 bg-dark-lighter/30 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-10 hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              To empower businesses of every size with innovative digital
              strategies that drive measurable growth, foster meaningful
              connections, and deliver exceptional ROI.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass rounded-2xl p-10 hover:border-primary/30 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              To be the most trusted digital partner for ambitious brands
              worldwide, setting the standard for innovation, transparency, and
              results in the digital marketing industry.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative rounded-2xl bg-dark-card border border-dark-border overflow-hidden hover:border-primary/50 transition-all duration-500">
        {/* Avatar area */}
        <div className="relative flex items-center justify-center pt-10 pb-6">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
          >
            {member.initials}
          </div>

          {/* Hover overlay with social icons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 bg-dark-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="#"
              aria-label={`${member.name} on LinkedIn`}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label={`${member.name} on Twitter`}
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="text-center pb-8 px-4">
          <h4 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
            {member.name}
          </h4>
          <p className="text-gray-400 text-sm mt-1">{member.title}</p>
        </div>
      </div>
    </motion.div>
  )
}

function TeamSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading subtitle="Our Team" title="Meet the Experts" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineMilestone({ milestone, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative flex items-start md:items-center justify-center">
      {/* Left content (desktop) */}
      <div className={`hidden md:block w-5/12 ${isLeft ? "text-right pr-12" : "order-3 text-left pl-12"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-1">
            {milestone.year}
          </span>
          <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
          <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>

      {/* Center line & dot */}
      <div className="relative flex flex-col items-center md:order-2 z-10 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
          className="w-5 h-5 rounded-full bg-primary border-4 border-dark shadow-[0_0_12px_rgba(59,130,246,0.5)]"
        />
        {!isLast && (
          <div className="w-0.5 h-28 md:h-32 bg-gradient-to-b from-primary/60 to-primary/10" />
        )}
      </div>

      {/* Empty spacer (desktop) */}
      <div className={`hidden md:block w-5/12 ${isLeft ? "order-3" : ""}`} />

      {/* Mobile content */}
      <div className="md:hidden pl-6 pb-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-block text-primary font-bold text-lg mb-1">
            {milestone.year}
          </span>
          <h4 className="text-xl font-semibold mb-2">{milestone.title}</h4>
          <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>
    </div>
  )
}

function TimelineSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading
          subtitle="Our Journey"
          title="Company Timeline"
          description="From humble beginnings to industry recognition, here are the milestones that shaped who we are."
        />

        <div className="relative mt-12">
          {milestones.map((milestone, i) => (
            <TimelineMilestone
              key={milestone.year}
              milestone={milestone}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CoreValuesSection() {
  return (
    <section className="py-24 bg-dark-lighter/30 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeading subtitle="Our Values" title="What Drives Us" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {coreValues.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blue-glow-sm" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <main>
      {/* 1. Hero */}
      <PageHero
        title="About UpwardDigitalCo"
        subtitle="Our Story"
        description="Discover the team and vision behind one of the fastest-growing digital agencies."
      />

      {/* 2. Our Story */}
      <OurStorySection />

      {/* 3. Mission & Vision */}
      <MissionVisionSection />

      {/* 4. Team */}
      <TeamSection />

      {/* 5. Timeline / Company Journey */}
      <TimelineSection />

      {/* 6. Core Values */}
      <CoreValuesSection />
    </main>
  )
}
