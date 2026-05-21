import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { trackBlogPostClick, trackLead } from "@/lib/pixel";

const SERVICE_ITEMS = [
  "Website Development",
  "SEO Services",
  "Local SEO / Google Maps",
  "Google Ads (PPC)",
  "Social Media Marketing",
  "Branding & Design",
  "E-Commerce Development",
  "Digital Marketing",
];

const SERVICE_ICONS = ["💻", "🔎", "📍", "📣", "📱", "🎨", "🛒", "📈"];

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    fetch(`/api/posts/${encodeURIComponent(slug)}`, { signal: controller.signal })
      .then(async (r) => {
        if (r.status === 404) return { ok: false, notfound: true };
        if (!r.ok) throw new Error(`Server ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data?.notfound) return setStatus("notfound");
        if (data?.ok && data.post) {
          setPost(data.post);
          setStatus("ok");
          trackBlogPostClick(data.post.title);
          updateMeta(data.post);
        } else {
          setStatus("error");
        }
      })
      .catch(() => { if (!cancelled) setStatus("error"); });

    return () => { cancelled = true; clearTimeout(timeoutId); controller.abort(); };
  }, [slug]);

  const intro = useMemo(() => getIntroSection(post), [post]);
  const detailSections = useMemo(() => getDetailSections(post), [post]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-stone-400 text-sm">Loading…</div>
      </main>
    );
  }

  if (status === "notfound") return <Navigate to="/blog" replace />;

  if (status === "error" || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-stone-700 mb-4">Couldn't load this post.</p>
          <Link to="/blog" className="text-primary underline">Back to all articles</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream">
      <HeroSection post={post} />
      <IntroMapSection intro={intro} />
      <ServicesGridSection />
      <DetailSectionsSection
        heading={post.detailHeading || "Service Details"}
        sections={detailSections}
      />
      {post.showQuoteForm !== false && <QuoteFormSection slug={post.slug} />}
      {Array.isArray(post.faq) && post.faq.length > 0 && (
        <FaqSection faq={post.faq} />
      )}
    </main>
  );
}

function HeroSection({ post }) {
  const scrollToQuoteForm = (event) => {
    event.preventDefault();
    const form = document.getElementById("quote-form");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    trackLead({ content_name: "Blog Hero Quote CTA", content_category: "cta" });
  };

  return (
    <section className="relative h-[72vh] min-h-[580px] max-h-[820px] overflow-hidden flex items-center justify-center">
      {/* Full-bleed image — no cream fade */}
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-primary-dark to-primary" />
      )}

      {/* Cinematic edge vignette only — top and bottom darken, center stays clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/65" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Back link */}
      <div className="absolute top-28 sm:top-32 left-0 right-0 z-20">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/25 hover:bg-white/25 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-8 text-center">
        {post.category && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-blue-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            — {post.category} —
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-white mb-5"
        >
          {post.title}
        </motion.h1>
        {post.hero?.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/80 text-base md:text-lg leading-relaxed mb-8 break-words [overflow-wrap:anywhere]"
          >
            {post.hero.subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="#quote-form"
            onClick={scrollToQuoteForm}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-sm md:text-base font-semibold hover:bg-primary-dark transition-colors shadow-lg"
          >
            Get a Free Quote
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function IntroMapSection({ intro }) {
  if (!intro?.heading && !intro?.body) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          <div>
            <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
              — Overview —
            </span>
            {intro.heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
                {intro.heading}
              </h2>
            )}
            <BodyText text={intro.body} />
          </div>
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-lg">
            <iframe
              title="United States Map"
              src="https://www.google.com/maps?q=United+States&output=embed"
              className="w-full aspect-[5/4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesGridSection() {
  return (
    <section className="py-16 md:py-20 bg-cream border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            — What We Offer —
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight leading-[1.15]">
            Our Digital Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {SERVICE_ITEMS.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-stone-200 rounded-2xl p-4 text-center hover:border-primary/40 hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-stone-100 flex items-center justify-center text-xl">
                {SERVICE_ICONS[index]}
              </div>
              <h3 className="text-xs font-bold text-stone-900 leading-snug">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailSectionsSection({ heading, sections }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        {heading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              — Details —
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-stone-900">
              {heading}
            </h2>
          </motion.div>
        )}

        <div className="space-y-8">
          {sections.map((section, index) => {
            const isEven = index % 2 === 0;
            const imageRight = section.imageSide !== "left";
            return (
              <motion.article
                key={`${section.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`${isEven ? "bg-cream" : "bg-white"} border border-stone-200 rounded-3xl p-7 md:p-12 overflow-hidden`}
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  <div className={imageRight ? "" : "lg:order-2"}>
                    {section.title && (
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-5">
                        {section.title}
                      </h2>
                    )}
                    <BodyText text={section.body} />
                  </div>
                  <div className={imageRight ? "lg:order-2" : ""}>
                    {section.image ? (
                      <img
                        src={section.image}
                        alt=""
                        className="w-full aspect-[4/3] object-cover rounded-2xl border border-stone-200 shadow-md"
                      />
                    ) : (
                      <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                        <iframe
                          title="United States Map"
                          src="https://www.google.com/maps?q=United+States&output=embed"
                          className="w-full aspect-[4/3]"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuoteFormSection({ slug }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    trackLead({ content_name: "Blog Quote Form", content_category: "lead_form" });
    setSubmitted(true);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: `blog:${slug}`, ...form }),
      });
    } catch {
      // optimistic UX: keep thank-you state even if network fails
    }
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="quote-form" className="py-20 md:py-28 bg-cream border-y border-stone-200 scroll-mt-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              — Free Consultation —
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-3">
              Let's grow your business
            </h2>
            <p className="text-stone-500 text-base md:text-lg">
              Tell us about your project — we'll respond within 24 hours.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-stone-900 font-bold text-lg mb-1">Thank you!</p>
                <p className="text-stone-500 text-sm">We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                <input
                  name="name" placeholder="Full Name" required
                  value={form.name} onChange={handle}
                  className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <input
                  type="email" name="email" placeholder="Email Address" required
                  value={form.email} onChange={handle}
                  className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <input
                  type="tel" name="phone" placeholder="Phone / WhatsApp"
                  value={form.phone} onChange={handle}
                  className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <select
                  name="service" required value={form.service} onChange={handle}
                  className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="">Select a service</option>
                  <option>Website Development</option>
                  <option>SEO Services</option>
                  <option>Local SEO / Google Maps</option>
                  <option>Google Ads (PPC)</option>
                  <option>Social Media Marketing</option>
                  <option>Branding & Design</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="message" placeholder="Project details (optional)" rows={4}
                  value={form.message} onChange={handle}
                  className="sm:col-span-2 rounded-xl border border-stone-300 px-4 py-3 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed transition-colors"
                />
                <button
                  type="submit"
                  className="sm:col-span-2 h-12 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Get my free consultation
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FaqSection({ faq }) {
  const safeFaq = faq.filter((item) => item?.question && item?.answer);
  if (safeFaq.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            — FAQ —
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-stone-900">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {safeFaq.map((item, index) => (
            <motion.div
              key={`${item.question}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
            >
              <details className="group bg-cream border border-stone-200 rounded-2xl cursor-pointer open:bg-white open:border-stone-300 open:shadow-sm transition-all">
                <summary className="flex items-center justify-between gap-4 list-none px-6 py-5">
                  <span className="font-semibold text-stone-900 text-base md:text-lg">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-200 group-open:bg-primary/10 flex items-center justify-center transition-colors">
                    <span className="text-stone-500 group-open:text-primary text-lg leading-none group-open:rotate-45 inline-block transition-all duration-200">
                      +
                    </span>
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-4 text-stone-600 leading-relaxed text-sm md:text-base border-t border-stone-100">
                  {renderInline(item.answer)}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BodyText({ text }) {
  if (!text) return null;

  const paragraphs = String(text)
    .split(/\n\s*\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5 text-stone-600 text-base md:text-lg leading-relaxed md:leading-[1.8]">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}

function renderInline(text) {
  const tokens = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      tokens.push({ type: "link", text: match[2], href: match[3] });
    } else if (match[4]) {
      tokens.push({ type: "bold", value: match[5] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens.map((token, index) => {
    if (token.type === "link") {
      const isInternal = token.href.startsWith("/");
      return (
        <a
          key={index}
          href={token.href}
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          {token.text}
        </a>
      );
    }

    if (token.type === "bold") {
      return (
        <strong key={index} className="text-stone-900 font-semibold">
          {token.value}
        </strong>
      );
    }

    return <span key={index}>{token.value}</span>;
  });
}

function getIntroSection(post) {
  if (!post) return null;

  if (post.intro && (post.intro.heading || post.intro.body)) {
    return {
      heading: post.intro.heading || "",
      body: post.intro.body || "",
    };
  }

  if (Array.isArray(post.sections) && post.sections.length > 0) {
    const first = post.sections[0];
    if (first?.heading || first?.body) {
      return {
        heading: first.heading || "",
        body: first.body || "",
      };
    }
  }

  return null;
}

function getDetailSections(post) {
  if (!post) return [];

  if (Array.isArray(post.detailSections) && post.detailSections.length > 0) {
    return post.detailSections.filter(Boolean).map((section) => ({
      title: section.title || section.heading || "",
      body: section.body || "",
      image: section.image || post.coverImage || "",
      imageSide: section.imageSide === "left" ? "left" : "right",
    }));
  }

  if (Array.isArray(post.sections) && post.sections.length > 0) {
    return post.sections.slice(1).map((section) => ({
      title: section?.heading || "",
      body: section?.body || "",
      image: section?.image || post.coverImage || "",
      imageSide: section?.imageSide === "left" ? "left" : "right",
    }));
  }

  return [];
}

function updateMeta(post) {
  const seo = post.seo || {};
  if (typeof document === "undefined") return;
  document.title = seo.metaTitle || post.title;
  setMeta("description", seo.metaDescription || post.excerpt);
  setMeta("keywords", (seo.keywords || []).join(", "));
}

function setMeta(name, content) {
  if (!content) return;
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}
