import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import { getInternetPackages } from "@/data/packages";
import { cn, formatBDT } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

const ACCENTS = [
  { ring: "border-violet-300", text: "text-violet-600", glow: "bg-violet-100" },
  { ring: "border-cyan-300", text: "text-cyan-700", glow: "bg-cyan-100" },
  { ring: "border-blue-300", text: "text-blue-600", glow: "bg-blue-100" },
  { ring: "border-emerald-300", text: "text-emerald-600", glow: "bg-emerald-100" },
  { ring: "border-amber-300", text: "text-amber-600", glow: "bg-amber-100" },
  { ring: "border-rose-300", text: "text-rose-600", glow: "bg-rose-100" },
];

export function CoveragePackagesStrip({ locale }: { locale: Locale }) {
  const t = getPagesDictionary(locale).coverage;
  const misc = getCommonDictionary(locale).misc;
  const packages = getInternetPackages(locale);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-electric-600">{t.packagesStripEyebrow}</span>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">{t.packagesStripTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">{t.packagesStripSubtitle}</p>
        </div>
        <Link href="/internet#packages" className="hidden shrink-0 text-sm font-semibold text-electric-600 hover:text-electric-500 sm:block">
          {t.packagesStripLink} →
        </Link>
      </div>

      <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {packages.map((pkg, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <div
              key={pkg.id}
              className={cn(
                "relative w-40 shrink-0 snap-start rounded-2xl border bg-white p-4 text-center shadow-sm sm:w-auto",
                pkg.popular ? "border-cyan-300 shadow-[0_0_30px_-10px_rgba(47,99,255,0.35)]" : accent.ring
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-electric-500 to-cyan-400 px-2.5 py-0.5 text-[10px] font-bold uppercase text-navy-950">
                  {t.popular}
                </span>
              )}
              <p className={cn("text-lg font-extrabold", accent.text)}>{pkg.speedMbps} {misc.mbps}</p>
              <div className={cn("mx-auto my-3 flex h-12 w-12 items-center justify-center rounded-full", accent.glow)}>
                <Icon name="gauge" className={cn("h-6 w-6", accent.text)} />
              </div>
              <p className="text-sm font-semibold text-navy-950">৳{formatBDT(pkg.priceBDT)}</p>
              <p className="text-[11px] text-slate-500">{misc.perMonth}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
