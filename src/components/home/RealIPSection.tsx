import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function RealIPSection({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).realIP;
  const buttons = getCommonDictionary(locale).buttons;

  return (
    <section className="bg-white py-24">
      <Container>
        <ScrollReveal className="relative overflow-hidden rounded-3xl border border-electric-400/20 bg-linear-to-br from-electric-600/15 via-navy-800 to-navy-900 p-10 sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]" />
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/25 to-cyan-400/25 text-cyan-300">
                <Icon name="globe" className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300">
                {t.description}
              </p>
              <Button href="/contact?type=real-ip" size="lg" className="mt-8" icon>
                {buttons.requestRealIP}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {t.useCases.map((use) => (
                <div
                  key={use}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center text-sm font-medium text-slate-200"
                >
                  {use}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
