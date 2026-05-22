import { Link } from "react-router-dom"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"
import { trackContact } from "@/lib/pixel"

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
]

const services = [
  { name: "Web Development", path: "/services/website-development" },
  { name: "Google SEO Services", path: "/services/seo" },
  { name: "Social Media", path: "/services/social-media" },
  { name: "Hosting Services", path: "/services/hosting" },
  { name: "Meta Ads & Google Ads", path: "/services/ads" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/upwarddigitalllcagency", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/upwarddigital.agency/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/upward-digital-co/", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-5">
              <img
                src="/logo.png"
                alt="UpwardDigital"
                className="h-16 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 18px rgba(96,165,250,0.35)) brightness(1.15)" }}
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed mb-5">
              Website development, SEO, local SEO, and digital marketing services designed to help your business rank higher, get more leads, and grow online.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact({ method: "social", source: `footer_${s.label.toLowerCase()}` })}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Pages</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-stone-400 hover:text-white text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Services</h5>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link to={s.path} className="text-stone-400 hover:text-white text-sm transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h5>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="text-stone-400">digitalupwardco@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="text-stone-400">+1 (201) 304-0657</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span className="text-stone-400">
                  1001 S. Main St. STE 500<br />Kalispell, MT 59901, USA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-stone-500">© 2024 UpwardDigital. All rights reserved.</p>
          <div className="flex items-center gap-6 text-stone-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
