import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/header";
import { Atmosphere } from "@/components/weather";
import { description, links, person } from "@/lib/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const title = "Keith Clemmons — Web development, AI systems, and automation";

export const metadata: Metadata = {
  metadataBase: new URL("https://keithclemmons.com"),
  title: {
    default: title,
    template: "%s — Keith Clemmons",
  },
  description,
  applicationName: person.shortName,
  authors: [{ name: person.name }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://keithclemmons.com/",
    siteName: person.shortName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#202c45",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jason Keith Clemmons",
  alternateName: ["Keith Clemmons", "J. Keith Clemmons"],
  jobTitle: "Lead developer",
  telephone: "+1-678-412-5987",
  url: "https://keithclemmons.com/",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Smyrna",
    addressRegion: "GA",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "GutRx",
    url: links.gutrx,
  },
  owns: [
    {
      "@type": "Organization",
      name: "Acupuncture SEO",
      url: links.acupunctureSeo,
    },
    {
      "@type": "Organization",
      name: "Green Owl Marketing",
      url: links.greenOwl,
    },
    {
      "@type": "Organization",
      name: "Agent Invoice",
      url: links.agentInvoice,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Atmosphere />
        <a
          href="index.html#work"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#202c45] focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
