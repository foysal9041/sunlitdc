import type { InternetPackage } from "@/types";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { cn, formatBDT } from "@/lib/utils";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export function PricingCard({ pkg, locale }: { pkg: InternetPackage; locale: Locale }) {
  const t = getCommonDictionary(locale);
  const hot = pkg.popular;

  return (
    <div
      className={cn(
        "surface-card card-edge relative flex h-full flex-col rounded-3xl border p-7",
        hot
          ? "border-electric-500/60 bg-linear-to-b from-navy-800 to-navy-950 text-white shadow-[0_24px_60px_-20px_rgba(13,156,196,0.55)] lg:-translate-y-2"
          : "bg-white dark:bg-navy-900"
      )}
      style={hot ? { background: "linear-gradient(160deg, #10405c 0%, #07263a 100%)" } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div
          className={cn(
            "absolute -right-12 -top-16 h-56 w-56 rounded-full blur-3xl",
            hot ? "bg-electric-500/35" : "bg-electric-300/20 dark:bg-electric-500/20"
          )}
        />
        <div
          className={cn(
            "absolute -bottom-16 -left-10 h-44 w-44 rounded-full blur-3xl",
            hot ? "bg-cyan-400/25" : "bg-cyan-300/15 dark:bg-cyan-400/15"
          )}
        />
      </div>

      {hot && (
        <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-linear-to-r from-sun-400 to-sun-500 px-4 py-1 text-xs font-bold text-navy-950 shadow-[0_8px_20px_-6px_rgba(255,159,26,0.7)]">
          ★ {t.misc.mostPopular}
        </span>
      )}

      <div className="relative flex h-full flex-col">
        <p className={cn("text-sm font-medium", hot ? "text-slate-300" : "text-slate-500 dark:text-slate-400")}>{pkg.tagline}</p>
        <div className="mt-3 flex items-end gap-2">
          <span className={cn("text-5xl font-extrabold tracking-tight", hot ? "text-white" : "text-navy-950 dark:text-white")}>
            {pkg.speedMbps}
          </span>
          <span className={cn("pb-1.5 text-lg font-semibold", hot ? "text-cyan-300" : "text-electric-600 dark:text-cyan-300")}>
            {t.misc.mbps}
          </span>
        </div>

        <div className={cn("mt-5 flex items-baseline gap-1 border-t pt-5", hot ? "border-white/15" : "border-slate-200 dark:border-white/10")}>
          <span className={cn("text-lg font-semibold", hot ? "text-sun-400" : "text-electric-600 dark:text-cyan-300")}>৳</span>
          <span className={cn("text-3xl font-extrabold", hot ? "text-white" : "text-navy-950 dark:text-white")}>{formatBDT(pkg.priceBDT)}</span>
          <span className={cn("text-sm", hot ? "text-slate-300" : "text-slate-500 dark:text-slate-400")}>{t.misc.perMonth}</span>
        </div>

        <ul className="mt-6 flex-1 space-y-3">
          {pkg.features.map((feature) => (
            <li key={feature} className={cn("flex items-start gap-2.5 text-sm", hot ? "text-slate-200" : "text-slate-600 dark:text-slate-300")}>
              <Icon name="checkCircle" className={cn("mt-0.5 h-4 w-4 shrink-0", hot ? "text-sun-400" : "text-electric-600 dark:text-cyan-300")} />
              {feature}
            </li>
          ))}
        </ul>

        <p className={cn("mt-5 text-xs", hot ? "text-slate-400" : "text-slate-400 dark:text-slate-500")}>{t.misc.bestFor}: {pkg.bestFor}</p>

        <Button
          href={`/contact?package=${pkg.id}`}
          variant={hot ? "sun" : "secondary"}
          icon
          className="mt-6 w-full justify-center"
        >
          {t.buttons.getConnection}
        </Button>
      </div>
    </div>
  );
}
