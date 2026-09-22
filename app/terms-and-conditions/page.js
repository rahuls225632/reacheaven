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
        <p className="mt-2 text-sm text-slate-soft">Last updated: 22 September 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate">
          <p>
            These Terms & Conditions govern any website, web application or
            software development engagement undertaken by{" "}
            {siteConfig.businessName} ("we", "us", "our") for a client
            ("you", "your"). By approving a quote, paying an advance, or
            instructing us to begin work, you agree to these terms.
          </p>

          <TermsSection title="1. Project Scope & Quotes">
            Every engagement begins with a written quote or proposal that
            defines the pages, features, integrations and number of
            revisions included. Pricing shown on this site (Starter /
            Business / Custom) is an indicative starting point and the final
            price is confirmed only after your requirements are discussed.
            Any request outside the agreed scope — new pages, extra
            features, additional design rounds — is treated as a change
            request and quoted and billed separately before work begins on
            it.
          </TermsSection>

          <TermsSection title="2. 3 Months Free Post-Launch Support">
            Every website project includes 3 months of free post-launch
            support and maintenance, covering bug fixes, minor UI
            corrections, basic content updates, performance monitoring,
            technical assistance and deployment support. Major new features,
            redesigns, third-party integrations and substantial development
            work beyond this scope are quoted separately. After this period,
            ongoing support and maintenance can be continued under a
            separate paid arrangement.
          </TermsSection>

          <TermsSection title="3. Payments">
            Unless otherwise agreed in writing, projects require an advance
            payment before work begins, with the balance due in milestones
            tied to project stages (for example: design approval, and
            final delivery) or on completion for smaller projects. We accept
            bank transfer, UPI and other methods confirmed at the time of
            the quote. Work in progress may be paused if an agreed payment
            is not received within 7 days of the due date, and the final
            deliverable (including source files, hosting access and domain
            handover) is released only once all dues are cleared.
          </TermsSection>

          <TermsSection title="4. Client Responsibilities">
            You agree to provide the content, images, logos, credentials and
            feedback needed to complete the project in a timely manner.
            Delays in providing these, or in reviewing and approving
            milestones, may extend the delivery timeline accordingly.
          </TermsSection>

          <TermsSection title="5. Intellectual Property">
            Once a project is paid for in full, ownership of the final
            deliverable — the website or application built for you — transfers
            to you. We retain the right to reuse general-purpose code,
            components, frameworks and internal tooling developed during the
            project in future work for other clients, provided no
            confidential business information of yours is disclosed. Unless
            agreed otherwise, we may reference the completed project (name,
            screenshots, live link) in our own portfolio and marketing.
          </TermsSection>

          <TermsSection title="6. Revisions & Change Requests">
            The number of design and development revision rounds is set out
            in your quote. Additional rounds, or changes requested after a
            milestone has been approved, are treated as new work and billed
            at our standard rate.
          </TermsSection>

          <TermsSection title="7. Third-Party Services">
            Where a project relies on third-party services — domain
            registrars, hosting providers, payment gateways, APIs or
            plugins — those services are governed by their own terms and
            pricing, which are not controlled by us. We are not liable for
            downtime, price changes or policy changes made by such
            providers.
          </TermsSection>

          <TermsSection title="8. Limitation of Liability">
            We take reasonable care to deliver reliable, well-tested work,
            but we do not guarantee that the software will be completely
            free of defects or uninterrupted. To the maximum extent
            permitted by law, our total liability for any claim arising from
            a project is limited to the amount actually paid by you for
            that project, and we are not liable for indirect losses such as
            loss of business, revenue or data arising from use of the
            delivered product.
          </TermsSection>

          <TermsSection title="9. Cancellation">
            Either party may cancel an ongoing project with written notice.
            In that case, you are billed for work completed and costs
            already incurred up to the cancellation date, and any advance
            already paid for that work is non-refundable.
          </TermsSection>

          <TermsSection title="10. Governing Law">
            These terms are governed by the laws of India, and any dispute
            arising from a project is subject to the jurisdiction of the
            courts where {siteConfig.businessName} is based.
          </TermsSection>

          <TermsSection title="11. Contact Us">
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
