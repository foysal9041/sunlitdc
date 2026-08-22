import type { Testimonial } from "@/types";
import type { Locale } from "@/i18n/config";
import { testimonialsBn } from "@/i18n/dictionaries/content";

/**
 * Placeholder / demo testimonials until real customer quotes are supplied.
 */
const testimonialsEn: Testimonial[] = [
  {
    id: "t1",
    name: "Rafiq Hasan",
    location: "Jashore",
    role: "Small Business Owner",
    rating: 5,
    quote:
      "Fast connection and excellent support. Sunlit Network has been reliable for our office every single day.",
  },
  {
    id: "t2",
    name: "Nusrat Jahan",
    location: "Khulna",
    role: "Home Customer",
    rating: 5,
    quote:
      "Switched from our old provider and the difference in speed and stability was noticeable within the first week.",
  },
  {
    id: "t3",
    name: "Imran Kabir",
    location: "Satkhira",
    role: "Remote Software Developer",
    rating: 5,
    quote:
      "Low latency and stable uptime mean I can work from home without worrying about dropped video calls.",
  },
  {
    id: "t4",
    name: "Sabina Akter",
    location: "Narail",
    role: "Home Customer",
    rating: 4,
    quote:
      "Installation was quick and the team explained everything clearly. Support has been responsive whenever needed.",
  },
];

export function getTestimonials(locale: Locale): Testimonial[] {
  if (locale === "en") return testimonialsEn;
  return testimonialsEn.map((item) => ({ ...item, ...testimonialsBn[item.id] }));
}
