import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getLegalDictionary } from "@/i18n/dictionaries/legal";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Sunlit Network collects, uses and protects customer information.",
  path: "/legal/privacy",
});

export default async function PrivacyPage() {
  const locale = await getLocale();
  const t = getLegalDictionary(locale).privacy;

  return (
    <>
      <PageHero eyebrow={locale === "bn" ? "আইনি" : "Legal"} title={t.title} subtitle={t.lastUpdated} />
      <section className="bg-white pb-24">
        <Container className="max-w-3xl space-y-8">
          {t.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-navy-950">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{section.body}</p>
            </div>
          ))}
          <p className="text-sm leading-relaxed text-slate-600">
            {t.questionsPrefix} {company.contact.email}.
          </p>
        </Container>
      </section>
    </>
  );
}
