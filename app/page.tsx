import { ContactForm } from "@/components/contact-form";
import { LinkButton } from "@/components/link-button";
import { StormStage } from "@/components/weather";
import { links, person, systems, testimonials } from "@/lib/site";

function Eyebrow({
  children,
  className = "text-[#ff8eab]",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] ${className}`}
    >
      {children}
    </p>
  );
}

function ExternalAnchor({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#ff8eab] underline decoration-[#f21b51] underline-offset-[0.2em] hover:text-white"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative z-[1] flex-1">
        <section id="top" className="hero-sky">
          <StormStage />
          <div className="relative z-10 mx-auto max-w-6xl px-5 pt-10 pb-14 md:pt-12 md:pb-16">
            <Eyebrow>{person.location}</Eyebrow>
            <p className="mt-4 font-serif text-2xl tracking-tight text-white">
              {person.name}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.45rem,5.8vw,5.35rem)] leading-[0.92] tracking-[-0.035em] text-white">
              Web development,
              <br />
              AI systems,
              <br />
              and <span className="italic">automation.</span>
            </h1>
            <div className="mt-6 h-px w-14 bg-[#f21b51]" />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white md:text-xl md:leading-relaxed">
              I build websites and the systems around them: sites, SEO, email,
              content, and AI agents that do real work.
            </p>
            <ul className="slash-ribbon mt-6 list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
              {systems.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-[#f21b51]">
                      /
                    </span>
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <LinkButton href="index.html#contact" className="w-full px-5 sm:w-auto">
                Contact
              </LinkButton>
            </div>
          </div>
        </section>

        <section id="work" tabIndex={-1} className="slant-panel outline-none">
          <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28 md:pb-24">
            <Eyebrow>01 — Work</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Where I work now.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed">
              I’m the lead developer at GutRx, and I own three businesses.
            </p>

            <div className="tilt-deck mt-10 border-t border-white/15">
              <article
                id="gutrx"
                className="tilt-card grid gap-4 border-b border-white/15 py-8 md:grid-cols-12 md:gap-10 md:py-10"
              >
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
                    Lead developer
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight">GutRx</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-xl text-lg leading-relaxed">
                    I’m the lead developer at{" "}
                    <ExternalAnchor href={links.gutrx}>GutRx</ExternalAnchor>, a
                    probiotic brand. I built the website, administer the site, and
                    handle SEO, email marketing, and blogging.
                  </p>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed">
                    The public about page is the doctors who guide the formulas.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <LinkButton href={links.gutrx} external className="w-full px-5 sm:w-auto">
                      Visit GutRx
                    </LinkButton>
                    <LinkButton
                      href={links.gutrxAbout}
                      external
                      variant="outline"
                      className="w-full bg-transparent px-5 text-white sm:w-auto"
                    >
                      The doctors
                    </LinkButton>
                  </div>
                </div>
              </article>

              <article className="tilt-card grid gap-4 border-b border-white/15 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
                    Owner<span aria-hidden="true"> · </span>Search marketing
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight">
                    Acupuncture SEO
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-xl text-lg leading-relaxed">
                    Search marketing for acupuncture clinics. I have owned it
                    since 2013, and I still run it.
                  </p>
                  <p className="mt-4">
                    <ExternalAnchor href={links.acupunctureSeo}>
                      acupunctureseo.com
                    </ExternalAnchor>
                  </p>
                </div>
              </article>

              <article className="tilt-card grid gap-4 border-b border-white/15 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
                    Owner<span aria-hidden="true"> · </span>Marketing studio
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight">
                    Green Owl Marketing
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-xl text-lg leading-relaxed">
                    Green Owl Marketing is my marketing studio. The live site
                    offers an Authority Engine starter at $3,000 a month:
                    autoblogging, links, and social posts from those blogs. The
                    studio phone line is{" "}
                    <a
                      href={links.greenOwlPhoneHref}
                      className="font-medium text-[#ff8eab] underline decoration-[#f21b51] underline-offset-[0.2em] hover:text-white"
                    >
                      {links.greenOwlPhoneDisplay}
                    </a>
                    .
                  </p>
                  <p className="mt-4">
                    <ExternalAnchor href={links.greenOwl}>
                      greenowlmarketing.com
                    </ExternalAnchor>
                  </p>
                </div>
              </article>

              <article className="tilt-card grid gap-4 border-b border-white/15 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
                    Owner<span aria-hidden="true"> · </span>Invoicing software
                  </p>
                  <h3 className="mt-2 font-serif text-3xl tracking-tight">
                    Agent Invoice
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-xl text-lg leading-relaxed">
                    Agent Invoice is simple invoicing software I own. Zero
                    commissions. Clients pay by card, PayPal, or bank ACH.
                    There is a free plan.
                  </p>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed">
                    AI agents can create clients, draft invoices, send billing
                    emails, and react to payments through a REST API, webhooks,
                    and an MCP server.
                  </p>
                  <p className="mt-4">
                    <ExternalAnchor href={links.agentInvoice}>
                      agent-invoice.com
                    </ExternalAnchor>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="dev">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow>02 — Dev</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Apps, code, and dev stuff.
            </h2>
            <div className="mt-10 grid gap-4 border-t border-white/15 pt-8 md:grid-cols-12 md:gap-10 md:pt-10">
              <div className="md:col-span-4">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#c5cedd]">
                  Dev site
                </p>
                <h3 className="mt-2 font-serif text-3xl tracking-tight">
                  dev.keithclemmons.com
                </h3>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-xl text-lg leading-relaxed">
                  The apps I build and the code behind them live on my dev
                  site, including Audio Limiter Pro, a Chrome extension that
                  evens out audio volume, and my GitHub repositories.
                </p>
                <div className="mt-7">
                  <LinkButton href={links.dev} external className="w-full px-5 sm:w-auto">
                    Visit the dev site
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="background" className="slant-panel-alt rise">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
            <Eyebrow>03 — Background</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Web design, marketing, and IT since 2009.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
              <p>
                I’m based in Atlanta, Georgia, and I’m available for freelance
                when the project is a fit.
              </p>
              <p>
                Earlier: ATL Computer Repair from 2009 to 2023 (tech support,
                website design, and SEO) and Google and Bing ads for
                Acupuncture Atlanta from 2011 to 2021.
              </p>
            </div>
          </div>
        </section>

        <section id="references" className="rise">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow>04 — References</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              What clients have said.
            </h2>
            <div className="mt-8 border-t border-white/15">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="border-b border-white/15 py-8 md:py-10"
                >
                  <blockquote>
                    <p className="pull-quote max-w-3xl font-serif text-[1.35rem] leading-snug tracking-[-0.02em] text-white md:text-[1.7rem] md:leading-snug">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#c5cedd]">
                    <span className="text-white">{item.name}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="rise bg-[#202c45] text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <Eyebrow className="text-[#ff8eab]">05 — Contact</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {person.locationShort}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#c5cedd]">
              Available for freelance when the project is a fit.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="relative z-[1] bg-[#202c45] text-[#c5cedd]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/15 px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {person.name}</p>
          <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
            {(
              [
                ["GutRx", links.gutrx],
                ["Dev site", links.dev],
                ["Acupuncture SEO", links.acupunctureSeo],
                ["Green Owl Marketing", links.greenOwl],
                ["Agent Invoice", links.agentInvoice],
              ] as const
            ).map(([label, href]) => (
              <li key={href}>
                <a
                  className="underline decoration-[#f21b51] underline-offset-4 hover:text-white"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
