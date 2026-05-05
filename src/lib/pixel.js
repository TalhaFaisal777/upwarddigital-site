// Thin wrapper around the Meta (Facebook) Pixel.
// The base script + init lives in index.html. These helpers fire events
// from React code without the rest of the app caring whether the pixel
// is ready (it queues calls automatically until init resolves).

const fbq = (...args) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args)
  }
}

// ─── Standard Meta events (what Meta Ads Manager understands natively) ──
export const trackPageView = () => fbq("track", "PageView")

// "User clicked phone, WhatsApp, email, or social CTA"
export const trackContact = (params = {}) => fbq("track", "Contact", params)

// "User submitted a form / requested a quote"
export const trackLead = (params = {}) => fbq("track", "Lead", params)

// "User booked / scheduled a call"
export const trackSchedule = (params = {}) => fbq("track", "Schedule", params)

// "User looked at high-intent content (pricing tier, service page, portfolio item)"
export const trackViewContent = (params = {}) => fbq("track", "ViewContent", params)

// "User started a checkout-style flow (clicked a pricing tier CTA)"
export const trackInitiateCheckout = (params = {}) =>
  fbq("track", "InitiateCheckout", params)

// "User searched the blog / portfolio"
export const trackSearch = (params = {}) => fbq("track", "Search", params)

// "User subscribed to something"
export const trackSubscribe = (params = {}) => fbq("track", "Subscribe", params)

// ─── Custom events (any name you can later promote to a custom conversion) ──
// Use these for granular optimisation and audience-building inside Meta.
export const trackCustom = (name, params = {}) => fbq("trackCustom", name, params)

// Convenience helpers for the agency-specific events we want to monitor:
export const trackScrollDepth = (depth) =>
  trackCustom("ScrollDepth", { depth_pct: depth })

export const trackTimeOnSite = (seconds) =>
  trackCustom("TimeOnSite", { seconds })

export const trackOutboundClick = (url, label) =>
  trackCustom("OutboundClick", { url, label })

export const trackPortfolioClick = (project) =>
  trackCustom("PortfolioClick", { project })

export const trackServiceInterest = (service) =>
  trackCustom("ServiceInterest", { service })

export const trackPricingTierClick = (tier) =>
  trackCustom("PricingTierClick", { tier })

export const trackBlogPostClick = (post) =>
  trackCustom("BlogPostClick", { post })

export const trackHeroSlideView = (slide) =>
  trackCustom("HeroSlideView", { slide })

export const trackTestimonialView = () => trackCustom("TestimonialView")

export const trackFooterCTAClick = (cta) =>
  trackCustom("FooterCTAClick", { cta })
