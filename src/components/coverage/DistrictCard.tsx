"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/Icon";
import type { PublicDistrictCoverage } from "@/lib/coverage";
import type { Locale } from "@/i18n/config";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { cn } from "@/lib/utils";

const DISTRICT_ICONS = ["building", "mapPin", "globe", "network", "router", "wifi"] as const;

export function DistrictCard({
  district,
  index,
  locale,
}: {
  district: PublicDistrictCoverage;
  index: number;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const icon = DISTRICT_ICONS[index % DISTRICT_ICONS.length];
  const t = getPagesDictionary(locale).coverage;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl">
      <div className="h-1.5 w-full bg-linear-to-r from-electric-500 to-cyan-400" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-electric-500 to-cyan-400 text-white shadow-sm">
            <Icon name={icon} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-navy-950 dark:text-white">{district.districtLabel}</h3>
            <p className="text-sm font-semibold text-electric-600 dark:text-cyan-300">
              {district.areaCount} {district.areaCount === 1 ? t.area : t.areas}
            </p>
          </div>
        </div>

        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {t.active}
        </span>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{district.description}</p>

        {district.areaLabels.length > 0 && (
          <div className="mt-3 border-t border-slate-200 dark:border-white/10 pt-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex w-full items-center justify-between text-xs font-bold text-electric-600 dark:text-cyan-300 hover:text-electric-500"
            >
              {t.viewDetails}
              <Icon name="chevronDown" className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {district.areaLabels.map((area) => (
                  <li key={area} className="rounded-full border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {area}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
