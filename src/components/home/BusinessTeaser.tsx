import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getBusinessFeatures } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function BusinessTeaser({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).business;
  const buttons = getCommonDictionary(locale).buttons;
  const businessFeatures = getBusinessFeatures(locale);

  return (
    <section className="relative overflow-hidden bg-mist-50 dark:bg-navy-950 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-[130px]" />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-white dark:bg-navy-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t.description}
          </p>
          <Button href="/business" size="lg" className="mt-8" icon>
            {buttons.talkToBusinessTeam}
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={120} className="grid grid-cols-2 gap-4">
          {businessFeatures.map((feature) => (
            <div key={feature.id} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-5 shadow-sm">
              <Icon name={feature.icon} className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
              <p className="mt-3 text-sm font-semibold text-navy-950 dark:text-white">{feature.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
