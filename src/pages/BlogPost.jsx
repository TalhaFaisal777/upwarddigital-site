import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { trackBlogPostClick, trackLead } from "@/lib/pixel";

const SERVICE_ITEMS = [
  "Bathroom Installations",
  "Kitchen Installations",
  "3D Design Service",
  "Alterations & Renovations",
  "Shop and Supplies",
  "Tiling Work",
  "Electrical Work",
  "General Plumbing",
];

const SERVICE_ICONS = ["🛁", "🍽️", "📐", "🛠️", "🏬", "🧱", "💡", "🚰"];

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ok | notfound | error

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    fetch(`/api/posts/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    })
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
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [slug]);

  const intro = useMemo(() => getIntroSection(post), [post]);
  const detailSections = useMemo(() => getDetailSections(post), [post]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-stone-500">Loading…</div>
      </main>
    );
  }

  if (status === "notfound") return <Navigate to="/blog" replace />;

  if (status === "error" || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-stone-700 mb-4">Couldn't load this post.</p>
          <Link to="/blog" className="text-primary underline">
            Back to all articles
          </Link>
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
        heading={post.detailHeading || ""}
        sections={detailSections}
      />
      {post.showQuoteForm !== false && <QuoteFormSection slug={post.slug} />}
      {Array.isArray(post.faq) && post.faq.length > 0 && <FaqSection faq={post.faq} />}
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
    <section className="relative pt-32 sm:pt-36 pb-14 sm:pb-20 overflow-hidden min-h-[500px] flex items-center">
      {post.coverImage && (
        <div className="absolute inset-0 z-0">
          <img src={post.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/55 via-stone-900/40 to-cream" />
        </div>
      )}
      {!post.coverImage && <div className="absolute inset-0 bg-gradient-to-b from-stone-900/15 to-cream" />}

      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1c1917 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 md:px-8 text-center w-full">
        <div className="text-left mb-7">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-stone-900 mb-5">
          {post.title}
        </h1>

        {post.hero?.subtitle && (
          <p className="max-w-3xl mx-auto text-stone-700 text-lg md:text-2xl leading-relaxed mb-8">
            {post.hero.subtitle}
          </p>
        )}

        <a
          href="#quote-form"
          onClick={scrollToQuoteForm}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-sm md:text-base font-semibold hover:bg-primary-dark transition-colors"
        >
          Get a Quote
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

function IntroMapSection({ intro }) {
  if (!intro?.heading && !intro?.body) return null;

  return (
    <section className="py-14 md:py-20 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div>
            {intro.heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-5">
                {intro.heading}
              </h2>
            )}
            <BodyText text={intro.body} />
          </div>

          <div className="rounded-3xl overflow-hidden border border-stone-200 bg-stone-100">
            <iframe
              title="United States Map"
              src="https://www.google.com/maps?q=United+States&output=embed"
              className="w-full aspect-[5/4]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGridSection() {
  return (
    <section className="py-14 md:py-18 bg-cream border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-5">
          {SERVICE_ITEMS.map((service, index) => (
            <div key={service} className="bg-white border border-stone-200 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-stone-100 flex items-center justify-center text-xl">
                {SERVICE_ICONS[index]}
              </div>
              <h3 className="text-sm font-bold text-stone-900 leading-snug">{service}</h3>
            </div>
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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 space-y-0">
        {heading && (
          <h3 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-stone-900 mb-12">
            {heading}
          </h3>
        )}

        {sections.map((section, index) => {
          const bgClass = index % 2 === 0 ? "bg-cream" : "bg-white";
          const imageRight = section.imageSide !== "left";
          return (
            <article key={`${section.title}-${index}`} className={`${bgClass} border border-stone-200 rounded-3xl p-6 md:p-10 mb-8`}>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className={imageRight ? "" : "lg:order-2"}>
                  {section.title && (
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-5">
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
                      className="w-full aspect-[4/3] object-cover rounded-2xl border border-stone-200"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] rounded-2xl border border-dashed border-stone-300 bg-stone-100 flex items-center justify-center text-stone-400 text-sm">
                      Add image in admin
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function QuoteFormSection({ slug }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
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
    } catch {
      // optimistic UX: keep thank-you state even if network fails
    }

    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="quote-form" className="py-16 md:py-22 bg-cream border-y border-stone-200 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="text-center mb-7">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight mb-2">
              Get a free consultation
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Tell us about your project and we'll get back within 24 hours.
            </p>
          </div>
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <p className="text-stone-900 font-bold">Thank you!</p>
              <p className="text-stone-600 text-sm">We'll reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
              <input
                name="name"
                placeholder="Full Name"
                required
                value={form.name}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={form.email}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white"
              />
              <select
                name="service"
                required
                value={form.service}
                onChange={handle}
                className="h-11 rounded-lg border border-stone-300 px-4 text-sm bg-white cursor-pointer"
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
                name="message"
                placeholder="Project details (optional)"
                rows={3}
                value={form.message}
                onChange={handle}
                className="sm:col-span-2 rounded-lg border border-stone-300 px-4 py-2 text-sm bg-white"
              />
              <button
                type="submit"
                className="sm:col-span-2 h-11 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark"
              >
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
    <section className="py-16 md:py-22 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-stone-900 mb-10 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {safeFaq.map((item, index) => (
            <details
              key={`${item.question}-${index}`}
              className="group bg-cream border border-stone-200 rounded-2xl p-5 md:p-6 cursor-pointer open:bg-white open:border-stone-300"
            >
              <summary className="font-semibold text-stone-900 text-base md:text-lg flex items-center justify-between gap-4 list-none">
                {item.question}
                <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </span>
              </summary>
              <div className="mt-4 text-stone-600 leading-relaxed text-[15px] md:text-base">
                {renderInline(item.answer)}
              </div>
            </details>
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
    <div className="space-y-5 text-stone-700 text-base md:text-lg leading-relaxed md:leading-[1.8]">
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
    return post.detailSections
      .filter(Boolean)
      .map((section) => ({
        title: section.title || section.heading || "",
        body: section.body || "",
        image: section.image || "",
        imageSide: section.imageSide === "left" ? "left" : "right",
      }));
  }

  if (Array.isArray(post.sections) && post.sections.length > 0) {
    return post.sections.slice(1).map((section) => ({
      title: section?.heading || "",
      body: section?.body || "",
      image: section?.image || "",
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
