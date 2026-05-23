import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"
import PageHero from "@/components/common/PageHero"
import SectionHeading from "@/components/common/SectionHeading"
import { useSeoMeta } from "@/hooks/useSeoMeta"
import { trackContact } from "@/lib/pixel"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const PHONE_HREF = "tel:+12013040657"

const contentSections = [
  {
    title: "Website Design And Development Company",
    titleBlue: true,
    body: "Upward Digital Co is a premier website design and development company offering modern website design, professional web design services, and result-driven web development services for businesses that want to grow online. We create fast, secure, mobile-friendly website solutions that are built to attract customers and perform better on Google. Whether you need a new website, website redesign, or an SEO-friendly website, our team delivers quality results. Our professional website development services help brands improve visibility, trust, and conversions. We also provide website development for local businesses, helping small companies stand out online.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=65&auto=format&fit=crop",
    reverse: false,
  },
  {
    title: "Website Development Services",
    body: "At Upward Digital Co, we provide professional website development services to help businesses build a strong digital presence. As a trusted web development company and web development agency, we offer custom web solutions including UI/UX design, front-end development, back-end development, and CMS website development. Our team also provides website redesign services for businesses that need a modern, responsive, and fast-loading website. We focus on secure website development, website optimization, and ongoing website maintenance to keep your site performing smoothly. With expert web development, we create websites that attract visitors, build trust, and generate real business growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=65&auto=format&fit=crop",
    reverse: true,
    titleBlue: true,
  },
]

const process = [
  {
    title: "Smart Business Website Planning",
    body: "Every successful website starts with a smart plan. At Upward Digital Co, we begin with a thorough website planning process to understand your business goals, target audience, and competitors. Our team conducts in-depth research to map out a custom website strategy that aligns with your brand and growth objectives. We identify the right website structure, key pages, and content priorities to ensure your site attracts the right visitors and converts them into customers. Our strategic website planning lays the foundation for a site that not only looks great but also performs well in search engines and delivers measurable results.",
  },
  {
    title: "Strong SEO-Friendly Website Structure",
    body: "A beautiful website means nothing if it can't be found online. That's why we build every website with a strong, SEO-friendly structure from the ground up. Our team applies proven on-page SEO principles including optimized URL structures, clear site hierarchy, proper heading tags, internal linking, and fast-loading page architecture. We ensure your website is technically sound so that search engines can easily crawl, index, and rank your pages. Whether you're targeting local customers or a national audience, our SEO-optimized website structure gives your business a strong foundation to rank higher on Google and drive consistent organic traffic.",
  },
  {
    title: "Modern UI/UX Website Design",
    body: "First impressions matter. Our professional website designers create modern, visually stunning, and user-friendly designs that reflect your brand identity and keep visitors engaged. We focus on clean layouts, intuitive navigation, compelling visuals, and clear calls-to-action that guide users toward taking action whether that's making a purchase, filling out a form, or calling your business. Every design we create is fully responsive, meaning it looks and works perfectly on all devices desktops, tablets, and smartphones. Our UI/UX design process prioritizes both aesthetics and functionality to deliver a seamless user experience that builds trust and drives conversions.",
  },
  {
    title: "Custom Web Development Solutions",
    body: "Once the design is approved, our expert web developers bring it to life with clean, high-performance code. We specialize in custom web development solutions built on reliable technologies including React, Next.js, WordPress, and Shopify depending on your specific business needs. Our development process focuses on fast load times, mobile responsiveness, cross-browser compatibility, and secure coding practices. Whether you need a simple business website, a feature-rich e-commerce store, or a custom web application, we deliver solutions that are scalable, maintainable, and built to grow with your business. Every line of code is crafted for performance, reliability, and long-term success.",
  },
  {
    title: "Fast Website Testing and Optimization",
    body: "Before your website goes live, we conduct thorough testing and optimization to ensure everything works flawlessly. Our QA process includes cross-browser testing, mobile device testing, page speed optimization, form and functionality testing, and accessibility checks. We use industry-standard tools to audit your site's performance and fix any issues that could negatively impact user experience or search engine rankings. Our goal is to deliver a fast, secure, and fully optimized website that loads quickly, performs reliably, and provides an excellent experience for every visitor regardless of the device or browser they use.",
  },
  {
    title: "Secure Website Launch and Maintenance",
    body: "Launching your website is just the beginning. Our team handles the entire website launch process from domain setup and hosting configuration to SSL certificate installation and final pre-launch checks ensuring a smooth, zero-downtime go-live. After launch, we offer ongoing website maintenance and support services to keep your site secure, up-to-date, and performing at its best. This includes regular software updates, security monitoring, performance checks, content updates, and technical support whenever you need it. With Upward Digital Co managing your website, you can focus on running your business while we take care of everything behind the scenes.",
  },
]

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons"
const SIMPLEICON = "https://cdn.simpleicons.org"

const techCategories = [
  {
    label: "Design Tools",
    tools: [
      { name: "Figma", url: `${DEVICON}/figma/figma-original.svg` },
      { name: "Canva", url: `${DEVICON}/canva/canva-original.svg` },
      { name: "Photoshop", url: `${DEVICON}/photoshop/photoshop-plain.svg` },
      { name: "Illustrator", url: `${DEVICON}/illustrator/illustrator-plain.svg` },
      { name: "Adobe XD", url: `${DEVICON}/xd/xd-plain.svg` },
      { name: "Sketch", url: `${SIMPLEICON}/sketch` },
    ],
  },
  {
    label: "Front-End Design",
    tools: [
      { name: "HTML5", url: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS3", url: `${DEVICON}/css3/css3-original.svg` },
      { name: "JavaScript", url: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "Bootstrap", url: `${DEVICON}/bootstrap/bootstrap-original.svg` },
      { name: "Tailwind CSS", url: `${SIMPLEICON}/tailwindcss` },
      { name: "Sass", url: `${DEVICON}/sass/sass-original.svg` },
    ],
  },
  {
    label: "Front-End Frameworks",
    tools: [
      { name: "React", url: `${DEVICON}/react/react-original.svg` },
      { name: "Next.js", url: `${SIMPLEICON}/nextdotjs/000000` },
      { name: "Vue.js", url: `${DEVICON}/vuejs/vuejs-original.svg` },
      { name: "Angular", url: `${DEVICON}/angularjs/angularjs-original.svg` },
      { name: "TypeScript", url: `${DEVICON}/typescript/typescript-original.svg` },
      { name: "jQuery", url: `${DEVICON}/jquery/jquery-original.svg` },
    ],
  },
  {
    label: "Back-End Development",
    tools: [
      { name: "Node.js", url: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: "PHP", url: `${DEVICON}/php/php-original.svg` },
      { name: "Laravel", url: `${SIMPLEICON}/laravel` },
      { name: "Python", url: `${DEVICON}/python/python-original.svg` },
      { name: "Java", url: `${DEVICON}/java/java-original.svg` },
      { name: "Django", url: `${SIMPLEICON}/django/092E20` },
    ],
  },
  {
    label: "CMS & E-Commerce",
    tools: [
      { name: "WordPress", url: `${SIMPLEICON}/wordpress/21759B` },
      { name: "Shopify", url: `${SIMPLEICON}/shopify/96BF48` },
      { name: "Joomla", url: `${SIMPLEICON}/joomla/5091CD` },
      { name: "Drupal", url: `${SIMPLEICON}/drupal/0678BE` },
      { name: "Magento", url: `${SIMPLEICON}/magento` },
      { name: "WooCommerce", url: `${SIMPLEICON}/woocommerce/96588A` },
    ],
  },
  {
    label: "Database Technologies",
    tools: [
      { name: "MySQL", url: `${DEVICON}/mysql/mysql-original.svg` },
      { name: "MongoDB", url: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: "PostgreSQL", url: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "Firebase", url: `${SIMPLEICON}/firebase` },
      { name: "Redis", url: `${DEVICON}/redis/redis-original.svg` },
      { name: "MariaDB", url: `${SIMPLEICON}/mariadb/003545` },
    ],
  },
]

const faqItems = [
  {
    question: "What is website development?",
    answer: "Website development is the process of building a professional, responsive, and functional website for your business. It includes web design, front-end development, back-end development, CMS website development, website optimization, and secure website development to create a strong online presence.",
  },
  {
    question: "Why does my business need professional website development?",
    answer: "Your business needs professional website development services to build trust, attract customers, and grow online. A well-developed website helps improve your digital presence, generate leads, and make your brand look professional.",
  },
  {
    question: "What does a web development company do?",
    answer: "A web development company creates, designs, develops, tests, launches, and maintains websites. It provides custom web development, UI/UX design, CMS development, website redesign, website maintenance, and website optimization for businesses.",
  },
  {
    question: "Why is a fast-loading website important?",
    answer: "A fast-loading website gives users a better experience and helps reduce bounce rate. Fast website speed also supports website optimization, SEO performance, and better conversions.",
  },
  {
    question: "Do you provide website maintenance after launch?",
    answer: "Yes, website maintenance is important after launch. Website maintenance includes updates, backups, security checks, speed improvements, bug fixes, content changes, and ongoing website optimization.",
  },
  {
    question: "Can website development help my business get more leads?",
    answer: "Yes, professional web development can help your business get more leads by creating clear pages, strong call-to-action buttons, SEO-friendly structure, fast speed, mobile-friendly design, and better user experience.",
  },
]

export default function WebDevelopment() {
  useSeoMeta({
    title: "website development | Best Web Development & Design Agency",
    description: "Professional website development services for fast, secure, mobile-friendly, SEO-ready websites that grow your business and generate more leads.",
    keywords: "web development services USA, custom website development, e-commerce development, React development agency, website design USA",
  })

  return (
    <main className="bg-cream min-h-screen">
      <PageHero
        subtitle="Web Development"
        title="Website Development"
        description="Professional website development services for fast, secure, mobile-friendly, SEO-ready websites that grow your business and generate more leads."
      />

      {/* Content Sections */}
      {contentSections.map((s, i) => (
        <section key={s.title} className={`py-20 md:py-28 ${i % 2 === 0 ? "bg-white" : "bg-cream border-t-4 border-stone-200"}`}>
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${s.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-20 items-start`}
            >
              <div className="flex-1 max-w-xl">
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${s.titleBlue ? "text-primary" : "text-stone-900"}`}>{s.title}</h2>
                <p className="text-stone-600 text-lg leading-relaxed">{s.body}</p>
              </div>
              <div className="flex-1 w-full">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-72 md:h-105 object-cover rounded-3xl shadow-md"
                />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Tech Tools */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white">Our Web Design / Development Tools</h3>
        </div>
      </div>
      <section className="py-14 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="bg-cream border border-stone-200 rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm">
                      <img
                        src={tool.url}
                        alt={tool.name}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-xs font-medium text-stone-700 text-center leading-tight">{tool.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm font-semibold text-primary">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process heading full width strip */}
      <div className="w-full bg-blue-900 py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h4 className="text-4xl md:text-5xl font-bold text-white">Six Steps to Create Your Website</h4>
        </div>
      </div>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="space-y-12 md:space-y-16">
            {process.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5">{p.title}</h3>
                <p className="text-stone-600 text-lg leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white border-y border-stone-200 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h5 className="text-3xl md:text-4xl font-bold text-stone-900 text-center mb-10">Frequently Asked Questions</h5>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-stone-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-cream border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 tracking-tight">Ready to build something great?</h2>
            <p className="text-stone-600 text-lg mb-8">Get a free consultation and custom quote no commitment required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_HREF}
                onClick={() => trackContact({ method: "phone", source: "web_dev_cta" })}
                className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-primary transition-colors"
              >
                Call Us Now <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
