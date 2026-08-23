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
    <section className="relative overflow-hidden bg-mist-50 dark:bg-navy-900 pb-24 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-electric-300/25 blur-[130px] dark:bg-electric-500/15" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-300/15 blur-[110px]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <ScrollReveal>
          <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-white dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 dark:text-white sm:text-5xl lg:text-[3.75rem]">
            {t.titleLine1}{" "}
            <span className="text-gradient drop-shadow-[0_2px_24px_rgba(47,99,255,0.25)]">
              {t.titleHighlight} {t.titleLine2}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <span className="absolute inset-0 -z-10 animate-pulse-slow rounded-full bg-electric-500/40 blur-xl" aria-hidden="true" />
              <Button href="/internet" size="lg" icon className="w-full sm:w-auto">
                {t.ctaPrimary}
              </Button>
            </div>
            <Button href="/internet#packages" variant="secondary" size="lg">
              {t.ctaSecondary}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            {[t.trust1, t.trust2, t.trust3].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm"
              >
                <Icon name="checkCircle" className="h-3.5 w-3.5 text-electric-600 dark:text-cyan-300" /> {label}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150} className="order-first lg:order-last">
          <HeroNetworkVisual locale={locale} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
