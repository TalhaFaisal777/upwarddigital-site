import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function ServiceCard({ icon: Icon, title, description, link = "/services", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/50 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blue-glow-sm" />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all duration-300"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  )
}
