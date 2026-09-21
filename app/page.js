import Hero from "@/components/hero/Hero";
import TrustStrip from "@/components/trust/TrustStrip";
import ServicesSection from "@/components/services/ServicesSection";
import OfferSection from "@/components/offer/OfferSection";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import WhatWeCanBuild from "@/components/showcase/WhatWeCanBuild";
import TechStack from "@/components/technology/TechStack";
import PricingSection from "@/components/pricing/PricingSection";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";
import FinalCTA from "@/components/cta/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <OfferSection />
      <WhyChooseUs />
      <ProcessTimeline />
      <WhatWeCanBuild />
      <TechStack />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
