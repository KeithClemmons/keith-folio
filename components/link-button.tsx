import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  return (
    <Button
      nativeButton={false}
      variant={variant}
      className={cn("h-11 px-4 text-[0.95rem]", className)}
      render={
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        />
      }
    >
      {children}
      {external ? (
        <>
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </Button>
  );
}
