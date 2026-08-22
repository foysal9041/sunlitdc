import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { CoverageOrbit } from "@/components/coverage/CoverageOrbit";
import { DistrictCard } from "@/components/coverage/DistrictCard";
import { AvailabilityForm } from "@/components/coverage/AvailabilityForm";
import { CoveragePackagesStrip } from "@/components/coverage/CoveragePackagesStrip";
import { FAQSection } from "@/components/home/FAQSection";
import { getPublicCoverageData } from "@/lib/coverage";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

export const metadata: Metadata = buildMetadata({
  title: "Coverage Areas",
  description:
    "Check Sunlit Network internet coverage across Khulna Division, including Jashore, Satkhira, Chuadanga, Khulna, Narail and Jhenaidah.",
  path: "/coverage",
});

export const dynamic = "force-dynamic";

export default async function CoveragePage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).coverage;
  const coverage = await getPublicCoverageData(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-20 pt-32 sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[140px]" />

        <Container className="relative">
          <ScrollReveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600">
                <Icon name="mapPin" className="h-3.5 w-3.5" /> {t.eyebrow}
              </span>
              <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">
                {t.title} <span className="text-gradient">{t.titleHighlight}</span>
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
                {t.subtitle}
              </p>
            </div>
            <Button href="#check-availability" size="lg" icon className="shrink-0">
              {t.checkAvailabilityTitle}
            </Button>
          </ScrollReveal>

          <ScrollReveal delay={100} className="mt-10 grid grid-cols-3 gap-4 sm:max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                <StatCounter value={coverage.totals.activeAreas} suffix="+" />
              </p>
              <p className="mt-1 text-xs text-slate-500">{t.activeCoverageAreas}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                <StatCounter value={coverage.totals.districts} />
              </p>
              <p className="mt-1 text-xs text-slate-500">{t.districtsCovered}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">{t.active}</p>
              <p className="mt-1 text-xs text-slate-500">{t.networkStatus}</p>
            </div>
          </ScrollReveal>
          <p className="mt-3 text-xs text-slate-400">{t.disclaimer}</p>

          <ScrollReveal delay={150} className="mt-12">
            <CoverageOrbit districts={coverage.districts} locale={locale} />
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-white pb-24">
        <Container>
          <ScrollReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.districts.map((district, i) => (
              <DistrictCard key={district.district} district={district} index={i} locale={locale} />
            ))}
          </ScrollReveal>

          <ScrollReveal id="check-availability" delay={100} className="mx-auto mt-16 max-w-2xl scroll-mt-24">
            <h2 className="text-center text-xl font-bold text-navy-950">{t.checkAvailabilityTitle}</h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              {t.checkAvailabilitySubtitle}
            </p>
            <div className="mt-6">
              <AvailabilityForm locale={locale} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} className="mt-20">
            <CoveragePackagesStrip locale={locale} />
          </ScrollReveal>

          <ScrollReveal delay={200} className="mt-16 grid grid-cols-2 gap-4 border-t border-slate-200 pt-10 sm:grid-cols-5">
            {t.trustStrip.map((item, i) => {
              const icons = ["signal", "headset", "gauge", "shield", "mapPin"] as const;
              return (
                <div key={item.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600">
                    <Icon name={icons[i]} className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </Container>
      </section>

      <FAQSection locale={locale} />
    </>
  );
}
