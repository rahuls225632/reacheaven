"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const PARTICLES = [
  { top: "12%", left: "18%", size: 3, delay: 0, duration: 7 },
  { top: "22%", left: "62%", size: 2, delay: 0.6, duration: 9 },
  { top: "38%", left: "84%", size: 3, delay: 1.2, duration: 8 },
  { top: "58%", left: "8%", size: 2, delay: 0.3, duration: 10 },
  { top: "70%", left: "48%", size: 3, delay: 1.6, duration: 7.5 },
  { top: "80%", left: "72%", size: 2, delay: 0.9, duration: 8.5 },
  { top: "16%", left: "40%", size: 2, delay: 2, duration: 9.5 },
  { top: "48%", left: "30%", size: 2, delay: 1.4, duration: 8 },
];

const BARS = [40, 65, 50, 80, 60, 92];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const float = (delay = 0, amplitude = 10, duration = 6) =>
    shouldReduceMotion
      ? {}
      : {
          animate: { y: [0, -amplitude, 0] },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(60%_50%_at_80%_0%,rgba(44,75,176,0.35),transparent_60%),radial-gradient(40%_40%_at_10%_100%,rgba(201,162,39,0.12),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-royal-500/20 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      {!shouldReduceMotion
        ? PARTICLES.map((particle, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute rounded-full bg-gold-300/70"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -14, 0] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))
        : null}

      <Container className="relative grid gap-16 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300"
          >
            Software Development Partner
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Digital Experiences Built for Business Growth.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            We design and develop high-performance websites, web applications
            and digital solutions that help businesses attract customers,
            build trust and grow online.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="gold" size="lg" icon={ArrowRight}>
              Start Your Project
            </Button>
            <Button href="/services" variant="outline-dark" size="lg">
              View Our Services
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-400/5 px-4 py-2 text-sm font-medium text-gold-300"
          >
            <ShieldCheck className="h-4 w-4" />
            3 Months FREE Post-Launch Support
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            {...float(0, 8, 7)}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 h-5 w-40 rounded-full bg-white/5" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="col-span-2 rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <div className="h-2 w-16 rounded-full bg-gold-400/50" />
                <div className="mt-4 flex h-[92px] items-end gap-2">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-4 rounded-t-sm bg-gradient-to-t from-royal-600 to-gold-400/80"
                      initial={shouldReduceMotion ? { height: h } : { height: 0 }}
                      animate={{ height: h }}
                      transition={{
                        duration: 0.7,
                        delay: shouldReduceMotion ? 0 : 0.5 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <TrendingUp className="h-5 w-5 text-gold-300" />
                <div className="mt-3 h-2 w-full rounded-full bg-white/10" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
              </div>
              <div className="col-span-3 flex items-center justify-between rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-royal-400" />
                  <div className="h-2 w-24 rounded-full bg-white/10" />
                </div>
                <div className="h-6 w-16 rounded-full bg-royal-600/40" />
              </div>
            </div>
          </motion.div>

          <motion.div
            {...float(0.3)}
            className="absolute -left-6 -top-6 hidden rounded-xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-lg backdrop-blur sm:block"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-white/80">
              <ShieldCheck className="h-4 w-4 text-gold-300" />
              Deployed & Secure
            </div>
          </motion.div>

          <motion.div
            {...float(1.1)}
            className="absolute -bottom-6 -right-4 hidden rounded-xl border border-white/10 bg-navy-900/90 px-4 py-3 shadow-lg backdrop-blur sm:block"
          >
            <div className="text-xs font-medium text-white/60">Conversion Rate</div>
            <div className="mt-1 text-lg font-semibold text-gold-300">+ Optimized</div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
