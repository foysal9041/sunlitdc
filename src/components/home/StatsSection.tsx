import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getTrustStats } from "@/data/stats";
import { getPublicCoverageData } from "@/lib/coverage";
import type { Locale } from "@/i18n/config";

export async function StatsSection({ locale }: { locale: Locale }) {
  const coverage = await getPublicCoverageData(locale);
  const stats = getTrustStats(locale).map((stat) =>
    stat.id === "districts" ? { ...stat, value: coverage.totals.districts, suffix: "" } : stat
  );

  return (
    <section className="relative border-y border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.id} delay={i * 80} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-5xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
