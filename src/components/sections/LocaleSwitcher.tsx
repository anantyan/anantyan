"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { LANGUAGE_NAMES, type Locale } from "@/lib/i18n/ui";

function FlagID({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="16"
      height="12"
      className={`rounded-[2px] border border-border/60 ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#fff" />
      <rect width="20" height="7" fill="#CE1126" />
    </svg>
  );
}

function FlagEN({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="16"
      height="12"
      className={`rounded-[2px] border border-border/60 ${className ?? ""}`}
      aria-hidden="true"
    >
      <rect width="20" height="14" fill="#00247D" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#fff" strokeWidth="2.8" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#CF142B" strokeWidth="1.2" />
      <path d="M8.4 0 H11.6 V14 H8.4 Z M0 5.4 H20 V8.6 H0 Z" fill="#fff" />
      <path d="M9 0 H11 V14 H9 Z M0 6 H20 V8 H0 Z" fill="#CF142B" />
    </svg>
  );
}

const FLAGS: Record<Locale, typeof FlagID> = {
  id: FlagID,
  en: FlagEN,
};

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const options = Object.keys(LANGUAGE_NAMES) as Locale[];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
      >
        {LANGUAGE_NAMES[locale]}
        <CaretDown size={14} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-2 w-24 overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
        >
          {options.map((key) => {
            const Flag = FLAGS[key];
            return (
              <button
                key={key}
                type="button"
                role="menuitemradio"
                aria-checked={locale === key}
                onClick={() => {
                  setLocale(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-surface ${
                  locale === key ? "font-medium text-accent" : "text-foreground"
                }`}
              >
                <Flag />
                {LANGUAGE_NAMES[key]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
