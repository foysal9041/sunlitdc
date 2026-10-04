import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FiberCanvas } from "@/components/home/FiberCanvas";
import { HeroNetworkVisual } from "@/components/home/HeroNetworkVisual";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { getInternetPackages } from "@/data/packages";
import { getHomeDictionary } from "@/i18n/dictionaries/home";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// Hero background experiment switch. Flip back to "original" to instantly
// restore the previous flat mist/blob background — nothing below is deleted.
const HERO_BACKGROUND_STYLE: "3d-gradient" | "original" = "3d-gradient";

export function Hero({ locale }: { locale: Locale }) {
  const t = getHomeDictionary(locale).hero;
  const lowest = Math.min(...getInternetPackages(locale).map((p) => p.priceBDT));
  const bn = locale === "bn";

  return (
    <section
      className={cn(
        "relative overflow-hidden pb-24 pt-36 sm:pt-44 dark:bg-navy-900",
        HERO_BACKGROUND_STYLE === "3d-gradient" ? "hero-mesh-bg" : "bg-mist-50"
      )}
    >
      {/* Dark mode keeps the original ambient background regardless of HERO_BACKGROUND_STYLE — this experiment is light-mode only. */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/10 blur-[140px]" />
        <div className="absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-electric-500/15 blur-[130px]" />
        <div className="absolute right-[-10%] top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-300/10 blur-[110px]" />
      </div>

      {HERO_BACKGROUND_STYLE === "original" ? (
        <div className="pointer-events-none absolute inset-0 dark:hidden" aria-hidden="true">
          <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
          <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-cyan-200/25 blur-[140px]" />
          <div className="absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-electric-300/25 blur-[130px]" />
          <div className="absolute right-[-10%] top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-300/15 blur-[110px]" />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 dark:hidden" aria-hidden="true">
          {/* Soft 3D mesh-gradient atmosphere: layered radial glows + light rays
              behind the network visual + a faint grain to avoid a flat look. */}
          <div className="hero-mesh-rays absolute inset-0" />
          <div className="hero-mesh-noise absolute inset-0" />
          <div
            className="motion-safe:animate-mesh-drift absolute -top-24 left-[6%] h-[420px] w-[420px] rounded-full bg-cyan-300/30 blur-[130px]"
            style={{ animationDuration: "26s" }}
          />
          <div
            className="motion-safe:animate-mesh-drift absolute top-[4%] right-[2%] h-[560px] w-[560px] rounded-full bg-cyan-300/35 blur-[150px]"
            style={{ animationDuration: "22s", animationDelay: "-8s" }}
          />
          <div
            className="motion-safe:animate-mesh-drift absolute bottom-[-20%] left-[20%] h-[420px] w-[420px] rounded-full bg-electric-300/20 blur-[130px]"
            style={{ animationDuration: "30s", animationDelay: "-14s" }}
          />
          <div className="absolute bottom-[8%] right-[14%] h-[300px] w-[300px] rounded-full bg-teal-200/20 blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-navy-950/[0.05] to-transparent" />
        </div>
      )}

      <FiberCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-white dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t.badge}
          </span>
          <h1 style={{ "--rise-delay": "0.12s" } as React.CSSProperties} className="rise text-4xl font-extrabold leading-[1.08] tracking-tight text-navy-950 dark:text-white sm:text-5xl lg:text-[3.75rem]">
            {t.titleLine1}{" "}
            <span className="text-gradient drop-shadow-[0_2px_24px_rgba(13,156,196,0.25)]">
              {t.titleHighlight} {t.titleLine2}
            </span>
          </h1>
          <p style={{ "--rise-delay": "0.28s" } as React.CSSProperties} className="rise mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {t.subtitle}
          </p>

          <div style={{ "--rise-delay": "0.42s" } as React.CSSProperties} className="rise mt-9 flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <span className="absolute inset-0 -z-10 animate-pulse-slow rounded-full bg-sun-400/40 blur-xl" aria-hidden="true" />
              <Button href="/internet" variant="sun" size="lg" icon className="w-full sm:w-auto">
                {t.ctaPrimary}
              </Button>
            </div>
            <Button href="/internet#packages" variant="secondary" size="lg">
              {t.ctaSecondary}
            </Button>
          </div>

          <div style={{ "--rise-delay": "0.56s" } as React.CSSProperties} className="rise mt-8 inline-flex items-center gap-3 rounded-2xl border border-sun-300/60 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur dark:border-sun-400/30 dark:bg-white/5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-sun-400 to-sun-500 text-navy-950 shadow-sm">
              <Icon name="bolt" className="h-5 w-5" />
            </span>
            <span className="text-sm leading-tight text-slate-600 dark:text-slate-300">
              {bn ? "মাসিক মাত্র" : "Starting at just"}{" "}
              <strong className="text-lg font-extrabold text-navy-950 dark:text-white">৳{lowest}</strong>
              <span className="text-slate-500 dark:text-slate-400"> {bn ? "/মাস" : "/month"}</span>
              <span className="block text-xs font-semibold text-sun-600 dark:text-sun-400">
                {bn ? "ফ্রি ইনস্টলেশন · আনলিমিটেড ডাটা" : "Free installation · Unlimited data"}
              </span>
            </span>
          </div>

          <div style={{ "--rise-delay": "0.7s" } as React.CSSProperties} className="rise mt-6 flex flex-wrap items-center gap-2.5">
            {[t.trust1, t.trust2, t.trust3].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm"
              >
                <Icon name="checkCircle" className="h-3.5 w-3.5 text-electric-600 dark:text-cyan-300" /> {label}
              </span>
            ))}
          </div>
        </div>

        <ScrollReveal delay={150} className="order-first lg:order-last">
          <HeroNetworkVisual locale={locale} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
