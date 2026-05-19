import { Phone } from "lucide-react"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"
import { trackContact } from "@/lib/pixel"

const PHONE_HREF = "tel:+12013040657"
const WHATSAPP_HREF = "https://wa.me/15812947936"

export default function FloatingActions() {
  return (
    <div className="lg:hidden fixed bottom-5 right-5 z-[55] flex flex-col gap-3 print:hidden">
      {/* Call button */}
      <a
        href={PHONE_HREF}
        onClick={() => trackContact({ method: "phone", source: "floating" })}
        aria-label="Call us"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-stone-900 text-white shadow-2xl hover:bg-primary transition-colors"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-stone-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Call us now
        </span>
      </a>

      {/* WhatsApp button — pulsing ring to draw attention */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact({ method: "whatsapp", source: "floating" })}
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#1ebe5d] transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" style={{ animationDuration: "2.5s" }} />
        <WhatsAppIcon className="relative w-7 h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-stone-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  )
}
