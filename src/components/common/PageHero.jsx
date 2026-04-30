import { motion } from "framer-motion"

export default function PageHero({ title, subtitle, description, children }) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 sm:pb-20 overflow-hidden bg-cream">
      {/* Subtle dotted background */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Floating accent dots */}
      <div className="absolute top-32 left-[5%] w-32 h-32 bg-blue-200/40 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-[8%] w-40 h-40 bg-amber-200/40 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-8 text-center">
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary font-semibold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 sm:mb-4"
          >
            — {subtitle} —
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-[1.05] tracking-tight text-stone-900"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
