import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/lib/site";

function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Page" className={className}>
      {nav.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="shrink-0 text-sm text-ink/80 transition-colors hover:text-ink focus-visible:text-ink"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[var(--header-bg)] backdrop-blur-md">
      <div className="h-[3px] bg-[#f21b51]" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:py-3.5">
        <a href="index.html#work" className="justify-self-start">
          <img
            src="logo-white.png"
            alt="Keith Clemmons"
            width={206}
            height={36}
            className="site-logo h-8 w-auto sm:h-9"
          />
        </a>
        <NavLinks className="hidden items-center gap-5 lg:flex" />
        <div className="flex items-center gap-4 justify-self-end">
          <a
            href="index.html#contact"
            className="font-mono text-sm tracking-wide text-ink underline decoration-[#f21b51] underline-offset-4 hover:text-accent-ink"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-3 lg:hidden">
        <NavLinks className="nav-scroll flex gap-4 overflow-x-auto" />
      </div>
    </header>
  );
}
