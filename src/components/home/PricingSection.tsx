import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { getInternetPackages, getCustomPackageNote } from "@/data/packages";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function PricingSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).pricing;
  const buttons = getCommonDictionary(locale).buttons;
  const packages = getInternetPackages(locale);
  const customPackageNote = getCustomPackageNote(locale);

  return (
    <section id="packages" className="scroll-mt-24 bg-white dark:bg-navy-900 py-24">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={(i % 3) * 90}>
              <PricingCard pkg={pkg} locale={locale} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-slate-300 dark:border-white/15 bg-mist-50 dark:bg-navy-950 p-8 text-center">
          <h3 className="text-xl font-bold text-navy-950 dark:text-white">{customPackageNote.title}</h3>
          <p className="max-w-lg text-sm text-slate-500 dark:text-slate-400">{customPackageNote.description}</p>
          <Button href="/contact?type=custom" variant="secondary">
            {buttons.requestCustomPackage}
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
