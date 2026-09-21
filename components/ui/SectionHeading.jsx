import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
            dark ? "text-gold-300" : "text-royal-600"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              dark ? "bg-gold-400" : "bg-royal-500"
            )}
          />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-slate"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
