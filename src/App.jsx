import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "sonner"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/common/ScrollToTop"
import LoadingScreen from "@/components/common/LoadingScreen"
import FloatingActions from "@/components/common/FloatingActions"
import usePixelTracking from "@/hooks/usePixelTracking"

const Home = lazy(() => import("@/pages/Home"))
const About = lazy(() => import("@/pages/About"))
const Portfolio = lazy(() => import("@/pages/Portfolio"))
const Blog = lazy(() => import("@/pages/Blog"))
const Contact = lazy(() => import("@/pages/Contact"))
const Pricing = lazy(() => import("@/pages/Pricing"))
const BlogPost = lazy(() => import("@/pages/BlogPost"))
const Admin = lazy(() => import("@/pages/Admin"))
const AdminBlogList = lazy(() => import("@/pages/AdminBlogList"))
const AdminBlogEditor = lazy(() => import("@/pages/AdminBlogEditor"))
const AdMeta = lazy(() => import("@/pages/ads/AdMeta"))
const WebDevelopment = lazy(() => import("@/pages/services/WebDevelopment"))
const SeoServices = lazy(() => import("@/pages/services/SeoServices"))
const SocialMedia = lazy(() => import("@/pages/services/SocialMedia"))
const HostingServices = lazy(() => import("@/pages/services/HostingServices"))
const AdsServices = lazy(() => import("@/pages/services/AdsServices"))
const Sitemap = lazy(() => import("@/pages/Sitemap"))
const NotFound = lazy(() => import("@/pages/NotFound"))

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
        <Route path="/website-development" element={<PageWrapper><WebDevelopment /></PageWrapper>} />
        <Route path="/seo-services" element={<PageWrapper><SeoServices /></PageWrapper>} />
        <Route path="/social-media-marketing" element={<PageWrapper><SocialMedia /></PageWrapper>} />
        <Route path="/web-hosting-services" element={<PageWrapper><HostingServices /></PageWrapper>} />
        <Route path="/meta-google-ads" element={<PageWrapper><AdsServices /></PageWrapper>} />
        <Route path="/sitemap" element={<PageWrapper><Sitemap /></PageWrapper>} />
        <Route path="/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

function MainLayout() {
  usePixelTracking()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors closeButton />
      <ScrollToTop />
      <Routes>
        <Route path="/ads/preview" element={<AdMeta />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/blog" element={<AdminBlogList />} />
        <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
        <Route path="/admin/blog/:id" element={<AdminBlogEditor />} />
        <Route path="*" element={<><LoadingScreen /><MainLayout /></>} />
      </Routes>
    </Router>
  )
}

export default App
