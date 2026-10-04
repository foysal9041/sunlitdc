import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getBusinessFeatures } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export const BUSINESS_ICON_MOTION: Record<string, string> = {
  dedicated: "animate-icon-flicker",
  "real-ip": "animate-icon-spin-slow",
  ha: "animate-icon-pulse",
  latency: "animate-icon-wobble",
  support: "animate-icon-bounce",
  scalable: "animate-icon-pulse",
};

export function BusinessTeaser({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).business;
  const buttons = getCommonDictionary(locale).buttons;
  const businessFeatures = getBusinessFeatures(locale);

  return (
    <section id="business" className="scroll-mt-24 relative overflow-hidden bg-navy-950 py-12 sm:py-[72px]">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-[130px]" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <ScrollReveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            {t.description}
          </p>
          <Button href="/business" size="lg" className="mt-8" icon>
            {buttons.talkToBusinessTeam}
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={120} className="grid grid-cols-2 gap-4">
          {businessFeatures.map((feature) => (
            <div key={feature.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
                aria-hidden="true"
              />
              <Icon
                name={feature.icon}
                strokeWidth={2.2}
                className={cn("relative h-6 w-6 text-cyan-300", BUSINESS_ICON_MOTION[feature.id])}
              />
              <p className="relative mt-3 text-sm font-semibold text-white">{feature.title}</p>
              <p className="relative mt-1 text-xs leading-relaxed text-slate-400">{feature.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  );
}
