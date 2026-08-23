import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getPublicCoverageData } from "@/lib/coverage";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export async function CoverageSection({ locale }: { locale: Locale }) {
  const coverage = await getPublicCoverageData(locale);
  const t = getHomeDictionary(locale).coverage;
  const buttons = getCommonDictionary(locale).buttons;

  return (
    <section id="coverage" className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 py-12 sm:py-[72px]">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t.description}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3">
            {coverage.districts.map((d) => (
              <li key={d.district} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Icon name="mapPin" className="h-4 w-4 text-electric-600 dark:text-cyan-300" />
                {d.districtLabel}
              </li>
            ))}
          </ul>

          <Button href="/coverage" size="lg" className="mt-8" icon>
            {buttons.checkAvailability}
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={120} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 p-8 text-center shadow-sm sm:col-span-1">
            <p className="text-4xl font-extrabold text-navy-950 dark:text-white">
              <StatCounter value={coverage.totals.activeAreas} suffix="+" />
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.activeCoverageAreas}</p>
          </div>
          <div className="col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 p-8 text-center shadow-sm sm:col-span-1">
            <p className="text-4xl font-extrabold text-navy-950 dark:text-white">
              <StatCounter value={coverage.totals.districts} />
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.districtsCovered}</p>
          </div>
          <div className="col-span-2 rounded-3xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 p-6 text-center shadow-sm">
            <span className="status-pill status-pill--online px-3 py-1 text-sm">
              <span className="h-2 w-2 rounded-full bg-current" />
              {t.networkActive}
            </span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
