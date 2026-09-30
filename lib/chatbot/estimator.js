// Guided "quick estimate" flow. Fully client-side: it maps a visitor's answers
// onto the pricing tiers in /data/pricing.js and prepares a WhatsApp brief.
// It only ever quotes the "starting from" figures already published on the site.

import { pricingTiers, pricingNote } from "../../data/pricing.js";
import { whatsappHref } from "../config.js";

export const ESTIMATE_CHIP = "Get a quick estimate";

export const estimatorSteps = [
  {
    id: "type",
    q: { en: "What would you like to build?", hi: "Aap kya banwana chahte hain?" },
    options: ["Business website", "E-commerce store", "Web app / portal", "Redesign my site"],
  },
  {
    id: "size",
    q: { en: "Roughly how many pages?", hi: "Lagbhag kitne pages chahiye?" },
    options: ["1–5 pages", "6–12 pages", "12+ / not sure"],
  },
  {
    id: "feature",
    q: { en: "Anything special you need?", hi: "Koi khaas feature chahiye?" },
    options: ["Just info + contact form", "WhatsApp / CRM / maps", "Login or dashboard", "Online payments"],
  },
  {
    id: "time",
    q: { en: "How soon do you need it?", hi: "Kitni jaldi chahiye?" },
    options: ["Within 2 weeks", "Around 1 month", "Flexible"],
  },
];

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Match free text / chip text to one of the step's options. */
export function matchOption(step, text) {
  const t = norm(text);
  if (!t) return null;
  return step.options.find((o) => norm(o) === t) || null;
}

export function pickTier(a) {
  const heavyType = a.type === "E-commerce store" || a.type === "Web app / portal";
  const heavyFeature = a.feature === "Login or dashboard" || a.feature === "Online payments";
  let name = "Starter";
  if (heavyType || heavyFeature || a.size === "12+ / not sure") name = "Custom";
  else if (a.size === "6–12 pages" || a.feature === "WhatsApp / CRM / maps") name = "Business";
  return pricingTiers.find((t) => t.name === name) || pricingTiers[0];
}

export function briefLines(a) {
  return [
    ["Project", a.type],
    ["Size", a.size],
    ["Special needs", a.feature],
    ["Timeline", a.time],
  ].filter(([, v]) => v);
}

/** Final recommendation message. */
export function recommend(a, lang = "en") {
  const tier = pickTier(a);
  const lines = briefLines(a);
  const brief = lines.map(([k, v]) => `• ${k}: ${v}`).join("\n");
  const waText =
    `Hi ReacHeaven, I used the website estimator.\n` +
    lines.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\nRecommended plan: ${tier.name} (${tier.startingFrom}).\nCould you share a scoped quote?`;

  const text =
    lang === "hi"
      ? `Aapke jawab ke hisaab se **${tier.name}** plan sabse sahi lagta hai.\n\n**${tier.startingFrom}** · ${tier.audience}\n${tier.description}\n\n**Aapki requirement**\n${brief}\n\n${pricingNote}`
      : `Based on your answers, the **${tier.name}** plan looks like the best fit.\n\n**${tier.startingFrom}** · ${tier.audience}\n${tier.description}\n\n**Your brief**\n${brief}\n\n${pricingNote}`;

  return {
    text,
    links: [
      { label: "Send this brief on WhatsApp", href: whatsappHref(waText), external: true },
      { label: "Contact form", href: "/contact", external: false },
    ],
    chips: ["Payment terms", "3 months free support", "Start over"],
    topic: "estimate-result",
    lang,
    brief: waText,
  };
}
