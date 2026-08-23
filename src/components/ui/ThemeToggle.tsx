"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "sunlit_theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors duration-200 hover:text-navy-950 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white",
        className
      )}
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-4 w-4" />
    </button>
  );
}
