/**
 * Public facts for the site. Testimonials are the words inside the
 * quotation marks on keithclemmons.com (HTML checked 2026-10-02).
 * Attribution follows those testimonial modules.
 */

export const person = {
  name: "Jason “Keith” Clemmons",
  shortName: "Keith Clemmons",
  phoneDisplay: "678-412-5987",
  phoneHref: "tel:+16784125987",
  location: "Smyrna, Georgia",
  locationShort: "Smyrna, GA",
} as const;

export const links = {
  gutrx: "https://gutrx.com",
  gutrxAbout: "https://gutrx.com/pages/about-gutrx",
  acupunctureSeo: "https://acupunctureseo.com",
  greenOwl: "https://greenowlmarketing.com",
  greenOwlPhoneDisplay: "256-OWL-HUNT",
  greenOwlPhoneHref: "tel:+12566954868",
  agentInvoice: "https://agent-invoice.com",
} as const;

export const nav = [
  { href: "index.html#work", label: "Work" },
  { href: "index.html#gutrx", label: "GutRx" },
  { href: "index.html#companies", label: "Companies" },
  { href: "index.html#background", label: "Background" },
  { href: "index.html#clients", label: "Clients" },
  { href: "index.html#contact", label: "Contact" },
] as const;

export const systems = ["Sites", "SEO", "Email", "Content", "AI agents"] as const;

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
  "Jason “Keith” Clemmons builds websites and the systems around them: sites, SEO, email, content, and AI agents that do real work. Lead developer at GutRx. Based in Smyrna, Georgia.";
