import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  ...buildMetadata({
    title: "SUNLIT NETWORK | Fast & Reliable Internet in Bangladesh",
    description: company.description,
    path: "/",
  }),
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon-512.png",
    apple: "/icon-192.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${jakarta.variable} ${bengali.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
