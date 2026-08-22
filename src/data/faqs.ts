import type { FAQItem } from "@/types";
import type { Locale } from "@/i18n/config";
import { faqsBn } from "@/i18n/dictionaries/content";

const faqsEn: FAQItem[] = [
  {
    id: "packages",
    question: "What internet packages do you offer?",
    answer:
      "We offer residential plans ranging from 35 Mbps to 110 Mbps, each with unlimited data and no hidden throttling. You can compare all current speeds and pricing on our Internet page, and custom packages are available for specific needs.",
  },
  {
    id: "new-connection",
    question: "How can I get a new connection?",
    answer:
      "Choose a package on our Internet page and tap “Get Connection”, or contact our team directly by phone or WhatsApp. We'll confirm coverage at your address and schedule an installation visit.",
  },
  {
    id: "availability",
    question: "Where is Sunlit Network available?",
    answer:
      "We currently serve Khulna Division, including Jashore, Satkhira, Narail and Khulna city, with new areas added regularly. Check our Coverage page or use “Check Availability” to confirm service at your location.",
  },
  {
    id: "real-ip",
    question: "Do you provide Real IP?",
    answer:
      "Yes. Real (public) IP addresses are available as an add-on for customers running CCTV systems, servers, remote access tools or VPNs. Reach out to our team to add Real IP to your connection.",
  },
  {
    id: "business-internet",
    question: "Do you provide business internet?",
    answer:
      "Yes. Our Business Internet service includes dedicated bandwidth, static/real IP, high-availability links and enterprise support for offices, retail locations and organizations of any size.",
  },
  {
    id: "contact-support",
    question: "How can I contact support?",
    answer:
      "Our support team is available 24/7 by phone, WhatsApp and through the Support Center on this website. Existing customers can also log in to the customer portal for account-specific help.",
  },
  {
    id: "installation-time",
    question: "How long does installation take?",
    answer:
      "Most residential installations are completed within 24–72 hours of confirming coverage and scheduling, depending on your location and site readiness. Business installations are scheduled based on project scope.",
  },
  {
    id: "payment-methods",
    question: "What payment methods are available?",
    answer:
      "We support mobile financial services, bank transfer and cash payment through our local offices. Our customer portal will also support online bill payment as it rolls out.",
  },
];

export function getFaqs(locale: Locale): FAQItem[] {
  if (locale === "en") return faqsEn;
  return faqsEn.map((item) => ({ ...item, ...faqsBn[item.id] }));
}
