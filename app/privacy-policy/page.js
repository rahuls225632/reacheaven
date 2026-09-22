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
        <p className="mt-2 text-sm text-slate-soft">Last updated: 22 September 2026</p>

        <div className="mt-8 space-y-8 text-sm leading-relaxed text-slate">
          <p>
            {siteConfig.businessName} ("we", "us", "our") respects your
            privacy. This policy explains what information we collect
            through this website, how we use it, and the choices you have.
            By using this site or submitting an enquiry, you agree to the
            practices described below.
          </p>

          <PolicySection title="Information We Collect">
            When you submit our contact or enquiry form, we collect the
            details you provide — such as your name, business name, email
            address, phone number, business type, budget range and project
            description. We do not collect payment card details through
            this website.
          </PolicySection>

          <PolicySection title="How We Use Information">
            We use the information you share to respond to your enquiry,
            prepare quotes and proposals, and deliver the services you
            request. We do not sell your information to third parties. It
            may be shared with service providers we use to operate this
            site or communicate with you — for example, an email delivery
            or WhatsApp messaging service — solely to provide those
            functions.
          </PolicySection>

          <PolicySection title="Cookies & Analytics">
            This site may use basic analytics tools to understand overall
            traffic and improve the site's performance; any such tool
            collects only aggregate, non-identifying usage data. We do not
            currently use advertising or tracking cookies. If that changes,
            this policy will be updated to disclose the tools in use and how
            you can control your cookie preferences.
          </PolicySection>

          <PolicySection title="Data Retention">
            We retain enquiry and contact information for as long as needed
            to respond to you, deliver a project, and meet reasonable
            business and legal record-keeping needs. You can request that we
            delete your information at any time by emailing us, and we will
            do so unless we are required to retain it for legal or
            accounting purposes.
          </PolicySection>

          <PolicySection title="Data Security">
            We take reasonable technical and organisational measures to
            protect the information you share with us from unauthorised
            access, loss or misuse. However, no method of transmission over
            the internet is completely secure, and we cannot guarantee
            absolute security.
          </PolicySection>

          <PolicySection title="Your Rights">
            You may ask us at any time what information we hold about you,
            request a correction, or request deletion, by contacting us
            using the details below.
          </PolicySection>

          <PolicySection title="Changes to This Policy">
            We may update this policy from time to time to reflect changes
            in our practices. The "Last updated" date at the top of this
            page will always reflect the most recent revision.
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
