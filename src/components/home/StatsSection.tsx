import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { getTrustStats } from "@/data/stats";
import { getPublicCoverageData } from "@/lib/coverage";
import type { Locale } from "@/i18n/config";
import type { IconName } from "@/types";

const STAT_ICONS: Record<string, IconName> = {
  founded: "star",
  reliability: "shield",
  monitoring: "activity",
  districts: "mapPin",
};

export async function StatsSection({ locale }: { locale: Locale }) {
  const coverage = await getPublicCoverageData(locale);
  const stats = getTrustStats(locale).map((stat) =>
    stat.id === "districts" ? { ...stat, value: coverage.totals.districts, suffix: "" } : stat
  );

  return (
    <section className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 py-12 sm:py-[72px]">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.id} delay={i * 80}>
              <div className="surface-card group relative flex flex-col items-center overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-950 px-5 py-6 text-center sm:px-6 sm:py-7">
                <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-electric-500 to-cyan-400" aria-hidden="true" />
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-electric-50 text-electric-600 transition-transform duration-300 group-hover:scale-110 dark:bg-electric-500/15 dark:text-cyan-300">
                  <Icon name={STAT_ICONS[stat.id]} className="h-5 w-5" />
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} useGrouping={stat.id !== "founded"} />
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
