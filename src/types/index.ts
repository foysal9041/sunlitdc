export interface InternetPackage {
  id: string;
  speedMbps: number;
  priceBDT: number;
  billingCycle: "month";
  tagline: string;
  features: string[];
  popular?: boolean;
  bestFor: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: IconName;
  features: string[];
}

export interface CoverageArea {
  id: string;
  name: string;
  district: string;
  status: "live" | "expanding" | "planned";
  x: number;
  y: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  role?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export interface NetworkLayer {
  id: string;
  label: string;
  description: string;
}

export interface TechBadge {
  id: string;
  label: string;
}

export interface PerformanceMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  max: number;
  /** Overrides the rendered value/unit text (e.g. "500+ Mbps", "Unlimited") while `value`/`max` still drive the bar fill. */
  display?: string;
}

export type IconName =
  | "bolt"
  | "shield"
  | "signal"
  | "clock"
  | "headset"
  | "lock"
  | "wifi"
  | "building"
  | "phone"
  | "globe"
  | "server"
  | "camera"
  | "home"
  | "checkCircle"
  | "chevronDown"
  | "menu"
  | "close"
  | "arrowRight"
  | "mapPin"
  | "whatsapp"
  | "facebook"
  | "youtube"
  | "linkedin"
  | "mail"
  | "star"
  | "download"
  | "upload"
  | "activity"
  | "gauge"
  | "network"
  | "router"
  | "gamepad"
  | "play"
  | "briefcase"
  | "layers"
  | "cpu"
  | "user"
  | "eye"
  | "eyeOff";
