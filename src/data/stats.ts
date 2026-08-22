import type { StatItem, PerformanceMetric, NetworkLayer, TechBadge, IconName } from "@/types";
import type { Locale } from "@/i18n/config";
import {
  trustStatsBn,
  performanceMetricsBn,
  experienceBn,
  businessFeaturesBn,
  networkLayersBn,
  useCaseBadgesBn,
} from "@/i18n/dictionaries/content";

const trustStatsEn: StatItem[] = [
  { id: "customers", value: 50000, suffix: "+", label: "Connected Customers" },
  { id: "reliability", value: 99.9, suffix: "%", label: "Network Reliability" },
  { id: "monitoring", value: 24, suffix: "/7", label: "Network Monitoring" },
  { id: "districts", value: 4, suffix: "+", label: "District Coverage" },
];

const performanceMetricsEn: PerformanceMetric[] = [
  { id: "download", label: "Download Speed", value: 500, unit: "Mbps", max: 500, display: "500+ Mbps" },
  { id: "upload", label: "Upload Speed", value: 500, unit: "Mbps", max: 500, display: "500+ Mbps" },
  { id: "cache", label: "Cache Speed", value: 100, unit: "", max: 100, display: "Unlimited" },
  { id: "latency", label: "Latency", value: 8, unit: "ms", max: 50 },
  { id: "availability", label: "Network Availability", value: 99.9, unit: "%", max: 100 },
];

const experienceHighlightsEn: { id: string; icon: IconName; title: string; description: string }[] = [
  { id: "speed", icon: "bolt", title: "High-Speed Internet", description: "Fiber-backed speeds up to 110 Mbps for households and businesses alike." },
  { id: "reliability", icon: "signal", title: "Reliable Connectivity", description: "Redundant links and proactive maintenance keep you online around the clock." },
  { id: "latency", icon: "gauge", title: "Low Latency", description: "Optimised routing keeps gaming, calls and streaming responsive." },
  { id: "monitoring", icon: "activity", title: "24/7 Monitoring", description: "Our network operations team watches performance in real time, every day." },
  { id: "support", icon: "headset", title: "Professional Support", description: "Trained local support staff, ready to help by phone, chat or in person." },
  { id: "security", icon: "shield", title: "Secure Network", description: "Modern network security practices protect your connection and data." },
];

const networkLayersEn: NetworkLayer[] = [
  { id: "internet", label: "Internet", description: "Global connectivity via multiple upstream transit providers." },
  { id: "core", label: "Core Network", description: "High-capacity core routers form the backbone of the Sunlit network." },
  { id: "regional", label: "Regional Network", description: "Regional aggregation nodes serve Khulna Division districts." },
  { id: "distribution", label: "Distribution", description: "Fiber distribution links carry capacity toward local access points." },
  { id: "olt", label: "OLT", description: "Optical Line Terminals deliver fiber directly into neighbourhoods." },
  { id: "customer", label: "Customer", description: "A dedicated, monitored connection reaches your home or office." },
];

// Technical acronyms/brand names — kept as-is across locales (standard practice).
export const techBadges: TechBadge[] = [
  { id: "fiber", label: "Fiber Optic Network" },
  { id: "ipv4", label: "IPv4 / IPv6" },
  { id: "bgp", label: "BGP" },
  { id: "cdn", label: "CDN" },
  { id: "bdix", label: "BDIX" },
  { id: "ggc", label: "Google Global Cache" },
  { id: "monitoring", label: "Network Monitoring" },
  { id: "redundancy", label: "Redundant Connectivity" },
];

const useCaseBadgesEn: { id: string; label: string; icon: IconName }[] = [
  { id: "streaming", label: "Built for Streaming", icon: "play" },
  { id: "gaming", label: "Built for Gaming", icon: "gamepad" },
  { id: "business", label: "Built for Business", icon: "briefcase" },
  { id: "everything", label: "Built for Everything", icon: "layers" },
];

const businessFeaturesEn: { id: string; icon: IconName; title: string; description: string }[] = [
  { id: "dedicated", icon: "server", title: "Dedicated Internet", description: "Guaranteed bandwidth that isn't shared with other users." },
  { id: "real-ip", icon: "globe", title: "Static / Real IP", description: "Public IP addressing for servers, VPNs and remote access." },
  { id: "ha", icon: "shield", title: "High Availability", description: "Resilient links designed to minimise business downtime." },
  { id: "latency", icon: "gauge", title: "Low Latency", description: "Optimised routing for latency-sensitive applications." },
  { id: "support", icon: "headset", title: "Enterprise Support", description: "Priority response from a dedicated business support line." },
  { id: "scalable", icon: "cpu", title: "Scalable Bandwidth", description: "Upgrade capacity on demand as your organisation grows." },
];

export function getTrustStats(locale: Locale): StatItem[] {
  if (locale === "en") return trustStatsEn;
  return trustStatsEn.map((s) => ({ ...s, ...trustStatsBn[s.id] }));
}

export function getPerformanceMetrics(locale: Locale): PerformanceMetric[] {
  if (locale === "en") return performanceMetricsEn;
  return performanceMetricsEn.map((m) => ({ ...m, ...performanceMetricsBn[m.id] }));
}

export function getExperienceHighlights(locale: Locale) {
  if (locale === "en") return experienceHighlightsEn;
  return experienceHighlightsEn.map((item) => ({ ...item, ...experienceBn[item.id] }));
}

export function getNetworkLayers(locale: Locale): NetworkLayer[] {
  if (locale === "en") return networkLayersEn;
  return networkLayersEn.map((layer) => ({ ...layer, ...networkLayersBn[layer.id] }));
}

export function getUseCaseBadges(locale: Locale) {
  if (locale === "en") return useCaseBadgesEn;
  return useCaseBadgesEn.map((item) => ({ ...item, label: useCaseBadgesBn[item.id] ?? item.label }));
}

export function getBusinessFeatures(locale: Locale) {
  if (locale === "en") return businessFeaturesEn;
  return businessFeaturesEn.map((item) => ({ ...item, ...businessFeaturesBn[item.id] }));
}
