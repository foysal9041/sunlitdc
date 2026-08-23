import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-navy-900 pb-20 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[130px]" />
      <Container className="relative max-w-3xl text-center">
        <ScrollReveal>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">
            {eyebrow}
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-navy-950 dark:text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{subtitle}</p>}
          {children}
        </ScrollReveal>
      </Container>
    </section>
  );
}
