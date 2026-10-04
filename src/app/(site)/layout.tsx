import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CardSpotlight } from "@/components/layout/CardSpotlight";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { organizationJsonLd } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <div className="pb-16 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <SiteLoader />
      <CardSpotlight />
      <Navbar locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <FloatingActions locale={locale} />
    </div>
  );
}
