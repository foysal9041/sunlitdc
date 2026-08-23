"use client";

import { Icon } from "@/components/icons/Icon";

export function BackToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-electric-600 shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-1 hover:text-electric-500 hover:shadow-xl dark:border-white/10 dark:bg-navy-900 dark:text-cyan-300 dark:hover:text-cyan-200"
    >
      <Icon name="arrowRight" className="h-5 w-5 -rotate-90" />
    </button>
  );
}
