// Knowledge base for the ReacHeaven website assistant.
//
// Everything here is either (a) generated from the site's own data files
// (services, pricing, FAQs, process, tech stack ...) so the bot never drifts
// out of sync with the website, or (b) hand-written from facts that already
// appear on the site (terms & conditions, contact details, offer section).
//
// No backend and no API key are needed: the assistant runs fully in the browser.

import { siteConfig, instagramUrl } from "../config.js";
import { services } from "../../data/services.js";
import { faqs } from "../../data/faqs.js";
import { pricingTiers, pricingNote } from "../../data/pricing.js";
import { processSteps } from "../../data/process.js";
import { whyChooseUs } from "../../data/why-choose-us.js";
import { technologyGroups } from "../../data/technology.js";
import { showcaseItems } from "../../data/showcase.js";
import { businessTypes, budgetOptions } from "../../data/contact-options.js";

const WA = { label: "Chat on WhatsApp", href: "@whatsapp", external: true };
const CONTACT = { label: "Contact form", href: "/contact" };
const SERVICES_LINK = { label: "All services", href: "/services" };
const PRICING_LINK = { label: "See pricing", href: "/#pricing" };

const bullets = (items) => items.map((i) => `• ${i}`).join("\n");

const starter = pricingTiers[0];
const business = pricingTiers[1];
const custom = pricingTiers[2];

const supportIncluded = [
  "Bug fixes",
  "Minor UI corrections",
  "Basic content updates",
  "Performance monitoring",
  "Technical assistance",
  "Deployment support",
  "Small adjustments",
];

/* ------------------------------------------------------------------ */
/* Curated entries                                                     */
/* ------------------------------------------------------------------ */

const curated = [
  {
    id: "free-support",
    keywords: [
      "3 month",
      "three month",
      "3 months free",
      "free support",
      "free service",
      "free maintenance",
      "free post launch",
      "post launch support",
      "after launch",
      "support period",
      "warranty",
      "free support kya",
      "3 mahine",
      "teen mahine",
      "free service kya",
      "support included",
      "support scope",
      "support cover",
      "support include",
      "included in support",
      "in support",
      "not covered",
      "not included",
      "what is covered",
      "what is included in support",
      "quoted separately",
      "excluded",
      "support kya kya",
    ],
    weight: 3,
    answer:
      `**3 months FREE support — included with every project** 🎁\n\n` +
      `After your website or application goes live, we support it free for 3 months. It covers:\n` +
      `${bullets(supportIncluded)}\n\n` +
      `**Quoted separately:** major new features, redesigns, third-party integrations and substantial development work.\n\n` +
      `After the 3 months, support can continue under a separate paid maintenance arrangement.`,
    hi:
      `**Har project ke saath 3 mahine ki FREE support** 🎁\n\n` +
      `Website/application live hone ke baad 3 mahine tak hum free support dete hain. Isme shamil hai:\n` +
      `${bullets(supportIncluded)}\n\n` +
      `**Alag se quote hote hain:** bade naye features, redesign, third-party integrations aur badha development kaam.\n\n` +
      `3 mahine ke baad support paid maintenance arrangement me continue ho sakti hai.`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }, CONTACT],
    chips: ["What is not covered?", "Pricing", "How do I start?"],
  },
  {
    id: "pricing",
    keywords: [
      "price",
      "how much",
      "kitna paisa",
      "kitna kharcha",
      "kitna lagega",
      "kitna charge",
      "kitne ka",
      "kitne me",
      "kitne rupaye",
      "price list",
      "pricing plans",
      "starting price",
      "rate card",
      "website cost",
      "how much does",
      "kya rate",
    ],
    weight: 3,
    answer:
      `Here is our starting reference pricing:\n\n` +
      pricingTiers
        .map(
          (t) =>
            `**${t.name}** — ${t.startingFrom}\n${t.audience}. ${t.features.join(", ")}.`
        )
        .join("\n\n") +
      `\n\n${pricingNote}`,
    hi:
      `Ye hamari starting pricing reference hai:\n\n` +
      pricingTiers
        .map((t) => `**${t.name}** — ${t.startingFrom}\n${t.audience}. ${t.features.join(", ")}.`)
        .join("\n\n") +
      `\n\nFinal price scope par depend karta hai — pages, features, integrations aur timeline. Ye figures sirf starting reference hain, fixed quote nahi.`,
    links: [PRICING_LINK, WA, CONTACT],
    chips: ["Starter plan details", "Business plan details", "3 months free support"],
  },
  {
    id: "price-starter",
    keywords: ["starter", "starter plan", "7000", "7k", "small business website", "basic website", "simple website"],
    weight: 3,
    answer:
      `**Starter — ${starter.startingFrom}**\n${starter.description}\n\n${bullets(starter.features)}\n\n${pricingNote}`,
    links: [PRICING_LINK, WA],
    chips: ["Business plan details", "What does support include?"],
  },
  {
    id: "price-business",
    keywords: ["business plan", "business tier", "30000", "30k", "growing company", "12 pages", "twelve pages"],
    weight: 3,
    answer:
      `**Business — ${business.startingFrom}**\n${business.description}\n\n${bullets(business.features)}\n\n${pricingNote}`,
    links: [PRICING_LINK, WA],
    chips: ["Starter plan details", "Custom plan", "What integrations do you offer?"],
  },
  {
    id: "price-custom",
    keywords: ["custom plan", "custom quote", "custom tier", "custom pricing", "complex project", "big project", "enterprise"],
    weight: 3,
    answer:
      `**Custom — ${custom.startingFrom}**\n${custom.description}\n\n${bullets(custom.features)}\n\nShare your requirements and we will scope a clear quote for you.`,
    links: [CONTACT, WA],
    chips: ["How do I get a quote?", "Web application development"],
  },
  {
    id: "pages-count",
    keywords: ["how many page", "number of page", "page limit", "kitne page", "kitni pages", "how many pages", "pages included", "more pages", "extra pages"],
    weight: 4,
    answer:
      `Page count depends on the plan:\n\n` +
      `• **Starter** — up to 5 pages\n• **Business** — up to 12 pages\n• **Custom** — page and feature count scoped around your requirements\n\n` +
      `Need more pages than a plan includes? Tell us and we will quote it.`,
    hi:
      `Pages plan ke hisaab se milte hain:\n\n` +
      `• **Starter** — 5 pages tak\n• **Business** — 12 pages tak\n• **Custom** — pages aur features aapki requirement ke hisaab se\n\n` +
      `Zyada pages chahiye to bataiye, hum quote kar denge.`,
    links: [PRICING_LINK, CONTACT],
    chips: ["Pricing", "How do I start?"],
  },
  {
    id: "low-budget",
    keywords: [
      "low budget",
      "under 7000",
      "below 7000",
      "less than 7000",
      "cheapest",
      "cheap",
      "minimum budget",
      "tight budget",
      "kam budget",
      "kam paise",
      "sasta",
      "affordable",
      "discount",
      "negotiate",
    ],
    weight: 4,
    answer:
      `Our Starter reference begins at ${starter.startingFrom.replace("Starting from ", "")}. Final pricing depends on scope — pages, features, integrations and timeline — so it is worth telling us your budget and what you need.\n\nWe will be honest about what fits and what does not. The fastest way is a quick WhatsApp message.`,
    hi:
      `Hamara Starter reference ${starter.startingFrom.replace("Starting from ", "")} se shuru hota hai. Final price scope par depend karta hai, isliye apna budget aur requirement batayein — hum honestly bata denge kya fit hota hai.`,
    links: [WA, CONTACT],
    chips: ["Pricing", "Starter plan details"],
  },
  {
    id: "timeline",
    keywords: [
      "how long",
      "how many days",
      "how many weeks",
      "how soon",
      "how fast",
      "kitna time",
      "kitne din",
      "kitne hafte",
      "kab tak",
      "kitna samay",
      "delivery time",
      "turnaround",
      "deadline",
      "timeline",
      "time to build",
      "will it take",
      "time lagega",
      "jaldi",
      "urgent",
    ],
    weight: 3,
    answer:
      `A standard business website typically takes a few weeks from discovery to launch. Web applications and e-commerce stores take longer depending on complexity.\n\nWe give you a realistic timeline after understanding your requirements. Timelines can also shift if content, logos or feedback are delayed on the client side.`,
    hi:
      `Ek standard business website me aam taur par kuch hafte lagte hain (discovery se launch tak). Web applications aur e-commerce stores complexity ke hisaab se zyada time lete hain.\n\nRequirement samajhne ke baad hum realistic timeline dete hain. Content, logos ya feedback me delay ho to timeline badh sakti hai.`,
    links: [WA, CONTACT],
    chips: ["Your process", "How do I start?"],
  },
  {
    id: "process",
    keywords: [
      "process",
      "steps",
      "how do you work",
      "how it works",
      "workflow",
      "methodology",
      "kaise kaam",
      "kaam kaise",
      "development process",
      "stages",
      "phases",
      "roadmap",
    ],
    weight: 3,
    answer:
      `Our 6-step process:\n\n` +
      processSteps.map((s) => `**${s.number}. ${s.title}** — ${s.description}`).join("\n"),
    hi:
      `Hamara 6-step process:\n\n` +
      processSteps.map((s) => `**${s.number}. ${s.title}** — ${s.description}`).join("\n"),
    links: [{ label: "See process", href: "/#process" }, CONTACT],
    chips: ["How long does it take?", "Pricing", "3 months free support"],
  },
  {
    id: "website-types",
    keywords: [
      "static",
      "static website",
      "dynamic",
      "dynamic website",
      "types of website",
      "type of website",
      "kinds of website",
      "kitne type",
      "kitne prakar",
      "website types",
      "landing page",
      "portfolio website",
      "informational website",
      "cms",
      "what websites",
      "which websites",
      "websites do you build",
      "kaun si website",
      "kaun kaun si website",
    ],
    weight: 4,
    answer:
      `We build many kinds of websites, from simple to advanced:\n\n` +
      `• **Static / informational websites** — company, service and professional sites that present your business (typically fit the **Starter** or **Business** plans)\n` +
      `• **Content-managed websites** — CMS integration so you can update content easily\n` +
      `• **E-commerce stores** — catalog, cart, checkout and payments\n` +
      `• **Web applications** — dashboards, admin panels, SaaS platforms, customer portals\n` +
      `• **Industry sites** — hotels, restaurants, real estate, construction, healthcare, education and more\n\n` +
      `Which plan fits depends on scope, so share your requirement and we will recommend the right one.`,
    hi:
      `Hum sab tarah ki websites banate hain — simple se advanced tak:\n\n` +
      `• **Static / informational websites** — company, service aur professional sites (aam taur par **Starter** ya **Business** plan)\n` +
      `• **CMS wali websites** — content aasani se update kar sakein\n` +
      `• **E-commerce stores** — catalog, cart, checkout, payments\n` +
      `• **Web applications** — dashboards, admin panels, SaaS, customer portals\n` +
      `• **Industry sites** — hotel, restaurant, real estate, construction, healthcare, education aur bhi\n\n` +
      `Kaun sa plan fit hoga ye scope par depend karta hai — apni requirement bataiye.`,
    links: [SERVICES_LINK, PRICING_LINK, CONTACT],
    chips: ["Pricing", "E-commerce", "Web application development"],
  },
  {
    id: "industries",
    keywords: [
      "industry",
      "industries",
      "hotel",
      "restaurant",
      "real estate",
      "construction",
      "manufacturing",
      "education",
      "healthcare",
      "hospital",
      "clinic",
      "school",
      "startup",
      "which business",
      "business types",
      "for my business",
      "meri business",
    ],
    weight: 3,
    answer:
      `We build websites and applications for many kinds of businesses, including:\n\n${bullets(
        businessTypes.filter((b) => b !== "Other")
      )}\n\nDon't see yours? Tell us about it — we scope every project around how your business actually operates.`,
    hi:
      `Hum in businesses ke liye websites aur applications banate hain:\n\n${bullets(
        businessTypes.filter((b) => b !== "Other")
      )}\n\nAapka business list me nahi? Bataiye — hum har project aapke business ke hisaab se scope karte hain.`,
    links: [{ label: "What we can build", href: "/#solutions" }, CONTACT],
    chips: ["What can you build?", "Pricing", "How do I start?"],
  },
  {
    id: "showcase",
    keywords: [
      "what can you build",
      "what do you build",
      "what can we build",
      "kya bana sakte",
      "kya kya bana",
      "examples of what",
      "solutions",
      "concept",
      "types of project",
      "what kind of project",
    ],
    weight: 3,
    answer:
      `Some of the things we can build:\n\n${bullets(
        showcaseItems.map((s) => `**${s.title}** — ${s.description}`)
      )}\n\nThese are concept previews of what is possible, not delivered client work.`,
    hi:
      `Hum ye sab bana sakte hain:\n\n${bullets(
        showcaseItems.map((s) => `**${s.title}** — ${s.description}`)
      )}\n\nYe concept previews hain, delivered client work nahi.`,
    links: [{ label: "See solutions", href: "/#solutions" }, CONTACT],
    chips: ["Pricing", "Which industries?", "How do I start?"],
  },
  {
    id: "portfolio",
    keywords: [
      "portfolio",
      "previous work",
      "past work",
      "your work",
      "projects done",
      "how many project",
      "how many website",
      "how many client",
      "kitne project",
      "kitni website",
      "kitne client",
      "kitne websites",
      "clients",
      "case study",
      "case studies",
      "sample",
      "samples",
      "experience",
      "track record",
      "reference",
      "references",
      "testimonial",
      "reviews",
    ],
    weight: 4,
    answer:
      `We don't publish a project or client count on this site, and we would rather not quote numbers we can't back up.\n\nThe cards in the "What We Can Build" section are clearly labelled concept previews, not delivered client work. If you'd like examples, references or a walkthrough relevant to your industry, message the team directly and they will share what is appropriate.`,
    hi:
      `Is site par hum projects ya clients ki koi ginti publish nahi karte, aur jo number prove na kar sakein wo bolna bhi nahi chahte.\n\n"What We Can Build" wale cards concept previews hain, delivered client work nahi. Aapko examples ya references chahiye to team se seedha WhatsApp par baat kar lijiye.`,
    links: [WA, { label: "What we can build", href: "/#solutions" }],
    chips: ["What can you build?", "Your process", "Contact details"],
  },
  {
    id: "payments",
    keywords: [
      "payment",
      "payment terms",
      "advance",
      "milestone",
      "upi",
      "bank transfer",
      "invoice",
      "pay",
      "installment",
      "instalment",
      "emi",
      "balance payment",
      "payment kaise",
      "advance kitna",
      "paisa kaise",
      "how to pay",
    ],
    weight: 3,
    answer:
      `Payment terms (unless agreed otherwise in writing):\n\n` +
      `• An **advance** is required before work begins\n` +
      `• The **balance** is paid in milestones tied to project stages (for example design approval and final delivery), or on completion for smaller projects\n` +
      `• We accept **bank transfer, UPI** and other methods confirmed in your quote\n` +
      `• Final deliverables (source files, hosting access, domain handover) are released once all dues are cleared\n\nExact amounts are set in your quote.`,
    hi:
      `Payment terms (jab tak likhit me alag se tay na ho):\n\n` +
      `• Kaam shuru hone se pehle **advance** lagta hai\n` +
      `• **Balance** project ke stages (jaise design approval, final delivery) ke milestones me, ya chhote projects me completion par\n` +
      `• **Bank transfer, UPI** aur quote me confirm kiye gaye dusre methods accept karte hain\n` +
      `• Final deliverables (source files, hosting access, domain handover) sabhi dues clear hone par milte hain\n\nExact amount aapke quote me tay hota hai.`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }, CONTACT],
    chips: ["Refund & cancellation", "Who owns the website?", "Pricing"],
  },
  {
    id: "refund-cancel",
    keywords: ["refund", "cancel", "cancellation", "money back", "stop project", "wapas", "paisa wapas"],
    weight: 4,
    answer:
      `Either party can cancel an ongoing project with written notice. You are then billed for work completed and costs already incurred up to the cancellation date, and any advance already paid for that work is non-refundable.\n\nFull details are in our Terms & Conditions.`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }],
    chips: ["Payment terms", "Pricing"],
  },
  {
    id: "ownership",
    keywords: [
      "ownership",
      "who owns",
      "own the website",
      "own the code",
      "source code",
      "source file",
      "copyright",
      "intellectual property",
      "ip rights",
      "code milega",
      "malik",
    ],
    weight: 4,
    answer:
      `Once a project is paid for in full, ownership of the final deliverable — the website or application built for you — transfers to you.\n\nWe keep the right to reuse general-purpose code, components and tooling in other work (never your confidential business information). Unless agreed otherwise, we may reference the completed project in our own portfolio.`,
    hi:
      `Project ka poora payment hone par final deliverable (aapki website/application) ki ownership aapko transfer ho jaati hai.\n\nHum general-purpose code, components aur tooling dusre kaam me reuse kar sakte hain (aapki confidential business information kabhi nahi). Alag se tay na ho to completed project ko apne portfolio me reference kar sakte hain.`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }],
    chips: ["Payment terms", "Support after launch"],
  },
  {
    id: "revisions",
    keywords: ["revision", "revisions", "change request", "changes later", "modify", "modification", "edit after", "rounds of", "badlav", "change karwana"],
    weight: 4,
    answer:
      `The number of design and development revision rounds is set out in your quote. Additional rounds, or changes requested after a milestone has been approved, are treated as new work and billed at our standard rate.\n\nSmall adjustments after launch are covered during the 3 months of free support.`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }, CONTACT],
    chips: ["3 months free support", "Payment terms"],
  },
  {
    id: "tech-stack",
    keywords: [
      "tech stack",
      "technology",
      "technologies",
      "framework",
      "programming language",
      "react",
      "next js",
      "nextjs",
      "node",
      "nodejs",
      "express",
      "mongodb",
      "postgresql",
      "postgres",
      "sql",
      "typescript",
      "javascript",
      "tailwind",
      "docker",
      "graphql",
      "nginx",
      "tools you use",
      "database",
      "kaunsi technology",
    ],
    weight: 3,
    answer:
      `Our technology stack:\n\n${bullets(
        technologyGroups.map((g) => `**${g.title}:** ${g.items.map((i) => i.name).join(", ")}`)
      )}\n\nWe pick the right tools for your project rather than forcing one stack on everything.`,
    hi:
      `Hamara technology stack:\n\n${bullets(
        technologyGroups.map((g) => `**${g.title}:** ${g.items.map((i) => i.name).join(", ")}`)
      )}\n\nHum har project ke liye sahi tools chunte hain.`,
    links: [SERVICES_LINK, CONTACT],
    chips: ["Full-stack development", "Mobile apps", "AI integration"],
  },
  {
    id: "wordpress",
    keywords: ["wordpress", "wix", "shopify", "woocommerce", "webflow", "squarespace", "no code", "nocode", "drag and drop"],
    weight: 4,
    answer:
      `Our stack is centred on custom builds with React and Next.js, and our website service includes CMS integration so you can update content easily.\n\nWhether a specific platform such as WordPress or Shopify is right for your project isn't something this site lists, so please ask the team directly and they will advise honestly.`,
    links: [WA, CONTACT],
    chips: ["Tech stack", "Business website development"],
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "phone",
      "phone number",
      "mobile number",
      "call",
      "call you",
      "email",
      "mail",
      "whatsapp",
      "whatsapp number",
      "number",
      "reach you",
      "reach out",
      "talk to",
      "speak to",
      "human",
      "real person",
      "sales team",
      "baat karna",
      "sampark",
      "number do",
      "number chahiye",
    ],
    weight: 3,
    answer:
      `You can reach ReacHeaven here:\n\n` +
      `• **WhatsApp / Phone:** ${siteConfig.phoneDisplay}\n` +
      `• **Email:** ${siteConfig.email}\n` +
      `• **Hours:** ${siteConfig.businessHours}\n` +
      `• **Instagram:** @${siteConfig.social.instagram}\n\n` +
      `WhatsApp is usually the quickest way to get a reply.`,
    hi:
      `ReacHeaven se yahan contact kar sakte hain:\n\n` +
      `• **WhatsApp / Phone:** ${siteConfig.phoneDisplay}\n` +
      `• **Email:** ${siteConfig.email}\n` +
      `• **Timing:** ${siteConfig.businessHours}\n` +
      `• **Instagram:** @${siteConfig.social.instagram}\n\n` +
      `Sabse jaldi reply WhatsApp par milta hai.`,
    links: [WA, { label: "Call us", href: "@tel", external: true }, { label: "Email us", href: "@mail", external: true }, CONTACT],
    chips: ["Business hours", "How do I start?"],
  },
  {
    id: "hours",
    keywords: ["business hours", "working hours", "office hours", "timing", "timings", "open", "opening", "available", "availability", "kab khulta", "kitne baje", "sunday", "saturday", "weekend"],
    weight: 3,
    answer: `Our business hours are **${siteConfig.businessHours}**. You can message us on WhatsApp or email any time and we will reply during working hours.`,
    hi: `Hamare business hours: **${siteConfig.businessHours}**. WhatsApp ya email kabhi bhi bhej sakte hain, reply working hours me milega.`,
    links: [WA, CONTACT],
    chips: ["Contact details", "How do I start?"],
  },
  {
    id: "location",
    keywords: ["location", "address", "office", "where are you", "where is", "located", "city", "visit", "meet in person", "kahan", "pata"],
    weight: 3,
    answer:
      `This website doesn't list a physical office address. The team works with clients remotely and over calls or WhatsApp — reach us on ${siteConfig.phoneDisplay} or ${siteConfig.email} and we will arrange a call or meeting.`,
    links: [WA, CONTACT],
    chips: ["Contact details", "Business hours"],
  },
  {
    id: "social",
    keywords: ["instagram", "insta", "social media page", "linkedin", "twitter", "facebook", "follow you"],
    weight: 3,
    answer: `You can follow us on Instagram: **@${siteConfig.social.instagram}**.`,
    links: [{ label: "Open Instagram", href: instagramUrl(), external: true }, WA],
    chips: ["Contact details", "What can you build?"],
  },
  {
    id: "get-started",
    keywords: [
      "get started",
      "start project",
      "start a project",
      "how do i start",
      "how to start",
      "hire",
      "hire you",
      "work with you",
      "get a quote",
      "free quote",
      "quote",
      "consultation",
      "free consultation",
      "book a call",
      "schedule a call",
      "meeting",
      "i want a website",
      "i need a website",
      "want website",
      "need website",
      "website chahiye",
      "website banwani",
      "website banwana",
      "website banana",
      "website banani",
      "app chahiye",
      "project shuru",
      "shuru karna",
      "order",
      "proceed",
      "interested",
    ],
    weight: 4,
    answer:
      `Great — getting started is simple:\n\n` +
      `**1.** Message us on WhatsApp or fill in the contact form with your business type, what you need and your budget range\n` +
      `**2.** We understand your goals and give you a clear, scoped quote\n` +
      `**3.** You pay the advance and we begin — with 3 months of free post-launch support included\n\n` +
      `Budget ranges on the form: ${budgetOptions.join(" · ")}.`,
    hi:
      `Bahut badhiya — shuru karna aasaan hai:\n\n` +
      `**1.** WhatsApp par message karein ya contact form bharein (business type, requirement aur budget range)\n` +
      `**2.** Hum aapke goals samajhkar clear, scoped quote dete hain\n` +
      `**3.** Advance dene par kaam shuru — 3 mahine ki free post-launch support ke saath\n\n` +
      `Form me budget ranges: ${budgetOptions.join(" · ")}.`,
    links: [WA, CONTACT],
    chips: ["Pricing", "How long does it take?", "3 months free support"],
    lead: true,
  },
  {
    id: "why-us",
    keywords: [
      "why choose",
      "why you",
      "why reacheaven",
      "why should i",
      "advantages",
      "benefits",
      "different from",
      "better than",
      "usp",
      "what makes you",
      "kyu chune",
      "kyun chune",
      "kya khaas",
    ],
    weight: 3,
    answer: `Why businesses choose ReacHeaven:\n\n${bullets(
      whyChooseUs.map((w) => `**${w.title}** — ${w.description}`)
    )}`,
    hi: `Businesses ReacHeaven kyu chunte hain:\n\n${bullets(
      whyChooseUs.map((w) => `**${w.title}** — ${w.description}`)
    )}`,
    links: [{ label: "About us", href: "/about" }, CONTACT],
    chips: ["Pricing", "3 months free support"],
  },
  {
    id: "about",
    keywords: [
      "about reacheaven",
      "about you",
      "about us",
      "about company",
      "about your company",
      "who is reacheaven",
      "what is reacheaven",
      "who are you guys",
      "what do you do",
      "what does reacheaven",
      "your company",
      "tell me about",
      "company kya",
      "aap kya karte",
      "aap log kya",
      "reacheaven kya",
    ],
    weight: 4,
    answer:
      `**${siteConfig.businessName}** is a business-first software development team. ${siteConfig.description}\n\nEvery website and application we deliver includes **3 months of free post-launch support**.`,
    hi:
      `**${siteConfig.businessName}** ek business-first software development team hai. Hum aisi websites, web applications aur digital solutions banate hain jo businesses ko customers laane, trust banane aur online grow karne me madad karte hain.\n\nHar website/application ke saath **3 mahine ki free post-launch support** milti hai.`,
    links: [{ label: "About us", href: "/about" }, SERVICES_LINK],
    chips: ["Your services", "Pricing", "3 months free support"],
  },
  {
    id: "services-overview",
    keywords: [
      "services",
      "your services",
      "what services",
      "what do you offer",
      "what you offer",
      "offerings",
      "list of services",
      "all services",
      "kitni services",
      "kaun si services",
      "kya services",
      "services kya",
      "kya kya karte",
      "kya kya milta",
      "how many services",
      "service list",
    ],
    weight: 4,
    answer:
      `We offer **${services.length} services**:\n\n${bullets(
        services.map((s) => `**${s.title}** — ${s.shortDescription}`)
      )}\n\nAsk me about any of them for details.`,
    hi:
      `Hum **${services.length} services** dete hain:\n\n${bullets(
        services.map((s) => `**${s.title}** — ${s.shortDescription}`)
      )}\n\nKisi bhi service ke baare me poochiye.`,
    links: [SERVICES_LINK, CONTACT],
    chips: ["Pricing", "Website types", "3 months free support"],
  },
  {
    id: "privacy",
    keywords: ["privacy", "privacy policy", "personal data", "personal information", "my data", "data safe", "cookies", "gdpr", "data protection"],
    weight: 3,
    answer: `Our Privacy Policy explains what information we collect and how it is used. You can read it in full on the Privacy Policy page.`,
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
    chips: ["Terms & conditions", "Contact details"],
  },
  {
    id: "terms",
    keywords: ["terms", "terms and conditions", "terms conditions", "conditions", "legal", "liability", "governing law", "jurisdiction", "agreement", "contract"],
    weight: 3,
    answer:
      `Our Terms & Conditions cover free support, payments, client responsibilities, intellectual property, revisions, third-party services, liability, cancellation and governing law (India). I can summarise any of these — just ask, for example "payment terms" or "who owns the website?".`,
    links: [{ label: "Terms & Conditions", href: "/terms-and-conditions" }],
    chips: ["Payment terms", "Who owns the website?", "Refund & cancellation"],
  },
  {
    id: "security",
    keywords: ["secure", "security", "safe", "ssl", "https", "hacking", "hacked", "malware", "backup"],
    weight: 3,
    answer:
      `Security is part of how we build: our sites are designed to be secure, and our Website Maintenance & Support service includes security updates and performance monitoring.\n\nIf you have specific security or compliance requirements, mention them in your enquiry so they are scoped properly.`,
    links: [{ label: "Maintenance & Support", href: "/services/website-maintenance" }, CONTACT],
    chips: ["3 months free support", "Website maintenance"],
  },
  {
    id: "performance",
    keywords: ["speed", "fast website", "performance", "load time", "loading", "page speed", "core web vitals", "lighthouse", "slow website", "optimize"],
    weight: 3,
    answer:
      `Performance is a core focus: we build fast, responsive websites that give a consistent experience on every device, and we monitor performance after launch. If your current site is slow, our Website Redesign service targets performance, mobile responsiveness and SEO.`,
    links: [SERVICES_LINK, CONTACT],
    chips: ["Website redesign", "SEO"],
  },
  {
    id: "identity",
    keywords: [
      "who are you",
      "are you a bot",
      "are you ai",
      "are you human",
      "are you real",
      "are you chatgpt",
      "chatgpt",
      "your name",
      "tum kaun",
      "aap kaun",
      "tumhara naam",
      "apka naam",
      "aapka naam",
      "kya tum bot",
      "robot",
    ],
    weight: 5,
    answer:
      `I'm the **ReacHeaven website assistant** 🤖 — an automated helper that answers from the information on this website: services, pricing, process, support, terms and contact details.\n\nFor anything custom, a human on our team will help — just tap WhatsApp.`,
    hi:
      `Main **ReacHeaven ka website assistant** hoon 🤖 — ek automated helper jo website ki jaankari se jawab deta hai: services, pricing, process, support, terms aur contact.\n\nKisi custom baat ke liye hamari team ka insaan aapki madad karega — bas WhatsApp dabaiye.`,
    links: [WA],
    chips: ["Your services", "Pricing", "3 months free support"],
  },
];

/* ------------------------------------------------------------------ */
/* Generated entries: one per service                                  */
/* ------------------------------------------------------------------ */

const serviceKeywords = {
  "Business Website Development": [
    "business website",
    "company website",
    "corporate website",
    "professional website",
    "website development",
    "website design",
    "web development",
    "website banwana",
    "website banana",
  ],
  "E-commerce Development": [
    "ecommerce",
    "e commerce",
    "online store",
    "online shop",
    "web store",
    "shopping cart",
    "checkout",
    "sell online",
    "product catalog",
    "order management",
  ],
  "Web Application Development": [
    "web app",
    "web application",
    "webapp",
    "dashboard",
    "admin panel",
    "saas",
    "customer portal",
    "portal",
    "internal tool",
    "internal system",
  ],
  "Full-Stack Development": [
    "full stack",
    "fullstack",
    "software development",
    "custom software",
    "backend and frontend",
    "api development",
    "authentication",
  ],
  "UI/UX Design": ["ui ux", "ui", "ux", "user interface", "user experience", "wireframe", "prototype", "design system", "figma"],
  "Website Redesign": ["redesign", "re design", "revamp", "old website", "outdated website", "modernize", "modernise", "new look", "website purani"],
  "Website Maintenance & Support": [
    "maintenance",
    "website maintenance",
    "bug fix",
    "bug fixing",
    "security updates",
    "content updates",
    "monitoring",
    "ongoing support",
    "after 3 months",
    "renewal",
    "maintenance plan",
  ],
  "API & Third-Party Integrations": [
    "integration",
    "integrations",
    "integrate",
    "third party",
    "api integration",
    "payment gateway",
    "razorpay",
    "stripe",
    "crm",
    "google maps",
    "whatsapp integration",
    "whatsapp api",
    "email service",
  ],
  "AI Integration": [
    "ai",
    "ai integration",
    "ai chatbot",
    "chatbot",
    "chat bot",
    "artificial intelligence",
    "llm",
    "gpt",
    "ai automation",
    "ai assistant",
    "automation",
    "ai search",
  ],
  "Mobile App Development": [
    "mobile app",
    "app development",
    "android",
    "ios",
    "iphone",
    "play store",
    "app store",
    "cross platform",
    "android app",
    "ios app",
    "app banwana",
    "app banani",
  ],
  "Backend Development & DevOps": [
    "devops",
    "dev ops",
    "cloud",
    "aws",
    "vercel",
    "ci cd",
    "cicd",
    "deployment",
    "server",
    "cloud hosting",
    "infrastructure",
    "backend development",
    "scaling",
  ],
  "Digital Marketing Services": [
    "digital marketing",
    "marketing",
    "google ads",
    "social media ads",
    "social media marketing",
    "ads",
    "advertising",
    "email marketing",
    "content marketing",
    "google business profile",
    "analytics",
    "seo services",
    "search engine optimization",
    "traffic",
    "leads",
  ],
};

const serviceEntries = services.map((s) => ({
  id: `service-${s.slug || s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`,
  keywords: [s.title.toLowerCase(), ...(serviceKeywords[s.title] || [])],
  weight: 3,
  text: `${s.shortDescription} ${s.features.join(" ")} ${s.idealFor.join(" ")}`,
  answer:
    `**${s.title}**\n${s.tagline}\n\n${s.shortDescription}\n\n**Includes:**\n${bullets(s.features)}\n\n**Ideal for:** ${s.idealFor.join("; ")}.\n\nEvery project includes 3 months of free post-launch support.`,
  hi:
    `**${s.title}**\n${s.tagline}\n\n${s.shortDescription}\n\n**Isme shamil:**\n${bullets(s.features)}\n\n**Kiske liye:** ${s.idealFor.join("; ")}.\n\nHar project me 3 mahine ki free post-launch support included hai.`,
  links: [
    s.slug ? { label: `About ${s.title}`, href: `/services/${s.slug}` } : SERVICES_LINK,
    WA,
  ],
  chips: ["Pricing", "How long does it take?", "3 months free support"],
}));

/* ------------------------------------------------------------------ */
/* Generated entries: one per FAQ                                      */
/* ------------------------------------------------------------------ */

// FAQs already covered by richer curated entries above.
const skipFaq = [
  "how much does a business website cost",
  "how long does website development take",
  "what does the 3-month free support include",
  "do you provide website maintenance",
];

const faqExtraLinks = {
  "do you provide seo": [{ label: "Digital Marketing", href: "/services/digital-marketing" }],
  "do you provide ai integration": [{ label: "AI Integration", href: "/services/ai-development" }],
  "do you build e-commerce websites": [{ label: "E-commerce", href: "/services/ecommerce-development" }],
  "can you integrate whatsapp": [],
};

const faqEntries = faqs
  .filter((f) => !skipFaq.some((q) => f.question.toLowerCase().startsWith(q)))
  .map((f, i) => {
    const key = f.question.toLowerCase().replace(/\?$/, "");
    return {
      id: `faq-${i}`,
      keywords: [key],
      weight: 2,
      titleText: f.question,
      text: f.answer,
      answer: f.answer,
      links: [...(faqExtraLinks[key] || []), WA],
      chips: ["Pricing", "3 months free support", "How do I start?"],
    };
  });

/* ------------------------------------------------------------------ */

export const knowledgeBase = [...curated, ...serviceEntries, ...faqEntries];

/** Suggested starter questions shown when the chat opens. */
export const starterChips = [
  "Pricing",
  "Get a quick estimate",
  "3 months free support",
  "Your services",
  "How do I start?",
  "Contact details",
];

export const welcomeText = {
  en:
    `Hi! 👋 I'm the **ReacHeaven assistant**. Ask me anything about our services, pricing, process, timelines or the **3 months of free post-launch support** that comes with every project.`,
  hi:
    `Namaste! 👋 Main **ReacHeaven assistant** hoon. Hamari services, pricing, process, timeline ya har project ke saath milne wali **3 mahine ki free post-launch support** ke baare me kuch bhi poochiye.`,
};

export const smallTalk = {
  thanks: {
    en: "You're welcome! 😊 Anything else I can help you with?",
    hi: "Aapka swagat hai! 😊 Aur kuch madad chahiye?",
  },
  bye: {
    en: "Thanks for stopping by! Whenever you're ready, message us on WhatsApp and we'll help you get started. 👋",
    hi: "Visit karne ke liye dhanyawad! Jab bhi ready ho, WhatsApp par message kijiye. 👋",
  },
  ok: {
    en: "Sure! Let me know if you'd like to hear about pricing, services or the 3-month free support.",
    hi: "Theek hai! Pricing, services ya 3 mahine ki free support ke baare me jaanna ho to bataiye.",
  },
  fallback: {
    en:
      "I'm not sure I have a good answer for that one. I can help with our **services, pricing, timelines, process, the 3-month free support, payments and contact details**.\n\nFor anything specific, the team can answer directly on WhatsApp.",
    hi:
      "Is sawal ka mere paas sahi jawab nahi hai. Main **services, pricing, timeline, process, 3 mahine ki free support, payments aur contact** me madad kar sakta hoon.\n\nKisi specific baat ke liye team WhatsApp par seedha jawab degi.",
  },
  offTopic: {
    en:
      "I can only help with questions about ReacHeaven — our services, pricing, process, support and contact details. What would you like to know?",
    hi:
      "Main sirf ReacHeaven se jude sawalon me madad kar sakta hoon — services, pricing, process, support aur contact. Aap kya jaanna chahenge?",
  },
};
