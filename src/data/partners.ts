import type { Locale } from "@/i18n/config";
import { partnersBn } from "@/i18n/dictionaries/content";

export interface Partner {
  id: string;
  name: string;
  short: string;
  description: string;
  /** Path under /public to an actual logo image, if we have one. Falls back to a text wordmark otherwise. */
  logo?: string;
}

/**
 * Network, peering, content and infrastructure partners. Uses a real logo
 * image when one is available in /public/partners, otherwise falls back to
 * a clean text wordmark — update here as relationships or assets change.
 */
const partnersEn: Partner[] = [
  {
    id: "summit",
    name: "Summit Communications Limited",
    short: "Summit Communications",
    description: "Bandwidth & NTTN transmission partner",
    logo: "/partners/summit-communications.png",
  },
  {
    id: "bdix",
    name: "BDIX",
    short: "BDIX",
    description: "Bangladesh Internet Exchange peering",
    logo: "/partners/BDIX.png",
  },
  {
    id: "google",
    name: "Google",
    short: "Google",
    description: "Content delivery & caching partner",
    logo: "/partners/google.jpg",
  },
  {
    id: "meta",
    name: "Meta",
    short: "Meta",
    description: "Network peering partner",
    logo: "/partners/Meta-300x132.png",
  },
  {
    id: "ookla",
    name: "Ookla Speedtest",
    short: "Ookla",
    description: "Independent speed certification",
    logo: "/partners/OKLA.png",
  },
  {
    id: "npref",
    name: "Npref",
    short: "Npref",
    description: "Network infrastructure partner",
    logo: "/partners/Npref.png",
  },
  {
    id: "roserhari",
    name: "Roser Hari",
    short: "Roser Hari",
    description: "Bundled OTT & entertainment partner",
    logo: "/partners/roserhari.png",
  },
];

export function getPartners(locale: Locale): Partner[] {
  if (locale === "en") return partnersEn;
  return partnersEn.map((p) => ({ ...p, ...partnersBn[p.id] }));
}
