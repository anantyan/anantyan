"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const HeroMonogram = memo(function HeroMonogram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-surface"
      style={{ willChange: "transform" }}
      animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-2xl font-semibold tracking-tight text-accent">
        AR
      </span>
    </motion.div>
  );
});
