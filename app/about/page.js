import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import IconCard from "@/components/ui/IconCard";
import Button from "@/components/ui/Button";
import { whyChooseUs } from "@/data/why-choose-us";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "About Us",
  description:
    "A business-first software development team building websites, web applications and digital products with clear communication and post-launch support.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-20">
        <Container className="max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            About Us
          </span>
          <h1 className="mx-auto mt-5 text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
            Built Around Your Business
          </h1>
          <p className="mx-auto mt-5 text-base leading-relaxed text-white/70">
            {siteConfig.businessName} is a software development team focused
            on one thing: building digital products that help real businesses
            attract customers, build trust and run more efficiently.
          </p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-ink">How We Work</h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              We treat every project as a business decision, not just a design
              exercise. That means understanding your goals and audience
              before writing a single line of code, being transparent about
              scope and cost, and building on technology that will keep
              working long after launch.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Every website and application we deliver includes three months
              of free post-launch support, so you&rsquo;re never left figuring
              things out alone right after going live.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-mist p-8">
              <h3 className="font-display text-lg font-semibold text-ink">What Your Business Gets</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate">
                <li>A website or application scoped to your actual requirements</li>
                <li>Clear, honest communication from quote to delivery</li>
                <li>A technically sound, SEO-ready foundation</li>
                <li>3 months of free post-launch support</li>
                <li>A partner you can come back to as your business grows</li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-mist py-20">
        <Container>
          <SectionHeading eyebrow="Why Us" title="Why Businesses Choose Us" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <IconCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 text-center">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Let&rsquo;s Turn Your Idea Into Reality
          </h2>
          <div className="mt-6">
            <Button href="/contact" size="lg">
              Start Your Project
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
