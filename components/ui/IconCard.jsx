import { cn } from "@/lib/cn";
import Icon from "@/components/ui/Icon";

export default function IconCard({ icon, title, description, className, children }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(11,18,32,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-royal-500/30 hover:shadow-[0_20px_40px_-16px_rgba(11,18,32,0.15)]",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-gold-300 transition-colors duration-300 group-hover:bg-royal-600">
        <Icon name={icon} className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p> : null}
      {children}
    </div>
  );
}
