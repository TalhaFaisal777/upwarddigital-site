import { motion } from "framer-motion"

export default function SectionHeading({ subtitle, title, description, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-sm tracking-wider uppercase mb-3">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? "text-white" : "text-white"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-gray-400 max-w-2xl text-lg ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
