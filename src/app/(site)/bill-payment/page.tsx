import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getBkashSteps, getPaymentNotes, paymentExample } from "@/data/billPayment";
import { company } from "@/data/company";
import { formatBDT } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";
import { getCommonDictionary } from "@/i18n/dictionaries/common";

export const metadata: Metadata = buildMetadata({
  title: "Bill Payment",
  description: "Pay your Sunlit Network internet bill quickly and securely via bKash, with step-by-step instructions.",
  path: "/bill-payment",
});

export default async function BillPaymentPage() {
  const locale = await getLocale();
  const t = getPagesDictionary(locale).billPayment;
  const buttons = getCommonDictionary(locale).buttons;
  const bkashSteps = getBkashSteps(locale);
  const paymentNotes = getPaymentNotes(locale);
  const remaining = Math.max(paymentExample.billAmount - paymentExample.availableBalance, 0);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle}>
        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E2136E]/10 px-4 py-1.5 text-sm font-bold text-[#E2136E]">
            <Icon name="checkCircle" className="h-4 w-4" />
            {t.badge}
          </span>
        </div>
      </PageHero>

      <section className="bg-white dark:bg-navy-900 pb-24">
        <Container>
          <SectionHeading eyebrow={t.howItWorksEyebrow} title={t.howItWorksTitle} align="left" className="mx-0" />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bkashSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={(i % 3) * 90}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-electric-500 to-cyan-400 text-sm font-bold text-navy-950 dark:text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-navy-950 dark:text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ScrollReveal className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8 dark:border-amber-400/25 dark:bg-amber-400/10">
              <h3 className="flex items-center gap-2 text-lg font-bold text-amber-800 dark:text-amber-300">
                <Icon name="shield" className="h-5 w-5" />
                {t.importantInfo}
              </h3>
              <ul className="mt-4 space-y-3">
                {paymentNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
                    <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    {note}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={100} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-bold text-navy-950 dark:text-white">
                <Icon name="gauge" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
                {t.example}
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <dt className="text-slate-500 dark:text-slate-400">{t.customerId}</dt>
                  <dd className="font-semibold text-navy-950 dark:text-white">{paymentExample.customerId}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <dt className="text-slate-500 dark:text-slate-400">{t.billAmount}</dt>
                  <dd className="font-semibold text-navy-950 dark:text-white">৳{formatBDT(paymentExample.billAmount)}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <dt className="text-slate-500 dark:text-slate-400">{t.availableBalance}</dt>
                  <dd className="font-semibold text-navy-950 dark:text-white">৳{formatBDT(paymentExample.availableBalance)}</dd>
                </div>
              </dl>
              {remaining > 0 && (
                <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.exampleNote.replace("{amount}", formatBDT(Math.round(remaining * 100) / 100))}
                </p>
              )}
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150} className="mt-16 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white">{t.needHelpTitle}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.needHelpSubtitle}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button href={`tel:${company.contact.phone.replace(/[^\d+]/g, "")}`} size="lg" icon>
                {t.callButton} {company.contact.phone}
              </Button>
              <Button href={`https://wa.me/${company.contact.whatsapp.replace(/[^\d]/g, "")}`} variant="secondary" size="lg">
                {t.whatsappButton}
              </Button>
              <Button href="/support#payment" variant="ghost" size="lg">
                {buttons.otherPaymentMethods}
              </Button>
            </div>
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
              {t.preferAnotherWay}{" "}
              <Link href="/support#payment" className="font-medium text-electric-600 dark:text-cyan-300 hover:text-electric-500">
                {t.allPaymentMethods}
              </Link>{" "}
              {t.onSupportPage}
            </p>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
