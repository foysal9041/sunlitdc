type BrandName = "facebook" | "youtube" | "linkedin" | "whatsapp";

interface BrandIconProps {
  name: BrandName;
  className?: string;
}

/**
 * Full-color social/brand marks (not the generic currentColor line-icon
 * set in Icon.tsx) — used wherever a brand needs to be instantly
 * recognizable by its real logo color, e.g. the footer's social row.
 */
export function BrandIcon({ name, className }: BrandIconProps) {
  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#1877F2" />
          <path
            d="M31.5 24.5h-5v14h-5.5v-14h-3.5v-5h3.5v-3.3c0-3.9 1.7-6.2 6.3-6.2h3.9v5h-2.4c-1.8 0-1.9.7-1.9 1.9v2.6h4.4l-.5 5Z"
            fill="#fff"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#FF0000" />
          <path
            d="M33.8 18.5c-.3-1.2-1.2-2.1-2.4-2.4C29.3 15.5 24 15.5 24 15.5s-5.3 0-7.4.6c-1.2.3-2.1 1.2-2.4 2.4-.6 2.1-.6 6.5-.6 6.5s0 4.4.6 6.5c.3 1.2 1.2 2.1 2.4 2.4 2.1.6 7.4.6 7.4.6s5.3 0 7.4-.6c1.2-.3 2.1-1.2 2.4-2.4.6-2.1.6-6.5.6-6.5s0-4.4-.6-6.5Z"
            fill="#fff"
          />
          <path d="M21.5 28.5v-8l7 4-7 4Z" fill="#FF0000" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect width="48" height="48" rx="10" fill="#0A66C2" />
          <path
            d="M14.9 20.2h4.9V33.6h-4.9V20.2Zm2.45-7.8a2.85 2.85 0 1 1 0 5.7 2.85 2.85 0 0 1 0-5.7ZM22.7 20.2h4.7v1.83h.07c.65-1.24 2.25-2.55 4.63-2.55 4.95 0 5.87 3.26 5.87 7.5v6.62h-4.9v-5.87c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1v5.97h-4.89V20.2Z"
            fill="#fff"
          />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="24" fill="#25D366" />
          <path
            d="M24 13a11 11 0 0 0-9.4 16.7L13 35l5.5-1.4A11 11 0 1 0 24 13Zm6.4 15.6c-.3.7-1.6 1.4-2.2 1.5-.6.1-1.3.2-2-.1-.5-.1-1.1-.3-1.9-.7-3.4-1.5-5.6-4.9-5.8-5.1-.2-.2-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.7 1.1 2.5 1.2 2.7.1.2.2.4 0 .7-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.7 1.7.4.2.6.1.8-.1.2-.2.9-1 1.1-1.3.2-.3.5-.3.8-.2.3.1 1.9.9 2.2 1 .3.1.6.2.6.4.1.2.1.8-.2 1.6Z"
            fill="#fff"
          />
        </svg>
      );
    default:
      return null;
  }
}
