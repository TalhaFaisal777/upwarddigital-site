import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function ServiceCard({ icon: Icon, title, description, link = "/services", index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white border border-stone-200 rounded-3xl p-8 hover:border-stone-900 transition-colors"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-stone-900 tracking-tight">
        {title}
      </h3>
      <p className="text-stone-600 mb-6 leading-relaxed">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-1.5 text-stone-900 text-sm font-medium hover:text-primary transition-colors"
      >
        Learn more
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </Link>
    </motion.div>
  )
}
