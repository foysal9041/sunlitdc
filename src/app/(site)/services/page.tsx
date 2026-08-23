import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getServices } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Sunlit Network's full range of services: broadband, business internet, IP telephony, hosting, security surveillance and smart home.",
  path: "/services",
});

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).services;
  const learnMore = getCommonDictionary(locale).buttons.learnMore;
  const services = getServices(locale);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-white dark:bg-navy-900 pb-24">
        <Container className="space-y-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={(i % 3) * 60}>
              <div
                id={service.slug}
                className={cn(
                  "scroll-mt-28 grid grid-cols-1 items-center gap-8 rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm sm:p-10 lg:grid-cols-[auto_1fr_auto]",
                  i % 2 === 1 ? "bg-mist-50 dark:bg-navy-950" : "bg-white dark:bg-navy-900"
                )}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300">
                  <Icon name={service.icon} className="h-8 w-8" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white sm:text-2xl">{service.name}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Icon name="checkCircle" className="h-4 w-4 text-electric-600 dark:text-cyan-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button href={`/contact?service=${service.id}`} variant="secondary" className="lg:self-center">
                  {learnMore}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </Container>
      </section>
    </>
  );
}
