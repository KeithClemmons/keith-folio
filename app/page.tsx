import { ContactForm } from "@/components/contact-form";
import { LinkButton } from "@/components/link-button";
import { ScrollEffects } from "@/components/scroll-effects";
import { StormStage } from "@/components/weather";
import { experience, links, nav, person, systems, testimonials, tools } from "@/lib/site";

function Eyebrow({
  children,
  className = "text-accent-ink",
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
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
      className="font-medium text-accent-ink underline decoration-[#f21b51] underline-offset-[0.2em] hover:text-ink"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <main className="relative flex-1">
        {/* The hero sticks inside this wrapper only, so it lets go once Work has covered it. */}
        <div className="cover-stack">
          <section id="top" className="hero-sky">
            <StormStage />
            <div className="hero-inner relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 pb-14 md:grid-cols-[minmax(0,1fr)_17rem] md:pt-12 md:pb-16 lg:grid-cols-[minmax(0,1fr)_19rem]">
              <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Eyebrow>{person.location}</Eyebrow>
                  <p className="mt-4 font-serif text-2xl tracking-tight text-ink">
                    {person.name}
                  </p>
                </div>
                <figure className="portrait-frame w-28 shrink-0 sm:w-32 md:hidden">
                  <img src="keith.jpg" alt="Jason “Keith” Clemmons" width={960} height={1206} />
                </figure>
              </div>
              <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.45rem,5.8vw,5.35rem)] leading-[1.02] tracking-[-0.035em] text-ink">
                Web development,
                <br />
                AI systems,
                <br />
                Marketing,
                <br />
                and <span className="italic">automation.</span>
              </h1>
              <div className="mt-6 h-px w-14 bg-[#f21b51]" />
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
                I build websites and the systems around them:
                <br />
                IT, Code, Content, SEO, and AI Systems that do real work.
              </p>
              <ul className="slash-ribbon mt-6 list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
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
              <figure className="portrait-frame hidden md:block">
                <img src="keith.jpg" alt="Jason “Keith” Clemmons" width={960} height={1206} />
              </figure>
            </div>
            <div className="hero-shade" aria-hidden="true" />
          </section>

          <section id="work" tabIndex={-1} className="slant-panel outline-none">
            <div className="mx-auto max-w-6xl px-5 pt-20 pb-16 md:pt-28 md:pb-24">
              <Eyebrow data-reveal="rise">01 — Work</Eyebrow>
              <h2 data-reveal="rise" className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                Where I work now.
              </h2>

              <p data-reveal="rise" className="mt-6 max-w-2xl text-lg leading-relaxed">
                I’m the lead developer at GutRx, and I own three businesses.
              </p>

              <div className="tilt-deck mt-10 border-t border-line">
                <article
                  id="gutrx"
                  data-reveal="deal"
                  className="tilt-card grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-10 md:py-10"
                >
                  <div className="md:col-span-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
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
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <LinkButton href={links.gutrx} external className="w-full px-5 sm:w-auto">
                        Visit GutRx
                      </LinkButton>
                    </div>
                  </div>
                </article>

                <article data-reveal="deal" className="tilt-card grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-10 md:py-10">
                  <div className="md:col-span-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                      Owner<span aria-hidden="true"> · </span>Search marketing
                    </p>
                    <h3 className="mt-2 font-serif text-3xl tracking-tight">
                      Acupuncture SEO
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="max-w-xl text-lg leading-relaxed">
                      Search marketing for acupuncture clinics. I’ve run it since
                      2009.
                    </p>
                    <p className="mt-4">
                      <ExternalAnchor href={links.acupunctureSeo}>
                        acupunctureseo.com
                      </ExternalAnchor>
                    </p>
                  </div>
                </article>

                <article data-reveal="deal" className="tilt-card grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-10 md:py-10">
                  <div className="md:col-span-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
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
                        className="font-medium text-accent-ink underline decoration-[#f21b51] underline-offset-[0.2em] hover:text-ink"
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

                <article data-reveal="deal" className="tilt-card grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-10 md:py-10">
                  <div className="md:col-span-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
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
        </div>

        <section id="dev">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow data-reveal="rise">02 — Dev</Eyebrow>
            <h2 data-reveal="rise" className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Apps, code, and dev stuff.
            </h2>
            <div data-reveal="deal" className="mt-10 grid gap-4 border-t border-line pt-8 md:grid-cols-12 md:gap-10 md:pt-10">
              <div className="md:col-span-4">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
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

        <section id="background" className="slant-panel-alt">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
            <Eyebrow data-reveal="rise">03 — Background</Eyebrow>
            <h2 data-reveal="rise" className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Web design, marketing, and IT since 2009.
            </h2>
            <p data-reveal="rise" className="mt-6 max-w-2xl text-lg leading-relaxed">
              Sixteen years across SEO, paid search, and e-commerce. I’m based
              in Atlanta, Georgia, and I’m available for freelance when the
              project is a fit.
            </p>

            <ol className="mt-10 list-none border-t border-line p-0">
              {experience.map((job) => (
                <li
                  key={job.org}
                  data-reveal="slide"
                  className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-10"
                >
                  <div className="md:col-span-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                      {job.years}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl tracking-tight">{job.org}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{job.role}</p>
                  </div>
                  <p className="max-w-xl text-lg leading-relaxed md:col-span-8">
                    {job.summary}
                  </p>
                </li>
              ))}
            </ol>

            <div data-reveal="rise" className="mt-10 grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                  Education
                </p>
                <p className="mt-2 text-lg leading-relaxed">
                  B.S., The Evergreen State College, 2003
                </p>
                <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                  Certification
                </p>
                <p className="mt-2 text-lg leading-relaxed">Google Search Ads</p>
              </div>
              <div className="md:col-span-8">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-soft">
                  Tools
                </p>
                <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
                  {tools.map((tool) => (
                    <li
                      key={tool}
                      data-reveal="tag"
                      className="border border-line-strong px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="references">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow data-reveal="rise">04 — References</Eyebrow>
            <h2 data-reveal="rise" className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              What clients have said.
            </h2>
            <div className="mt-8 border-t border-line">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  data-reveal="quote"
                  className="border-b border-line py-8 md:py-10"
                >
                  <blockquote>
                    <p className="pull-quote max-w-3xl font-serif text-[1.35rem] leading-snug tracking-[-0.02em] text-ink md:text-[1.7rem] md:leading-snug">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-soft">
                    <span className="text-ink">{item.name}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-page text-ink">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <Eyebrow data-reveal="rise" className="text-accent-ink">05 — Contact</Eyebrow>
            <h2 data-reveal="rise" className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {person.locationShort}
            </h2>
            <p data-reveal="rise" className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Available for freelance when the project is a fit.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <ScrollEffects />
      <footer className="relative z-[1] bg-page text-ink-soft">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-line px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {person.name}</p>
          <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  className="underline decoration-[#f21b51] underline-offset-4 hover:text-ink"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
