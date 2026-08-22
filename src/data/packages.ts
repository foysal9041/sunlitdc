import type { InternetPackage } from "@/types";
import type { Locale } from "@/i18n/config";
import { packagesBn, customPackageBn } from "@/i18n/dictionaries/content";

/**
 * Single source of truth for Internet package pricing.
 * Update speeds, prices and features here — every page reads from this file.
 * Bengali text overrides live in src/i18n/dictionaries/content.ts, keyed by id.
 */
const internetPackagesEn: InternetPackage[] = [
  {
    id: "basic-35",
    speedMbps: 35,
    priceBDT: 500,
    billingCycle: "month",
    tagline: "Everyday home internet",
    bestFor: "Browsing, chat & social media",
    features: ["Unlimited data", "Shared bandwidth", "Free installation", "Standard support"],
  },
  {
    id: "standard-50",
    speedMbps: 50,
    priceBDT: 525,
    billingCycle: "month",
    tagline: "Our most popular plan",
    bestFor: "SD/HD streaming & video calls",
    popular: true,
    features: ["Unlimited data", "Priority routing", "Free installation", "Priority support"],
  },
  {
    id: "premium-60",
    speedMbps: 60,
    priceBDT: 630,
    billingCycle: "month",
    tagline: "Multi-device household internet",
    bestFor: "HD streaming across 3–4 devices",
    features: ["Unlimited data", "Priority routing", "Free installation", "Priority support"],
  },
  {
    id: "pro-70",
    speedMbps: 70,
    priceBDT: 735,
    billingCycle: "month",
    tagline: "For power users & gamers",
    bestFor: "4K streaming & online gaming",
    features: ["Unlimited data", "Priority routing", "Low-latency gaming path", "Priority support"],
  },
  {
    id: "ultimate-80",
    speedMbps: 80,
    priceBDT: 840,
    billingCycle: "month",
    tagline: "High-performance households",
    bestFor: "Multiple 4K streams & work-from-home",
    features: [
      "Unlimited data",
      "Priority routing",
      "Low-latency gaming path",
      "24/7 priority support",
    ],
  },
  {
    id: "ultra-110",
    speedMbps: 110,
    priceBDT: 1050,
    billingCycle: "month",
    tagline: "Our fastest residential plan",
    bestFor: "Large households, creators & streamers",
    features: [
      "Unlimited data",
      "Highest priority routing",
      "Low-latency gaming path",
      "24/7 priority support",
      "Free static IP add-on available",
    ],
  },
];

const customPackageNoteEn = {
  title: "Custom Package Available",
  description:
    "Need a different speed, a dedicated line, or a bundle for multiple locations? Our team can design a plan around your exact requirement.",
};

export function getInternetPackages(locale: Locale): InternetPackage[] {
  if (locale === "en") return internetPackagesEn;
  return internetPackagesEn.map((pkg) => ({ ...pkg, ...packagesBn[pkg.id] }));
}

export function getCustomPackageNote(locale: Locale) {
  return locale === "en" ? customPackageNoteEn : customPackageBn;
}
