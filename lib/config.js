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
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.reacheaven.com",

  email: "contact@reacheaven.com",
  phoneDisplay: "+91 90532 25632",
  phoneE164: "+919053225632",
  whatsappNumber: "919053225632", // digits only, country code first, no symbols
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",

  social: {
    linkedin: "",
    instagram: "reacheaven",
    twitter: "",
  },
};

export function instagramUrl() {
  return `https://instagram.com/${siteConfig.social.instagram}`;
}

/** Returns a time-of-day-aware greeting: "Good morning" / "Good afternoon" / "Good evening". */
function getTimeGreeting() {
  const hour = new Date().getHours();
  // 24-hour aware greetings:
  // 05:00 - 11:59 => Good morning
  // 12:00 - 16:59 => Good afternoon
  // 17:00 - 20:59 => Good evening
  // 21:00 - 04:59 => Good night
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

/** Builds a fresh, friendly WhatsApp opener each time it's called, greeting timed to the visitor's clock. */
export function whatsappDefaultMessage() {
  return `${getTimeGreeting()} ReacHeaven,✨ I just visited the ReacHeaven website and loved your work — I'd love to discuss a premium website/software solution for my business. Thanks so much, looking forward to connecting!`;
}

export function whatsappHref(message = whatsappDefaultMessage()) {
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
