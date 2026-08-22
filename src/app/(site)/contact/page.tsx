import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with Sunlit Network for new connections, business inquiries and support.",
  path: "/contact",
});

export default async function ContactPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).contact;

  const infoCards = [
    { icon: "phone" as const, title: t.phone, value: company.contact.phone },
    { icon: "mail" as const, title: t.email, value: company.contact.email },
    { icon: "mapPin" as const, title: t.office, value: `${company.headquarters.addressLine}, ${company.headquarters.city}` },
  ];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-white pb-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal className="space-y-4">
            {infoCards.map((card) => (
              <div key={card.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600">
                  <Icon name={card.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{card.title}</p>
                  <p className="text-sm font-medium text-navy-950">{card.value}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <Suspense fallback={null}>
              <ContactForm locale={locale} />
            </Suspense>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
