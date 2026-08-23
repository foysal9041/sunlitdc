import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { getExperienceHighlights } from "@/data/stats";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const ICON_MOTION: Record<string, string> = {
  speed: "animate-icon-bounce",
  reliability: "animate-icon-pulse",
  latency: "animate-icon-wobble",
  monitoring: "animate-icon-spin-slow",
  support: "animate-icon-bounce",
  security: "animate-icon-pulse",
};

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).experience;
  const experienceHighlights = getExperienceHighlights(locale);

  return (
    <section className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 py-12 sm:py-[72px]">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experienceHighlights.map((item, i) => (
            <ScrollReveal key={item.id} delay={(i % 3) * 90}>
              <div className="surface-card group relative h-full overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-7">
                <span className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-electric-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <span
                    className="absolute inset-0 animate-pulse-slow rounded-2xl bg-linear-to-br from-electric-500/30 to-cyan-400/30 blur-md"
                    style={{ animationDelay: `${i * 0.4}s` }}
                    aria-hidden="true"
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-50 text-electric-600 dark:bg-electric-500/15 dark:text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon
                      name={item.icon}
                      strokeWidth={2.4}
                      className={cn("h-7 w-7", ICON_MOTION[item.id])}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
