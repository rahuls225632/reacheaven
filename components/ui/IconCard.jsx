import { cn } from "@/lib/cn";
import Icon from "@/components/ui/Icon";

// Optional colored icon badge — pass `color` to override the default navy badge.
const COLOR_STYLES = {
  navy: "bg-navy-900 text-gold-300 group-hover:bg-royal-600",
  sky: "bg-sky-50 text-sky-600 group-hover:bg-sky-100",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
  teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-100",
  violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-100",
  rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
};

export default function IconCard({
  icon,
  title,
  description,
  className,
  children,
  color = "navy",
}) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(11,18,32,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-royal-500/30 hover:shadow-[0_20px_40px_-16px_rgba(11,18,32,0.15)]",
        className
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105",
          COLOR_STYLES[color] || COLOR_STYLES.navy
        )}
      >
        <Icon name={icon} className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p> : null}
      {children}
    </div>
  );
}
