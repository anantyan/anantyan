import type { ProjectIllustrationKey } from "@/lib/content";

type Props = {
  variant: ProjectIllustrationKey;
  className?: string;
};

/**
 * Flat vector illustrations per project, built as inline SVG so they inherit
 * theme tokens and need no external image assets or API keys.
 */
export function ProjectIllustration({ variant, className }: Props) {
  return (
    <svg
      viewBox="0 0 320 240"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <rect width="320" height="240" fill="var(--color-surface)" />
      {variant === "wingson" && <WingsOnArt />}
      {variant === "secondhand" && <SecondHandArt />}
      {variant === "news" && <NewsArt />}
      {variant === "recipe" && <RecipeArt />}
    </svg>
  );
}

function WingsOnArt() {
  return (
    <g>
      <path
        d="M40 176 C110 196 210 196 280 150"
        fill="none"
        stroke="var(--color-border)"
        strokeWidth="2"
        strokeDasharray="6 8"
      />
      <g transform="translate(150 92) rotate(-18)">
        <path
          d="M0 0 L64 10 L36 22 L46 46 L30 40 L18 54 L14 30 L-10 24 Z"
          fill="var(--color-accent)"
        />
      </g>
      <circle cx="252" cy="70" r="4" fill="var(--color-accent)" opacity="0.5" />
      <circle cx="270" cy="96" r="3" fill="var(--color-accent)" opacity="0.35" />
    </g>
  );
}

function SecondHandArt() {
  return (
    <g>
      <rect
        x="76"
        y="96"
        width="72"
        height="80"
        rx="10"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
      />
      <path d="M92 96 V80 a20 20 0 0 1 40 0 V96" fill="none" stroke="var(--color-accent)" strokeWidth="3" />
      <rect
        x="168"
        y="112"
        width="72"
        height="80"
        rx="10"
        fill="var(--color-accent)"
        opacity="0.16"
        stroke="var(--color-accent)"
        strokeWidth="3"
      />
      <path d="M184 112 V96 a20 20 0 0 1 40 0 V112" fill="none" stroke="var(--color-accent)" strokeWidth="3" />
      <circle cx="160" cy="140" r="18" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="3" />
      <path d="M152 140 h16 M160 132 v16" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function NewsArt() {
  return (
    <g>
      <rect x="88" y="118" width="118" height="72" rx="8" fill="var(--color-border)" opacity="0.5" />
      <rect x="102" y="104" width="118" height="72" rx="8" fill="var(--color-background)" stroke="var(--color-border)" strokeWidth="2" />
      <rect
        x="120"
        y="86"
        width="118"
        height="72"
        rx="8"
        fill="var(--color-background)"
        stroke="var(--color-accent)"
        strokeWidth="3"
        transform="rotate(-6 179 122)"
      />
      <g transform="rotate(-6 179 122)">
        <rect x="132" y="98" width="46" height="8" rx="4" fill="var(--color-accent)" />
        <rect x="132" y="112" width="94" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="132" y="123" width="94" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="132" y="134" width="60" height="5" rx="2.5" fill="var(--color-border)" />
      </g>
    </g>
  );
}

function RecipeArt() {
  return (
    <g>
      <path d="M120 118 q40 -14 80 0" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <path d="M132 100 q10 -18 0 -32" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M160 96 q10 -18 0 -32" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <path d="M188 100 q10 -18 0 -32" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="160" cy="150" rx="70" ry="16" fill="var(--color-accent)" opacity="0.14" />
      <path
        d="M96 140 a64 20 0 0 0 128 0 v10 a64 20 0 0 1 -128 0 Z"
        fill="var(--color-background)"
        stroke="var(--color-accent)"
        strokeWidth="3"
      />
      <ellipse cx="160" cy="140" rx="64" ry="20" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="3" />
    </g>
  );
}
