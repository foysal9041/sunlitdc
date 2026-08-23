import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { company } from "@/data/company";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import { whatsappLink } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export function SupportCTA({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).supportCta;
  const buttons = getCommonDictionary(locale).buttons;

  return (
    <section className="bg-mist-50 dark:bg-navy-950 py-24">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 p-10 text-center shadow-sm sm:p-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-4xl">{t.title}</h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={`tel:${company.contact.phone.replace(/[^\d+]/g, "")}`} size="lg" icon>
              {buttons.callSupport}
            </Button>
            <Button href={whatsappLink(company.contact.whatsapp)} variant="secondary" size="lg">
              {buttons.whatsapp}
            </Button>
            <Button href={company.customerPortalUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
              {getCommonDictionary(locale).nav.customerLogin}
            </Button>
            <Button href="/support" variant="ghost" size="lg">
              {buttons.supportCenter}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
