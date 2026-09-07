import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function Button({
  href,
  children,
  variant = "primary",
  download,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide select-none transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const styles =
    variant === "primary"
      ? "bg-accent text-accent-foreground shadow-[0_4px_0_rgba(140,65,30,0.85),0_8px_20px_rgba(184,103,63,0.35)] hover:bg-accent/95 hover:shadow-[0_6px_0_rgba(140,65,30,0.85),0_12px_24px_rgba(184,103,63,0.45)] active:shadow-[0_1px_0_rgba(140,65,30,0.85),0_2px_8px_rgba(184,103,63,0.25)]"
      : "border border-border bg-surface text-foreground shadow-[0_3px_0_var(--color-border),0_6px_16px_rgba(0,0,0,0.06)] hover:bg-surface/80 hover:shadow-[0_5px_0_var(--color-border),0_10px_20px_rgba(0,0,0,0.1)] active:shadow-[0_1px_0_var(--color-border),0_2px_6px_rgba(0,0,0,0.04)]";

  if (href) {
    return (
      <a
        href={href}
        className={`${base} ${styles} ${className}`}
        onClick={onClick}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
