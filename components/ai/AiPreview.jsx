"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Copy, RefreshCw, RotateCcw, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { generateConcept, conceptBrief, conceptTypes, readableOn, siteTypes, vibes } from "@/lib/ai-preview";
import { whatsappHref } from "@/lib/config";
import { cn } from "@/lib/cn";

const ROLES = [
  { key: "bg", label: "Background" },
  { key: "surface", label: "Cards" },
  { key: "accent", label: "Accent" },
  { key: "text", label: "Text" },
];

const STEPS = ["Reading your industry…", "Choosing colours & style…", "Writing your headline…", "Laying out sections…"];

function Mockup({ k }) {
  const { palette: p } = k;
  const onAccent = readableOn(p.accent);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 bg-[#1b2236] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white/10 px-3 py-1 text-[11px] text-white/60">
          {k.name.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness"}.com
        </span>
      </div>

      {/* page */}
      <div style={{ background: p.bg, color: p.text, fontFamily: k.font }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6" style={{ borderBottom: `1px solid ${p.accent}33` }}>
          <span className="min-w-0 truncate text-sm font-bold sm:text-base">{k.name}</span>
          <span className="hidden gap-4 text-[11px] opacity-70 sm:flex">
            {k.sections.slice(0, 3).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </span>
          <span
            className="flex-shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold"
            style={{ background: p.accent, color: onAccent }}
          >
            {k.cta.split(" ")[0]}
          </span>
        </div>

        <div className="px-4 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: p.accent }}>
            {k.type}
          </p>
          <h3 className="mt-2 text-balance text-2xl font-bold leading-tight sm:text-4xl">{k.tagline}</h3>
          <p className="mt-3 max-w-md text-xs leading-relaxed opacity-75 sm:text-sm">{k.sub}</p>
          <span
            className="mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm"
            style={{ background: p.accent, color: onAccent }}
          >
            {k.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 pb-5 sm:gap-3 sm:px-8 sm:pb-8">
          {k.cards.map((c) => (
            <div key={c} className="rounded-lg p-2.5 sm:p-3.5" style={{ background: p.surface, border: `1px solid ${p.accent}22` }}>
              <span className="mb-2 block h-6 w-6 rounded-md sm:h-8 sm:w-8" style={{ background: `${p.accent}33` }} />
              <p className="text-[10px] font-semibold leading-tight sm:text-xs">{c}</p>
              <span className="mt-2 block h-1 w-3/4 rounded-full opacity-20" style={{ background: p.text }} />
              <span className="mt-1 block h-1 w-1/2 rounded-full opacity-20" style={{ background: p.text }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Custom listbox instead of a native <select>: the browser's own popup can overflow the
 *  screen on phones. This one always stays exactly as wide as the field. */
function IndustrySelect({ id, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  const listId = `${id}-list`;

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  // Keep the highlighted option visible inside the list (without scrolling the page).
  useEffect(() => {
    const list = listRef.current;
    const el = list?.children[active];
    if (!open || !el) return;
    if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  }, [open, active]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const pick = (opt) => {
    onChange(opt);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    const last = options.length - 1;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      setActive((a) => (e.key === "ArrowDown" ? Math.min(last, a + 1) : Math.max(0, a - 1)));
    } else if (e.key === "Home" && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && open) {
      e.preventDefault();
      setActive(last);
    } else if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      pick(options[active]);
    } else if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative mt-2">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="form-input flex min-h-11 items-center justify-between gap-2 text-left !text-base sm:!text-sm"
      >
        <span className="min-w-0 truncate">{value}</span>
        <ChevronDown className={cn("h-4 w-4 flex-shrink-0 text-slate-soft transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Industry"
          className="rh-chat-scroll absolute inset-x-0 top-full z-30 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-line bg-white p-1 text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
        >
          {options.map((o, i) => (
            <li
              key={o}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o === value}
              onClick={() => pick(o)}
              onPointerEnter={() => setActive(i)}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-[15px] sm:min-h-9 sm:text-sm",
                i === active ? "bg-royal-600/10 text-royal-600" : "text-ink",
                o === value && "font-semibold"
              )}
            >
              <span className="min-w-0">{o}</span>
              {o === value && <Check className="h-4 w-4 flex-shrink-0 text-royal-600" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AiPreview() {
  const [name, setName] = useState("");
  const [type, setType] = useState(conceptTypes[0]);
  const [vibe, setVibe] = useState("Modern");
  const [siteChoice, setSiteChoice] = useState("auto"); // "auto" | "static" | "dynamic"
  const [variant, setVariant] = useState(0);
  const [concept, setConcept] = useState(null);
  const [custom, setCustom] = useState(null); // visitor-edited palette (overrides the generated one)
  const [copied, setCopied] = useState(null);
  const [mode, setMode] = useState(null); // visitor override of static/dynamic (null = recommended)
  const [step, setStep] = useState(-1); // -1 idle, 0..n generating
  const timers = useRef([]);
  const resultRef = useRef(null);

  const generating = step >= 0;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = (nextVariant) => {
    if (generating) return;
    const input = { name, type, vibe, variant: nextVariant, siteMode: siteChoice };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setVariant(nextVariant);
    if (reduce) {
      setConcept(generateConcept(input));
      setCustom(null);
      setMode(null);
      return;
    }
    setStep(0);
    STEPS.forEach((_, i) => {
      if (i > 0) timers.current.push(setTimeout(() => setStep(i), i * 480));
    });
    timers.current.push(
      setTimeout(() => {
        setConcept(generateConcept(input));
        setCustom(null);
        setMode(null);
        setStep(-1);
        // On phones the result lands below the form — bring it into view.
        if (window.matchMedia("(max-width: 1023px)").matches) {
          setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        }
      }, STEPS.length * 480)
    );
  };

  // What the visitor currently sees: the generated concept + any colours they changed.
  const view = concept && custom ? { ...concept, palette: custom } : concept;
  const edited = !!custom;
  const siteMode = view ? mode || view.recommended : null;
  const st = siteMode ? siteTypes[siteMode] : null;

  const setColor = (key, value) =>
    setCustom((prev) => ({ ...(prev || concept.palette), [key]: value.toLowerCase() }));

  const copyText = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API blocked (e.g. non-HTTPS) — fall back to a temporary textarea.
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing more we can do */
      }
      ta.remove();
    }
    setCopied(id);
    setTimeout(() => setCopied((c) => (c === id ? null : c)), 1400);
  };

  return (
    <section id="ai-preview" className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(45%_50%_at_85%_10%,rgba(71,99,201,0.28),transparent_70%),radial-gradient(40%_45%_at_5%_90%,rgba(201,162,39,0.14),transparent_70%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="AI Website Preview"
            title="See your website before we build it"
            description="Tell us about your business and get an instant concept — headline, colours, style and page structure — in seconds."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start lg:gap-10">
          {/* form */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(0);
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-6"
            >
              <label htmlFor="ai-name" className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Business name
              </label>
              <input
                id="ai-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="e.g. Sunrise Residency"
                autoComplete="organization"
                className="form-input mt-2 !text-base sm:!text-sm"
              />

              <label htmlFor="ai-type" className="mt-5 block text-xs font-semibold uppercase tracking-wider text-white/60">
                Industry
              </label>
              <IndustrySelect id="ai-type" value={type} onChange={setType} options={conceptTypes} />

              <fieldset className="mt-5">
                <legend className="text-xs font-semibold uppercase tracking-wider text-white/60">Style</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {vibes.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVibe(v)}
                      aria-pressed={vibe === v}
                      className={cn(
                        "min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                        vibe === v
                          ? "border-gold-400 bg-gold-400 text-navy-950"
                          : "border-white/15 text-white/80 hover:border-gold-300/60"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-5">
                <legend className="text-xs font-semibold uppercase tracking-wider text-white/60">Website type</legend>
                <div role="radiogroup" aria-label="Website type" className="mt-2 grid grid-cols-3 gap-2">
                  {[
                    { key: "auto", title: "Not sure", sub: "Suggest for me" },
                    { key: "static", title: "Static", sub: `from ${siteTypes.static.from}` },
                    { key: "dynamic", title: "Dynamic", sub: `from ${siteTypes.dynamic.from}` },
                  ].map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      role="radio"
                      aria-checked={siteChoice === o.key}
                      onClick={() => setSiteChoice(o.key)}
                      className={cn(
                        "min-h-14 rounded-xl border px-2 py-2 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                        siteChoice === o.key
                          ? "border-gold-400 bg-gold-400 text-navy-950"
                          : "border-white/15 text-white/80 hover:border-gold-300/60"
                      )}
                    >
                      <span className="block text-sm font-semibold">{o.title}</span>
                      <span className={cn("block text-[11px]", siteChoice === o.key ? "text-navy-950/70" : "text-white/50")}>{o.sub}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <Button type="submit" variant="gold" size="lg" disabled={generating} className="mt-6 w-full">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {generating ? "Generating…" : concept ? "Generate again" : "Generate my preview"}
              </Button>
              <p className="mt-3 text-center text-xs text-white/50">Free · instant · no sign-up</p>
            </form>
          </Reveal>

          {/* result */}
          <div ref={resultRef} className="min-w-0 scroll-mt-20" aria-live="polite">
            {generating && (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/20" />
                  <Sparkles className="relative h-6 w-6" aria-hidden="true" />
                </span>
                <ul className="mt-6 space-y-2 text-sm">
                  {STEPS.map((s, i) => (
                    <li
                      key={s}
                      className={cn(
                        "flex items-center justify-center gap-2 transition-opacity",
                        i <= step ? "opacity-100" : "opacity-25",
                        i < step ? "text-white/60" : "text-white"
                      )}
                    >
                      {i < step ? <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" /> : <span className="h-3.5 w-3.5" />}
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!generating && !concept && (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-8 text-center">
                <Sparkles className="h-8 w-8 text-gold-300/70" aria-hidden="true" />
                <p className="mt-4 max-w-xs text-sm text-white/60">
                  Your website concept will appear here. Enter your business name and tap <b className="text-white/80">Generate</b>.
                </p>
              </div>
            )}

            {!generating && concept && (
              <div className="rh-pop">
                <Mockup k={view} />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Colour palette</p>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => copyText(ROLES.map((r) => view.palette[r.key]).join(", "), "all")}
                          className="flex min-h-8 items-center gap-1 rounded-full px-2.5 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                        >
                          {copied === "all" ? <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
                          {copied === "all" ? "Copied" : "Copy all"}
                        </button>
                        {edited && (
                          <button
                            type="button"
                            onClick={() => setCustom(null)}
                            className="flex min-h-8 items-center gap-1 rounded-full px-2.5 text-[11px] font-medium text-gold-300 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                          >
                            <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {ROLES.map((r) => {
                        const hex = view.palette[r.key];
                        return (
                          <div key={r.key} className="flex min-w-0 flex-col items-center gap-1.5">
                            <label className="relative block h-11 w-11 cursor-pointer sm:h-12 sm:w-12">
                              <input
                                type="color"
                                value={hex}
                                onChange={(e) => setColor(r.key, e.target.value)}
                                aria-label={`Change ${r.label.toLowerCase()} colour, currently ${hex}`}
                                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              />
                              <span
                                className="block h-full w-full rounded-full border-2 border-white/25 transition-transform peer-hover:scale-105 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-400"
                                style={{ background: hex }}
                              />
                            </label>
                            <span className="text-[10px] font-medium text-white/70">{r.label}</span>
                            <button
                              type="button"
                              onClick={() => copyText(hex, r.key)}
                              aria-label={`Copy ${r.label.toLowerCase()} colour ${hex}`}
                              className="flex min-h-6 items-center gap-1 rounded-md px-1 font-mono text-[10px] text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                            >
                              {copied === r.key ? <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" /> : null}
                              {copied === r.key ? "Copied" : hex}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-[11px] text-white/40">Tap a colour to change it · tap the code to copy</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Suggested pages</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {view.sections.map((s) => (
                        <span key={s} className="rounded-full border border-gold-300/25 bg-gold-400/10 px-2.5 py-1 text-xs text-gold-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-gold-300/25 bg-gold-400/[0.06] p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Your website type</p>

                  <div role="radiogroup" aria-label="Website type" className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                    {Object.entries(siteTypes).map(([key, t]) => {
                      const active = siteMode === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setMode(key)}
                          className={cn(
                            "relative rounded-xl border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:p-4",
                            active ? "border-gold-400 bg-gold-400/15" : "border-white/15 hover:border-gold-300/50"
                          )}
                        >
                          {view.recommended === key && (
                            <span className="absolute -top-2.5 right-3 rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-950">
                              Recommended
                            </span>
                          )}
                          <span className="block font-display text-base font-semibold text-white sm:text-lg">{t.label}</span>
                          <span className="mt-0.5 block text-xs text-white/60">Starting from</span>
                          <span className="block font-display text-lg font-semibold text-gold-300 sm:text-xl">{t.from}</span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    {siteMode === view.recommended ? (
                      <>
                        <span className="font-semibold text-white">Why {st.label.toLowerCase()}?</span> {view.why}
                      </>
                    ) : (
                      st.blurb
                    )}
                  </p>
                  <ul className="mt-3 grid gap-1.5 text-sm text-white/75 sm:grid-cols-2">
                    {st.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                    <Button type="button" variant="outline-dark" onClick={() => run(variant + 1)} className="w-full sm:w-auto">
                      <RefreshCw className="h-4 w-4" aria-hidden="true" /> New variation
                    </Button>
                    <Button href={whatsappHref(conceptBrief(view, siteMode))} external variant="gold" className="w-full sm:w-auto">
                      <WhatsAppIcon className="h-4 w-4" /> Get this built
                    </Button>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/40">
                  A quick concept for inspiration — starting prices are a reference; your final design, features and quote are scoped by our team.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
