import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import type { IconName } from "@/types";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Sunlit Network is a Bangladeshi internet service provider connecting homes and businesses across Khulna Division with fast, reliable connectivity.",
  path: "/about",
});

const VALUE_ICONS: Record<string, IconName> = {
  reliability: "shield",
  transparency: "checkCircle",
  local: "mapPin",
  innovation: "cpu",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).about;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={company.positioning} />

      <section className="bg-mist-50 py-24">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading align="left" eyebrow={t.storyEyebrow} title={t.storyTitle} />
            <p className="mt-6 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.storyP1.replace("{founded}", company.founded)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.storyP2}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={120} className="space-y-4">
            {t.milestones.map((m) => (
              <div key={m.year} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="shrink-0 text-lg font-extrabold text-electric-600">{m.year}</span>
                <div>
                  <p className="text-sm font-bold text-navy-950">{m.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{m.description}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </Container>
      </section>

      <StatsSection locale={locale} />

      <section className="bg-white py-24">
        <Container>
          <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, i) => (
              <ScrollReveal key={value.id} delay={i * 90}>
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600">
                    <Icon name={VALUE_ICONS[value.id]} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy-950">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsSection locale={locale} />
    </>
  );
}
