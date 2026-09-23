"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { X, ShieldCheck, Clock, SearchCheck, MessageCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import RoyalEmblem from "@/components/ui/RoyalEmblem";
import PackageDetailsModal from "@/components/pricing/PackageDetailsModal";
import { pricingTiers } from "@/data/pricing";
import { whatsappHref } from "@/lib/config";

const SHOW_AFTER_MS = 45 * 1000; // 45 seconds on page
const SESSION_KEY = "rh_lead_popup_shown";

// Each highlight gets its own accent — same palette used in Why Choose Us / Process.
const highlights = [
  { icon: ShieldCheck, text: "See it before you pay", tint: "text-emerald-600 bg-emerald-50" },
  { icon: Clock, text: "Fast turnaround", tint: "text-sky-600 bg-sky-50" },
  { icon: SearchCheck, text: "SEO-ready build", tint: "text-amber-600 bg-amber-50" },
];

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function TimedLeadPopup() {
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const closeBtnRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Don't nag a visitor who already saw it this session.
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SHOW_AFTER_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  const openPackageDetails = () => {
    const tier = pricingTiers.find((t) => t.highlighted) || pricingTiers[0];
    setSelectedTier(tier);
    close();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-popup-title"
        >
      <button
        type="button"
        aria-label="Close popup"
        onClick={close}
        className="popup-overlay-in absolute inset-0 bg-navy-950/75 backdrop-blur-sm"
      />

      <div className="popup-card-in relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(6,10,20,0.55)] ring-1 ring-gold-400/25">
        {/* Royal corner ornaments — same motif used across the site's sections */}
        <div aria-hidden="true" className="absolute left-3 top-3 z-20 h-6 w-6 border-l border-t border-gold-300/70" />
        <div aria-hidden="true" className="absolute bottom-3 right-3 z-20 h-6 w-6 border-b border-r border-gold-400/30" />

        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-royal-600 to-royal-500 px-6 pb-8 pt-9 text-center">
          {/* Royal emblem — tucked into a corner, well clear of the text, low opacity */}
          {!shouldReduceMotion && (
            <RoyalEmblem
              size={220}
              className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.14]"
            />
          )}

          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close popup"
            onClick={close}
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
          >
            <X className="h-4 w-4" />
          </button>

          <motion.div
            variants={shouldReduceMotion ? undefined : headerVariants}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="relative z-10"
          >
            <motion.p
              variants={headerItem}
              className="inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Free, No-Obligation Offer
            </motion.p>

            <motion.h2
              variants={headerItem}
              id="lead-popup-title"
              className="mt-4 text-balance font-display text-[26px] font-bold leading-[1.25] text-white"
            >
              See Your Website Before You{" "}
              <span className="relative inline-block whitespace-nowrap text-gold-300">
                Pay a Rupee
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-gold-400/70"
                />
              </span>
            </motion.h2>

            <motion.p
              variants={headerItem}
              className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/70"
            >
              We&apos;ll design your homepage exactly as it would look live.
              Love it? We build the rest. If not, there&apos;s no obligation
              at all.
            </motion.p>
          </motion.div>
        </div>

        {/* ================= BODY ================= */}
        <div className="space-y-5 px-6 py-6">
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, text, tint }) => (
              <li
                key={text}
                className="flex items-center gap-2 rounded-xl border border-line bg-mist px-3 py-2.5 text-xs font-medium text-slate sm:flex-col sm:text-center"
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tint}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="relative">
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-gold-400/40 blur-lg"
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <Button
              type="button"
              onClick={openPackageDetails}
              variant="gold"
              size="lg"
              icon={ArrowRight}
              className="relative w-full"
            >
              Claim My Free Demo
            </Button>
          </div>

          <a
            href={whatsappHref(
              "Hi ReacHeaven! I was checking out your website and I'd like a free demo for my business. Can we talk?"
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex w-full items-center justify-center gap-1.5 text-center text-xs font-medium text-slate transition-colors hover:text-royal-600"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Prefer WhatsApp? Chat with us instead
          </a>

          <button
            type="button"
            onClick={close}
            className="w-full text-center text-xs font-medium text-slate-soft transition-colors hover:text-ink"
          >
            Maybe later
          </button>
        </div>
      </div>
        </div>
      )}

      <PackageDetailsModal tier={selectedTier} onClose={() => setSelectedTier(null)} />
    </>
  );
}
