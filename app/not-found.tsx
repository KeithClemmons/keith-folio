import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-20">
      <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-ink">
        404
      </p>
      <h1 className="mt-3 max-w-xl font-display text-4xl tracking-tight md:text-5xl">
        This page isn’t on the site.
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed">
        The site is one page. The contact form is on it.
      </p>
      <div className="mt-8">
        <LinkButton href="index.html#contact" className="px-5">
          Back to the front
        </LinkButton>
      </div>
    </main>
  );
}
