import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { getExperienceHighlights } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const ICON_MOTION: Record<string, string> = {
  speed: "animate-pulse-slow",
  reliability: "animate-float",
  latency: "animate-icon-wobble",
  monitoring: "animate-pulse-slow",
  support: "animate-float",
  security: "animate-icon-wobble",
};

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).experience;
  const experienceHighlights = getExperienceHighlights(locale);

  return (
    <section className="bg-mist-50 py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experienceHighlights.map((item, i) => (
            <ScrollReveal key={item.id} delay={(i % 3) * 90}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-lg">
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <span
                    className="absolute inset-0 animate-pulse-slow rounded-2xl bg-linear-to-br from-electric-500/25 to-cyan-400/25 blur-md"
                    style={{ animationDelay: `${i * 0.4}s` }}
                    aria-hidden="true"
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      name={item.icon}
                      className={cn("h-6 w-6", ICON_MOTION[item.id])}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
