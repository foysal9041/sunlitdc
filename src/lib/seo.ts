import type { Metadata } from "next";
import { company } from "@/data/company";

const keywords = [
  "Sunlit Network",
  "Internet Bangladesh",
  "ISP Bangladesh",
  "Khulna ISP",
  "Jashore Internet",
  "Satkhira Internet",
  "Narail Internet",
  "Broadband Internet",
  "Business Internet",
  "Real IP",
  "BDIX Internet",
];

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}

export function buildMetadata({ title, description, path, keywords: extra = [] }: PageSeoOptions): Metadata {
  const url = `${company.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${company.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...extra],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.url,
    logo: `${company.url}/icon-512.png`,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.headquarters.addressLine,
      addressLocality: company.headquarters.city,
      addressRegion: company.headquarters.division,
      postalCode: company.headquarters.postalCode,
      addressCountry: "BD",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.contact.phone,
        contactType: "customer service",
        areaServed: "BD",
        availableLanguage: ["en", "bn"],
      },
    ],
    sameAs: [
      "https://facebook.com/sunlitnetwork",
      "https://youtube.com/@sunlitnetwork",
      "https://linkedin.com/company/sunlitnetwork",
    ],
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "InternetServiceProvider",
    name: company.name,
    url: company.url,
    description: company.description,
    areaServed: company.coverage.districts.map((district) => ({
      "@type": "AdministrativeArea",
      name: district,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.headquarters.addressLine,
      addressLocality: company.headquarters.city,
      addressRegion: company.headquarters.division,
      postalCode: company.headquarters.postalCode,
      addressCountry: "BD",
    },
    telephone: company.contact.phone,
    priceRange: "৳৳",
  };
}
