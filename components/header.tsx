import Image from "next/image";
import Link from "next/link";
import { nav, person } from "@/lib/site";

function NavLinks({ className }: { className?: string }) {
  return (
    <nav aria-label="Page" className={className}>
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="shrink-0 text-sm text-white/80 transition-colors hover:text-white focus-visible:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#202c45]/92 backdrop-blur-md">
      <div className="h-[3px] bg-[#f21b51]" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:py-3.5">
        <Link href="/#work" className="justify-self-start">
          <Image
            src="/logo-white.png"
            alt="Keith Clemmons"
            width={206}
            height={36}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>
        <NavLinks className="hidden items-center gap-5 lg:flex" />
        <a
          href={person.phoneHref}
          className="justify-self-end font-mono text-sm tracking-wide text-white underline decoration-[#f21b51] underline-offset-4 hover:text-[#ff8eab]"
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
