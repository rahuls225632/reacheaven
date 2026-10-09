import Image from "next/image";
import { ArrowUpRight, BadgeCheck, CheckCircle2, Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { liveProjects } from "@/data/projects";

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      Live
    </span>
  );
}

function Screenshot({ project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.domain}`}
      className="group/shot relative block"
    >
      {/* colored glow behind the screenshot */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] opacity-70 blur-[60px] transition-opacity duration-500 group-hover/shot:opacity-100"
        style={{ background: project.glow }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-900 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover/shot:-translate-y-1.5">
        {/* browser bar */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-navy-800 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-navy-950/80 px-3 py-1 text-xs text-white/70">
            <Lock className="h-3 w-3 shrink-0 text-emerald-400" aria-hidden="true" />
            <span className="truncate">{project.domain}</span>
          </div>
          <ArrowUpRight
            className="h-4 w-4 text-white/40 transition-colors group-hover/shot:text-gold-300"
            aria-hidden="true"
          />
        </div>

        {/* real screenshot */}
        <div className="relative aspect-[1594/768] overflow-hidden bg-white">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover/shot:scale-[1.03]"
          />
          {/* hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950/0 opacity-0 transition-all duration-300 group-hover/shot:bg-navy-950/45 group-hover/shot:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-lg">
              Visit live site
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      {/* floating proof badges */}
      {project.floats.map((f, i) => (
        <div
          key={f.text}
          aria-hidden="true"
          className={`pointer-events-none absolute ${f.pos} hidden items-center gap-2 rounded-xl border border-white/15 bg-navy-950/90 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur sm:flex ${
            i === 0 ? "animate-[float_6s_ease-in-out_infinite]" : "animate-[float_7s_ease-in-out_infinite_reverse]"
          } motion-reduce:animate-none`}
        >
          <BadgeCheck className="h-4 w-4 text-gold-300" />
          {f.text}
        </div>
      ))}
    </a>
  );
}

export default function LiveProjects() {
  return (
    <section id="projects" className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-24">
      {/* ambient depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-royal-500/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-gold-400/10 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Live Projects"
          title="Real Products. Live on the Internet."
          description="Not mockups — these are working platforms we designed, built and launched. Open them and see for yourself."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {liveProjects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <Reveal key={project.domain}>
                <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className={`lg:col-span-7 ${reversed ? "lg:order-2" : ""}`}>
                    <Screenshot project={project} />
                  </div>

                  <div className={`lg:col-span-5 ${reversed ? "lg:order-1" : ""}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <LiveBadge />
                      <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2.5 py-1 text-xs font-semibold text-gold-300">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 font-display text-lg font-medium text-gold-300">
                      {project.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                      {project.description}
                    </p>

                    {/* stats */}
                    <dl className="mt-6 grid grid-cols-3 gap-3">
                      {project.stats.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center"
                        >
                          <dt className="sr-only">{s.label}</dt>
                          <dd className="font-display text-xl font-semibold text-white sm:text-2xl">
                            {s.value}
                          </dd>
                          <p className="mt-0.5 text-[11px] leading-tight text-white/55">{s.label}</p>
                        </div>
                      ))}
                    </dl>

                    {/* features */}
                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)] transition-colors duration-200 hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                    >
                      Visit {project.domain}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-16 text-center text-sm text-white/50">
          Want a platform like this for your business?{" "}
          <a href="/contact" className="font-semibold text-gold-300 underline-offset-4 hover:underline">
            Let&rsquo;s build it →
          </a>
        </p>
      </Container>
    </section>
  );
}
