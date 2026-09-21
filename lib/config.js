// Centralized business configuration.
// Replace every placeholder value below with real details before launch —
// nothing here should be presented to visitors as fact until it is true.

export const siteConfig = {
  businessName: "ReacHeaven",
  shortName: "RH",
  tagline: "Digital Experiences Built for Business Growth.",
  description:
    "We design and develop high-performance websites, web applications and digital solutions that help businesses attract customers, build trust and grow online.",

  // Used for canonical URLs, sitemap.xml, robots.txt and JSON-LD.
  // Set NEXT_PUBLIC_SITE_URL in your environment for the real production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-agency.com",

  email: "hello@example-agency.com",
  phoneDisplay: "+91 00000 00000",
  phoneE164: "+910000000000",
  whatsappNumber: "910000000000", // digits only, country code first, no symbols
  whatsappDefaultMessage:
    "Hi, I am interested in getting a website/software solution for my business. I would like to discuss my requirements.",

  location: "Your City, India",
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",

  social: {
    linkedin: "",
    instagram: "",
    twitter: "",
  },
};

export function whatsappHref(message = siteConfig.whatsappDefaultMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function telHref() {
  return `tel:${siteConfig.phoneE164}`;
}

export function mailHref(subject = "") {
  return subject
    ? `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${siteConfig.email}`;
}
