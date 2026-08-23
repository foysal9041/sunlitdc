import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).testimonials;

  return (
    <section className="relative overflow-hidden bg-mist-50 dark:bg-navy-950 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[120px]" />
      <Container className="relative">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <ScrollReveal delay={100} className="mt-14">
          <TestimonialCarousel locale={locale} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
