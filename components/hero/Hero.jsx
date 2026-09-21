"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
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

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const float = (
    delay = 0,
    amplitude = 10,
    duration = 6
  ) =>
    shouldReduceMotion
      ? {}
      : {
          animate: {
            y: [0, -amplitude, 0],
          },
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          },
        };

  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      {/* Main radial gradients */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0
          [background:radial-gradient(60%_50%_at_80%_0%,rgba(44,75,176,0.35),transparent_60%),radial-gradient(40%_40%_at_10%_100%,rgba(201,162,39,0.12),transparent_60%)]
        "
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 opacity-[0.05]
          [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      {/* Moving blue glow */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="
            absolute
            -right-24
            top-0
            h-[28rem]
            w-[28rem]
            rounded-full
            bg-royal-500/20
            blur-3xl
          "
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Floating particles */}
      {!shouldReduceMotion &&
        PARTICLES.map((particle, i) => (
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
            animate={{
              opacity: [0.2, 0.9, 0.2],
              y: [0, -14, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* =========================================================
          HERO CONTAINER
      ========================================================== */}

      <Container
        className="
          relative
          grid
          gap-16
          py-20
          lg:grid-cols-2
          lg:items-center
          lg:py-28
        "
      >
        {/* =======================================================
            LEFT CONTENT
        ======================================================== */}

        <motion.div
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/15
              bg-white/5
              px-4
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-gold-300
            "
          >
            Software Development Partner
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="
              mt-6
              text-balance
              font-display
              text-4xl
              font-semibold
              leading-[1.1]
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-[3.4rem]
            "
          >
            Digital Experiences Built for Business Growth.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="
              mt-6
              max-w-xl
              text-lg
              leading-relaxed
              text-white/70
            "
          >
            We design and develop high-performance websites, web
            applications and digital solutions that help businesses
            attract customers, build trust and grow online.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              href="/contact"
              variant="gold"
              size="lg"
              icon={ArrowRight}
            >
              Start Your Project
            </Button>

            <Button
              href="/services"
              variant="outline-dark"
              size="lg"
            >
              View Our Services
            </Button>
          </motion.div>

          {/* Support badge */}
          <motion.div
            variants={itemVariants}
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-gold-300/25
              bg-gold-400/5
              px-4
              py-2
              text-sm
              font-medium
              text-gold-300
            "
          >
            <ShieldCheck className="h-4 w-4" />

            3 Months FREE Post-Launch Support
          </motion.div>
        </motion.div>

        {/* =======================================================
            RIGHT SIDE — DYNAMIC VISUAL
        ======================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  scale: 0.92,
                  y: 20,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mx-auto
            w-full
            max-w-md
            lg:max-w-none
          "
        >
          {/* =====================================================
              BIG BLUE GLOW
          ====================================================== */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              -inset-10
              rounded-full
              bg-royal-500/20
              blur-[80px]
            "
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    scale: [1, 1.15, 1],
                    opacity: [0.35, 0.65, 0.35],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =====================================================
              GOLD GLOW
          ====================================================== */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              -right-10
              top-10
              h-40
              w-40
              rounded-full
              bg-gold-400/20
              blur-[70px]
            "
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    x: [0, -25, 0],
                    y: [0, 20, 0],
                    opacity: [0.25, 0.55, 0.25],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =====================================================
              MAIN GLASS DASHBOARD
          ====================================================== */}

          <motion.div
            {...float(0, 8, 7)}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/[0.045]
              p-5
              shadow-[0_30px_100px_-20px_rgba(0,0,0,0.65)]
              backdrop-blur-xl
            "
          >
            {/* Animated top line */}
            <motion.div
              aria-hidden="true"
              className="
                absolute
                inset-x-0
                top-0
                h-[2px]
                bg-gradient-to-r
                from-transparent
                via-gold-300
                to-transparent
              "
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: [0.3, 1, 0.3],
                      x: ["-20%", "20%", "-20%"],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* =================================================
                DASHBOARD HEADER
            ================================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-white/10
                pb-4
              "
            >
              <div>
                <div className="text-xs text-white/40">
                  DIGITAL PERFORMANCE
                </div>

                <div className="mt-1 text-sm font-semibold text-white">
                  Growth Overview
                </div>
              </div>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotate: [0, 5, -5, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gold-300/20
                  bg-gold-400/10
                "
              >
                <TrendingUp className="h-4 w-4 text-gold-300" />
              </motion.div>
            </div>

            {/* =================================================
                MAIN METRIC
            ================================================== */}

            <div className="mt-5 flex items-end justify-between">
              <div>
                <div
                  className="
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  +84.6%
                </div>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-white/45
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                  Business growth
                </div>
              </div>

              <div
                className="
                  rounded-full
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-300
                "
              >
                +24.8%
              </div>
            </div>

            {/* =================================================
                ANIMATED CHART
            ================================================== */}

            <div
              className="
                relative
                mt-6
                h-40
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-navy-950/60
                p-4
              "
            >
              {/* Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "35px 35px",
                }}
              />

              {/* Gradient area */}
              <motion.div
                aria-hidden="true"
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-24
                  bg-gradient-to-t
                  from-royal-500/20
                  via-royal-500/5
                  to-transparent
                "
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: [0.5, 1, 0.5],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* SVG Chart */}
              <svg
                viewBox="0 0 500 150"
                className="
                  relative
                  z-10
                  h-full
                  w-full
                  overflow-visible
                "
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Blue → Purple → Gold */}
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    x2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                    />

                    <stop
                      offset="50%"
                      stopColor="#a78bfa"
                    />

                    <stop
                      offset="100%"
                      stopColor="#f5c451"
                    />
                  </linearGradient>

                  {/* Glow */}
                  <filter id="glow">
                    <feGaussianBlur
                      stdDeviation="4"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Main chart line */}
                <motion.path
                  d="
                    M0 120
                    C50 105, 70 115, 110 90
                    S170 100, 210 72
                    S270 85, 310 55
                    S380 70, 420 35
                    S465 45, 500 15
                  "
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          pathLength: 0,
                        }
                  }
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                />

                {/* Animated endpoint */}
                {!shouldReduceMotion && (
                  <motion.circle
                    cx="500"
                    cy="15"
                    r="5"
                    fill="#f5c451"
                    filter="url(#glow)"
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      r: [4, 7, 4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </svg>
            </div>

            {/* =================================================
                BOTTOM CARDS
            ================================================== */}

            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Active users */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-4
                "
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-violet-500/15
                    "
                  >
                    <Users className="h-4 w-4 text-violet-300" />
                  </div>

                  <span className="text-[10px] text-emerald-300">
                    LIVE
                  </span>
                </div>

                <div className="mt-3 text-xl font-semibold text-white">
                  24.8K
                </div>

                <div className="mt-1 text-xs text-white/40">
                  Active users
                </div>
              </motion.div>

              {/* Security */}
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-4
                "
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      bg-gold-400/10
                    "
                  >
                    <ShieldCheck className="h-4 w-4 text-gold-300" />
                  </div>

                  <span className="text-[10px] text-white/30">
                    SECURE
                  </span>
                </div>

                <div className="mt-3 text-xl font-semibold text-white">
                  99.9%
                </div>

                <div className="mt-1 text-xs text-white/40">
                  System uptime
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* =====================================================
              FLOATING CARD — CONVERSION
          ====================================================== */}

          <motion.div
            {...float(0.4, 10, 5)}
            className="
              absolute
              -left-5
              -top-5
              hidden
              rounded-2xl
              border
              border-white/10
              bg-navy-900/90
              p-3
              shadow-2xl
              backdrop-blur-xl
              sm:block
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-400/10
                "
              >
                <TrendingUp className="h-4 w-4 text-emerald-300" />
              </div>

              <div>
                <div
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-white/35
                  "
                >
                  Conversion
                </div>

                <div className="mt-0.5 text-sm font-semibold text-white">
                  +32.8%
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              FLOATING CARD — STATUS
          ====================================================== */}

          <motion.div
            {...float(1.2, 12, 6)}
            className="
              absolute
              -right-5
              top-24
              hidden
              rounded-2xl
              border
              border-white/10
              bg-navy-900/90
              p-3
              shadow-2xl
              backdrop-blur-xl
              sm:block
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-gold-400/10
                "
              >
                {!shouldReduceMotion && (
                  <span
                    className="
                      absolute
                      h-2
                      w-2
                      animate-ping
                      rounded-full
                      bg-gold-300
                    "
                  />
                )}

                <span className="h-2 w-2 rounded-full bg-gold-300" />
              </div>

              <div>
                <div
                  className="
                    text-[10px]
                    uppercase
                    tracking-wider
                    text-white/35
                  "
                >
                  Status
                </div>

                <div className="mt-0.5 text-sm font-semibold text-gold-300">
                  Everything Live
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              FLOATING CARD — TEAM
          ====================================================== */}

          <motion.div
            {...float(0.8, 8, 6.5)}
            className="
              absolute
              -bottom-5
              left-8
              hidden
              rounded-2xl
              border
              border-white/10
              bg-navy-900/90
              px-4
              py-3
              shadow-2xl
              backdrop-blur-xl
              md:block
            "
          >
            <div className="flex items-center gap-3">
              {/* Avatars */}
              <div className="flex -space-x-2">
                <span
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-navy-900
                    bg-gradient-to-br
                    from-violet-400
                    to-indigo-500
                  "
                />

                <span
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-navy-900
                    bg-gradient-to-br
                    from-gold-300
                    to-orange-400
                  "
                />

                <span
                  className="
                    h-7
                    w-7
                    rounded-full
                    border-2
                    border-navy-900
                    bg-gradient-to-br
                    from-emerald-300
                    to-teal-500
                  "
                />
              </div>

              <div>
                <div className="text-xs font-medium text-white">
                  Your digital team
                </div>

                <div className="text-[10px] text-white/40">
                  Designing • Building • Growing
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}