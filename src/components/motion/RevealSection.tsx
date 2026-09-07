"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  tiltAngle?: number;
};

export function RevealSection({
  children,
  className = "",
  delay = 0,
  tiltAngle = 6,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`perspective-1200 transform-style-3d ${className}`}
      initial={
        shouldReduceMotion
          ? undefined
          : { opacity: 0, y: 36, rotateX: tiltAngle, scale: 0.98 }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
