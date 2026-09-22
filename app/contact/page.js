import { Mail, Phone, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig, mailHref, telHref, whatsappHref } from "@/lib/config";

export const metadata = {
  title: "Contact Us",
  description:
    "Request a free consultation for your website, web application or software project. Reach us by email, phone or WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-mist py-20">
      <Container>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-600">
            Contact
          </span>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink sm:text-4xl">
            Let&rsquo;s Build Something That Moves Your Business Forward.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Share a few details about your business and what you need — we&rsquo;ll
            get back to you with next steps.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <InfoRow icon={Mail} label="Email" value={siteConfig.email} href={mailHref()} />
            <InfoRow icon={Phone} label="Phone" value={siteConfig.phoneDisplay} href={telHref()} />
            <InfoRow
              icon={WhatsAppIcon}
              label="WhatsApp"
              value="Chat with us directly"
              href={whatsappHref()}
              external
            />
            <InfoRow icon={Clock} label="Business Hours" value={siteConfig.businessHours} />
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value, href, external }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-300">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-soft">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block rounded-xl transition-colors hover:bg-white/60"
    >
      {content}
    </a>
  );
}
