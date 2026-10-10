"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { hasSavedTheme, setTheme, useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "light" ? "dark" : "light";

  // Until the visitor picks a theme, keep following the device setting.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const follow = () => {
      if (!hasSavedTheme()) document.documentElement.dataset.theme = media.matches ? "light" : "dark";
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={next === "light" ? "Switch to the sunny light theme" : "Switch to the stormy dark theme"}
      title={next === "light" ? "Sunny" : "Stormy"}
      className="grid size-9 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-[#f21b51] hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f21b51]"
    >
      {theme === "light" ? <Moon className="size-4" aria-hidden="true" /> : <Sun className="size-4" aria-hidden="true" />}
    </button>
  );
}
