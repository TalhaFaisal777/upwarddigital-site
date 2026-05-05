import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import {
  trackPageView,
  trackViewContent,
  trackScrollDepth,
  trackTimeOnSite,
} from "@/lib/pixel"

// Fires a Meta Pixel PageView whenever the SPA route changes,
// plus auto-fires ViewContent on high-intent pages (Pricing, Services, Portfolio).
// Also tracks scroll depth (25/50/75/100) and time-on-site milestones (30s, 60s, 180s, 300s).
export default function usePixelTracking() {
  const location = useLocation()
  const scrollDepthsHit = useRef(new Set())
  const timeMilestonesHit = useRef(new Set())

  // Route change → PageView + ViewContent on high-intent pages
  useEffect(() => {
    trackPageView()

    const path = location.pathname
    const highIntentPages = {
      "/pricing": { content_name: "Pricing", content_category: "pricing" },
      "/services": { content_name: "Services", content_category: "services" },
      "/portfolio": { content_name: "Portfolio", content_category: "portfolio" },
      "/contact": { content_name: "Contact", content_category: "contact" },
      "/about": { content_name: "About", content_category: "about" },
    }
    if (highIntentPages[path]) {
      trackViewContent(highIntentPages[path])
    }

    // Reset milestones on route change
    scrollDepthsHit.current = new Set()
  }, [location.pathname])

  // Scroll-depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((window.scrollY / docHeight) * 100)
      ;[25, 50, 75, 100].forEach((threshold) => {
        if (pct >= threshold && !scrollDepthsHit.current.has(threshold)) {
          scrollDepthsHit.current.add(threshold)
          trackScrollDepth(threshold)
        }
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Time-on-site milestones (cumulative across the session, fires once each)
  useEffect(() => {
    const milestones = [30, 60, 180, 300]
    const timers = milestones.map((seconds) =>
      setTimeout(() => {
        if (!timeMilestonesHit.current.has(seconds)) {
          timeMilestonesHit.current.add(seconds)
          trackTimeOnSite(seconds)
        }
      }, seconds * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [])
}
