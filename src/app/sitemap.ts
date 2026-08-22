import type { MetadataRoute } from "next";
import { company } from "@/data/company";

const routes = [
  "",
  "/internet",
  "/business",
  "/services",
  "/coverage",
  "/about",
  "/bill-payment",
  "/support",
  "/contact",
  "/legal/terms",
  "/legal/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${company.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
