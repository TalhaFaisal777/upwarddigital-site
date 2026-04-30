import { Phone, ArrowUpRight, TrendingUp, Star, Search } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// Each variant is exactly 1080 × 1080 — the Meta feed square format.
// To export: navigate to /ads/preview, then screenshot each card individually
// or use headless chrome with --window-size=1080,1080.
// ─────────────────────────────────────────────────────────────────────────────

function AdFrame({ children, label }) {
  return (
    <div className="my-10 mx-auto" style={{ width: 1080 }}>
      <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 ml-2">{label}</div>
      <div
        className="overflow-hidden shadow-2xl rounded-3xl"
        style={{ width: 1080, height: 1080 }}
      >
        {children}
      </div>
    </div>
  )
}

// ───── Variant A — Editorial Bold ────────────────────────────────────────────
function VariantA() {
  return (
    <div className="w-full h-full relative bg-[#F7F4EE] overflow-hidden flex flex-col justify-between p-20">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1c1917 2px, transparent 2px)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Soft gradient accent */}
      <div className="absolute -top-40 -right-32 w-[640px] h-[640px] rounded-full bg-blue-200/50 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-amber-200/40 blur-3xl" />

      {/* Top: logo + badge */}
      <div className="relative flex items-start justify-between">
        <img src="/logo.png" alt="UpwardDigital" className="h-20 w-auto" />
        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-stone-900/10 px-5 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium tracking-wider uppercase text-stone-700">Digital Agency · Est. 2015</span>
        </div>
      </div>

      {/* Middle: headline */}
      <div className="relative">
        <h1 className="font-bold tracking-tight leading-[0.95] text-stone-900" style={{ fontSize: 110 }}>
          Stop being<br />
          invisible on
          <span className="font-serif italic font-medium text-blue-700"> Google.</span>
        </h1>
        <p className="mt-10 text-3xl text-stone-700 leading-relaxed max-w-3xl">
          Custom websites + local SEO for service businesses.
          <span className="block mt-2 text-stone-900 font-semibold">Start ranking. Start booking.</span>
        </p>
      </div>

      {/* Bottom: CTA + URL */}
      <div className="relative flex items-end justify-between">
        <div className="flex items-center gap-3 bg-stone-900 text-white px-9 py-5 rounded-full shadow-xl">
          <Phone className="w-7 h-7" />
          <span className="text-2xl font-semibold">Book Free Strategy Call</span>
          <ArrowUpRight className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-stone-900">upwarddigitalco.com</div>
          <div className="text-lg text-stone-500 mt-1">+1 (201) 304-0657</div>
        </div>
      </div>
    </div>
  )
}

// ───── Variant B — Dark with Google Search Mockup ────────────────────────────
function VariantB() {
  return (
    <div className="w-full h-full relative bg-stone-900 overflow-hidden p-20 flex flex-col justify-between">
      {/* Subtle blue glow */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl" />

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <img src="/logo.png" alt="UpwardDigital" className="h-20 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full">
          <div className="flex gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
          </div>
          <span className="text-sm font-medium text-white">4.9/5 · 87 reviews</span>
        </div>
      </div>

      {/* Middle */}
      <div className="relative">
        <div className="text-blue-400 text-xl font-semibold tracking-[0.25em] uppercase mb-6">— Local SEO that ranks —</div>
        <h1 className="font-bold tracking-tight leading-[0.95] text-white mb-10" style={{ fontSize: 100 }}>
          Be the
          <span className="font-serif italic font-medium text-blue-400"> #1 result</span>
          <br />
          when your customer
          <br />
          searches.
        </h1>

        {/* Google search bar mockup */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl">
          <div className="flex items-center gap-4 px-6 py-4 border border-stone-300 rounded-full">
            <Search className="w-6 h-6 text-stone-500" />
            <span className="text-2xl text-stone-700 flex-1">"airport shuttle near me"</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div className="mt-5 px-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">1</div>
            <div>
              <div className="text-blue-700 text-xl font-semibold">Your Business — Highly Rated · Open Now</div>
              <div className="text-stone-600 text-base">yourbusiness.com · ★★★★★ (243 reviews)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative flex items-end justify-between">
        <div>
          <div className="text-white text-2xl font-bold">upwarddigitalco.com</div>
          <div className="text-stone-400 text-lg mt-1">120+ businesses ranked since 2015</div>
        </div>
        <div className="flex items-center gap-3 bg-white text-stone-900 px-9 py-5 rounded-full shadow-xl">
          <Phone className="w-7 h-7" />
          <span className="text-2xl font-semibold">Get on Page 1</span>
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

// ───── Variant C — Big Number / Result Focus ─────────────────────────────────
function VariantC() {
  return (
    <div className="w-full h-full relative bg-[#F7F4EE] overflow-hidden flex flex-col p-20">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1c1917 2px, transparent 2px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top */}
      <div className="relative flex items-start justify-between">
        <img src="/logo.png" alt="UpwardDigital" className="h-20 w-auto" />
        <div className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-full">
          <TrendingUp className="w-5 h-5 text-blue-300" />
          <span className="text-sm font-semibold tracking-wider uppercase">Real Results · Real Numbers</span>
        </div>
      </div>

      {/* Massive stat */}
      <div className="relative flex-1 flex items-center justify-center text-center">
        <div>
          <div className="text-blue-700 text-4xl font-medium tracking-wider mb-4">From invisible to</div>
          <div className="font-bold tracking-tight text-stone-900 leading-[0.85]" style={{ fontSize: 380, fontFeatureSettings: '"ss01"' }}>
            #1
          </div>
          <div className="text-5xl font-bold text-stone-900 tracking-tight mt-4 max-w-3xl mx-auto leading-tight">
            on Google in under <span className="font-serif italic font-medium text-blue-700">90 days.</span>
          </div>
          <div className="text-2xl text-stone-600 mt-6 max-w-2xl mx-auto">
            That's what we do for service businesses.
            Limos. Taxis. Glaziers. Contractors. You.
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative flex items-end justify-between">
        <div>
          <div className="text-stone-900 text-2xl font-bold">upwarddigitalco.com</div>
          <div className="text-stone-500 text-lg mt-1">+1 (201) 304-0657</div>
        </div>
        <div className="flex items-center gap-3 bg-blue-700 text-white px-9 py-5 rounded-full shadow-xl">
          <Phone className="w-7 h-7" />
          <span className="text-2xl font-semibold">Book Free Call</span>
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

// ───── Variant D — Before / After ─────────────────────────────────────────────
function VariantD() {
  return (
    <div className="w-full h-full relative bg-[#F7F4EE] overflow-hidden flex flex-col p-12">
      {/* Top */}
      <div className="flex items-start justify-between mb-8">
        <img src="/logo.png" alt="UpwardDigital" className="h-16 w-auto" />
        <div className="text-right">
          <div className="text-2xl font-bold text-stone-900">upwarddigitalco.com</div>
          <div className="text-base text-stone-500">Since 2015 · 120+ clients</div>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-bold tracking-tight text-stone-900 leading-[1] mb-12" style={{ fontSize: 84 }}>
        From <span className="font-serif italic text-stone-400 font-medium">page 5</span> to
        <span className="text-blue-700"> page 1</span>.
      </h1>

      {/* Before / After cards */}
      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="bg-white rounded-3xl border-2 border-stone-300 p-10 relative flex flex-col">
          <div className="absolute -top-4 left-8 bg-stone-300 text-stone-900 px-5 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">Before</div>
          <div className="text-stone-400 text-2xl mb-5">Where most service businesses are stuck:</div>
          <div className="space-y-3 text-stone-500 text-xl flex-1">
            <div>❌ Page 4-5 of Google</div>
            <div>❌ Phone barely rings</div>
            <div>❌ Slow, outdated website</div>
            <div>❌ Paying for ads to compete</div>
          </div>
          <div className="mt-6 text-2xl font-semibold text-stone-400">"Why isn't this working?"</div>
        </div>

        <div className="bg-stone-900 rounded-3xl p-10 relative flex flex-col">
          <div className="absolute -top-4 left-8 bg-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">After UpwardDigital</div>
          <div className="text-blue-300 text-2xl mb-5">Where we get you:</div>
          <div className="space-y-3 text-white text-xl flex-1">
            <div>✅ Top 3 on Google</div>
            <div>✅ Phone ringing daily</div>
            <div>✅ Fast, modern website</div>
            <div>✅ Free organic traffic</div>
          </div>
          <div className="mt-6 text-2xl font-semibold text-blue-400">"Wish we'd done this sooner."</div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex items-center justify-between">
        <div className="text-stone-700 text-2xl">
          <span className="font-bold text-stone-900">Free 30-min strategy call</span> — no commitment.
        </div>
        <div className="flex items-center gap-3 bg-stone-900 text-white px-9 py-5 rounded-full shadow-xl">
          <Phone className="w-7 h-7" />
          <span className="text-2xl font-semibold">Book Now</span>
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}

export default function AdMeta() {
  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Meta Ad Creatives — 1080×1080</h1>
        <p className="text-stone-600">Right-click each ad → Save Image As, or screenshot at exact size.</p>
      </div>

      <AdFrame label="Variant A — Editorial Bold (matches your site)">
        <VariantA />
      </AdFrame>

      <AdFrame label="Variant B — Dark with Google Search Mockup">
        <VariantB />
      </AdFrame>

      <AdFrame label="Variant C — Big Result Number (#1 in 90 days)">
        <VariantC />
      </AdFrame>

      <AdFrame label="Variant D — Before / After Comparison">
        <VariantD />
      </AdFrame>
    </div>
  )
}
