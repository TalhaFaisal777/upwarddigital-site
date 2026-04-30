import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/18302241590"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Only the home page has a dark hero behind the navbar.
  // On every other page the navbar sits over the cream-colored PageHero,
  // so it should always use the light (dark-text) styling.
  const isHomePage = location.pathname === "/"
  const useDarkOverlay = !isHomePage || isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
  }, [mobileOpen])

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-stone-900 text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <span className="font-medium">Free 30-min strategy call — limited slots this month</span>
          <span className="hidden sm:inline opacity-50">·</span>
          <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 font-semibold text-blue-300 hover:text-white">
            <Phone className="w-3.5 h-3.5" />
            +1 (201) 304-0657
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-green-300 hover:text-white">
            <WhatsAppIcon className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      <nav
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
          useDarkOverlay
            ? "bg-cream/95 backdrop-blur-lg border-b border-stone-900/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" aria-label="UpwardDigital home" className="flex items-center">
              <img
                src="/logo.png"
                alt="UpwardDigital"
                className={`h-14 md:h-16 w-auto object-contain transition-all ${useDarkOverlay ? "" : "brightness-0 invert drop-shadow-md"}`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      useDarkOverlay
                        ? isActive
                          ? "text-primary bg-primary/10"
                          : "text-stone-700 hover:text-stone-900 hover:bg-stone-900/5"
                        : isActive
                          ? "text-white bg-white/15"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2">
              <a
                href={PHONE_HREF}
                className={`hidden lg:inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-colors ${
                  useDarkOverlay
                    ? "bg-stone-900 text-white hover:bg-primary"
                    : "bg-white text-stone-900 hover:bg-primary hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                Call Us Now
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5d] transition-colors">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 transition-colors ${useDarkOverlay ? "text-stone-700 hover:text-stone-900" : "text-white hover:text-white/80"}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-cream border-l border-stone-900/10 z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-stone-900/10">
                  <img src="/logo.png" alt="UpwardDigital" className="h-10 w-auto object-contain" />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-stone-600 hover:text-stone-900"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 py-6 px-4 overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          location.pathname === link.path
                            ? "text-primary bg-primary/10"
                            : "text-stone-700 hover:text-stone-900 hover:bg-stone-900/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="p-6 border-t border-stone-900/10 space-y-3">
                  <a href={PHONE_HREF} className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                  <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5d] transition-colors">
                    <WhatsAppIcon className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
