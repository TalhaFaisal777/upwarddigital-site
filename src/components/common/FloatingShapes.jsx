import { motion } from "framer-motion"

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Circle 1 */}
      <motion.div
        animate={{
          y: [0, -20, 10, 0],
          x: [0, 10, -5, 0],
          rotate: [0, 5, -3, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full border border-primary/20"
        style={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)" }}
      />

      {/* Triangle */}
      <motion.div
        animate={{
          y: [0, 15, -10, 0],
          x: [0, -8, 12, 0],
          rotate: [0, 10, -5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-[15%] w-0 h-0"
        style={{
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderBottom: "26px solid rgba(59, 130, 246, 0.15)",
          filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.1))",
        }}
      />

      {/* Circle 2 */}
      <motion.div
        animate={{
          y: [0, 12, -15, 0],
          rotate: [0, -8, 5, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/3 left-[20%] w-12 h-12 rounded-full bg-cyan-accent/5 border border-cyan-accent/10"
      />

      {/* Square */}
      <motion.div
        animate={{
          y: [0, -18, 8, 0],
          x: [0, 5, -10, 0],
          rotate: [45, 50, 40, 45],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[20%] right-[25%] w-10 h-10 border border-primary/15 rotate-45"
      />

      {/* Small circle */}
      <motion.div
        animate={{
          y: [0, 20, -5, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-[10%] w-6 h-6 rounded-full bg-primary/10"
      />

      {/* Dotted circle */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] left-[8%] w-32 h-32 rounded-full border border-dashed border-primary/10"
      />
    </div>
  )
}
