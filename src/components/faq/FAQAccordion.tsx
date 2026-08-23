"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-900 surface-card shadow-sm">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-navy-950 dark:text-white">{item.question}</span>
              <Icon
                name="chevronDown"
                className={cn("h-5 w-5 shrink-0 text-electric-600 dark:text-cyan-300 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0">
                <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
