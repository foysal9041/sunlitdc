import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "@/i18n/getLocale";
import { getLegalDictionary } from "@/i18n/dictionaries/legal";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms and conditions for using Sunlit Network internet and business services.",
  path: "/legal/terms",
});

export default async function TermsPage() {
  const locale = await getLocale();
  const t = getLegalDictionary(locale).terms;

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
