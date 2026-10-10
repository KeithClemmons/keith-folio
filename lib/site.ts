/**
 * Public facts for the site. Testimonials are the words inside the
 * quotation marks on keithclemmons.com (HTML checked 2026-10-02).
 * Attribution follows those testimonial modules.
 */

export const person = {
  name: "Jason “Keith” Clemmons",
  shortName: "Keith Clemmons",
  location: "Atlanta, Georgia",
  locationShort: "Atlanta, GA",
} as const;

export const links = {
  gutrx: "https://gutrx.com",
  acupunctureSeo: "https://acupunctureseo.com",
  greenOwl: "https://greenowlmarketing.com",
  greenOwlPhoneDisplay: "256-OWL-HUNT",
  greenOwlPhoneHref: "tel:+12566954868",
  agentInvoice: "https://agent-invoice.com",
  dev: "https://dev.keithclemmons.com",
} as const;

export const nav = [
  { href: "index.html#work", label: "Work" },
  { href: "index.html#background", label: "Background" },
  { href: "index.html#references", label: "References" },
  { href: "index.html#contact", label: "Contact" },
] as const;

export const experience = [
  {
    role: "E-commerce Specialist & Marketing Coordinator",
    org: "Kings Fine Art & Decor",
    years: "2024 – 2025",
    summary:
      "Built a 30,000-SKU Shopify site, with the structure, templates, schema, and metadata for SEO. Ran social, paid, and email campaigns, and built Python scripts for art categorization, vendor catalog scraping, and building Shopify upload files.",
  },
  {
    role: "Advertising Manager",
    org: "Acupuncture Atlanta",
    years: "2013 – 2022",
    summary:
      "Ran paid media for a 22,000+ SKU e-commerce site: campaigns, budgets, ad copy, and custom Google Analytics reports. Increased ROI by 120%.",
  },
  {
    role: "Marketing Consultant",
    org: "Acupuncture SEO",
    years: "2009 – now",
    summary:
      "SEO, PPC, and email marketing for healthcare and retail clients. Page 1 rankings and a responsive site for Buckhead Acupuncture; gift-certificate e-commerce for The Muscle Relaxers that raised revenue 20%.",
  },
  {
    role: "Earlier work",
    org: "ATL Computer Repair",
    years: "2009 – 2023",
    summary: "Computer repair and support, website design, and SEO.",
  },
] as const;

export const tools = [
  "GA4",
  "Google Tag Manager",
  "Looker Studio",
  "Google Ads",
  "Bing Ads",
  "Shopify",
  "WordPress",
  "SEMrush",
  "Ahrefs",
  "Screaming Frog",
  "Mailchimp",
  "n8n",
  "Claude Code",
  "Codex",
  "Open Claw",
  "Hermes Agent",
] as const;

export const systems = ["Sites", "SEO", "IT", "Content", "AI systems"] as const;

export const testimonials = [
  {
    quote:
      "As a wellness provider, I had no clue what SEO did but since starting with Acupuncture SEO I have felt supported and everything was explained thoroughly. I’m so glad I did this years ago because now I am at the top of Google for my keywords.",
    name: "Ofelia Sierra",
    role: "Owner, The Muscle Relaxers",
  },
  {
    quote:
      "Keith has been working with us since 2009. He has been instrumental in maintaining our website and also maintaining our SEO. Our site has been getting hundreds of visitors every week and it has allowed our business to hire more practitioners and expand our client list. We recommend Keith to everyone that needs webdesign and SEO.",
    name: "Mark Schwartz",
    role: "Owner, Buckhead Acupuncture",
  },
  {
    quote:
      "Keith has been helping me with SEO and managing my website since 2011. He does a good job bringing me a steady stream of clients and keeping my website updated.",
    name: "Takashi Yamamoto",
    role: "Owner, YOM Clinic",
  },
] as const;

export const description =
  "Jason “Keith” Clemmons builds websites and the systems around them: IT, Code, Content, SEO, and AI Systems that do real work. Lead developer at GutRx. Based in Atlanta, Georgia.";
