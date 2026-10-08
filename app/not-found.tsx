import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";
import { person } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-20">
      <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#ff8eab]">
        404
      </p>
      <h1 className="mt-3 max-w-xl font-serif text-4xl tracking-tight md:text-5xl">
        This page isn’t on the site.
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed">
        The site is one page. The phone still works.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <LinkButton href="/" className="px-5">
          Back to the front
        </LinkButton>
        <LinkButton href={person.phoneHref} variant="outline" className="px-5">
          Call {person.phoneDisplay}
        </LinkButton>
      </div>
    </main>
  );
}
