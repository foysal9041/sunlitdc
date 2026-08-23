import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { RealIPSection } from "@/components/home/RealIPSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { getBusinessFeatures } from "@/data/stats";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export const metadata: Metadata = buildMetadata({
  title: "Business Internet",
  description:
    "Dedicated internet, static/real IP and enterprise support for businesses across Khulna Division from Sunlit Network.",
  path: "/business",
});

const INDUSTRY_ICONS: Record<string, "briefcase" | "building" | "layers" | "wifi"> = {
  offices: "briefcase",
  retail: "building",
  education: "layers",
  hospitality: "wifi",
};

export default async function BusinessPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).business;
  const buttons = getCommonDictionary(locale).buttons;
  const businessFeatures = getBusinessFeatures(locale);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <div className="mt-8 flex justify-center">
          <Button href="/contact?type=business" size="lg" icon>
            {buttons.talkToBusinessTeam}
          </Button>
        </div>
      </PageHero>

      <section className="bg-mist-50 dark:bg-navy-950 py-24">
        <Container>
          <SectionHeading eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businessFeatures.map((feature, i) => (
              <ScrollReveal key={feature.id} delay={(i % 3) * 90}>
                <div className="h-full rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300">
                    <Icon name={feature.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy-950 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white dark:bg-navy-900 py-24">
        <Container>
          <SectionHeading eyebrow={t.industriesEyebrow} title={t.industriesTitle} />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.industries.map((item, i) => (
              <ScrollReveal key={item.id} delay={(i % 4) * 90}>
                <div className="h-full rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-lg">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300">
                    <Icon name={INDUSTRY_ICONS[item.id]} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy-950 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <RealIPSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <FAQSection locale={locale} />
    </>
  );
}
