import { motion } from "framer-motion"

export default function SectionHeading({ subtitle, title, description, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4">
          — {subtitle} —
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-4 text-stone-900">
        {title}
      </h2>
      {description && (
        <p className={`text-stone-600 max-w-2xl text-lg leading-relaxed ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
