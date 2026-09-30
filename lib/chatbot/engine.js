// Frontend-only retrieval engine for the ReacHeaven assistant.
// Input: a user message. Output: { text, links, chips, lang, topic }.
// No network calls, no API keys.

import { knowledgeBase, smallTalk, starterChips } from "./knowledge.js";
import { whatsappHref, telHref, mailHref } from "../config.js";
import { ESTIMATE_CHIP } from "./estimator.js";
import { getChatter, fallbackVariants, offTopicVariants, pick } from "./chatter.js";

/* ---------------------------- normalisation ---------------------------- */

const STOP = new Set([
  "a", "an", "the", "is", "are", "am", "was", "were", "be", "been", "do", "does", "did",
  "you", "your", "yours", "u", "ur", "i", "me", "my", "we", "our", "us", "it", "its", "this",
  "that", "these", "those", "of", "to", "in", "on", "at", "for", "with", "and", "or", "but",
  "can", "could", "would", "should", "will", "shall", "may", "please", "pls", "plz", "tell",
  "about", "any", "some", "so", "if", "then", "there", "have", "has", "had", "get", "got",
  "want", "need", "like", "also", "just", "what", "which", "who", "how", "when", "where",
  "why", "provide", "offer", "give", "make", "much", "many", "as", "by", "from", "into",
  // Hinglish fillers
  "kya", "hai", "hain", "ho", "hoga", "hogi", "ka", "ki", "ke", "ko", "me", "mein", "se",
  "aur", "bhi", "ye", "yeh", "wo", "woh", "to", "toh", "na", "nahi", "mujhe", "mera",
  "meri", "mere", "aap", "aapka", "apka", "aapki", "apki", "tum", "hum", "humara",
  "batao", "bataiye", "bataye", "bolo", "kijiye", "karo", "kare", "karna", "karni",
  "chahiye", "chahie", "sakte", "sakta", "sakti", "milega", "milta", "milti", "kaise",
  "kaun", "kon", "kyu", "kyun", "ji", "sir", "bhai", "ek", "koi", "kuch", "liye",
]);

// Canonicalise a handful of words so English + Hinglish phrasing lands together.
const SYNONYMS = {
  pricing: "price", prices: "price", cost: "price", costs: "price", charges: "price",
  charge: "price", fees: "price", fee: "price", rate: "price", rates: "price",
  rupee: "price", rupees: "price", rupaye: "price", rs: "price", inr: "price",
  kharcha: "price", kharch: "price", kimat: "price", daam: "price", expensive: "price",
  websites: "website", site: "website", sites: "website", webpage: "page", webpages: "page",
  apps: "app", application: "application", applications: "application",
  mahine: "month", mahina: "month", months: "month", teen: "3", three: "3",
  "e-commerce": "ecommerce", "e commerce": "ecommerce",
  hey: "hello", hii: "hello", hiii: "hello", helo: "hello", hi: "hello", hy: "hello",
  namaste: "hello", namaskar: "hello", hola: "hello",
};

const HINGLISH = /\b(kya|kitna|kitne|kitni|hai|hain|chahiye|batao|bataiye|mujhe|kaise|aap|apka|aapka|karna|karni|banwana|banwani|banana|banani|banao|nahi|haan|hum|mera|meri|lagega|milega|milta|kaam|dikhao|kab|kaun|kyu|kyun|namaste|dhanyawad|shukriya|paisa|kharcha|mahine|jaldi|sasta|wapas|shuru|malik|tum|tumhara|khana|khaya|khayi|raha|rahe|rahi|yaar|yar|bhaiya|karte|kahan|kaha|umar|saal|shaadi|kisne|banaya|chutkula|mazak|bakwas|bore|accha|acha|theek|thik|sunao|bolo|karo|pagal|bewakoof|madad|sahayata|hasao|zabardast)\b/i;

export function detectLang(text) {
  return HINGLISH.test(text) ? "hi" : "en";
}

function stem(w) {
  if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 3 && w.endsWith("s") && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
  return w;
}

function rawTokens(text) {
  return String(text)
    .toLowerCase()
    .replace(/(?<=\d),(?=\d)/g, "") // 10,000 -> 10000
    .replace(/e-commerce/g, "ecommerce")
    .replace(/ci\/cd/g, "ci cd")
    .replace(/ui\/ux/g, "ui ux")
    .replace(/next\.js/g, "next js")
    .replace(/node\.js/g, "nodejs")
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function canon(tokens) {
  return tokens.map((t) => SYNONYMS[t] || stem(t));
}

/** Normalised token list, stopwords kept (used for phrase matching). */
function normalize(text) {
  return canon(rawTokens(text));
}

/** Significant tokens only (used for overlap scoring). */
function significant(text) {
  return normalize(text).filter((t) => !STOP.has(t) && t.length > 1);
}

/* ------------------------------- index -------------------------------- */

const index = knowledgeBase.map((entry) => {
  const phrases = (entry.keywords || []).map((k) => {
    const toks = normalize(k);
    return { padded: ` ${toks.join(" ")} `, words: toks.length };
  });
  const titleTokens = new Set(entry.titleText ? significant(entry.titleText) : []);
  const bodyTokens = new Set(entry.text ? significant(entry.text) : []);
  return { entry, phrases, titleTokens, bodyTokens };
});

// Document frequency across the generated (overlap-scored) docs → idf.
const df = new Map();
for (const d of index) {
  const all = new Set([...d.titleTokens, ...d.bodyTokens]);
  for (const t of all) df.set(t, (df.get(t) || 0) + 1);
}
const N = index.length;
const idf = (t) => Math.log(1 + N / (df.get(t) || 1));


/* ------------------------- typo tolerance (fuzzy) ---------------------- */

const vocab = new Set();
for (const d of index) {
  for (const p of d.phrases) p.padded.trim().split(" ").forEach((w) => w.length >= 4 && vocab.add(w));
  d.titleTokens.forEach((w) => w.length >= 4 && vocab.add(w));
}

// Optimal-string-alignment distance (insert / delete / substitute / swap = 1), early exit past `max`.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2 = new Array(b.length + 1).fill(0);
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    for (let j = 0; j <= b.length; j++) prev2[j] = prev[j];
    prev = cur;
  }
  return prev[b.length];
}

/** Snap misspelled words ("pirce", "websit", "suport") to the closest known term. */
function correct(tokens) {
  return tokens.map((t) => {
    if (t.length < 4 || STOP.has(t) || vocab.has(t) || /\d/.test(t) || /[^\x00-\x7f]/.test(t)) return t;
    const max = t.length >= 6 ? 2 : 1;
    let best = null;
    let bd = max + 1;
    for (const v of vocab) {
      const d = editDistance(t, v, max);
      if (d < bd) {
        bd = d;
        best = v;
      }
    }
    return best && bd <= max ? best : t;
  });
}

/* ---------------------------- intent detectors ------------------------- */

const COMPLAINT =
  /\b(scam|fraud|cheat|cheater|fake company|worst|useless|waste of|refund me|dhokha|dhoka|bekar|bakwas|complaint|angry|not happy|disappointed|pareshan)\b/i;
const ESTIMATE =
  /\b(estimate|estimator|calculator|budget planner|which plan|best plan|suggest (a )?plan|recommend (a )?plan|kaunsa plan|kaun sa plan)\b/i;

/* ------------------------------- scoring ------------------------------ */

function scoreEntry(d, padded, tokens) {
  let score = 0;

  for (const p of d.phrases) {
    if (p.words === 0) continue;
    if (padded.includes(p.padded)) {
      // Single word: 3. Each extra word adds 2. Longer phrases dominate.
      score += (3 + 2 * (p.words - 1)) * (d.entry.weight || 1) * 0.5;
    }
  }

  if (d.titleTokens.size || d.bodyTokens.size) {
    for (const t of tokens) {
      if (d.titleTokens.has(t)) score += idf(t) * 1.2;
      else if (d.bodyTokens.has(t)) score += idf(t) * 0.35;
    }
  }
  return score;
}

const THRESHOLD = 3.2;

/* ---------------------------- small-talk logic ------------------------- */

const GREET = new Set(["hello", "good", "morning", "afternoon", "evening", "night", "greeting", "there"]);
const THANKS = /\b(thanks?|thank you|thx|tysm|dhanyawad|shukriya|thanku|thank u)\b/i;
const BYE = /\b(bye|goodbye|see you|tata|good bye|alvida|cya)\b/i;
const OK = /^(ok|okay|k|kk|fine|cool|nice|great|got it|haan|ha|theek hai|thik hai|accha|acha|sure|alright)[.! ]*$/i;
const SOCIAL_ONLY = /^(how are you|how r u|kaise ho|kya haal|what'?s up|sup)[?.! ]*$/i;

// Words that signal the question is about something unrelated to the business.
const OFF_TOPIC =
  /\b(weather|cricket|ipl score|movie|song|lyrics|recipe|joke|poem|horoscope|stock price|bitcoin|crypto price|news|president|prime minister|capital of|translate|homework|essay|math problem|solve)\b/i;

function isGreeting(text, toks) {
  const sig = toks.filter((t) => !STOP.has(t) || t === "good");
  return sig.length > 0 && sig.length <= 4 && sig.every((t) => GREET.has(t));
}

/* ------------------------------- public API --------------------------- */

function resolveHref(href) {
  if (href === "@whatsapp") return whatsappHref();
  if (href === "@tel") return telHref();
  if (href === "@mail") return mailHref("Website enquiry");
  return href;
}

function finalize(entryLike, lang, extra = {}) {
  const text = (lang === "hi" && entryLike.hi) || entryLike.answer;
  const links = (entryLike.links || []).map((l) => ({
    ...l,
    href: resolveHref(l.href),
    external: l.external || /^https?:|^tel:|^mailto:/.test(resolveHref(l.href)),
  }));
  return { text, links, chips: entryLike.chips || [], lang, ...extra };
}

/**
 * @param {string} message  raw user text
 * @param {{ lastTopic?: string }} [ctx]
 */
export function getReply(message, ctx = {}) {
  const trimmed = (message || "").trim();
  const lang = detectLang(trimmed);
  const L = lang;

  if (!trimmed) {
    return { text: smallTalk.fallback[L], links: [], chips: starterChips, lang, topic: null };
  }

  const toks = correct(normalize(trimmed));
  const padded = ` ${toks.join(" ")} `;

  // --- small talk (only when there is no real question in the message) ---
  if (OK.test(trimmed)) {
    return { text: smallTalk.ok[L], links: [], chips: starterChips.slice(0, 4), lang, topic: null };
  }
  if (SOCIAL_ONLY.test(trimmed)) {
    return {
      text:
        L === "hi"
          ? "Main badhiya hoon, shukriya! 😊 Aap ReacHeaven ke baare me kya jaanna chahenge?"
          : "Doing great, thanks for asking! 😊 What would you like to know about ReacHeaven?",
      links: [],
      chips: starterChips.slice(0, 4),
      lang,
      topic: null,
    };
  }
  if (isGreeting(trimmed, toks)) {
    return {
      text:
        L === "hi"
          ? "Namaste! 👋 Main ReacHeaven ka assistant hoon. Pricing, services, ya 3 mahine ki free support — aap kya jaanna chahenge?"
          : "Hello! 👋 I'm the ReacHeaven assistant. Would you like to hear about pricing, our services, or the 3 months of free support?",
      links: [],
      chips: starterChips.slice(0, 4),
      lang,
      topic: null,
    };
  }

  // --- AI-style intents: guided estimator + frustrated-customer escalation ---
  if (ESTIMATE.test(trimmed) || trimmed.toLowerCase() === ESTIMATE_CHIP.toLowerCase()) {
    return { action: "estimator", text: "", links: [], chips: [], lang, topic: "estimate" };
  }
  if (COMPLAINT.test(trimmed)) {
    return {
      text:
        L === "hi"
          ? "Aapko jo pareshani hui uske liye mujhe afsos hai. 🙏 Is baat ko team seedha dekhegi — please WhatsApp ya call par apni detail bhejiye, hum jaldi se jaldi solve karenge."
          : "I'm sorry you've had a poor experience. 🙏 This is best handled by a person on the team directly — please share the details on WhatsApp or give us a call and we'll look into it right away.",
      links: [
        { label: "Chat on WhatsApp", href: whatsappHref(`Hi ReacHeaven, I need help with an issue: ${trimmed}`), external: true },
        { label: "Call us", href: telHref(), external: true },
      ],
      chips: [],
      lang,
      topic: "escalation",
    };
  }

  const sigTokens = toks.filter((t) => !STOP.has(t) && t.length > 1);

  // --- score everything ---
  const scored = index
    .map((d) => ({ d, score: scoreEntry(d, padded, sigTokens) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (best && best.score >= THRESHOLD) {
    const reply = finalize(best.d.entry, L, { topic: best.d.entry.id });

    // If a second, clearly different entry is close behind, offer it as a chip.
    const second = scored.find(
      (s) => s.d.entry.id !== best.d.entry.id && s.score >= THRESHOLD && s.score >= best.score * 0.6
    );
    if (second) {
      const label = shortLabel(second.d.entry);
      if (label && !reply.chips.includes(label)) reply.chips = [label, ...reply.chips].slice(0, 4);
    }
    return reply;
  }

  // --- thanks / bye as a last resort so "thanks, what's the price" still gets the price ---
  if (THANKS.test(trimmed)) {
    return { text: smallTalk.thanks[L], links: [], chips: starterChips.slice(0, 3), lang, topic: null };
  }
  if (BYE.test(trimmed)) {
    return {
      text: smallTalk.bye[L],
      links: [{ label: "Chat on WhatsApp", href: whatsappHref(), external: true }],
      chips: [],
      lang,
      topic: null,
    };
  }

  // --- follow-up on the previous topic ("tell me more", "details") ---
  if (ctx.lastTopic && /\b(more|details|detail|explain|elaborate|aur batao|aur bataiye|detail me|samjhao)\b/i.test(trimmed)) {
    const prev = index.find((d) => d.entry.id === ctx.lastTopic);
    if (prev) {
      return finalize(
        {
          ...prev.entry,
          answer: `${prev.entry.answer}\n\nFor specifics on your own project, the team can give you an exact, scoped answer on WhatsApp.`,
          hi: prev.entry.hi
            ? `${prev.entry.hi}\n\nApne project ki specifics ke liye team WhatsApp par exact, scoped jawab de sakti hai.`
            : undefined,
        },
        L,
        { topic: prev.entry.id }
      );
    }
  }

  // --- casual chit-chat ("khana khaya?", jokes, compliments...) ---
  const chatter = getChatter(trimmed, L);
  if (chatter) return { ...chatter, lang };

  // --- off topic vs genuine miss ---
  const offTopic = OFF_TOPIC.test(trimmed);
  const variants = offTopic ? offTopicVariants : fallbackVariants;
  const base = { en: pick(variants.en, trimmed), hi: pick(variants.hi, trimmed) };
  return {
    text: base[L],
    links: offTopic
      ? [{ label: "Try AI Website Preview", href: "/#ai-preview", external: false }]
      : [
          { label: "Chat on WhatsApp", href: whatsappHref(`Hi ReacHeaven, I have a question: ${trimmed}`), external: true },
          { label: "Contact form", href: "/contact", external: false },
        ],
    chips: offTopic ? [ESTIMATE_CHIP, ...starterChips.slice(0, 3)] : starterChips.slice(0, 4),
    lang,
    topic: null,
    fallback: !offTopic, // lets the UI hand a genuine miss to an optional LLM endpoint
  };
}

/** Human label for "you might also want…" chips. */
function shortLabel(entry) {
  const map = {
    "free-support": "3 months free support",
    pricing: "Pricing",
    "price-starter": "Starter plan details",
    "price-business": "Business plan details",
    "price-custom": "Custom plan",
    timeline: "How long does it take?",
    process: "Your process",
    payments: "Payment terms",
    "get-started": "How do I start?",
    contact: "Contact details",
    "services-overview": "Your services",
    "website-types": "Website types",
    industries: "Which industries?",
    "tech-stack": "Tech stack",
  };
  if (map[entry.id]) return map[entry.id];
  if (entry.id.startsWith("service-")) {
    const m = entry.answer.match(/^\*\*(.+?)\*\*/);
    return m ? m[1] : null;
  }
  return null;
}

export { starterChips };
