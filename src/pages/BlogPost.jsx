import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
      <main className="bg-cream animate-pulse">
        {/* Hero skeleton */}
        <div className="h-[72vh] min-h-145 max-h-205 bg-stone-200" />
        {/* Intro skeleton */}
        <div className="py-16 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="h-8 bg-stone-200 rounded-xl w-3/4" />
              <div className="h-4 bg-stone-100 rounded w-full" />
              <div className="h-4 bg-stone-100 rounded w-5/6" />
              <div className="h-4 bg-stone-100 rounded w-4/6" />
            </div>
            <div className="h-64 bg-stone-200 rounded-3xl" />
          </div>
        </div>
        {/* Detail skeleton */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 space-y-16">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 space-y-4">
                  <div className="h-7 bg-stone-200 rounded-xl w-2/3" />
                  <div className="h-4 bg-stone-100 rounded w-full" />
                  <div className="h-4 bg-stone-100 rounded w-5/6" />
                </div>
                <div className="w-full lg:w-[48%] h-56 bg-stone-200 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (status === "notfound") return <Navigate to="/blog" replace />;

  if (status === "error" || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <p className="text-stone-700 text-center">
          Couldn't load this post.{" "}
          <Link to="/blog" className="text-primary underline">Back to all articles</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="bg-cream">
      <HeroSection post={post} />
      <IntroMapSection intro={intro} />
      <ServicesGridSection />
      <DetailSectionsSection
        heading={post.detailHeading || ""}
        sections={detailSections}
      />
      {post.showProcessSections !== false && Array.isArray(post.processSections) && post.processSections.length > 0 && (
        <ProcessStepsSection steps={post.processSections} />
      )}
      {post.showQuoteForm !== false && <QuoteFormSection slug={post.slug} />}
      {Array.isArray(post.faq) && post.faq.length > 0 && (
        <FaqSection faq={post.faq} />
      )}
    </main>
  );
}

function HeroSection({ post }) {
  const scrollToQuoteForm = (e) => {
    e.preventDefault();
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackLead({ content_name: "Blog Hero Quote CTA", content_category: "cta" });
  };

  return (
    <section className="relative h-[72vh] min-h-[580px] max-h-[820px] overflow-hidden flex items-center justify-center">
      {post.coverImage
        ? <img src={post.coverImage} alt="" fetchpriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        : <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-primary-dark to-primary" />
      }
      <div className="absolute inset-0 bg-black/35" />

      <Link
        to="/blog"
        className="absolute top-28 sm:top-32 left-5 sm:left-8 z-20 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/25 hover:bg-white/25 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All articles
      </Link>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 md:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-white mb-5"
        >
          {post.title}
        </motion.h1>
        {post.hero?.subtitle && (
          <p className="max-w-2xl mx-auto text-white/80 text-base md:text-lg leading-relaxed mb-8 wrap-anywhere">
            {post.hero.subtitle}
          </p>
        )}
        <a
          href="#quote-form"
          onClick={scrollToQuoteForm}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-sm md:text-base font-semibold hover:bg-primary-dark transition-colors shadow-lg"
        >
          Get a Free Quote
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function IntroMapSection({ intro }) {
  if (!intro?.heading && !intro?.body) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          {intro.heading && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
              {intro.heading}
            </h2>
          )}
          <BodyText text={intro.body} />
        </div>
        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
          <iframe
            title="United States Map"
            src="https://www.google.com/maps?q=United+States&output=embed"
            className="w-full aspect-4/3"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function ServicesGridSection() {
  return (
    <section className="py-8 bg-cream border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 flex flex-wrap items-center justify-center gap-2.5">
        {SERVICE_ITEMS.map((service, index) => (
          <span
            key={service}
            className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-stone-700 shadow-sm hover:border-primary/40 hover:text-primary transition-all cursor-default"
          >
            {SERVICE_ICONS[index]} {service}
          </span>
        ))}
      </div>
    </section>
  );
}

function ProcessStepsSection({ steps }) {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <section className="py-16 md:py-24 bg-white border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 space-y-12 md:space-y-16">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            className="text-center"
          >
            {step.title && (
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-900 mb-5 leading-tight tracking-tight">
                {step.title}
              </h3>
            )}
            {step.body && (
              <p className="text-stone-600 text-lg leading-relaxed max-w-3xl mx-auto">
                {renderInline(step.body)}
              </p>
            )}
          </motion.div>
        ))}
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
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-stone-900 mb-12">
            {heading}
          </h2>
        )}
        <div className="space-y-16 md:space-y-20">
          {sections.map((section, index) => {
            const imageRight = section.imageSide !== "left";
            return (
              <motion.article
                key={`${section.title}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.25 }}
                className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16"
              >
                <div className={`flex-1 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
                  {section.title && (
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight leading-snug mb-5">
                      {section.title}
                    </h3>
                  )}
                  <BodyText text={section.body} />
                </div>
                <div className={`w-full lg:w-[48%] shrink-0 ${imageRight ? "lg:order-2" : "lg:order-1"}`}>
                  {section.image ? (
                    <img
                      src={section.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-4/3 rounded-2xl overflow-hidden">
                      <iframe
                        title="United States Map"
                        src="https://www.google.com/maps?q=United+States&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
    } catch { /* optimistic UX */ }
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="quote-form" className="py-20 md:py-28 bg-cream border-y border-stone-200 scroll-mt-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-3 text-center">
          Let's grow your business
        </h2>
        <p className="text-stone-500 text-base md:text-lg text-center mb-10">
          Tell us about your project — we'll respond within 24 hours.
        </p>
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
              <input name="name" placeholder="Full Name" required value={form.name} onChange={handle}
                className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handle}
                className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              <input type="tel" name="phone" placeholder="Phone / WhatsApp" value={form.phone} onChange={handle}
                className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              <select name="service" required value={form.service} onChange={handle}
                className="h-12 rounded-xl border border-stone-300 px-4 text-sm bg-white text-stone-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                <option value="">Select a service</option>
                <option>Website Development</option>
                <option>SEO Services</option>
                <option>Local SEO / Google Maps</option>
                <option>Google Ads (PPC)</option>
                <option>Social Media Marketing</option>
                <option>Branding & Design</option>
                <option>Other</option>
              </select>
              <textarea name="message" placeholder="Project details (optional)" rows={4} value={form.message} onChange={handle}
                className="sm:col-span-2 rounded-xl border border-stone-300 px-4 py-3 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed transition-colors" />
              <button type="submit"
                className="sm:col-span-2 h-12 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">
                Get my free consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ faq }) {
  const safeFaq = faq.filter((item) => item?.question && item?.answer);
  if (safeFaq.length === 0) return null;

  return (
    <section className="bg-white border-y border-stone-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="bg-blue-900 py-12 md:py-16 px-5 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 py-12 md:py-16">
        <Accordion type="single" collapsible className="w-full">
          {safeFaq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base capitalize">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-stone-600 leading-relaxed capitalize">
                {renderInline(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function BodyText({ text }) {
  if (!text) return null;
  const paragraphs = String(text).split(/\n\s*\n/).map((l) => l.trim()).filter(Boolean);
  return (
    <div className="space-y-4 text-stone-600 text-base md:text-lg leading-relaxed md:leading-[1.8]">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}

function renderInline(text) {
  if (!text) return null;
  const tokens = [];
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) tokens.push(text.slice(lastIndex, match.index));
    if (match[1]) tokens.push({ type: "link", text: match[2], href: match[3] });
    else if (match[4]) tokens.push({ type: "bold", value: match[5] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) tokens.push(text.slice(lastIndex));

  return tokens.map((token, index) => {
    if (typeof token === "string") return token;
    if (token.type === "link") {
      const isInternal = token.href.startsWith("/") || /upwarddigitalco\.com/.test(token.href);
      const to = isInternal && !token.href.startsWith("/")
        ? new URL(token.href).pathname
        : token.href;
      return isInternal
        ? <Link key={index} to={to} className="text-primary font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{token.text}</Link>
        : <a key={index} href={token.href} target="_blank" rel="noopener noreferrer">{token.text}</a>;
    }
    if (token.type === "bold") {
      return <strong key={index} className="text-stone-900 font-semibold">{token.value}</strong>;
    }
    return null;
  });
}

function getIntroSection(post) {
  if (!post) return null;
  if (post.intro && (post.intro.heading || post.intro.body)) {
    return { heading: post.intro.heading || "", body: post.intro.body || "" };
  }
  if (Array.isArray(post.sections) && post.sections.length > 0) {
    const first = post.sections[0];
    if (first?.heading || first?.body) return { heading: first.heading || "", body: first.body || "" };
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
  if (typeof document === "undefined") return;
  const seo = post.seo || {};
  const title = seo.metaTitle || post.title;
  const description = seo.metaDescription || post.excerpt || "";
  const url = window.location.href;

  document.title = title;

  setMetaName("description", description);
  setMetaName("keywords", (seo.keywords || []).join(", "));

  setMetaProp("og:title", title);
  setMetaProp("og:description", description);
  setMetaProp("og:url", url);
  setMetaProp("og:type", "article");

  setMetaName("twitter:title", title);
  setMetaName("twitter:description", description);

  setCanonical(url);
}

function setMetaName(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setMetaProp(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
  el.setAttribute("href", url);
}
