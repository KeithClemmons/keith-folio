import Link from "next/link";
import { nav, person } from "@/lib/site";

function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Page" className={className}>
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="shrink-0 text-sm text-[#5c564c] transition-colors hover:text-[#1c1915] focus-visible:text-[#1c1915]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#ddd4c6] bg-[#f3efe6]/92 backdrop-blur-md">
      <div className="h-[3px] bg-[#7c2f14]" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:py-3.5">
        <Link href="/#work" className="flex items-center gap-2.5 justify-self-start">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center bg-[#1c1915] font-serif text-lg leading-none text-[#f3efe6]"
          >
            K
          </span>
          <span className="font-serif text-[1.05rem] leading-none tracking-tight">
            {person.shortName}
          </span>
        </Link>
        <NavLinks className="hidden items-center gap-5 lg:flex" />
        <a
          href={person.phoneHref}
          className="justify-self-end font-mono text-sm tracking-wide text-[#7c2f14] underline decoration-[#7c2f14]/30 underline-offset-4 hover:decoration-[#7c2f14]"
        >
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">{person.phoneDisplay}</span>
        </a>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-3 lg:hidden">
        <NavLinks className="nav-scroll flex gap-4 overflow-x-auto" />
      </div>
    </header>
  );
}
