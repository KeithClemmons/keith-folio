import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LinkButton({
  href,
  children,
  variant = "default",
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  external?: boolean;
}) {
  const classNameMerged = cn(
    buttonVariants({ variant }),
    "h-11 px-4 text-[0.95rem]",
    className,
  );
  const content = (
    <>
      {children}
      {external ? (
        <>
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classNameMerged}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classNameMerged}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
