import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { BusinessTeaser } from "@/components/home/BusinessTeaser";
import { NetworkArchitecture } from "@/components/home/NetworkArchitecture";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CoverageSection } from "@/components/home/CoverageSection";
import { PerformanceSection } from "@/components/home/PerformanceSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { RealIPSection } from "@/components/home/RealIPSection";
import { SupportCTA } from "@/components/home/SupportCTA";
import { FAQSection } from "@/components/home/FAQSection";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";

export const metadata: Metadata = buildMetadata({
  title: "SUNLIT NETWORK | Fast & Reliable Internet in Bangladesh",
  description:
    "Sunlit Network provides fast, reliable and high-performance internet, business connectivity and digital services across Bangladesh.",
  path: "/",
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <Hero locale={locale} />
      <StatsSection locale={locale} />
      <PricingSection locale={locale} />
      <ExperienceSection locale={locale} />
      <ServicesGrid locale={locale} />
      <BusinessTeaser locale={locale} />
      <NetworkArchitecture locale={locale} />
      <PartnersSection locale={locale} />
      <CoverageSection locale={locale} />
      <PerformanceSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <RealIPSection locale={locale} />
      <SupportCTA locale={locale} />
      <FAQSection locale={locale} />
    </>
  );
}
