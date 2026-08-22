import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getPartners } from "@/data/partners";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";

export function PartnersSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).partners;
  const partners = getPartners(locale);
  const loop = [...partners, ...partners];

  return (
    <section className="bg-mist-50 py-20">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ScrollReveal delay={100} className="relative mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white py-8 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-28" />

          <div className="no-scrollbar flex w-max animate-marquee gap-6" style={{ animationDuration: "34s" }}>
            {loop.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="group flex h-20 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md sm:w-52"
              >
                {partner.logo ? (
                  <div className="relative mx-auto h-9 w-28 transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-32">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="140px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-xl font-extrabold tracking-tight text-navy-950 transition-transform duration-300 group-hover:scale-110">
                    {partner.short}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
