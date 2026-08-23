import Link from "next/link";
import { company, socialLinks } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/ui/Container";
import { getCommonDictionary } from "@/i18n/dictionaries/common";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const t = getCommonDictionary(locale);

  const columns = [
    {
      heading: t.footer.columns.company.heading,
      links: [
        { label: t.footer.columns.company.about, href: "/about" },
        { label: t.footer.columns.company.internet, href: "/internet" },
        { label: t.footer.columns.company.business, href: "/business" },
        { label: t.footer.columns.company.services, href: "/services" },
        { label: t.footer.columns.company.coverage, href: "/coverage" },
        { label: t.footer.columns.company.support, href: "/support" },
      ],
    },
    {
      heading: t.footer.columns.customer.heading,
      links: [
        { label: t.footer.columns.customer.login, href: company.customerPortalUrl, external: true },
        { label: t.footer.columns.customer.packages, href: "/internet" },
        { label: t.footer.columns.customer.payment, href: "/bill-payment" },
        { label: t.footer.columns.customer.support, href: "/support" },
        { label: t.footer.columns.customer.faq, href: "/support#faq" },
      ],
    },
    {
      heading: t.footer.columns.about.heading,
      links: [
        { label: t.footer.columns.about.about, href: "/about" },
        { label: t.footer.columns.about.contact, href: "/contact" },
        { label: t.footer.columns.about.terms, href: "/legal/terms" },
        { label: t.footer.columns.about.privacy, href: "/legal/privacy" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-mist-50 dark:border-white/10 dark:bg-navy-950">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <Container className="relative py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-16 drop-shadow-[0_1px_8px_rgba(47,99,255,0.2)] sm:h-20" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t.positioning}</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:border-cyan-400/60 hover:text-electric-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-950 dark:text-white">{col.heading}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 transition-colors hover:text-electric-600 dark:text-slate-400 dark:hover:text-cyan-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-slate-500 transition-colors hover:text-electric-600 dark:text-slate-400 dark:hover:text-cyan-300">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-6 sm:grid-cols-3 dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <Icon name="phone" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.footer.callUs}</p>
              <p className="text-sm font-medium text-navy-950 dark:text-white">{company.contact.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="mail" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.footer.emailUs}</p>
              <p className="text-sm font-medium text-navy-950 dark:text-white">{company.contact.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Icon name="mapPin" className="h-5 w-5 text-electric-600 dark:text-cyan-300" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.footer.website}</p>
              <p className="text-sm font-medium text-navy-950 dark:text-white">{company.domain}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-400 sm:flex-row dark:border-white/10 dark:text-slate-500">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/legal/terms" className="hover:text-slate-600 dark:hover:text-slate-300">{t.footer.columns.about.terms}</Link>
            <Link href="/legal/privacy" className="hover:text-slate-600 dark:hover:text-slate-300">{t.footer.columns.about.privacy}</Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">{t.footer.developedBy}</p>
      </Container>
    </footer>
  );
}
