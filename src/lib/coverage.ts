import { prisma } from "@/lib/prisma";
import type { Locale } from "@/i18n/config";
import { districtNamesBn, areaNamesBn, localizeName } from "@/i18n/dictionaries/content";
import { getPagesDictionary } from "@/i18n/dictionaries/pages";

/**
 * Canonical district display order for Khulna Division. Any district that
 * appears in the database but isn't listed here is simply appended
 * alphabetically — the list here is presentation order only, never a
 * restriction on which districts can have coverage.
 */
const DISTRICT_ORDER = ["Jashore", "Satkhira", "Khulna", "Narail", "Chuadanga", "Jhenaidah"];

export interface PublicDistrictCoverage {
  /** Canonical English name — stable key for positioning/lookups, never localized. */
  district: string;
  /** Localized display name for this district. */
  districtLabel: string;
  areaCount: number;
  /** Canonical English area names. */
  areas: string[];
  /** Localized display names for the same areas, same order. */
  areaLabels: string[];
  description: string;
  status: "active";
}

export interface PublicCoverageData {
  districts: PublicDistrictCoverage[];
  totals: {
    activeAreas: number;
    districts: number;
  };
  generatedAt: string;
}

function buildDescription(locale: Locale, areaLabels: string[]): string {
  const t = getPagesDictionary(locale).coverage;
  const unique = Array.from(new Set(areaLabels));
  if (unique.length === 0) {
    return locale === "bn" ? "এই জেলা ও আশেপাশের এলাকায় সেবা দেওয়া হচ্ছে।" : "Serving this district and surrounding areas.";
  }
  const shown = unique.slice(0, 2);
  return `${t.servingPrefix} ${shown.join(", ")} ${t.andSurrounding}`;
}

/**
 * Aggregates PoP records into public, district-level coverage figures.
 * Deliberately selects only `district` and `generalArea` — every
 * BTRC/NTTN/IP/topology field on PointOfPresence stays out of this query
 * entirely, so there is no risk of it leaking through this function.
 */
export async function getPublicCoverageData(locale: Locale = "en"): Promise<PublicCoverageData> {
  const activePops = await prisma.pointOfPresence.findMany({
    where: { status: "ACTIVE" },
    select: { district: true, generalArea: true },
  });

  const byDistrict = new Map<string, string[]>();
  for (const pop of activePops) {
    const areas = byDistrict.get(pop.district) ?? [];
    areas.push(pop.generalArea);
    byDistrict.set(pop.district, areas);
  }

  const districtNames = Array.from(byDistrict.keys()).sort((a, b) => {
    const ai = DISTRICT_ORDER.indexOf(a);
    const bi = DISTRICT_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const districts: PublicDistrictCoverage[] = districtNames.map((district) => {
    const rawAreas = byDistrict.get(district) ?? [];
    const areas = Array.from(new Set(rawAreas));
    const areaLabels = areas.map((area) => localizeName(locale, areaNamesBn, area));
    return {
      district,
      districtLabel: localizeName(locale, districtNamesBn, district),
      areaCount: rawAreas.length,
      areas,
      areaLabels,
      description: buildDescription(locale, areaLabels),
      status: "active",
    };
  });

  return {
    districts,
    totals: {
      activeAreas: activePops.length,
      districts: districts.length,
    },
    generatedAt: new Date().toISOString(),
  };
}
