import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out active:scale-[0.97] whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-electric-500 to-cyan-400 text-navy-950 shadow-[0_8px_24px_-8px_rgba(47,99,255,0.45)] hover:shadow-[0_12px_32px_-8px_rgba(31,201,221,0.5)] hover:-translate-y-0.5",
  secondary: "glass text-navy-950 hover:border-electric-400/60 hover:-translate-y-0.5 dark:text-white",
  ghost: "text-slate-600 hover:text-navy-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: boolean;
}

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };
type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon = false } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const arrow = icon && (
    <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  );

  if (props.href) {
    const { href, target, rel, "aria-label": ariaLabel } = props;
    return (
      <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }

  const { type = "button", onClick, disabled, "aria-label": ariaLabel } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {children}
      {arrow}
    </button>
  );
}
