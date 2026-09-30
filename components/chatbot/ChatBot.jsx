"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Mic,
  RotateCcw,
  Send,
  Share2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { getReply, starterChips, detectLang } from "@/lib/chatbot/engine";
import { welcomeText } from "@/lib/chatbot/knowledge";
import { estimatorSteps, matchOption, recommend } from "@/lib/chatbot/estimator";
import { whatsappHref } from "@/lib/config";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "rh-chat-v2";
const TEASER_KEY = "rh-chat-teaser";
const MAX_LEN = 300;
// Optional: POST { message, history, lang } -> { text } to your own LLM endpoint.
// Left empty, the assistant runs 100% in the browser.
const AI_ENDPOINT = process.env.NEXT_PUBLIC_CHAT_API_URL || "";

let idCounter = 0;
const nextId = () => `m${Date.now()}-${idCounter++}`;

const plain = (t) => t.replace(/\*\*/g, "").replace(/^• /gm, "");

function welcomeMessage() {
  return { id: nextId(), role: "bot", text: welcomeText.en, links: [], chips: starterChips, welcome: true };
}

/** Renders **bold** and "• " bullet lines without dangerouslySetInnerHTML. */
function RichText({ text }) {
  // While streaming, hide an unfinished "**" so raw asterisks never flash.
  const safe = (text.match(/\*\*/g) || []).length % 2 ? text.replace(/\*\*(?!.*\*\*)/s, "") : text;
  return (
    <>
      {safe.split("\n").map((line, i) => {
        const isBullet = line.startsWith("• ");
        const content = isBullet ? line.slice(2) : line;
        const parts = content.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
        const rendered = parts.map((p, j) =>
          p.startsWith("**") && p.endsWith("**") ? (
            <strong key={j} className="font-semibold">
              {p.slice(2, -2)}
            </strong>
          ) : (
            <Fragment key={j}>{p}</Fragment>
          )
        );
        if (line.trim() === "") return <div key={i} className="h-2" />;
        if (isBullet) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span aria-hidden="true" className="text-gold-500">
                •
              </span>
              <span className="min-w-0">{rendered}</span>
            </div>
          );
        }
        return <div key={i}>{rendered}</div>;
      })}
    </>
  );
}

/** Reveals bot text progressively (tap the bubble to skip). */
function StreamText({ text, onTick, onDone }) {
  const [n, setN] = useState(0);
  const done = n >= text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    const step = Math.max(2, Math.ceil(text.length / 90));
    const t = setInterval(() => setN((v) => Math.min(text.length, v + step)), 22);
    return () => clearInterval(t);
  }, [text]);

  useEffect(() => {
    onTick?.();
    if (done) onDone?.();
  }, [n, done]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div onClick={() => setN(text.length)}>
      <RichText text={text.slice(0, n)} />
    </div>
  );
}

function LinkPill({ link }) {
  const cls =
    "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-royal-500/25 bg-white px-3.5 py-2 text-xs font-semibold text-royal-600 transition-colors hover:border-royal-500 hover:bg-royal-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
        <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

function ActionBtn({ label, onClick, active, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-slate-soft transition-colors hover:bg-mist-dim hover:text-royal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-royal-400",
        active && "text-royal-600"
      )}
    >
      {children}
    </button>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [streamId, setStreamId] = useState(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [estimator, setEstimator] = useState(null); // { step, answers, lang }
  const [listening, setListening] = useState(false);
  const [voiceOk, setVoiceOk] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [vv, setVv] = useState(null); // visual viewport (mobile keyboard aware)

  const lastTopicRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const recRef = useRef(null);
  const briefRef = useRef(null);
  const freshRef = useRef(new Set()); // message ids that should stream in
  const abortRef = useRef(null);
  const openRef = useRef(false);
  const sendRef = useRef(null);

  useEffect(() => {
    openRef.current = open;
    if (!open) setStreamId(null); // never leave the input locked by a half-streamed reply
  }, [open]);

  /* ------------------------------ persistence ------------------------------ */
  useEffect(() => {
    let restored = null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw);
    } catch {
      /* start fresh */
    }
    /* eslint-disable react-hooks/set-state-in-effect */
    if (restored?.messages?.length) {
      setMessages(restored.messages);
      lastTopicRef.current = restored.lastTopic || null;
      briefRef.current = restored.brief || null;
    } else {
      setMessages([welcomeMessage()]);
    }
    setVoiceOk(
      typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
    );
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages: messages.slice(-40), lastTopic: lastTopicRef.current, brief: briefRef.current })
      );
    } catch {
      /* ignore */
    }
  }, [messages, hydrated]);

  /* -------------------------------- teaser -------------------------------- */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = setTimeout(() => setShowTeaser(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const dismissTeaser = useCallback(() => {
    setShowTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(scrollToEnd, [messages, typing, open, estimator, scrollToEnd]);

  /* ------------- open state: focus, Esc, scroll lock, keyboard-safe height ------------- */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 639px)");
    // Don't pop the keyboard on phones the moment the chat opens.
    if (!mq.matches) inputRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    if (mq.matches) {
      document.body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    // Keep the panel exactly the size of the *visible* area, so the input is
    // never hidden behind the on-screen keyboard (iOS Safari / Android Chrome).
    const v = window.visualViewport;
    const sync = () => {
      if (!v || !mq.matches) return setVv(null);
      setVv({ h: Math.round(v.height), top: Math.round(v.offsetTop) });
      requestAnimationFrame(scrollToEnd);
    };
    sync();
    v?.addEventListener("resize", sync);
    v?.addEventListener("scroll", sync);
    mq.addEventListener?.("change", sync);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      v?.removeEventListener("resize", sync);
      v?.removeEventListener("scroll", sync);
      mq.removeEventListener?.("change", sync);
      setVv(null);
    };
  }, [open, scrollToEnd]);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      recRef.current?.abort?.();
      abortRef.current?.abort?.();
      window.speechSynthesis?.cancel();
    },
    []
  );

  /* --------------------------------- speech -------------------------------- */
  const speak = (m) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speakingId === m.id) {
      synth.cancel();
      setSpeakingId(null);
      return;
    }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(plain(m.text));
    u.lang = detectLang(m.text) === "hi" ? "hi-IN" : "en-IN";
    u.onend = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(m.id);
    synth.speak(u);
  };

  const copy = async (m) => {
    try {
      await navigator.clipboard.writeText(plain(m.text));
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = navigator.language?.toLowerCase().startsWith("hi") ? "hi-IN" : "en-IN";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    let finalText = "";
    rec.onresult = (e) => {
      let t = "";
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      finalText = t;
      setInput(t.slice(0, MAX_LEN));
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => {
      setListening(false);
      if (finalText.trim()) sendRef.current?.(finalText);
    };
    recRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  };

  /* --------------------------------- replying ------------------------------- */
  const pushBot = useCallback((reply, { instant = false } = {}) => {
    const id = nextId();
    const animate = !instant && openRef.current;
    if (animate) freshRef.current.add(id);
    lastTopicRef.current = reply.topic || lastTopicRef.current;
    if (reply.brief) briefRef.current = reply.brief;
    setMessages((m) => [
      ...m,
      { id, role: "bot", text: reply.text, links: reply.links || [], chips: reply.chips || [] },
    ]);
    setTyping(false);
    if (animate) setStreamId(id);
  }, []);

  const askEstimatorStep = useCallback(
    (step, answers, lang) => {
      const s = estimatorSteps[step];
      pushBot({ text: `**Quick estimate · ${step + 1}/${estimatorSteps.length}**\n${s.q[lang] || s.q.en}`, chips: s.options });
    },
    [pushBot]
  );

  const startEstimator = useCallback(
    (lang = "en") => {
      setEstimator({ step: 0, answers: {}, lang });
      askEstimatorStep(0, {}, lang);
    },
    [askEstimatorStep]
  );

  const send = useCallback(
    (raw) => {
      const text = (raw ?? input).trim().slice(0, MAX_LEN);
      if (!text || typing || streamId) return;

      setInput("");
      dismissTeaser();
      window.speechSynthesis?.cancel();
      setSpeakingId(null);
      setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
      setTyping(true);

      // ---- guided estimator in progress ----
      if (estimator) {
        const step = estimatorSteps[estimator.step];
        const opt = matchOption(step, text);
        if (opt) {
          const answers = { ...estimator.answers, [step.id]: opt };
          const next = estimator.step + 1;
          timerRef.current = setTimeout(() => {
            if (next < estimatorSteps.length) {
              setEstimator({ ...estimator, step: next, answers });
              askEstimatorStep(next, answers, estimator.lang);
            } else {
              setEstimator(null);
              pushBot(recommend(answers, estimator.lang));
            }
          }, 350);
          return;
        }
        setEstimator(null); // they asked something else — leave the flow
      }

      if (/^start over$/i.test(text)) {
        timerRef.current = setTimeout(() => startEstimator(detectLang(text)), 300);
        return;
      }

      const reply = getReply(text, { lastTopic: lastTopicRef.current });

      if (reply.action === "estimator") {
        timerRef.current = setTimeout(() => startEstimator(reply.lang), 300);
        return;
      }

      const finish = (r) => {
        const delay = AI_ENDPOINT && r === reply && reply.fallback ? 0 : Math.min(700, 300 + r.text.length * 0.4);
        timerRef.current = setTimeout(() => pushBot(r), delay);
      };

      // Optional LLM hand-off for questions the built-in engine could not answer.
      if (AI_ENDPOINT && reply.fallback) {
        const ctrl = new AbortController();
        abortRef.current = ctrl;
        const timeout = setTimeout(() => ctrl.abort(), 8000);
        fetch(AI_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            message: text,
            lang: reply.lang,
            history: messages.slice(-8).map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
          }),
        })
          .then((r) => (r.ok ? r.json() : Promise.reject()))
          .then((d) => (d?.text ? finish({ ...reply, text: String(d.text).slice(0, 1500), fallback: false }) : finish(reply)))
          .catch(() => finish(reply))
          .finally(() => clearTimeout(timeout));
        return;
      }
      finish(reply);
    },
    [input, typing, streamId, estimator, messages, dismissTeaser, pushBot, startEstimator, askEstimatorStep]
  );

  sendRef.current = send;

  const reset = () => {
    clearTimeout(timerRef.current);
    abortRef.current?.abort?.();
    recRef.current?.abort?.();
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setTyping(false);
    setStreamId(null);
    setEstimator(null);
    lastTopicRef.current = null;
    briefRef.current = null;
    setMessages([welcomeMessage()]);
  };

  const rate = (id, value) => {
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, fb: value } : m)));
    if (value === "down") {
      pushBot(
        {
          text: "Sorry that wasn't helpful. A person on the team can answer this directly — share your question on WhatsApp.",
          links: [{ label: "Chat on WhatsApp", href: whatsappHref("Hi ReacHeaven, I have a question the website assistant couldn't answer."), external: true }],
          chips: [],
        },
        { instant: true }
      );
    }
  };

  // Hand the whole conversation (or the estimator brief) to the team on WhatsApp.
  const handoffHref = () => {
    if (briefRef.current) return whatsappHref(briefRef.current);
    const said = messages.filter((m) => m.role === "user").map((m) => `• ${m.text}`);
    const body = said.length
      ? `Hi ReacHeaven, I was chatting with your website assistant. My questions:\n${said.slice(-6).join("\n")}\nCould someone follow up with me?`
      : undefined;
    return whatsappHref(body);
  };

  const lastBot = [...messages].reverse().find((m) => m.role === "bot");
  const lastBotId = lastBot?.id;
  const busy = typing || !!streamId;

  const panelStyle = vv ? { "--rh-vh": `${vv.h}px`, "--rh-top": `${vv.top}px` } : undefined;

  return (
    <>
      {/* Launcher — sits above the WhatsApp button */}
      {!open && (
        <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
          {showTeaser && (
            <div
              role="status"
              className="rh-pop relative w-[min(15rem,calc(100vw-2rem))] rounded-2xl rounded-br-sm border border-gold-300/30 bg-navy-950 px-4 py-3 pr-9 text-xs leading-relaxed text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]"
            >
              <button
                type="button"
                onClick={dismissTeaser}
                aria-label="Dismiss"
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              Not sure which plan fits? Get a <span className="font-semibold text-gold-300">quick estimate</span> in 4 taps.
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              dismissTeaser();
              setOpen(true);
            }}
            aria-label="Open chat assistant"
            aria-expanded={open}
            aria-controls="rh-chat-panel"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-white shadow-[0_10px_30px_-8px_rgba(29,58,143,0.7)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400"
          >
            <MessageCircle className="h-7 w-7" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-400 ring-2 ring-white">
              <Sparkles className="h-2.5 w-2.5 text-navy-950" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-navy-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
              Ask our assistant
            </span>
          </button>
        </div>
      )}

      {/* Chat panel — full screen on phones, floating card from sm up */}
      {open && (
        <div
          id="rh-chat-panel"
          role="dialog"
          aria-label="ReacHeaven chat assistant"
          style={panelStyle}
          className={cn(
            "fixed inset-x-0 top-0 z-50 flex h-[100dvh] flex-col overflow-hidden bg-white",
            "max-sm:h-[var(--rh-vh,100dvh)] max-sm:top-[var(--rh-top,0px)]",
            "sm:inset-auto sm:bottom-6 sm:right-24 sm:h-[min(620px,calc(100dvh-3rem))] sm:w-[390px] sm:rounded-2xl sm:border sm:border-line sm:shadow-[0_30px_80px_-20px_rgba(6,10,20,0.55)]"
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-2 bg-navy-950 px-3 py-3 text-white sm:gap-3 sm:px-4 sm:py-3.5">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold-300/30 bg-white/5 text-gold-300">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold">ReacHeaven Assistant</p>
              <p className="flex items-center gap-1.5 truncate text-xs text-white/60">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="truncate">Instant answers · English &amp; Hinglish</span>
              </p>
            </div>
            <a
              href={handoffHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send this chat to our team on WhatsApp"
              title="Send chat to team"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={reset}
              aria-label="Restart conversation"
              title="Restart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="rh-chat-scroll flex-1 space-y-4 overflow-y-auto bg-mist px-3 py-4 sm:px-4 sm:py-5"
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              const streaming = !isUser && m.id === streamId && freshRef.current.has(m.id);
              const showTools = !isUser && !m.welcome && !streaming;
              return (
                <div key={m.id} className={cn("rh-pop flex", isUser ? "justify-end" : "justify-start")}>
                  <div className={cn("min-w-0", isUser ? "max-w-[82%]" : "max-w-[90%]")}>
                    <div
                      className={cn(
                        "break-words rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed [overflow-wrap:anywhere] sm:text-sm",
                        isUser
                          ? "rounded-br-sm bg-royal-600 text-white"
                          : "rounded-bl-sm border border-line bg-white text-ink shadow-sm"
                      )}
                    >
                      {isUser ? (
                        m.text
                      ) : streaming ? (
                        <StreamText
                          text={m.text}
                          onTick={scrollToEnd}
                          onDone={() => {
                            freshRef.current.delete(m.id);
                            setStreamId((s) => (s === m.id ? null : s));
                          }}
                        />
                      ) : (
                        <RichText text={m.text} />
                      )}
                    </div>

                    {!isUser && !streaming && m.links?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.links.map((l) => (
                          <LinkPill key={l.label + l.href} link={l} />
                        ))}
                      </div>
                    )}

                    {showTools && (
                      <div className="mt-1 flex items-center gap-0.5">
                        {typeof window !== "undefined" && "speechSynthesis" in window && (
                          <ActionBtn label={speakingId === m.id ? "Stop reading" : "Read aloud"} onClick={() => speak(m)} active={speakingId === m.id}>
                            {speakingId === m.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                          </ActionBtn>
                        )}
                        <ActionBtn label="Copy answer" onClick={() => copy(m)}>
                          {copiedId === m.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        </ActionBtn>
                        <ActionBtn label="Helpful" onClick={() => !m.fb && rate(m.id, "up")} active={m.fb === "up"}>
                          <ThumbsUp className="h-3.5 w-3.5" />
                        </ActionBtn>
                        <ActionBtn label="Not helpful" onClick={() => !m.fb && rate(m.id, "down")} active={m.fb === "down"}>
                          <ThumbsDown className="h-3.5 w-3.5" />
                        </ActionBtn>
                      </div>
                    )}

                    {!isUser && m.id === lastBotId && !busy && m.chips?.length > 0 && (
                      <div className="rh-chips-row mt-2.5 flex flex-wrap gap-2">
                        {m.chips.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => send(c)}
                            className="min-h-9 rounded-full border border-gold-500/40 bg-gold-400/10 px-3.5 py-2 text-left text-xs font-medium text-navy-800 transition-colors hover:bg-gold-400/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex justify-start" aria-label="Assistant is typing">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-soft"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-line bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5">
            {estimator && (
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-royal-600">
                <Sparkles className="h-3 w-3" aria-hidden="true" /> Estimate in progress — tap an option above, or ask anything to exit
              </p>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                inputMode="text"
                enterKeyHint="send"
                autoComplete="off"
                autoCorrect="on"
                value={input}
                maxLength={MAX_LEN}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={listening ? "Listening…" : "Ask about pricing, services, support…"}
                aria-label="Type your question"
                className="form-input min-w-0 !rounded-full !py-2.5 !text-base sm:!text-sm"
              />
              {voiceOk && (
                <button
                  type="button"
                  onClick={toggleMic}
                  aria-label={listening ? "Stop voice input" : "Speak your question"}
                  aria-pressed={listening}
                  className={cn(
                    "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400 sm:h-10 sm:w-10",
                    listening
                      ? "animate-pulse border-red-500 bg-red-500 text-white"
                      : "border-line bg-white text-royal-600 hover:bg-mist-dim"
                  )}
                >
                  <Mic className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => send()}
                disabled={!input.trim() || busy}
                aria-label="Send message"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-royal-600 text-white transition-colors hover:bg-royal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal-400 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-soft">
              Automated assistant · answers from ReacHeaven&rsquo;s website info
            </p>
          </div>
        </div>
      )}
    </>
  );
}
