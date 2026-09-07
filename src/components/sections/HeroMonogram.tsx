"use client";

import { memo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const SPRING_CONFIG = { damping: 18, stiffness: 220 };

export const HeroMonogram = memo(function HeroMonogram() {
  const shouldReduceMotion = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const [spinCount, setSpinCount] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMonogramClick = () => {
    setSpinCount((prev) => prev + 1);
  };

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 mb-8 select-none p-4"
    >
      <motion.div
        onClick={handleMonogramClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Monogram, click to spin"
        title="Klik untuk memutar!"
        className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-surface to-surface/60 shadow-[0_12px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-shadow hover:shadow-[0_16px_40px_rgba(184,103,63,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transform-style-3d"
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, -10, 0],
                rotateZ: spinCount > 0 ? [0, 360 * spinCount] : [-1, 1, -1],
                scale: spinCount > 0 ? [1, 1.18, 0.95, 1] : 1,
              }
        }
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotateZ:
            spinCount > 0
              ? { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }
              : { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] },
        }}
        whileHover={{
          scale: 1.08,
          translateZ: 20,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: 0.92,
          rotateX: 10,
          translateZ: -10,
          transition: { duration: 0.1 },
        }}
      >
        {/* Ambient 3D Rim / Glow */}
        <div
          className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent/10 opacity-70 blur-xs transition-opacity group-hover:opacity-100"
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Inner 3D Plate */}
        <div
          className="pointer-events-none absolute inset-1.5 rounded-[1.25rem] border border-border/80 bg-surface/40"
          style={{ transform: "translateZ(10px)" }}
        />

        {/* 3D Floating Typography */}
        <span
          className="relative text-3xl font-bold tracking-tight text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] select-none"
          style={{ transform: "translateZ(26px)" }}
        >
          AR
        </span>
      </motion.div>
    </div>
  );
});
