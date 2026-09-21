import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { footerColumns } from "@/data/nav";
import { services } from "@/data/services";
import { siteConfig, mailHref, telHref } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  const serviceLinks = services
    .filter((service) => service.slug)
    .map((service) => ({ label: service.title, href: `/services/${service.slug}` }));
  const columns = [
    footerColumns.find((column) => column.title === "Company"),
    { title: "Services", links: serviceLinks },
    footerColumns.find((column) => column.title === "Resources"),
  ];

  return (
    <footer className="border-t border-line-dark bg-navy-950 text-white/70">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Logo height={48} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href={mailHref()} className="flex items-center gap-2 hover:text-gold-300">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
            <a href={telHref()} className="flex items-center gap-2 hover:text-gold-300">
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {siteConfig.location}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-gold-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-gold-300">
              Terms & Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
