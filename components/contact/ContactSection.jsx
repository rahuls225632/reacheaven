import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig, mailHref, telHref } from "@/lib/config";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-mist py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something That Moves Your Business Forward."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="space-y-6">
              <InfoRow icon={Mail} label="Email" value={siteConfig.email} href={mailHref()} />
              <InfoRow icon={Phone} label="Phone" value={siteConfig.phoneDisplay} href={telHref()} />
              <InfoRow icon={MapPin} label="Location" value={siteConfig.location} />
              <InfoRow icon={Clock} label="Business Hours" value={siteConfig.businessHours} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
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

  return href ? (
    <a href={href} className="block rounded-xl transition-colors hover:bg-white/60">
      {content}
    </a>
  ) : (
    content
  );
}
