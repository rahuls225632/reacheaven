import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-royal-600 text-white hover:bg-royal-500 focus-visible:outline-royal-400 shadow-[0_8px_24px_-8px_rgba(29,58,143,0.55)]",
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 focus-visible:outline-gold-500 shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)]",
  outline:
    "border border-line text-ink hover:border-royal-500 hover:text-royal-600 focus-visible:outline-royal-400",
  "outline-dark":
    "border border-white/20 text-white hover:border-gold-400 hover:text-gold-300 focus-visible:outline-gold-400",
  ghost: "text-ink hover:text-royal-600 focus-visible:outline-royal-400",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon: Icon,
  external,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
    </button>
  );
}
