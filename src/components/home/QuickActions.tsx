import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Icon } from "@/components/icons/Icon";
import { company } from "@/data/company";
import { getInternetPackages } from "@/data/packages";
import type { Locale } from "@/i18n/config";
import type { IconName } from "@/types";

type Action = { icon: IconName; title: string; hint: string; href: string; external?: boolean };

const copy = {
  en: {
    heading: "What are you looking for?",
    from: (price: number) => `Plans from ৳${price}/month`,
    actions: [
      { icon: "bolt", title: "New Connection", hint: "Free installation", href: "/internet#packages" },
      { icon: "mapPin", title: "Check Coverage", hint: "Is your area live?", href: "/coverage" },
      { icon: "star", title: "Pay Bill", hint: "bKash, Nagad & more", href: "/bill-payment" },
      { icon: "headset", title: "Get Support", hint: "24/7 help desk", href: "/support" },
      { icon: "building", title: "Business Internet", hint: "Dedicated & Real IP", href: "/business" },
    ] satisfies Action[],
  },
  bn: {
    heading: "আপনি কী খুঁজছেন?",
    from: (price: number) => `মাসিক ৳${price} থেকে শুরু`,
    actions: [
      { icon: "bolt", title: "নতুন সংযোগ", hint: "ফ্রি ইনস্টলেশন", href: "/internet#packages" },
      { icon: "mapPin", title: "কভারেজ দেখুন", hint: "আপনার এলাকায় আছে?", href: "/coverage" },
      { icon: "star", title: "বিল পেমেন্ট", hint: "বিকাশ, নগদ ও আরও", href: "/bill-payment" },
      { icon: "headset", title: "সাপোর্ট", hint: "২৪/৭ হেল্প ডেস্ক", href: "/support" },
      { icon: "building", title: "ব্যবসায়িক ইন্টারনেট", hint: "ডেডিকেটেড ও রিয়েল আইপি", href: "/business" },
    ] satisfies Action[],
  },
};

export function QuickActions({ locale }: { locale: Locale }) {
  const t = copy[locale === "bn" ? "bn" : "en"];
  const lowest = Math.min(...getInternetPackages(locale).map((p) => p.priceBDT));

  return (
    <section className="relative z-10 -mt-14 pb-6 sm:-mt-16">
      <Container>
        <ScrollReveal>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-20px_rgba(15,35,95,0.25)] dark:border-white/10 dark:bg-navy-900 sm:p-7">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-navy-950 dark:text-white sm:text-xl">{t.heading}</h2>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-electric-600 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                {t.from(lowest)}
                <span className="text-slate-400">·</span>
                <a href={`tel:${company.contact.hotline.replace(/\D/g, "")}`} className="hover:underline">
                  {company.contact.hotline}
                </a>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {t.actions.map((a) => (
                <Link
                  key={a.title}
                  href={a.href}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-mist-50 p-3.5 transition hover:-translate-y-0.5 hover:border-electric-300 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-electric-500 to-cyan-400 text-white shadow-sm transition-transform group-hover:scale-110">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm leading-tight font-bold text-navy-950 dark:text-white">{a.title}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{a.hint}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
