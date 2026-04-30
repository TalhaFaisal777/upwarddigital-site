import { motion } from "framer-motion"
import { Target, Eye, Lightbulb, Shield, TrendingUp, Heart } from "lucide-react"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"

const teamMembers = [
  { name: "Muhammad Talha", title: "CEO & Founder", initials: "MT" },
  { name: "James Wilson", title: "Head of Development", initials: "JW" },
  { name: "Maya Patel", title: "SEO Director", initials: "MP" },
  { name: "Ryan Cooper", title: "Marketing Strategist", initials: "RC" },
  { name: "Lisa Tanaka", title: "UX/UI Designer", initials: "LT" },
  { name: "David Okonkwo", title: "Content Lead", initials: "DO" },
  { name: "Sophie Martin", title: "Client Relations", initials: "SM" },
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
  { icon: Lightbulb, title: "Innovation", description: "We stay ahead of digital trends, constantly exploring new technologies and strategies to give our clients a competitive edge." },
  { icon: Shield, title: "Transparency", description: "Open communication and honest reporting are at the core of every client relationship we build." },
  { icon: TrendingUp, title: "Results-Driven", description: "Every strategy we develop is backed by data and focused on delivering measurable, impactful results." },
  { icon: Heart, title: "Client-First", description: "Your success is our success. We treat every client's business as if it were our own." },
]

export default function About() {
  return (
    <main className="bg-cream">
      <PageHero
        title={<>About <em className="font-serif italic font-medium text-primary">Us</em>.</>}
        subtitle="Our Story"
        description="Discover the team and vision behind one of the fastest-growing digital agencies."
      />

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              — Who we are —
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-8 text-stone-900">
              We've been growing brands since <em className="font-serif italic font-medium text-primary">2015</em>.
            </h2>
            <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
              <p>
                Founded in 2015 by a group of passionate digital marketers,
                UpwardDigital was born from a simple belief: every business
                deserves access to world-class digital strategy, regardless of its
                size. What started as a scrappy three-person team in Kalispell, Montana
                quickly grew into something much bigger.
              </p>
              <p>
                Over the years we expanded our expertise across SEO, paid media,
                content strategy, UX design, and full-stack development. Each new
                discipline was added with the same guiding principle — deliver
                enterprise-level results without the enterprise-level price tag.
              </p>
              <p>
                Today our mission remains unchanged: to democratize digital
                marketing and make cutting-edge strategies accessible to
                businesses of all sizes.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-stone-900 p-12 flex flex-col justify-end">
              <div className="absolute inset-0 opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <div className="absolute top-12 left-12 w-32 h-32 rounded-full border border-blue-400/40" />
              <div className="absolute bottom-32 right-12 w-48 h-48 rounded-full border border-blue-400/20" />
              <div className="relative">
                <div className="text-7xl md:text-8xl font-bold text-white tracking-tight mb-2">9+</div>
                <div className="text-blue-300 text-lg">years building brands that matter</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white border-y border-stone-900/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="p-10 rounded-3xl border border-stone-200 hover:border-stone-900 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-stone-900">Our Mission</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              To empower ambitious businesses with cutting-edge digital strategies,
              innovative design, and data-driven solutions that drive real, measurable growth.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-10 rounded-3xl border border-stone-200 hover:border-stone-900 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-stone-900">Our Vision</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              To be the most trusted digital partner for ambitious brands worldwide,
              setting the standard for innovation, transparency, and results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="The team"
            title={<>Senior people, <em className="font-serif italic font-medium text-primary">no juniors</em>.</>}
            description="Every project is led by people who've been in the industry long enough to know what actually works."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white border border-stone-200 rounded-3xl p-6 hover:border-stone-900 transition-colors group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-accent flex items-center justify-center text-xl font-bold text-white mb-5">
                  {m.initials}
                </div>
                <h4 className="text-base font-bold text-stone-900 mb-1 tracking-tight">{m.name}</h4>
                <p className="text-stone-600 text-sm">{m.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Milestones */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-blue-400 font-semibold text-xs tracking-[0.2em] uppercase mb-4">
              — Our Journey —
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              From <em className="font-serif italic font-medium text-blue-400">3 people</em> to industry leader.
            </h2>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-l-2 border-blue-400/40 pl-8 py-2"
              >
                <div className="text-blue-400 font-bold text-2xl mb-2">{m.year}</div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{m.title}</h3>
                <p className="text-stone-400 leading-relaxed">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SectionHeading
            subtitle="What we stand for"
            title={<>Values that <em className="font-serif italic font-medium text-primary">show up</em> in our work.</>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-stone-200 rounded-3xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-stone-900">{v.title}</h3>
                <p className="text-stone-600 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
