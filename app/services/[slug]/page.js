import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { JsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { services, getServiceBySlug, getServiceSlugs } from "@/data/services";

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((item) => item.slug && item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-navy-950 py-20">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/services" className="hover:text-white">
              Services
            </Link>{" "}
            / <span className="text-white/80">{service.title}</span>
          </nav>

          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-royal-600 text-gold-300">
            <Icon name={service.icon} className="h-6 w-6" />
          </div>
          <h1 className="mt-5 max-w-2xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">{service.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="gold" icon={ArrowRight}>
              Start Your Project
            </Button>
            <Button href="/services" variant="outline-dark">
              View All Services
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">What&rsquo;s Included</h2>
            <ul className="mt-5 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-royal-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Ideal For</h2>
            <ul className="mt-5 space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-line bg-mist p-6">
              <p className="text-sm font-semibold text-ink">3 Months Free Post-Launch Support</p>
              <p className="mt-2 text-sm text-slate">
                Every project in this service includes 3 months of free
                support and maintenance after delivery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-mist py-20">
          <Container>
            <h2 className="font-display text-xl font-semibold text-ink">Related Services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-xl border border-line bg-white p-5 text-sm font-medium text-ink transition-colors hover:border-royal-500/40 hover:text-royal-600"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
