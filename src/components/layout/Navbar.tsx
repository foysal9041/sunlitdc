"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/icons/Icon";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function Navbar({ locale }: { locale: Locale }) {
  const t = getCommonDictionary(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.internet, href: "/internet" },
    { label: t.nav.business, href: "/business" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.coverage, href: "/coverage" },
    { label: t.nav.billPayment, href: "/bill-payment" },
    { label: t.nav.support, href: "/support" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "glass shadow-lg shadow-slate-900/5" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="shrink-0 drop-shadow-[0_1px_6px_rgba(47,99,255,0.18)]" aria-label="Sunlit Network home">
          <Logo priority className="h-12 sm:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  active
                    ? "text-navy-950 dark:text-white"
                    : "text-slate-600 hover:text-navy-950 dark:text-slate-300 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} size="sm" />
            <ThemeToggle />
          </span>
          <Button href={company.customerPortalUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md">
            {t.nav.customerLogin}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="h-8 w-8" />
          <LanguageSwitcher locale={locale} size="sm" />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-950 dark:text-white"
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <div className="glass mx-4 mb-4 flex flex-col gap-1 rounded-3xl p-4 shadow-xl shadow-slate-900/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-slate-100 text-navy-950 dark:bg-white/10 dark:text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
              <Button
                href={company.customerPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full justify-center"
              >
                {t.nav.customerLogin}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
