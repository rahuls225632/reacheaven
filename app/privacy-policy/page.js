import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.businessName}, explaining what information is collected and how it is used.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-20">
      <Container className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-soft">Last updated: [DATE]</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate">
          <p>
            This placeholder policy outlines the sections a real privacy
            policy for {siteConfig.businessName} should cover. Replace each
            section below with content reviewed for your actual data
            practices before publishing this page live.
          </p>

          <PolicySection title="Information We Collect">
            [Describe what is collected through the enquiry form on this
            site — for example: name, business name, email, phone number,
            business type, budget range and project description.]
          </PolicySection>

          <PolicySection title="How We Use Information">
            [Describe how enquiry information is used — for example: to
            respond to enquiries, prepare quotes and provide requested
            services. State whether information is shared with any third
            party, such as an email delivery service.]
          </PolicySection>

          <PolicySection title="Cookies & Analytics">
            [Disclose any analytics or tracking tools in use, such as Google
            Analytics, once they are added to the site, and explain how
            visitors can control cookie preferences.]
          </PolicySection>

          <PolicySection title="Data Retention">
            [State how long enquiry and contact information is retained and
            how it can be deleted on request.]
          </PolicySection>

          <PolicySection title="Contact Us">
            Questions about this policy can be sent to {siteConfig.email}.
          </PolicySection>
        </div>
      </Container>
    </section>
  );
}

function PolicySection({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
