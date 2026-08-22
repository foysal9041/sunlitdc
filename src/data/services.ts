import type { ServiceItem } from "@/types";
import type { Locale } from "@/i18n/config";
import { servicesBn } from "@/i18n/dictionaries/content";

const servicesEn: ServiceItem[] = [
  {
    id: "broadband",
    slug: "broadband-internet",
    name: "Broadband Internet",
    icon: "home",
    shortDescription: "High-speed residential internet for everyday users.",
    description:
      "Reliable fiber-backed broadband built for streaming, gaming, remote work and everything in between — with unlimited data and no hidden throttling.",
    features: ["Unlimited data", "Fiber-backed delivery", "Free standard installation", "Flexible monthly plans"],
  },
  {
    id: "business-internet",
    slug: "business-internet",
    name: "Business Internet",
    icon: "building",
    shortDescription: "Reliable connectivity for offices and organizations.",
    description:
      "Dedicated bandwidth, real IP options and enterprise-grade SLAs designed to keep business-critical operations online, every hour of the day.",
    features: ["Dedicated bandwidth", "Real / static IP", "Priority ticket handling", "Scalable upgrades"],
  },
  {
    id: "ip-telephony",
    slug: "ip-telephony",
    name: "IP Telephony",
    icon: "phone",
    shortDescription: "Professional communication solutions.",
    description:
      "Voice-over-IP systems for offices that need clear, reliable calling with extensions, call routing and integration with your existing network.",
    features: ["Multi-extension support", "Call routing", "HD voice quality", "Easy scalability"],
  },
  {
    id: "hosting-domain",
    slug: "hosting-domain",
    name: "Hosting & Domain",
    icon: "server",
    shortDescription: "Reliable hosting and domain services.",
    description:
      "Domain registration and web hosting with dependable uptime, backed by local support for businesses building their online presence.",
    features: ["Domain registration", "Web & email hosting", "SSL-ready", "Local technical support"],
  },
  {
    id: "security-surveillance",
    slug: "security-surveillance",
    name: "Security Surveillance",
    icon: "camera",
    shortDescription: "Modern CCTV and security solutions.",
    description:
      "IP camera systems with remote viewing over a Real IP connection, giving homes and businesses round-the-clock visibility from anywhere.",
    features: ["IP camera installation", "Remote monitoring", "Cloud & local storage", "Real IP integration"],
  },
  {
    id: "smart-home",
    slug: "smart-home",
    name: "Smart Home",
    icon: "wifi",
    shortDescription: "Connected and intelligent home solutions.",
    description:
      "Whole-home Wi-Fi, smart device connectivity and network setup that keeps every room and every device online without dead zones.",
    features: ["Whole-home Wi-Fi", "Smart device support", "Mesh network design", "Guided setup"],
  },
];

export function getServices(locale: Locale): ServiceItem[] {
  if (locale === "en") return servicesEn;
  return servicesEn.map((service) => ({ ...service, ...servicesBn[service.id] }));
}
