import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { MetricBar } from "@/components/home/MetricBar";
import { getPerformanceMetrics, getUseCaseBadges } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function PerformanceSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).performance;
  const performanceMetrics = getPerformanceMetrics(locale);
  const useCaseBadges = getUseCaseBadges(locale);

  return (
    <section className="bg-white dark:bg-navy-900 py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal className="space-y-7">
            {performanceMetrics.map((metric) => (
              <MetricBar key={metric.id} metric={metric} />
            ))}
          </ScrollReveal>

          <ScrollReveal delay={120} className="grid grid-cols-2 gap-4">
            {useCaseBadges.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-navy-950 dark:text-white">{item.label}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
