"use client";

import { useEffect, useRef } from "react";
import { Check, X, MessageCircle, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { whatsappHref } from "@/lib/config";

/**
 * Full package-details "interface" that opens when a visitor clicks a
 * pricing card — shows the complete scope for that plan, then drives them
 * to Contact Us or WhatsApp to move forward.
 */
export default function PackageDetailsModal({ tier, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!tier) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [tier, onClose]);

  if (!tier) return null;

  const waMessage = `Hi ReacHeaven! I'm interested in the "${tier.name}" package (${tier.startingFrom}). Can we discuss the details?`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
    >
      <button
        type="button"
        aria-label="Close package details"
        onClick={onClose}
        className="popup-overlay-in fixed inset-0 bg-navy-950/75 backdrop-blur-sm"
      />

      <div className="popup-card-in relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(6,10,20,0.55)] ring-1 ring-gold-400/20 lg:grid-cols-2">
        {/* Royal corner ornaments */}
        <div aria-hidden="true" className="pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 border-l border-t border-gold-300/70" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 z-20 hidden h-6 w-6 border-b border-r border-gold-400/30 lg:block" />

        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Close package details"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-navy-950/10 text-ink transition-colors hover:bg-navy-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400 lg:bg-white/10 lg:text-white lg:hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ================= LEFT — laptop + mobile mockup ================= */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-mist p-8 sm:p-10 lg:p-12">
          {tier.highlighted ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Most Chosen
            </span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-600">
              {tier.audience}
            </span>
          )}

          <h3
            id="package-modal-title"
            className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
          >
            {tier.name} Website Package
          </h3>

          <p
            className={
              tier.highlighted
                ? "mt-3 bg-gradient-to-r from-[#C9A227] via-[#8a6d10] to-[#C9A227] bg-clip-text font-display text-2xl font-bold text-transparent"
                : "mt-3 font-display text-2xl font-bold text-royal-600"
            }
          >
            {tier.startingFrom}
          </p>

          {/* Laptop frame with a floating phone overlapping — like a real product shot */}
          <div className="relative mt-10 pb-6 pr-8 sm:pb-8 sm:pr-12">
            <div className="overflow-hidden rounded-t-lg border border-line bg-white shadow-[0_25px_60px_-20px_rgba(11,18,32,0.25)]">
              <div className="flex items-center gap-1.5 border-b border-line bg-mist px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-slate-soft/30" />
                <span className="h-2 w-2 rounded-full bg-slate-soft/30" />
                <span className="h-2 w-2 rounded-full bg-slate-soft/30" />
                <span className="ml-2 h-3 flex-1 max-w-[120px] rounded-full bg-slate-soft/15" />
              </div>
              <div className="space-y-2.5 p-4">
                <div className="h-3 w-3/4 rounded-full bg-royal-600/70" />
                <div className="h-2.5 w-5/6 rounded-full bg-line" />
                <div className="h-2.5 w-2/3 rounded-full bg-line" />
                <div className="mt-3 h-6 w-28 rounded-full bg-gold-400/80" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="h-9 rounded-md bg-mist" />
                  <div className="h-9 rounded-md bg-mist" />
                  <div className="h-9 rounded-md bg-mist" />
                </div>
              </div>
            </div>
            {/* Laptop base */}
            <div className="mx-auto h-2.5 w-[85%] rounded-b-xl bg-gradient-to-b from-ink/15 to-ink/5" />

            {/* Floating phone mockup, overlapping bottom-right */}
            <div className="absolute -bottom-2 right-0 w-20 overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_40px_-16px_rgba(11,18,32,0.3)] sm:w-24">
              <div className="space-y-1.5 p-2.5">
                <div className="h-2 w-1/2 rounded-full bg-royal-600/70" />
                <div className="h-1.5 w-full rounded-full bg-line" />
                <div className="h-1.5 w-4/5 rounded-full bg-line" />
                <div className="mt-1.5 h-6 rounded-md bg-mist" />
                <div className="h-6 rounded-md bg-mist" />
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate">
            {tier.description}
          </p>
        </div>

        {/* ================= RIGHT — full scope + CTAs ================= */}
        <div className="flex flex-col overflow-y-auto p-8 sm:p-10 lg:max-h-[85vh] lg:p-12">
          <h4 className="font-display text-xl font-semibold text-ink">
            What&apos;s included
          </h4>

          <ul className="mt-5 space-y-3.5 text-sm">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                </span>
                <span className="text-slate">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl border border-line bg-mist px-4 py-3 text-xs leading-relaxed text-slate-soft">
            Final pricing always depends on scope — pages, features,
            integrations and timeline. The figure above is a starting
            reference, not a fixed quote.
          </div>

          <div className="mt-auto space-y-3 pt-8">
            <Button
              href="/#contact"
              variant="gold"
              size="lg"
              icon={ArrowRight}
              onClick={onClose}
              className="w-full"
            >
              Contact Us About This Package
            </Button>

            <a
              href={whatsappHref(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-1.5 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-royal-500/40 hover:text-royal-600"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              Ask on WhatsApp Instead
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
