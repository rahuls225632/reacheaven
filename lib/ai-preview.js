// Instant website-concept generator. Runs entirely in the browser (no API, no key):
// it combines industry-specific copy + style palettes, varied by a seeded shuffle,
// to give visitors a fast, tangible preview of what their site could look like.

// Website types offered in the preview. "Starting from" figures are reference prices only.
export const siteTypes = {
  static: {
    label: "Static",
    from: "₹7,000",
    blurb: "Fast, fixed-content pages that present your business and bring in enquiries.",
    features: ["Up to ~5 pages", "Responsive design", "Contact form + WhatsApp button", "SEO foundation", "Content updates handled by our team"],
  },
  dynamic: {
    label: "Dynamic",
    from: "₹30,000",
    blurb: "A data-driven site with an admin panel, so you can manage content yourself.",
    features: ["Admin panel to manage content", "Database-backed features (listings, bookings, orders, logins)", "Forms, integrations & notifications", "Scalable, multi-page structure", "SEO foundation"],
  },
};

export const vibes = ["Luxury", "Modern", "Bold", "Minimal", "Warm"];

const PALETTES = {
  Luxury: [
    { bg: "#0b0f1a", surface: "#151b2e", accent: "#c9a227", text: "#f5f1e6" },
    { bg: "#180e13", surface: "#26161d", accent: "#d8b94a", text: "#f7efe9" },
  ],
  Modern: [
    { bg: "#f7f9fc", surface: "#ffffff", accent: "#2c4bb0", text: "#0b1220" },
    { bg: "#f2fbfa", surface: "#ffffff", accent: "#0f8b8d", text: "#0b1a1a" },
  ],
  Bold: [
    { bg: "#111111", surface: "#1e1e1e", accent: "#ff5a36", text: "#ffffff" },
    { bg: "#0d0630", surface: "#1a0f4d", accent: "#ffb400", text: "#ffffff" },
  ],
  Minimal: [
    { bg: "#ffffff", surface: "#f4f4f2", accent: "#111111", text: "#111111" },
    { bg: "#fafaf6", surface: "#eeeee6", accent: "#3d5a45", text: "#1a1a1a" },
  ],
  Warm: [
    { bg: "#fff8f0", surface: "#ffffff", accent: "#c2571a", text: "#2b1a10" },
    { bg: "#fdf3ee", surface: "#ffffff", accent: "#b5384a", text: "#2a1218" },
  ],
};

const FONTS = {
  Luxury: 'Georgia, "Times New Roman", serif',
  Warm: 'Georgia, "Times New Roman", serif',
  Modern: "var(--font-manrope), system-ui, sans-serif",
  Bold: "var(--font-manrope), system-ui, sans-serif",
  Minimal: "var(--font-inter), system-ui, sans-serif",
};

const CONTENT = {
  "Hotel / Hospitality": {
    mode: "dynamic",
    why: "Guests expect live room details and booking requests, which need an admin panel and database.",
    taglines: ["Where every stay feels like home", "{name} — stay, unwind, return", "Your escape begins at {name}"],
    sub: "Comfortable rooms, warm hospitality and easy online booking enquiries.",
    cta: "Check availability",
    sections: ["Rooms & Suites", "Gallery", "Amenities", "Offers", "Location & Map", "Guest Reviews"],
  },
  Restaurant: {
    mode: "static",
    why: "A menu, gallery and reservation-by-call/WhatsApp work well as fast, fixed pages.",
    taglines: ["Fresh flavours, served with love", "{name} — taste the difference", "Good food. Great moments."],
    sub: "Show your menu, ambience and reviews — and let guests reserve in one tap.",
    cta: "View menu",
    sections: ["Menu", "Specials", "Gallery", "Reserve a Table", "Reviews", "Location & Hours"],
  },
  "Real Estate": {
    mode: "dynamic",
    why: "Property listings change often — an admin panel lets you add and update them yourself.",
    taglines: ["Find a place you'll love to call home", "{name} — property made simple", "Trusted homes. Clear deals."],
    sub: "Featured listings, project details and instant enquiry to your sales team.",
    cta: "Browse properties",
    sections: ["Featured Listings", "Project Details", "Floor Plans", "Amenities", "Site Location", "Enquiry"],
  },
  Construction: {
    mode: "static",
    why: "Projects, capabilities and a quote form are well served by a clean, fixed site.",
    taglines: ["Built to last. Delivered on time.", "{name} — strong foundations, clear results", "Engineering trust into every project"],
    sub: "Showcase completed projects, capabilities and certifications to win bigger contracts.",
    cta: "Request a quote",
    sections: ["Services", "Projects", "Capabilities", "Certifications", "Clients", "Contact"],
  },
  Manufacturing: {
    mode: "static",
    why: "A product catalogue and enquiry form can be presented cleanly as fixed pages.",
    taglines: ["Precision products, dependable supply", "{name} — quality you can count on", "Made with care. Shipped with confidence."],
    sub: "A product catalogue, quality standards and bulk-enquiry form for B2B buyers.",
    cta: "Get a bulk quote",
    sections: ["Product Catalogue", "Quality & Certifications", "Manufacturing", "Industries Served", "Downloads", "Enquiry"],
  },
  Education: {
    mode: "dynamic",
    why: "Admissions, results and notices need regular updates and forms tied to a database.",
    taglines: ["Learning that opens doors", "{name} — where curiosity grows", "Shaping confident learners"],
    sub: "Courses, faculty, results and admissions enquiry — all in one clear place.",
    cta: "Apply now",
    sections: ["Courses", "Faculty", "Results", "Admissions", "Gallery", "Contact"],
  },
  Healthcare: {
    mode: "dynamic",
    why: "Appointment requests and doctor schedules are best managed through an admin panel.",
    taglines: ["Caring for you, every step of the way", "{name} — trusted care, close to home", "Your health. Our priority."],
    sub: "Doctors, services and easy appointment requests that build patient trust.",
    cta: "Book appointment",
    sections: ["Services", "Our Doctors", "Book Appointment", "Facilities", "Patient Reviews", "Location"],
  },
  "Finance & Insurance": {
    mode: "dynamic",
    why: "Finance sites need secure customer logins, online applications and account dashboards — that requires a database and backend. Final scope is quoted individually.",
    taglines: ["Money matters, made clear", "{name} — secure, simple, trusted", "Your financial partner, always within reach"],
    sub: "Build trust with clear products, calculators and a secure way to apply or get support.",
    cta: "Apply online",
    sections: ["Products & Services", "Apply Online", "Calculators", "Security & Trust", "Branch Locator", "Support"],
  },
  "E-commerce / Retail": {
    mode: "dynamic",
    why: "A store needs products, cart, orders and payments — that is a dynamic build.",
    taglines: ["Shop what you love, delivered fast", "{name} — your everyday favourites", "Quality picks. Easy checkout."],
    sub: "A fast, mobile-first store with product pages, cart and secure checkout.",
    cta: "Shop now",
    sections: ["Categories", "Best Sellers", "Product Pages", "Cart & Checkout", "Offers", "Reviews"],
  },
  "Professional Services": {
    mode: "static",
    why: "Services, team and testimonials with a consultation form is a great fit for a static site.",
    taglines: ["Expert guidance you can rely on", "{name} — clarity for complex decisions", "Advice that moves you forward"],
    sub: "Position your expertise, share case results and turn visitors into consultations.",
    cta: "Book a consultation",
    sections: ["Services", "About the Team", "Case Studies", "Testimonials", "Insights", "Contact"],
  },
  Startup: {
    mode: "static",
    why: "A sharp landing page with a waitlist is the fastest way to launch — upgrade to dynamic as you grow.",
    taglines: ["Big idea. Ready to launch.", "{name} — built for what's next", "Meet the future of {name}"],
    sub: "A sharp landing page that explains your product and captures early users.",
    cta: "Get early access",
    sections: ["Product", "Features", "How It Works", "Pricing", "Waitlist", "FAQ"],
  },
  Corporate: {
    mode: "static",
    why: "Company profile, leadership and contact details work well as a polished static site.",
    taglines: ["Trusted by teams. Built for scale.", "{name} — excellence, delivered", "Driving growth with integrity"],
    sub: "A credible corporate presence: capabilities, leadership, news and careers.",
    cta: "Talk to us",
    sections: ["About", "Solutions", "Leadership", "Clients", "News", "Careers"],
  },
  Other: {
    mode: "static",
    why: "A clean static site is the quickest, most affordable way to get online.",
    taglines: ["Your business, beautifully online", "{name} — made to be noticed", "Grow your reach with {name}"],
    sub: "A clean, fast website that presents your work and brings in enquiries.",
    cta: "Get in touch",
    sections: ["Home", "About", "Services", "Gallery", "Testimonials", "Contact"],
  },
};

const SWITCH_NOTE = {
  static:
    "Static gets you online fastest at the lowest cost. If you later need bookings, listings or an admin panel, it can be upgraded to dynamic.",
  dynamic:
    "Dynamic gives you an admin panel and database, so you can manage content yourself. A static site would also cover the basics if you only need a simple online presence.",
};

// Business-name hints. If the name clearly points to a data-driven business, "auto" mode
// recommends a dynamic site even when the chosen industry would normally be static.
const NAME_HINTS = [
  { re: /\b(bank|banking|financ|fintech|loan|credit|insur|invest|trading|broker|wallet|payment|nbfc|mutual|sacco|pat ?sanstha)/i, need: "secure logins, online applications and account dashboards" },
  { re: /\b(shop|store|mart|mall|cart|bazaar|bazar|boutique|fashion|marketplace|ecommerce)/i, need: "products, a cart and order management" },
  { re: /\b(booking|travel|tours?|rentals?|cab|taxi|resort|hotel|salon|spa|clinic|hospital|doctor|dental|diagnostic|pathology|pharmacy)/i, need: "online bookings, schedules and customer records" },
  { re: /\b(school|college|academy|institute|classes|coaching|university|tutorial|e-?learning)/i, need: "admissions, student data and regular notices" },
  { re: /\b(portal|platform|saas|software|crm|erp|dashboard|jobs|matrimony|membership|community|app)\b/i, need: "user accounts and dashboards" },
];

function detectNeed(name) {
  return NAME_HINTS.find((h) => h.re.test(name)) || null;
}

export const conceptTypes = Object.keys(CONTENT);

/* ------------------------------ helpers ------------------------------ */

function hash(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0) || 1;
}

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Readable text colour (dark/light) for a given background hex. */
export function readableOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? "#111111" : "#ffffff";
}

/* ------------------------------- API --------------------------------- */

/**
 * @param {{ name: string, type: string, vibe: string, variant?: number }} input
 */
export function generateConcept({ name, type, vibe, variant = 0, siteMode = "auto" }) {
  const picked = siteMode === "static" || siteMode === "dynamic";
  const cleanName = (name || "").trim().replace(/\s+/g, " ").slice(0, 40) || "Your Business";
  const c = CONTENT[type] || CONTENT.Other;
  const v = PALETTES[vibe] ? vibe : "Modern";
  const hint = detectNeed(cleanName);
  const auto = hint ? "dynamic" : c.mode; // what we would suggest without the visitor's own pick
  // If the industry itself is already dynamic, its own explanation is the better one to show.
  const autoWhy = hint && c.mode !== "dynamic"
    ? `Because "${cleanName}" suggests ${hint.need}, a dynamic site (database + admin backend) is the right fit.`
    : c.why;
  const why = !picked || siteMode === auto
    ? autoWhy
    : siteMode === "static" && hint
      ? `Static covers an informational presence only. Since your business looks like it needs ${hint.need}, we'd suggest dynamic.`
      : SWITCH_NOTE[siteMode];
  const rand = rng(hash(`${cleanName}|${type}|${v}`));

  const pool = PALETTES[v];
  // Each "new variation" steps to the next palette + headline so results always change.
  const palette = pool[(Math.floor(rand() * pool.length) + variant) % pool.length];
  const tagline = c.taglines[(Math.floor(rand() * c.taglines.length) + variant) % c.taglines.length].replaceAll("{name}", cleanName);
  const rs = rng(hash(`${cleanName}|${type}|${variant}`));
  const sections = [...c.sections].sort(() => rs() - 0.5);
  const shown = [...c.sections].slice(0, 3);

  return {
    name: cleanName,
    type,
    vibe: v,
    palette,
    font: FONTS[v],
    tagline,
    sub: c.sub,
    cta: c.cta,
    sections,
    cards: shown,
    // The visitor's own pick (Static / Dynamic) wins; "auto" falls back to the industry suggestion.
    recommended: picked ? siteMode : auto,
    picked,
    why,
  };
}

export function conceptBrief(k, mode = k.recommended) {
  const st = siteTypes[mode] || siteTypes.static;
  return (
    `Hi ReacHeaven, I tried the website concept preview.\n` +
    `Business: ${k.name} (${k.type})\n` +
    `Style: ${k.vibe} · colours bg ${k.palette.bg}, cards ${k.palette.surface}, accent ${k.palette.accent}, text ${k.palette.text}\n` +
    `Headline: "${k.tagline}"\n` +
    `Sections: ${k.sections.join(", ")}\n` +
    `Website type: ${st.label} (starting from ${st.from})${k.picked && mode === k.recommended ? " — my choice" : mode === k.recommended ? " — recommended for my business" : ""}\n` +
    `I'd like a proper design and a scoped quote.`
  );
}
