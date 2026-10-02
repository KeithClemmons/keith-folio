import { LinkButton } from "@/components/link-button";
import { links, person, systems, testimonials } from "@/lib/site";

function Eyebrow({
  children,
  className = "text-[#7c2f14]",
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
      className="font-medium text-[#7c2f14] underline decoration-[#7c2f14]/35 underline-offset-[0.2em] hover:decoration-[#7c2f14]"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <section id="work" tabIndex={-1} className="outline-none">
          <div className="mx-auto max-w-6xl px-5 pt-12 pb-14 md:pt-20 md:pb-20">
            <Eyebrow>
              01 — The work
              <span aria-hidden="true"> · </span>
              {person.location}
            </Eyebrow>
            <p className="mt-4 font-serif text-2xl tracking-tight text-[#1c1915]">
              {person.name}
            </p>
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.45rem,5.8vw,5.35rem)] leading-[0.92] tracking-[-0.035em] text-[#1c1915]">
              Web development,
              <br />
              AI systems,
              <br />
              and <span className="italic">automation.</span>
            </h1>
            <div className="mt-8 h-px w-14 bg-[#7c2f14]" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1c1915] md:text-xl md:leading-relaxed">
              I build websites and the systems around them: sites, SEO, email,
              content, and AI agents that do real work.
            </p>
            <ul className="mt-6 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#5c564c]">
              {systems.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-[#7c2f14]">
                      /
                    </span>
                  ) : null}
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LinkButton href={person.phoneHref} className="w-full px-5 sm:w-auto">
                Call {person.phoneDisplay}
              </LinkButton>
            </div>
          </div>
        </section>

        <section id="gutrx" className="border-y border-[#ddd4c6] bg-[#e8e0d2]">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="md:col-span-5">
              <Eyebrow>02 — Now</Eyebrow>
              <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
                Lead developer at GutRx
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg leading-relaxed">
                I’m the lead developer at{" "}
                <ExternalAnchor href={links.gutrx}>GutRx</ExternalAnchor>, a
                probiotic brand. I built the website, administer the site, and
                handle SEO, email marketing, and blogging.
              </p>
              <p className="mt-4 text-lg leading-relaxed">
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
                  className="w-full bg-[#f3efe6] px-5 sm:w-auto"
                >
                  The doctors
                </LinkButton>
              </div>
            </div>
          </div>
        </section>

        <section id="companies">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow>03 — Companies</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Three businesses I own.
            </h2>

            <div className="mt-10 border-t border-[#ddd4c6]">
              <article className="grid gap-4 border-b border-[#ddd4c6] py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#5c564c]">
                    Search marketing
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

              <article className="grid gap-4 border-b border-[#ddd4c6] py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#5c564c]">
                    Marketing studio
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
                      className="font-medium text-[#7c2f14] underline decoration-[#7c2f14]/35 underline-offset-[0.2em] hover:decoration-[#7c2f14]"
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

              <article className="grid gap-4 border-b border-[#ddd4c6] py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[#5c564c]">
                    Invoicing software
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

        <section id="background" className="border-y border-[#ddd4c6] bg-[#f7f4ee]">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow>04 — Background</Eyebrow>
            <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              Web design, marketing, and IT since 2009.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
              <p>
                I’m based in Smyrna, Georgia, and I’m available for freelance
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

        <section id="clients">
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Eyebrow>05 — In their words</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              What clients have said.
            </h2>
            <div className="mt-8 border-t border-[#ddd4c6]">
              {testimonials.map((item) => (
                <figure
                  key={item.name}
                  className="border-b border-[#ddd4c6] py-8 md:py-10"
                >
                  <blockquote>
                    <p className="pull-quote max-w-3xl font-serif text-[1.35rem] leading-snug tracking-[-0.02em] text-[#1c1915] md:text-[1.7rem] md:leading-snug">
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[#5c564c]">
                    <span className="text-[#1c1915]">{item.name}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#1b1814] text-[#f4f0e7]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <Eyebrow className="text-[#e7a08a]">06 — Contact</Eyebrow>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
              {person.locationShort}
            </h2>
            <a
              href={person.phoneHref}
              className="mt-6 inline-block max-w-full font-serif text-[clamp(2.25rem,8vw,4.5rem)] leading-none tracking-[-0.03em] text-[#f4f0e7] underline decoration-[#e7a08a] decoration-2 underline-offset-[0.18em] hover:decoration-[#f4f0e7]"
            >
              {person.phoneDisplay}
            </a>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-[#d9d2c5]">
              Available for freelance when the project is a fit.
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-[#1b1814] text-[#d9d2c5]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/15 px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {person.name}</p>
          <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
            {(
              [
                ["GutRx", links.gutrx],
                ["Acupuncture SEO", links.acupunctureSeo],
                ["Green Owl Marketing", links.greenOwl],
                ["Agent Invoice", links.agentInvoice],
              ] as const
            ).map(([label, href]) => (
              <li key={href}>
                <a
                  className="underline underline-offset-4 hover:text-[#f4f0e7]"
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
