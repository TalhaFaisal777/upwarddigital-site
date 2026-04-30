import { Link } from "react-router-dom"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react"

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

const services = [
  { name: "Web Development", path: "/services" },
  { name: "SEO Services", path: "/services" },
  { name: "Digital Marketing", path: "/services" },
  { name: "Brand Strategy", path: "/services" },
  { name: "UI/UX Design", path: "/services" },
  { name: "Content Marketing", path: "/services" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/upwarddigitalllcagency", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/upwarddigital.agency/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/upward-digital-90b7a2406/", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA strip */}
        <div className="py-12 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-xl">
            Let's build something <em className="font-serif italic text-blue-400">worth scaling</em>.
          </h3>
          <a
            href="tel:+12013040657"
            className="inline-flex items-center gap-2 bg-white text-stone-900 px-7 py-3.5 rounded-full font-medium hover:bg-blue-400 hover:text-white transition-colors group"
          >
            Book a free call
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

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
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              A full-service digital studio building high-performance websites,
              data-driven SEO and marketing strategies for ambitious brands.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Pages</h4>
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
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Services</h4>
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
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h4>
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
