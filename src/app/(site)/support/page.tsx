import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { FAQSection } from "@/components/home/FAQSection";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import type { IconName } from "@/types";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export const metadata: Metadata = buildMetadata({
  title: "Support Center",
  description:
    "Get help from Sunlit Network's 24/7 support team by phone, WhatsApp or the customer portal.",
  path: "/support",
});

const CHANNEL_ICONS: Record<string, IconName> = {
  call: "phone",
  whatsapp: "whatsapp",
  login: "user",
  email: "mail",
};

export default async function SupportPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).support;
  const buttons = getCommonDictionary(locale).buttons;

  const channels = [
    { id: "call", title: t.channels.call.title, description: company.contact.phone, href: `tel:${company.contact.phone.replace(/[^\d+]/g, "")}` },
    { id: "whatsapp", title: t.channels.whatsapp.title, description: t.channels.whatsapp.description, href: `https://wa.me/${company.contact.whatsapp.replace(/[^\d]/g, "")}` },
    { id: "login", title: t.channels.login.title, description: t.channels.login.description, href: company.customerPortalUrl },
    { id: "email", title: t.channels.email.title, description: company.contact.supportEmail, href: `mailto:${company.contact.supportEmail}` },
  ];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

      <section className="bg-white dark:bg-navy-900 pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, i) => (
              <ScrollReveal key={channel.id} delay={i * 90}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col items-center rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/15 to-cyan-400/15 text-electric-600 dark:text-cyan-300">
                    <Icon name={CHANNEL_ICONS[channel.id]} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-navy-950 dark:text-white">{channel.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{channel.description}</p>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={120} className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
            <Icon name="clock" className="h-4 w-4 text-electric-600 dark:text-cyan-300" />
            {company.hours.support} · {t.hoursPrefix} {company.hours.office}
          </ScrollReveal>
        </Container>
      </section>

      <section id="payment" className="scroll-mt-24 bg-mist-50 dark:bg-navy-950 py-24">
        <Container>
          <SectionHeading eyebrow={t.billingEyebrow} title={t.billingTitle} subtitle={t.billingSubtitle} />
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.paymentMethods.map((method, i) => (
              <ScrollReveal key={method.id} delay={i * 90}>
                <div className="h-full rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">{method.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{method.description}</p>
                  {method.id === "mfs" && (
                    <Link href="/bill-payment" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-electric-600 dark:text-cyan-300 hover:text-electric-500">
                      {buttons.stepByStepGuide}
                      <Icon name="arrowRight" className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white dark:bg-navy-900 py-24">
        <Container>
          <ScrollReveal className="mx-auto max-w-2xl rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-navy-950 dark:text-white">{t.stillNeedHelpTitle}</h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {t.stillNeedHelpSubtitle}
            </p>
            <Button href="/contact" size="lg" className="mt-6" icon>
              {buttons.contactUs}
            </Button>
          </ScrollReveal>
        </Container>
      </section>

      <FAQSection locale={locale} />
    </>
  );
}
