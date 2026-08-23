import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroNetworkVisual } from "@/components/home/HeroNetworkVisual";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function Hero({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).hero;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-navy-900 pb-24 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[140px]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ScrollReveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 dark:text-white sm:text-5xl lg:text-6xl">
            {t.titleLine1} <span className="text-gradient">{t.titleHighlight} {t.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/internet" size="lg" icon>
              {t.ctaPrimary}
            </Button>
            <Button href="/internet#packages" variant="secondary" size="lg">
              {t.ctaSecondary}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Icon name="checkCircle" className="h-4 w-4 text-electric-600 dark:text-cyan-300" /> {t.trust1}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="checkCircle" className="h-4 w-4 text-electric-600 dark:text-cyan-300" /> {t.trust2}
            </span>
            <span className="inline-flex items-center gap-2">
              <Icon name="checkCircle" className="h-4 w-4 text-electric-600 dark:text-cyan-300" /> {t.trust3}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="order-first lg:order-last">
          <HeroNetworkVisual locale={locale} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
