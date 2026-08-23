import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-400/25 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric-600 dark:text-cyan-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 dark:text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">{subtitle}</p>}
    </ScrollReveal>
  );
}
