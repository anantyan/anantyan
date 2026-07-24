"use client";

import { Monitor, Moon, Sun } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ui } from "@/lib/i18n/ui";
import { useTheme } from "@/lib/theme/ThemeContext";

const ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const { locale } = useLocale();
  const t = ui[locale].themeToggle;
  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={t[theme]}
      title={t[theme]}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Icon size={20} weight="bold" />
    </button>
  );
}
