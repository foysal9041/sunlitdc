import type { InternetPackage } from "@/types";
import type { Locale } from "@/i18n/config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { cn, formatBDT } from "@/lib/utils";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export function PricingCard({ pkg, locale }: { pkg: InternetPackage; locale: Locale }) {
  const t = getCommonDictionary(locale);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-2",
        pkg.popular
          ? "border-cyan-300 bg-linear-to-b from-cyan-50 via-white to-white shadow-[0_20px_45px_-20px_rgba(47,99,255,0.35)] dark:border-cyan-400/40 dark:from-navy-800 dark:via-navy-900 dark:to-navy-900"
          : "border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 shadow-sm hover:border-electric-300 hover:shadow-md"
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-electric-500 to-cyan-400 px-4 py-1 text-xs font-bold text-navy-950 dark:text-white shadow-lg">
          {t.misc.mostPopular}
        </span>
      )}

      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{pkg.tagline}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-4xl font-extrabold text-navy-950 dark:text-white">{pkg.speedMbps}</span>
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
  );
}
