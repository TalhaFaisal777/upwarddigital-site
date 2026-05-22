import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="text-[120px] md:text-[160px] font-bold leading-none text-stone-900 tracking-tighter mb-2">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4 tracking-tight">
          Page not found
        </h1>
        <p className="text-stone-500 text-lg mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-7 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  )
}
