"use client";

import { company } from "@/data/company";
import { Icon } from "@/components/icons/Icon";
import { BackToTopButton } from "@/components/layout/BackToTopButton";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function FloatingActions({ locale }: { locale: Locale }) {
  const t = getCommonDictionary(locale);
  const whatsappHref = `https://wa.me/${company.contact.whatsapp.replace(/[^\d]/g, "")}`;

  return (
    <>
      <BackToTopButton />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-slate-900/20 transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6"
      >
        <span className="absolute inset-0 animate-pulse-slow rounded-full bg-[#25D366]/50" />
        <Icon name="whatsapp" className="relative h-7 w-7" strokeWidth={0} fill="currentColor" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-px border-t border-slate-200 bg-white/95 backdrop-blur sm:hidden dark:border-white/10 dark:bg-navy-950/95">
        <a
          href={`tel:${company.contact.phone.replace(/[^\d+]/g, "")}`}
          className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium text-navy-950 dark:text-white"
        >
          <Icon name="phone" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
          {t.misc.call}
        </a>
        <a href="/internet" className="flex flex-1 flex-col items-center gap-1 bg-electric-500 py-3 text-xs font-semibold text-navy-950">
          <Icon name="bolt" className="h-5 w-5" />
          {t.nav.getConnected}
        </a>
        <a href="/support" className="flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium text-navy-950 dark:text-white">
          <Icon name="headset" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
          {t.misc.supportShort}
        </a>
      </div>
    </>
  );
}
