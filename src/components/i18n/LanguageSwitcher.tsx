"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  variant = "light",
  size = "md",
}: {
  locale: Locale;
  variant?: "light" | "dark";
  size?: "sm" | "md";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-semibold",
        size === "sm" ? "p-0.5 text-[10px]" : "p-0.5 text-xs",
        variant === "dark" ? "border-white/15 bg-white/5" : "border-slate-200 bg-white dark:border-white/15 dark:bg-white/5"
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "bn"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          disabled={pending}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full transition-colors duration-200 disabled:opacity-60",
            size === "sm" ? "px-1.5 py-0.5" : "px-2.5 py-1",
            locale === code
              ? "bg-linear-to-r from-electric-500 to-cyan-400 text-navy-950"
              : variant === "dark"
                ? "text-slate-300 hover:text-white"
                : "text-slate-500 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
          )}
        >
          {code === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}
