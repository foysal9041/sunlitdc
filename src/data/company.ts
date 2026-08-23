import { whatsappLink } from "@/lib/utils";

export const company = {
  name: "SUNLIT NETWORK",
  shortName: "Sunlit",
  legalName: "Sunlit Network",
  domain: "sunlitnetwork.com",
  url: "https://sunlitnetwork.com",
  customerPortalUrl: "https://selfcare.sunlitnetwork.com",
  tagline: "Fast Internet. Reliable Network. Better Experience.",
  positioning:
    "Sunlit Network connects people, homes and businesses with fast, reliable and future-ready internet.",
  description:
    "Sunlit Network provides fast, reliable and high-performance internet, business connectivity and digital services across Bangladesh.",
  founded: "2014",
  headquarters: {
    addressLine: "Sunlit DC",
    city: "Khulna",
    division: "Khulna Division",
    country: "Bangladesh",
    postalCode: "9000",
  },
  contact: {
    phone: "09614-552-233",
    hotline: "09614-552-233",
    whatsapp: "01334-921013",
    email: "support@sunlitnetwork.com",
    supportEmail: "support@sunlitnetwork.com",
    businessEmail: "support@sunlitnetwork.com",
  },
  hours: {
    support: "24/7 Customer Support",
    office: "Sat – Thu, 9:00 AM – 8:00 PM",
  },
  coverage: {
    region: "Khulna Division",
    districts: ["Jashore", "Satkhira", "Khulna", "Narail", "Chuadanga", "Jhenaidah"],
  },
} as const;

/**
 * All 10 districts of Khulna Division — used for the public "Check
 * Availability" form so visitors in areas we don't yet actively serve can
 * still register interest. Distinct from `company.coverage.districts`,
 * which lists only where we currently have live PoPs (used for SEO/coverage
 * display, so it must stay accurate to actual service area).
 */
export const khulnaDivisionDistricts = [
  "Bagerhat",
  "Chuadanga",
  "Jashore",
  "Jhenaidah",
  "Khulna",
  "Kushtia",
  "Magura",
  "Meherpur",
  "Narail",
  "Satkhira",
] as const;

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/sunlitnetwork", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com/@sunlitnetwork", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com/company/sunlitnetwork", icon: "linkedin" },
  { label: "WhatsApp", href: whatsappLink(company.contact.whatsapp), icon: "whatsapp" },
] as const;
