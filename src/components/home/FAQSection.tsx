import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { getFaqs } from "@/data/faqs";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function FAQSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).faq;
  const faqs = getFaqs(locale);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 py-12 sm:py-[72px]">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ScrollReveal delay={100} className="mt-12">
          <FAQAccordion items={faqs} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
