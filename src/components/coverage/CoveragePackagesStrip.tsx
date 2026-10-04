import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { getInternetPackages } from "@/data/packages";
import { cn, formatBDT } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export function CoveragePackagesStrip({ locale }: { locale: Locale }) {
  const t = getPagesDictionary(locale).coverage;
  const misc = getCommonDictionary(locale).misc;
  const packages = getInternetPackages(locale);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">{t.packagesStripEyebrow}</span>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-950 dark:text-white sm:text-3xl">{t.packagesStripTitle}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.packagesStripSubtitle}</p>
        </div>
        <Link href="/internet#packages" className="hidden shrink-0 text-sm font-semibold text-electric-600 dark:text-cyan-300 hover:text-electric-500 sm:block">
          {t.packagesStripLink} →
        </Link>
      </div>

      <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {packages.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className={cn(
                "surface-card card-edge relative w-40 shrink-0 snap-start rounded-2xl border bg-white dark:bg-navy-900 p-4 text-center sm:w-auto",
                pkg.popular ? "surface-card--featured border-electric-400 shadow-[0_0_30px_-10px_rgba(13,156,196,0.45)]" : "border-slate-200 dark:border-white/10"
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-sun-400 to-sun-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-navy-950 shadow-sm">
                  {t.popular}
                </span>
              )}
              <p className={"text-lg font-extrabold text-electric-600 dark:text-cyan-300"}>{pkg.speedMbps} {misc.mbps}</p>
              <div className={"mx-auto my-3 flex h-12 w-12 items-center justify-center rounded-full bg-electric-50 dark:bg-electric-500/15"}>
                <Icon name="gauge" className={"h-6 w-6 text-electric-600 dark:text-cyan-300"} />
              </div>
              <p className="text-sm font-semibold text-navy-950 dark:text-white">৳{formatBDT(pkg.priceBDT)}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{misc.perMonth}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
