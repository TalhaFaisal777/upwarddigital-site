import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Clock, ArrowRight, Mail, Users } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = ["All", "SEO", "Marketing", "Web Dev", "Design", "Strategy"]

const featuredPost = {
  category: "SEO",
  title: "The Complete Guide to SEO in 2024: Strategies That Actually Work",
  excerpt:
    "Discover the latest SEO techniques and proven strategies that are driving results for top brands. From AI-powered content optimization to technical SEO fundamentals...",
  author: "Alex Mitchell",
  date: "Dec 15, 2024",
  readTime: "12 min",
  gradient: "from-blue-600 via-purple-600 to-cyan-500",
}

const blogPosts = [
  {
    id: 1,
    category: "Marketing",
    title: "10 Social Media Trends Shaping 2024",
    excerpt:
      "From short-form video dominance to AI-powered personalization, these trends are reshaping how brands connect with audiences...",
    author: "Sarah Chen",
    date: "Dec 10, 2024",
    readTime: "8 min",
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    avatarColor: "bg-pink-500",
  },
  {
    id: 2,
    category: "Web Dev",
    title: "Why React Server Components Change Everything",
    excerpt:
      "Server Components represent a paradigm shift in how we build React applications. Here's what you need to know...",
    author: "James Wilson",
    date: "Dec 5, 2024",
    readTime: "10 min",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    avatarColor: "bg-cyan-500",
  },
  {
    id: 3,
    category: "SEO",
    title: "Local SEO: The Ultimate Guide for Small Businesses",
    excerpt:
      "Learn how to dominate local search results and drive foot traffic to your business with proven local SEO strategies...",
    author: "Maya Patel",
    date: "Nov 28, 2024",
    readTime: "15 min",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    avatarColor: "bg-green-500",
  },
  {
    id: 4,
    category: "Design",
    title: "The Psychology of Color in Brand Design",
    excerpt:
      "Color influences up to 90% of snap judgments about products. Learn how to leverage color psychology in your brand...",
    author: "Lisa Tanaka",
    date: "Nov 20, 2024",
    readTime: "7 min",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    avatarColor: "bg-violet-500",
  },
  {
    id: 5,
    category: "Strategy",
    title: "Building a Data-Driven Marketing Strategy",
    excerpt:
      "How to leverage analytics and data insights to create marketing campaigns that deliver consistent ROI...",
    author: "Ryan Cooper",
    date: "Nov 15, 2024",
    readTime: "11 min",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    avatarColor: "bg-amber-500",
  },
  {
    id: 6,
    category: "Marketing",
    title: "Email Marketing Automation: A Complete Playbook",
    excerpt:
      "Unlock the power of email automation to nurture leads, boost conversions, and scale your marketing efforts...",
    author: "David Okonkwo",
    date: "Nov 8, 2024",
    readTime: "9 min",
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    avatarColor: "bg-sky-500",
  },
]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Section 1: Page Hero */}
      <PageHero
        title="Insights & Resources"
        subtitle="Our Blog"
        description="Stay ahead with the latest trends, strategies, and insights in digital marketing, web development, and SEO."
      />

      {/* Section 2: Category Filter & Search */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-dark-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
      </section>

      {/* Section 3: Featured Post */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Image placeholder */}
              <div
                className={`bg-gradient-to-br ${featuredPost.gradient} min-h-[300px] md:min-h-[400px] relative`}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge>Featured</Badge>
                  <Badge variant="secondary">{featuredPost.category}</Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                      {featuredPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm text-gray-300">
                      {featuredPost.author}
                    </span>
                  </div>
                  <span className="text-gray-600">|</span>
                  <span className="text-sm text-gray-400">
                    {featuredPost.date}
                  </span>
                  <span className="text-gray-600">|</span>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime} read</span>
                  </div>
                </div>
                <div>
                  <Button variant="outline">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Section 4: Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
        <SectionHeading
          subtitle="Latest Articles"
          title="From Our Blog"
          description="Explore our latest insights and strategies to help grow your digital presence."
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                  {/* Image placeholder */}
                  <div
                    className={`bg-gradient-to-br ${post.gradient} aspect-video relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full ${post.avatarColor} flex items-center justify-center text-[10px] font-bold text-white`}
                        >
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{post.author}</span>
                          <span className="text-gray-600">&middot;</span>
                          <span>{post.date}</span>
                          <span className="text-gray-600">&middot;</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link
                        to="#"
                        className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveCategory("All")
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </section>

      {/* Section 5: Newsletter Signup Banner */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-primary/30 bg-gradient-to-r from-dark-card to-primary/5 overflow-hidden relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-primary" />

            <div className="p-8 md:p-12 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Get weekly insights on digital marketing, SEO, and web
                development delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button className="w-full sm:w-auto whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>Join 5,000+ marketers</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}
