import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Plus, Upload, X, Trash2, Eye, Link2 } from "lucide-react";
import { useNoIndex } from "@/hooks/useNoIndex";
import { uploadImage } from "@/lib/imageUpload";
import { LoginScreen, AdminTopBar, AdminTabs } from "@/pages/AdminBlogList";
import { toast } from "sonner";

const TOKEN_KEY = "ud_admin_token";

const CATEGORIES = [
  "Website Development",
  "SEO Services",
  "Local SEO",
  "Google Ads (PPC)",
  "Social Media Marketing",
  "Digital Marketing",
  "Branding & Design",
  "Web Development",
  "Insights",
];

const EMPTY_POST = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Insights",
  author: "UpwardDigital",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min",
  coverImage: "",
  hero: {
    subtitle: "",
    showRating: false,
    rating: "4.9",
    ratingCount: "87",
    phone: "+1 (201) 304-0657",
  },
  intro: {
    heading: "",
    body: "",
  },
  detailHeading: "Service Details",
  detailSections: [],
  processSections: [],
  showProcessSections: true,
  showQuoteForm: true,
  faq: [],
  seo: { metaTitle: "", metaDescription: "", keywords: [] },
};

export default function AdminBlogEditor() {
  useNoIndex();
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(TOKEN_KEY) : null,
  );
  const [loginError, setLoginError] = useState("");
  const [post, setPost] = useState(isNew ? EMPTY_POST : null);
  const [loadingPost, setLoadingPost] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    if (!password) return;
    setLoginError("");
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) return setLoginError("Wrong password.");
      sessionStorage.setItem(TOKEN_KEY, password);
      setToken(password);
    } catch (err) {
      setLoginError("Network error: " + err.message);
    }
  };

  useEffect(() => {
    if (!token || isNew) return;
    setLoadingPost(true);
    fetch(`/api/admin/posts/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok || !data.post) {
          toast.error("Post not found");
          return;
        }
        setPost(hydrateLoadedPost(data.post));
      })
      .catch((err) => toast.error("Load failed: " + err.message))
      .finally(() => setLoadingPost(false));
  }, [token, id, isNew]);

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const updateField = useCallback((path, value) => {
    setPost((curr) => {
      const next = { ...curr };
      const parts = path.split(".");
      let target = next;
      for (let i = 0; i < parts.length - 1; i++) {
        target[parts[i]] = { ...target[parts[i]] };
        target = target[parts[i]];
      }
      target[parts[parts.length - 1]] = value;
      return next;
    });
  }, []);

  const save = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const payload = buildPayload(post);
      const url = isNew
        ? "/api/admin/posts"
        : `/api/admin/posts/${encodeURIComponent(post.id)}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Save failed");
      navigate("/admin/blog");
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!token) return <LoginScreen onSubmit={handleLogin} error={loginError} />;

  if (loadingPost || !post) {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-stone-500">Loading post…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream pb-20">
      <AdminTopBar onLogout={handleLogout}>
        {post.slug && !isNew && (
          <a
            href={`/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-300 text-stone-700 text-sm hover:bg-stone-50"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </a>
        )}
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving…" : "Publish"}
        </button>
      </AdminTopBar>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <Link
          to="/admin/blog"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All posts
        </Link>

        <AdminTabs />

        {saveError && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
            {saveError}
          </div>
        )}

        <div className="space-y-7">
          <Card
            title="1) Hero"
            description="Centered H1 title + centered subtitle + cover image + hero quote button (frontend fixed)."
          >
            <Field label="Title (H1)" required>
              <Input
                value={post.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Bathrooms in West Yorkshire"
              />
            </Field>
            <Field label="Subtitle (centered below title)">
              <Input
                value={post.hero.subtitle}
                onChange={(e) => updateField("hero.subtitle", e.target.value)}
                placeholder="Professional bathroom fitting and installation services."
              />
            </Field>
            <Field
              label="Banner image"
              description="Used as hero background and blog card image."
            >
              <ImagePicker
                value={post.coverImage}
                onChange={(v) => updateField("coverImage", v)}
              />
            </Field>
          </Card>

          <Card
            title="2) Intro + USA map"
            description="First content section: left text (H2 + paragraph), right full USA map (frontend fixed)."
          >
            <Field label="Intro title (H2)">
              <Input
                value={post.intro.heading}
                onChange={(e) => updateField("intro.heading", e.target.value)}
                placeholder="Website Development Services Across the USA"
              />
            </Field>
            <Field label="Intro details (paragraph)">
              <RichTextarea
                value={post.intro.body}
                onChange={(e) => updateField("intro.body", e.target.value)}
                rows={5}
                placeholder="Write intro paragraph(s). Leave a blank line between paragraphs."
              />
            </Field>
          </Card>

          <Card
            title="3) Services strip"
            description="Fixed services section is auto-rendered for all blogs (not editable)."
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-stone-600">
              <div>Website Development</div>
              <div>SEO Services</div>
              <div>Local SEO / Google Maps</div>
              <div>Google Ads (PPC)</div>
              <div>Social Media Marketing</div>
              <div>Branding & Design</div>
              <div>E-Commerce Development</div>
              <div>Digital Marketing</div>
            </div>
          </Card>

          <Card
            title="4) Detail sections"
            description="After services: first item can use center H3 heading, then side-by-side H2 + paragraph + image blocks."
          >
            <Field
              label="Center heading (H3, first detail area)"
              description="Centered heading shown before detail cards."
            >
              <Input
                value={post.detailHeading}
                onChange={(e) => updateField("detailHeading", e.target.value)}
                placeholder="Service Details"
              />
            </Field>

            <RepeaterList
              items={post.detailSections}
              onChange={(v) => updateField("detailSections", v)}
              emptyValue={{
                title: "",
                body: "",
                image: "",
                imageSide: "right",
              }}
              renderItem={(item, update) => (
                <>
                  <Field label="Section title (H2)">
                    <Input
                      value={item.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="Custom Website Development for Service Businesses"
                    />
                  </Field>
                  <Field label="Details (paragraph)">
                    <RichTextarea
                      value={item.body}
                      onChange={(e) => update("body", e.target.value)}
                      rows={6}
                      placeholder="Write paragraph details for this section."
                    />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Image">
                      <ImagePicker
                        value={item.image}
                        onChange={(v) => update("image", v)}
                      />
                    </Field>
                    <Field label="Image side">
                      <select
                        value={item.imageSide}
                        onChange={(e) => update("imageSide", e.target.value)}
                        className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 cursor-pointer"
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                      </select>
                    </Field>
                  </div>
                </>
              )}
              addLabel="Add detail section"
            />
          </Card>

          <Card
            title="5) Centered process steps"
            description="Centered heading + paragraph blocks — like the screenshot layout. Toggle visibility without deleting content."
          >
            <Toggle
              checked={post.showProcessSections}
              onChange={(v) => updateField("showProcessSections", v)}
              label={post.showProcessSections ? "Visible on blog post" : "Hidden from blog post"}
            />
            <RepeaterList
              items={post.processSections}
              onChange={(v) => updateField("processSections", v)}
              emptyValue={{ title: "", body: "" }}
              renderItem={(item, update) => (
                <>
                  <Field label="Title (centered heading)">
                    <Input
                      value={item.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="Smart Business Website Planning"
                    />
                  </Field>
                  <Field label="Details (centered paragraph)">
                    <RichTextarea
                      value={item.body}
                      onChange={(e) => update("body", e.target.value)}
                      rows={5}
                      placeholder="Write the paragraph that appears below the heading..."
                    />
                  </Field>
                </>
              )}
              addLabel="Add step"
            />
          </Card>

          <Card
            title="6) Quote form"
            description="Quote form is displayed after all detail sections."
          >
            <Toggle
              checked={post.showQuoteForm}
              onChange={(v) => updateField("showQuoteForm", v)}
              label="Show quote form"
            />
          </Card>

          <Card title="7) FAQ" description="Styled FAQ at bottom of the post.">
            <RepeaterList
              items={post.faq}
              onChange={(v) => updateField("faq", v)}
              emptyValue={{ question: "", answer: "" }}
              renderItem={(item, update) => (
                <>
                  <Field label="Question">
                    <Input
                      value={item.question}
                      onChange={(e) => update("question", e.target.value)}
                    />
                  </Field>
                  <Field label="Answer">
                    <RichTextarea
                      value={item.answer}
                      onChange={(e) => update("answer", e.target.value)}
                      rows={3}
                    />
                  </Field>
                </>
              )}
              addLabel="Add FAQ"
            />
          </Card>

          <Card
            title="8) Meta & SEO"
            description="Blog list and search metadata."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Slug"
                description="URL path. Auto-generated from title."
              >
                <Input
                  value={post.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="my-blog-post"
                />
              </Field>
              <Field label="Category">
                <select
                  value={post.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 cursor-pointer"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </Field>
              <Field label="Author">
                <Input
                  value={post.author}
                  onChange={(e) => updateField("author", e.target.value)}
                />
              </Field>
              <Field label="Read time">
                <Input
                  value={post.readTime}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  placeholder="8 min"
                />
              </Field>
              <Field label="Publish date">
                <Input
                  type="date"
                  value={post.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Excerpt" description="Shown in blog list card.">
              <Textarea
                value={post.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={2}
              />
            </Field>

            <Field
              label="Meta title"
              description="Browser tab + search result title."
            >
              <Input
                value={post.seo.metaTitle}
                onChange={(e) => updateField("seo.metaTitle", e.target.value)}
                placeholder="Falls back to post title"
              />
            </Field>

            <Field
              label="Meta description"
              description="Search result description text."
            >
              <Textarea
                value={post.seo.metaDescription}
                onChange={(e) =>
                  updateField("seo.metaDescription", e.target.value)
                }
                rows={3}
                placeholder="Falls back to excerpt"
              />
            </Field>
          </Card>

          <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 bg-white border border-stone-200 rounded-2xl px-5 py-3 shadow-lg">
            <div className="text-sm text-stone-600">
              {isNew ? "Creating new post" : "Editing existing post"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/admin/blog")}
                className="px-4 py-2 rounded-lg border border-stone-300 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Publishing…" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function hydrateLoadedPost(raw) {
  const legacySections = Array.isArray(raw.sections)
    ? raw.sections.filter(Boolean)
    : [];
  const hasDirectIntro = raw.intro && (raw.intro.heading || raw.intro.body);

  const intro = hasDirectIntro
    ? { heading: raw.intro.heading || "", body: raw.intro.body || "" }
    : {
        heading: legacySections[0]?.heading || "",
        body: legacySections[0]?.body || "",
      };

  const detailSectionsSource =
    Array.isArray(raw.detailSections) && raw.detailSections.length > 0
      ? raw.detailSections
      : legacySections.slice(hasDirectIntro ? 0 : 1);

  const detailSections = detailSectionsSource.map((item) => ({
    title: item.title || item.heading || "",
    body: item.body || "",
    image: item.image || raw.coverImage || "",
    imageSide: item.imageSide === "left" ? "left" : "right",
  }));

  return {
    ...EMPTY_POST,
    ...raw,
    hero: { ...EMPTY_POST.hero, ...raw.hero, showRating: false },
    seo: { ...EMPTY_POST.seo, ...raw.seo },
    intro,
    detailHeading: raw.detailHeading || raw.sectionsTitle || "Service Details",
    detailSections,
    processSections: Array.isArray(raw.processSections) ? raw.processSections.map((s) => ({ title: s.title || "", body: s.body || "" })) : [],
    showProcessSections: raw.showProcessSections !== false,
    showQuoteForm: raw.showQuoteForm !== false,
  };
}

function buildPayload(post) {
  const introHeading = post.intro?.heading || "";
  const introBody = post.intro?.body || "";

  const detailSections = Array.isArray(post.detailSections)
    ? post.detailSections.map((item) => ({
        title: item.title || "",
        body: item.body || "",
        image: item.image || post.coverImage || "",
        imageSide: item.imageSide === "left" ? "left" : "right",
      }))
    : [];

  const sections = [
    ...(introHeading || introBody
      ? [
          {
            heading: introHeading,
            body: introBody,
            image: "",
            imageSide: "right",
          },
        ]
      : []),
    ...detailSections.map((item) => ({
      heading: item.title,
      body: item.body,
      image: item.image,
      imageSide: item.imageSide,
    })),
  ];

  const processSections = Array.isArray(post.processSections)
    ? post.processSections.map((s) => ({ title: s.title || "", body: s.body || "" }))
    : [];

  return {
    ...post,
    intro: { heading: introHeading, body: introBody },
    detailSections,
    processSections,
    showProcessSections: post.showProcessSections !== false,
    sections,
    imageStrip: [],
    serviceCards: [],
    cta: { heading: "", subtitle: "" },
    hero: {
      ...post.hero,
      showRating: false,
      rating: "",
      ratingCount: "",
    },
    seo: {
      ...post.seo,
      keywords: Array.isArray(post.seo?.keywords) ? post.seo.keywords : [],
    },
  };
}

function Card({ title, description, children }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6">
      <div className="mb-5 pb-5 border-b border-stone-100">
        <h3 className="text-lg font-bold text-stone-900">{title}</h3>
        {description && (
          <p className="text-sm text-stone-500 mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, description, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {description && (
        <p className="text-xs text-stone-500 mb-2">{description}</p>
      )}
      {children}
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="flex h-11 w-full rounded-lg border border-stone-300 bg-white px-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary leading-relaxed"
    />
  );
}

function RichTextarea({ value, onChange, rows, placeholder }) {
  const ref = useRef(null);
  const [showLink, setShowLink] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const openLinkForm = () => {
    const ta = ref.current;
    if (ta) {
      const selected = value.slice(ta.selectionStart, ta.selectionEnd);
      if (selected) setLinkText(selected);
    }
    setShowLink(true);
  };

  const insertLink = () => {
    const text = linkText.trim() || "link text";
    const url = linkUrl.trim();
    if (!url) return;
    const ta = ref.current;
    const start = ta ? ta.selectionStart : value.length;
    const end = ta ? ta.selectionEnd : value.length;
    const insertion = `[${text}](${url})`;
    const next = value.slice(0, start) + insertion + value.slice(end);
    onChange({ target: { value: next } });
    setShowLink(false);
    setLinkText("");
    setLinkUrl("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openLinkForm}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-stone-300 text-stone-600 text-xs font-medium hover:bg-stone-50 hover:text-primary hover:border-primary transition-colors"
        >
          <Link2 className="w-3.5 h-3.5" />
          Insert link
        </button>
        <span className="text-[11px] text-stone-400">
          Supports <code className="bg-stone-100 px-1 rounded">[text](url)</code> and <code className="bg-stone-100 px-1 rounded">**bold**</code>
        </span>
      </div>

      {showLink && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 border border-stone-200 rounded-lg">
          <input
            type="text"
            placeholder="Link text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className="h-9 flex-1 min-w-32 rounded-md border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="text"
            placeholder="URL — https://example.com or /internal-path"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertLink()}
            className="h-9 flex-2 min-w-48 rounded-md border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <button
            type="button"
            onClick={insertLink}
            className="h-9 px-4 rounded-md bg-stone-900 text-white text-sm font-semibold hover:bg-primary transition-colors"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => { setShowLink(false); setLinkText(""); setLinkUrl(""); }}
            className="h-9 px-3 rounded-md border border-stone-300 text-stone-600 text-sm hover:bg-stone-100"
          >
            Cancel
          </button>
        </div>
      )}

      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary leading-relaxed"
      />
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <span
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-stone-900" : "bg-stone-300"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : ""}`}
        />
      </span>
      {label && <span className="text-sm text-stone-700">{label}</span>}
    </label>
  );
}

function ImagePicker({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const dataUrl = await uploadImage(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt=""
            className="rounded-lg border border-stone-200 max-h-48 object-contain"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-red-600 shadow-md"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 h-24 border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-primary hover:text-primary cursor-pointer transition-colors">
          <Upload className="w-5 h-5" />
          <span className="text-sm font-medium">
            {uploading ? "Uploading…" : "Upload image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      )}
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

function RepeaterList({ items, onChange, emptyValue, renderItem, addLabel }) {
  const updateAt = (index, key, value) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const removeAt = (index) => onChange(items.filter((_, idx) => idx !== index));

  const moveUp = (index) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-stone-500 italic">None added yet.</p>
      )}
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-stone-50 border border-stone-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              #{index + 1}
            </span>
            <div className="flex items-center gap-2 text-stone-400">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="hover:text-stone-900 disabled:opacity-30"
                title="Move up"
                type="button"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="hover:text-stone-900 disabled:opacity-30"
                title="Move down"
                type="button"
              >
                ↓
              </button>
              <button
                onClick={() => removeAt(index)}
                className="hover:text-red-600"
                type="button"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {renderItem(item, (key, value) => updateAt(index, key, value))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { ...emptyValue }])}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-stone-300 text-sm font-medium text-stone-600 hover:border-primary hover:text-primary"
      >
        <Plus className="w-4 h-4" />
        {addLabel || "Add item"}
      </button>
    </div>
  );
}
