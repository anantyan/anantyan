import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
};

export function Button({ href, children, variant = "primary", download }: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-foreground hover:opacity-90"
      : "border border-border text-foreground hover:bg-surface";

  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      {children}
    </a>
  );
}
