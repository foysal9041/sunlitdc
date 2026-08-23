import Link from "next/link";
import type { ServiceItem } from "@/types";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

export const SERVICE_ICON_MOTION: Record<string, string> = {
  broadband: "animate-icon-bounce",
  "business-internet": "animate-icon-pulse",
  "ip-telephony": "animate-icon-wobble",
  "hosting-domain": "animate-icon-flicker",
  "security-surveillance": "animate-icon-spin-slow",
  "smart-home": "animate-icon-pulse",
};

export function ServiceCard({ service, learnMoreLabel = "Learn More" }: { service: ServiceItem; learnMoreLabel?: string }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 surface-card p-7">
      <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-electric-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      {/* Premium shine sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
        aria-hidden="true"
      />

      <div className="relative flex h-14 w-14 items-center justify-center">
        <span
          className="absolute inset-0 animate-pulse-slow rounded-2xl bg-linear-to-br from-electric-500/30 to-cyan-400/30 blur-md"
          aria-hidden="true"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-50 text-electric-600 dark:bg-electric-500/15 dark:text-cyan-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon name={service.icon} strokeWidth={2.4} className={cn("h-7 w-7", SERVICE_ICON_MOTION[service.id])} />
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-bold text-navy-950 dark:text-white">{service.name}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{service.shortDescription}</p>
      <Link
        href={`/services#${service.slug}`}
        className="relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-electric-600 dark:text-cyan-300"
      >
        <span className="relative">
          {learnMoreLabel}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-electric-500 transition-all duration-300 group-hover:w-full" />
        </span>
        <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
