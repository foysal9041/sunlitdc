import Link from "next/link";
import type { ServiceItem } from "@/types";
import { Icon } from "@/components/icons/Icon";

export function ServiceCard({ service, learnMoreLabel = "Learn More" }: { service: ServiceItem; learnMoreLabel?: string }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-electric-300 hover:shadow-lg">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-electric-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      {/* Premium shine sweep on hover */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
        aria-hidden="true"
      />

      <div className="relative flex h-12 w-12 items-center justify-center">
        <span
          className="absolute inset-0 scale-0 rounded-2xl bg-linear-to-br from-electric-500/25 to-cyan-400/25 blur-md transition-transform duration-500 group-hover:scale-125"
          aria-hidden="true"
        />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon name={service.icon} className="h-6 w-6" />
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
