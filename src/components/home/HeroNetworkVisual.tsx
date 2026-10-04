import Image from "next/image";
import { Icon } from "@/components/icons/Icon";
import { getInternetPackages } from "@/data/packages";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";
import type { IconName } from "@/types";

const services: { id: "fiber" | "real-ip" | "bdix" | "monitoring"; icon: IconName }[] = [
  { id: "fiber", icon: "network" },
  { id: "real-ip", icon: "globe" },
  { id: "bdix", icon: "server" },
  { id: "monitoring", icon: "activity" },
];

export function HeroNetworkVisual({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const pills = getHomeDictionary(locale).hero.pills;
  const misc = getCommonDictionary(locale).misc;
  const packages = getInternetPackages(locale);
  const max = Math.max(...packages.map((p) => p.speedMbps));

  return (
    <div className="relative mx-auto w-full max-w-[520px] px-2 py-10 sm:px-6">
      {/* Orbit rings + soft glow behind the dashboard */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="absolute h-[92%] w-[92%] rounded-full bg-electric-500/10 blur-[90px] dark:bg-electric-500/20" />
        <div className="absolute aspect-square w-[108%] rounded-full border border-dashed border-electric-400/30 motion-safe:animate-radar-spin" style={{ animationDuration: "60s" }} />
        <div className="absolute aspect-square w-[84%] rounded-full border border-cyan-400/25 motion-safe:animate-radar-spin" style={{ animationDuration: "42s", animationDirection: "reverse" }} />
        <span className="absolute left-[2%] top-[38%] h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_3px_rgba(31,201,221,0.7)] motion-safe:animate-pulse-slow" />
        <span className="absolute bottom-[14%] right-[4%] h-2 w-2 rounded-full bg-electric-500 shadow-[0_0_12px_3px_rgba(47,99,255,0.6)] motion-safe:animate-pulse-slow" style={{ animationDelay: "-1.4s" }} />
      </div>

      {/* Main dashboard card */}
      <div className="relative rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_30px_80px_-24px_rgba(23,60,160,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-navy-800/80 sm:p-6">
        <div className="flex items-center justify-between">
          <Image src="/logo.png" alt="Sunlit Network" width={512} height={199} className="h-9 w-auto object-contain" priority />
          <span className="status-pill status-pill--online px-2.5 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-led-blink" aria-hidden="true" />
            {bn ? "নেটওয়ার্ক সচল" : "Network Online"}
          </span>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {bn ? "স্পিড ও প্যাকেজ" : "Speed & Plans"}
            </p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight text-navy-950 dark:text-white">
              <span className="mr-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">{bn ? "সর্বোচ্চ" : "Up to"}</span>
              <span className="text-gradient">{bn ? "১১০" : max}</span>{" "}
              <span className="text-base font-semibold text-slate-500 dark:text-slate-400">{misc.mbps}</span>
            </p>
          </div>
        </div>

        <ul className="mt-4 space-y-2" aria-label={bn ? "প্যাকেজ স্পিড" : "Package speeds"}>
          {packages.map((p, i) => (
            <li key={p.id} className="flex items-center gap-3">
              <span className="w-[4.5rem] shrink-0 whitespace-nowrap text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                {p.speedMbps} {misc.mbps}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
                <span
                  className="block h-full origin-left rounded-full bg-linear-to-r from-electric-500 to-cyan-400 motion-safe:animate-bar-grow"
                  style={{ width: `${(p.speedMbps / max) * 100}%`, animationDelay: `${0.4 + i * 0.12}s` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-xs font-bold text-navy-950 dark:text-white">৳{p.priceBDT}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-slate-200/80 pt-5 dark:border-white/10">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-white/70 px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric-50 text-electric-600 dark:bg-electric-500/15 dark:text-cyan-300">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold leading-tight text-navy-950 dark:text-white">{pills[s.id]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating accent cards */}
      <div className="absolute -right-1 top-3 motion-safe:animate-float sm:right-0" style={{ animationDuration: "6.5s" }}>
        <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3.5 py-2.5 shadow-[0_16px_40px_-14px_rgba(23,60,160,0.4)] backdrop-blur dark:border-white/10 dark:bg-navy-800/90">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300">
            <Icon name="shield" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-navy-950 dark:text-white">{bn ? "৯৯.৯%" : "99.9%"}</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">{bn ? "নির্ভরযোগ্যতা" : "Reliability"}</span>
          </span>
        </div>
      </div>

      <div className="absolute -left-1 -bottom-1 motion-safe:animate-float sm:left-0" style={{ animationDuration: "7.5s", animationDelay: "-2s" }}>
        <div className="flex items-center gap-2.5 rounded-2xl border border-sun-300/60 bg-white/90 px-3.5 py-2.5 shadow-[0_16px_40px_-14px_rgba(255,159,26,0.45)] backdrop-blur dark:border-sun-400/30 dark:bg-navy-800/90">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sun-400 to-sun-500 text-navy-950">
            <Icon name="headset" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-navy-950 dark:text-white">{bn ? "২৪/৭" : "24/7"}</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">{bn ? "সাপোর্ট" : "Support"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
