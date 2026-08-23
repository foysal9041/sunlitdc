import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
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
    <section id="packages" className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-mist-50 dark:bg-navy-950 py-12 sm:py-[72px]">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={(i % 3) * 90}>
              <PricingCard pkg={pkg} locale={locale} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="surface-card surface-card--featured relative mt-12 flex flex-col items-center gap-3 overflow-hidden rounded-3xl border-2 border-electric-300 bg-linear-to-br from-electric-50 via-white to-cyan-50 p-8 text-center dark:border-cyan-400/40 dark:from-navy-900 dark:via-navy-900 dark:to-navy-800">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/25 blur-[70px]" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500 to-cyan-400 text-white shadow-md">
            <Icon name="cpu" className="h-6 w-6" />
          </div>
          <h3 className="relative text-xl font-bold text-navy-950 dark:text-white">{customPackageNote.title}</h3>
          <p className="relative max-w-lg text-sm text-slate-600 dark:text-slate-300">{customPackageNote.description}</p>
          <Button href="/contact?type=custom" variant="primary" className="relative mt-1" icon>
            {buttons.requestCustomPackage}
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
