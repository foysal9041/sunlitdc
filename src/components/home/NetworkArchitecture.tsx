import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getNetworkLayers, techBadges } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function NetworkArchitecture({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).network;
  const networkLayers = getNetworkLayers(locale);

  return (
    <section className="relative overflow-hidden bg-mist-100 py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-6 bottom-6 hidden w-px -translate-x-1/2 overflow-hidden bg-linear-to-b from-cyan-400/70 via-electric-500/50 to-transparent lg:block">
            <span
              className="absolute left-1/2 h-3 w-1.5 -translate-x-1/2 animate-travel-down rounded-full bg-cyan-300 blur-[1px]"
              aria-hidden="true"
            />
          </div>
          <ol className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-4">
            {networkLayers.map((layer, i) => (
              <ScrollReveal key={layer.id} delay={i * 90}>
                <li className="relative flex h-full flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                  <span
                    className="absolute right-3 top-3 h-2 w-2 animate-led-blink rounded-full bg-emerald-400 text-emerald-400"
                    style={{ animationDelay: `${i * 0.4}s` }}
                    aria-hidden="true"
                  />
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-electric-500 to-cyan-400 text-sm font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-bold text-navy-950">{layer.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{layer.description}</p>
                  {i < networkLayers.length - 1 && (
                    <span className="mt-3 hidden h-px w-full bg-linear-to-r from-cyan-400/60 to-transparent lg:block" aria-hidden />
                  )}
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>

        <ScrollReveal delay={200} className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-white py-6 shadow-sm">
          <div className="no-scrollbar flex w-max animate-marquee gap-3 px-6">
            {[...techBadges, ...techBadges].map((badge, i) => (
              <span
                key={`${badge.id}-${i}`}
                className="flex shrink-0 items-center rounded-full border border-slate-200 bg-mist-50 px-5 py-2 text-sm font-medium text-slate-600"
              >
                {badge.label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
