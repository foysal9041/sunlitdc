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
    <section id="support" className="scroll-mt-24 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 py-12 sm:py-[72px]">
      <Container>
        <ScrollReveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-electric-500/30 bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 p-10 text-center shadow-[0_30px_70px_-30px_rgba(47,99,255,0.55)] sm:p-14" >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true" />
          <div className="motion-safe:animate-mesh-drift pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-electric-500/40 blur-[100px]" aria-hidden="true" />
          <div className="motion-safe:animate-mesh-drift pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-400/25 blur-[100px]" style={{ animationDelay: "-10s" }} aria-hidden="true" />
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{t.title}</h2>
          <p className="relative mt-4 text-base text-slate-300">
            {t.subtitle}
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={`tel:${company.contact.phone.replace(/[^\d+]/g, "")}`} size="lg" icon>
              {buttons.callSupport}
            </Button>
            <Button href={whatsappLink(company.contact.whatsapp)} variant="secondary" size="lg" className="border-white/20 !bg-white/10 !text-white hover:!bg-white/15">
              {buttons.whatsapp}
            </Button>
            <Button href={company.customerPortalUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="border-white/20 !bg-white/10 !text-white hover:!bg-white/15">
              {getCommonDictionary(locale).nav.customerLogin}
            </Button>
            <Button href="/support" variant="ghost" size="lg" className="!text-slate-200 hover:!bg-white/10 hover:!text-white">
              {buttons.supportCenter}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
