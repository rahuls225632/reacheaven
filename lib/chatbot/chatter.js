// Friendly handling of casual / off-script messages ("khana khaya?", "tell me a joke",
// "are you single", "you're useless" ...). These only run when the message is NOT a real
// question about ReacHeaven, so they never hijack a business query.

import { starterChips } from "./knowledge.js";
import { whatsappHref } from "../config.js";

const AI_PREVIEW = { label: "Try AI Website Preview", href: "/#ai-preview", external: false };
const WA = (msg) => ({ label: "Chat on WhatsApp", href: whatsappHref(msg), external: true });

const CHATTER = [
  {
    id: "food",
    re: /\b(khana|khaana|khaya|khayi|khaye|lunch|dinner|breakfast|nashta|nasta|chai|coffee|hungry|bhookh|bhook|biryani|pizza)\b/i,
    en: [
      "Ha! I'm a bot, so I run on questions instead of food 😄 Hope you're eating well! Anything about websites or pricing I can help with?",
      "No meals for me — just a steady diet of questions 😄 What would you like to know about ReacHeaven?",
    ],
    hi: [
      "Haha, main to bot hoon — mujhe khana nahi lagta, bas aapke sawal chahiye! 😄 Aapne kha liya? Website ya pricing ke baare me kuch poochna ho to bataiye.",
      "Mera khana to aapke sawal hain 😄 Aap bataiye, kha liya? Ab ReacHeaven ke baare me kya jaanna hai?",
    ],
  },
  {
    id: "doing",
    re: /\b(kya kar (raha|rahe|rahi)|kya kr (raha|rahe|rahi)|what are you doing|what r u doing|wassup|whats up|what's up|kya chal raha|kya haal|kya haal chaal|how'?s it going|hows it going)\b/i,
    en: ["Just here waiting to help you! 😊 Want to hear about pricing, our services, or get a quick estimate?"],
    hi: ["Bas aapki madad ke liye taiyaar hoon! 😊 Pricing, services ya quick estimate — kya dekhna chahenge?"],
  },
  {
    id: "howareyou",
    re: /\b(kaise ho|kaisa hai|kaise hain|how are you|how r u|haal chaal|all good|sab theek)\b/i,
    en: ["Doing great, thanks for asking! 😊 How can I help you today?"],
    hi: ["Main badhiya hoon, shukriya! 😊 Aap bataiye, aaj kya madad karun?"],
  },
  {
    id: "compliment",
    re: /\b(i love you|love you|luv u|i like you|good bot|nice bot|smart bot|you are (great|awesome|smart|good|nice|the best|amazing)|you'?re (great|awesome|smart|good|nice|the best|amazing)|tum (bahut )?(acche|achhe|accha|mast|smart) ho|aap (bahut )?(acche|achhe|accha|mast|smart) hain?|zabardast|superb|well done|shabash)\b/i,
    en: ["That's very kind — thank you! 😊 If you like what you see, we can build something like this for your business too."],
    hi: ["Bahut shukriya! 😊 Agar pasand aaya, to aapke business ke liye bhi aisa hi kuch bana sakte hain."],
  },
  {
    id: "joke",
    re: /\b(joke|jokes|chutkula|chutkule|mazak|funny|make me laugh|hasao)\b/i,
    en: [
      "Why do developers prefer dark mode? Because light attracts bugs 🐛😄 Now — anything I can help you build?",
      "A web developer walks into a café and orders a 404 — nothing found 😄 What can I help you with?",
    ],
    hi: [
      "Developers dark mode kyu pasand karte hain? Kyunki light se bugs aate hain 🐛😄 Ab bataiye, kya banwana hai?",
      "Ek developer ne chai maangi — server ne bola 404, chai not found ☕😄 Aapko kis cheez me madad chahiye?",
    ],
  },
  {
    id: "bored",
    re: /\b(bored|boring|bore ho|bore hoon|bore ho raha|time pass|timepass)\b/i,
    en: ["Let's fix that! 🎉 Try our AI Website Preview — type your business name and see a live website concept in seconds."],
    hi: ["Chaliye ise theek karte hain! 🎉 AI Website Preview try kijiye — apne business ka naam daaliye aur seconds me website concept dekhiye."],
    links: [AI_PREVIEW],
  },
  {
    id: "creator",
    re: /\b(who (made|created|built|developed) you|kisne banaya|tumhe kisne|aapko kisne|tumko kisne|who is your (owner|creator|developer))\b/i,
    en: ["I was built by the ReacHeaven team to answer questions about our websites, pricing and support — and I run right here in your browser. 🤖"],
    hi: ["Mujhe ReacHeaven ki team ne banaya hai taaki website, pricing aur support ke sawalon ke jawab de sakoon — aur main seedha aapke browser me chalta hoon. 🤖"],
  },
  {
    id: "personal",
    re: /\b(how old|your age|kitne saal|umar|kahan rehte|kaha rehte|kahan se ho|kaha se ho|where do you live|where are you from|shaadi|marry me|girlfriend|boyfriend|single ho|are you single|relationship)\b/i,
    en: ["I'm a bot living on this website 😄 — no age, no address, and definitely single. What can I help you with?"],
    hi: ["Main to is website me rehne wala bot hoon 😄 — na umar, na ghar, na shaadi ka plan! Aap bataiye, kya madad karun?"],
  },
  {
    id: "abuse",
    re: /\b(stupid|idiot|dumb|shut up|pagal|bewakoof|gadha|nalayak|chup ho|chup kar|useless bot)\b/i,
    en: ["Sorry if I wasn't much help there. 🙏 Let me try again — or a real person on the team can help you directly on WhatsApp."],
    hi: ["Maaf kijiye agar main madad nahi kar paya. 🙏 Dobara koshish karta hoon — ya team ka koi insaan seedha WhatsApp par madad kar sakta hai."],
    links: [WA("Hi ReacHeaven, I need help from a person.")],
  },
  {
    id: "present",
    re: /\b(are you there|anyone there|koi hai|sun rahe ho|hello\?|hey\?)\b/i,
    en: ["Yes, I'm right here! 👋 What would you like to know?"],
    hi: ["Ji, main yahin hoon! 👋 Bataiye, kya jaanna hai?"],
  },
  {
    id: "test",
    re: /^(test|testing|check|checking|1 2 3|123)[.! ]*$/i,
    en: ["Loud and clear! ✅ Ask me anything about ReacHeaven."],
    hi: ["Bilkul theek chal raha hai! ✅ ReacHeaven ke baare me kuch bhi poochiye."],
  },
  {
    id: "yesno",
    re: /^(yes|yeah|yep|yup|no|nope|haan|han|ha|nahi|na)[.! ]*$/i,
    en: ["Got it! 👍 What would you like to know — pricing, services, or how to get started?"],
    hi: ["Theek hai! 👍 Aap kya jaanna chahenge — pricing, services ya kaise shuru karein?"],
  },
  {
    id: "language",
    re: /\b(hindi (me|mein)|speak hindi|english (me|mein)|speak english|marathi|which language|kaun si bhasha)\b/i,
    en: ["I understand English and Hinglish — write in whichever you like and I'll reply in the same style. 🙂"],
    hi: ["Main English aur Hinglish dono samajhta hoon — jis me likhna ho likhiye, main usi me jawab dunga. 🙂"],
  },
  {
    id: "help",
    re: /^(help|help me|madad|sahayata|madad chahiye|help chahiye)[.! ?]*$/i,
    en: ["Happy to help! 🙌 I can tell you about **services, pricing, timelines, our process, payments and free support** — or get you a quick estimate. Pick one below."],
    hi: ["Zaroor! 🙌 Main **services, pricing, timeline, process, payments aur free support** ke baare me bata sakta hoon — ya quick estimate de sakta hoon. Neeche se chuniye."],
  },
];

const seed = (text) => [...text].reduce((a, c) => a + c.charCodeAt(0), 0);
const pick = (arr, text) => arr[seed(text) % arr.length];

/** @returns {{ text: string, links: object[], chips: string[], topic: string } | null} */
export function getChatter(text, lang) {
  const hit = CHATTER.find((c) => c.re.test(text));
  if (!hit) return null;
  return {
    text: pick(lang === "hi" ? hit.hi : hit.en, text),
    links: hit.links || [],
    chips: hit.id === "help" ? starterChips.slice(0, 5) : starterChips.slice(0, 4),
    topic: `chatter-${hit.id}`,
  };
}

// Friendlier "I didn't get that" replies — varied so repeated misses don't feel robotic.
export const fallbackVariants = {
  en: [
    "Hmm, I didn't quite catch that. 🤔 I can help with **services, pricing, timelines, our process, the 3-month free support, payments and contact details** — pick one below or rephrase.",
    "I'm not sure about that one. 😅 I'm best with questions on **websites, pricing, process and support**. Try one of these, or ask the team directly on WhatsApp.",
  ],
  hi: [
    "Hmm, ye mujhe samajh nahi aaya. 🤔 Main **services, pricing, timeline, process, 3 mahine ki free support, payments aur contact** me madad kar sakta hoon — neeche se chuniye ya dobara likhiye.",
    "Is baare me mujhe pakka nahi pata. 😅 Main **website, pricing, process aur support** ke sawalon me sabse achha hoon. Neeche se chuniye, ya team se seedha WhatsApp par poochiye.",
  ],
};
export const offTopicVariants = {
  en: [
    "That's a little outside my area 😄 I'm best at ReacHeaven's websites, pricing, process and support. Want a quick estimate, or to see the AI Website Preview?",
    "Fun question, but I'm built for website and software questions 😊 Try asking about pricing, services or timelines — or get a quick estimate.",
  ],
  hi: [
    "Ye mere area se thoda bahar hai 😄 Main ReacHeaven ki website, pricing, process aur support me achha hoon. Quick estimate ya AI Website Preview dekhna chahenge?",
    "Mazedaar sawal hai, par main website aur software ke sawalon ke liye bana hoon 😊 Pricing, services ya timeline ke baare me poochiye — ya quick estimate lijiye.",
  ],
};
export { pick };
