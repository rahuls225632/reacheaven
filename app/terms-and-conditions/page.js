import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for engaging ${siteConfig.businessName} for website and software development services.`,
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink">Terms & Conditions</h1>
        <p className="mt-2 text-sm text-slate-soft">Last updated: [DATE]</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate">
          <p>
            This placeholder outlines the sections a real terms of service
            page for {siteConfig.businessName} should cover. Have the final
            wording reviewed before publishing this page live.
          </p>

          <TermsSection title="Project Scope & Quotes">
            [Describe how project scope is defined, how quotes are prepared,
            and that pricing shown on the site (Starter / Business / Custom)
            is a starting reference, not a fixed price.]
          </TermsSection>

          <TermsSection title="3 Months Free Post-Launch Support">
            Every website project includes 3 months of free post-launch
            support and maintenance, covering bug fixes, minor UI
            corrections, basic content updates, performance monitoring,
            technical assistance and deployment support. Major new features,
            redesigns, third-party integrations and substantial development
            work beyond this scope are quoted separately.
          </TermsSection>

          <TermsSection title="Payments">
            [Describe payment terms — for example: deposit structure,
            milestone payments, accepted payment methods and what happens if
            a payment is delayed.]
          </TermsSection>

          <TermsSection title="Intellectual Property">
            [Describe ownership of the final deliverable once paid in full,
            and any rights retained over reusable internal tooling or
            components.]
          </TermsSection>

          <TermsSection title="Limitation of Liability">
            [Add a limitation of liability clause appropriate to your
            business, reviewed by a qualified professional.]
          </TermsSection>

          <TermsSection title="Contact Us">
            Questions about these terms can be sent to {siteConfig.email}.
          </TermsSection>
        </div>
      </Container>
    </section>
  );
}

function TermsSection({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
