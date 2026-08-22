import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/data/services";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function ServicesGrid({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).services;
  const learnMore = getCommonDictionary(locale).buttons.learnMore;
  const services = getServices(locale);

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={(i % 3) * 90}>
              <ServiceCard service={service} learnMoreLabel={learnMore} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
