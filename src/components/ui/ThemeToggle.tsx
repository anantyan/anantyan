"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const t = ui[locale].themeToggle;
  const Icon = ICONS[theme];

  return (
    <motion.button
      type="button"
      onClick={cycleTheme}
      aria-label={t[theme]}
      title={t[theme]}
      className="fixed bottom-6 right-6 z-40 inline-flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-[0_6px_20px_rgba(0,0,0,0.12),0_2px_0_var(--color-border)] backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transform-style-3d"
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.08 }}
      whileTap={shouldReduceMotion ? undefined : { y: 2, scale: 0.92, rotateX: 10 }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 18 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={
            shouldReduceMotion
              ? undefined
              : { rotateY: -90, opacity: 0, scale: 0.6 }
          }
          animate={
            shouldReduceMotion
              ? undefined
              : { rotateY: 0, opacity: 1, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? undefined
              : { rotateY: 90, opacity: 0, scale: 0.6 }
          }
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Icon size={22} weight="bold" />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
