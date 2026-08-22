import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PricingSection } from "@/components/home/PricingSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { PerformanceSection } from "@/components/home/PerformanceSection";
import { FAQSection } from "@/components/home/FAQSection";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

export const metadata: Metadata = buildMetadata({
  title: "Internet Packages",
  description:
    "Compare Sunlit Network residential internet packages from 35 Mbps to 110 Mbps with transparent pricing and unlimited data.",
  path: "/internet",
});

export default async function InternetPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).internet;

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <PricingSection locale={locale} />
      <ExperienceSection locale={locale} />
      <PerformanceSection locale={locale} />
      <FAQSection locale={locale} />
    </>
  );
}
