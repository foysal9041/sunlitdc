import type { InternetPackage } from "@/types";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { cn, formatBDT } from "@/lib/utils";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

// Each non-popular package gets its own accent color so the lineup reads as
// distinct tiers at a glance, not six identical gray cards. The "popular"
// package keeps its own dedicated blue/cyan featured treatment instead.
const PACKAGE_ACCENTS: Record<string, { border: string; text: string; blobA: string; blobB: string }> = {
  "basic-35": {
    border: "border-violet-300 dark:border-violet-400/40",
    text: "text-violet-600 dark:text-violet-300",
    blobA: "bg-violet-400/25 dark:bg-violet-400/30",
    blobB: "bg-violet-300/20 dark:bg-violet-300/20",
  },
  "premium-60": {
    border: "border-cyan-300 dark:border-cyan-400/40",
    text: "text-cyan-700 dark:text-cyan-300",
    blobA: "bg-cyan-400/25 dark:bg-cyan-400/30",
    blobB: "bg-cyan-300/20 dark:bg-cyan-300/20",
  },
  "pro-70": {
    border: "border-emerald-300 dark:border-emerald-400/40",
    text: "text-emerald-600 dark:text-emerald-300",
    blobA: "bg-emerald-400/25 dark:bg-emerald-400/30",
    blobB: "bg-emerald-300/20 dark:bg-emerald-300/20",
  },
  "ultimate-80": {
    border: "border-amber-300 dark:border-amber-400/40",
    text: "text-amber-600 dark:text-amber-300",
    blobA: "bg-amber-400/25 dark:bg-amber-400/30",
    blobB: "bg-amber-300/20 dark:bg-amber-300/20",
  },
  "ultra-110": {
    border: "border-rose-300 dark:border-rose-400/40",
    text: "text-rose-600 dark:text-rose-300",
    blobA: "bg-rose-400/25 dark:bg-rose-400/30",
    blobB: "bg-rose-300/20 dark:bg-rose-300/20",
  },
};

const POPULAR_ACCENT = {
  blobA: "bg-electric-500/25 dark:bg-electric-500/25",
  blobB: "bg-cyan-400/25 dark:bg-cyan-400/25",
};

export function PricingCard({ pkg, locale }: { pkg: InternetPackage; locale: Locale }) {
  const t = getCommonDictionary(locale);
  const accent = PACKAGE_ACCENTS[pkg.id];
  const blobs = pkg.popular ? POPULAR_ACCENT : accent;

  return (
    <div
      className={cn(
        "surface-card relative flex h-full flex-col rounded-3xl border-2 p-7",
        pkg.popular
          ? "surface-card--featured border-blue-300 bg-linear-to-b from-cyan-50 via-white to-white dark:border-cyan-400/40 dark:from-navy-800 dark:via-navy-900 dark:to-navy-900"
          : cn("bg-white dark:bg-navy-900", accent?.border ?? "border-slate-200 dark:border-white/10")
      )}
    >
      {/* Abstract generative-art backdrop, tinted per package */}
      {blobs && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
          <div className={cn("absolute -right-12 -top-16 h-56 w-56 rounded-full blur-3xl", blobs.blobA)} />
          <div className={cn("absolute -bottom-16 -left-10 h-44 w-44 rounded-full blur-3xl", blobs.blobB)} />
        </div>
      )}

      {pkg.popular && (
        <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-linear-to-r from-electric-500 to-cyan-400 px-4 py-1 text-xs font-bold text-navy-950 dark:text-white shadow-lg">
          {t.misc.mostPopular}
        </span>
      )}

      <div className="relative flex h-full flex-col">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{pkg.tagline}</p>
        <div className="mt-3 flex items-end gap-2">
          <span className={cn("text-4xl font-extrabold", pkg.popular ? "text-navy-950 dark:text-white" : (accent?.text ?? "text-navy-950 dark:text-white"))}>
            {pkg.speedMbps}
          </span>
          <span className="pb-1 text-lg font-semibold text-slate-500 dark:text-slate-400">{t.misc.mbps}</span>
        </div>

        <div className="mt-5 flex items-baseline gap-1 border-t border-slate-200 dark:border-white/10 pt-5">
          <span className="text-lg font-semibold text-electric-600 dark:text-cyan-300">৳</span>
          <span className="text-3xl font-extrabold text-navy-950 dark:text-white">{formatBDT(pkg.priceBDT)}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">{t.misc.perMonth}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0 text-electric-600 dark:text-cyan-300" />
              {feature}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-slate-400 dark:text-slate-500">{t.misc.bestFor}: {pkg.bestFor}</p>

        <Button
          href={`/contact?package=${pkg.id}`}
          variant={pkg.popular ? "primary" : "secondary"}
          className="mt-6 w-full justify-center"
        >
          {t.buttons.getConnection}
        </Button>
      </div>
    </div>
  );
}
