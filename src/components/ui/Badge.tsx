"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-flex cursor-default select-none items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground/80 shadow-xs transition-colors hover:border-accent/50 hover:bg-surface/90 hover:text-foreground sm:text-sm"
      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { y: 1, scale: 0.95 }}
      transition={{ type: "spring" as const, stiffness: 450, damping: 18 }}
    >
      {children}
    </motion.span>
  );
}
