"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Shape = "dot" | "ring" | "line" | "triangle";

type Ornament = {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  accent: boolean;
  hideOnMobile: boolean;
  shape: Shape;
};

const SHAPES: Shape[] = ["dot", "ring", "line", "triangle"];

function sizeForShape(shape: Shape, i: number): number {
  switch (shape) {
    case "dot":
      return 3 + ((i * 7) % 4);
    case "ring":
      return 12 + ((i * 7) % 12);
    case "line":
      return 18 + ((i * 7) % 16);
    case "triangle":
      return 9 + ((i * 7) % 8);
  }
}

// Deterministic R2 low-discrepancy sequence (not Math.random()) so the
// server-rendered static HTML and the client hydration produce identical
// markup — avoids a hydration mismatch while still looking scattered.
function generateOrnaments(count: number): Ornament[] {
  const a1 = 0.7548776662;
  const a2 = 0.5698402910;
  const ornaments: Ornament[] = [];

  for (let i = 0; i < count; i++) {
    const shape = SHAPES[i % SHAPES.length];
    ornaments.push({
      x: ((0.5 + a1 * i) % 1) * 100,
      y: ((0.5 + a2 * i) % 1) * 100,
      size: sizeForShape(shape, i),
      duration: 10 + ((i * 13) % 14),
      delay: (i * 3.3) % 10,
      drift: 12 + ((i * 5) % 18),
      rotate: (i * 47) % 360,
      accent: i % 4 === 0,
      hideOnMobile: i % 3 === 0,
      shape,
    });
  }

  return ornaments;
}

const ORNAMENTS = generateOrnaments(42);

function OrnamentShape({ ornament }: { ornament: Ornament }) {
  const colorClass = ornament.accent ? "bg-accent/60" : "bg-foreground/30";
  const borderColorClass = ornament.accent
    ? "border-accent/60"
    : "border-foreground/30";

  if (ornament.shape === "ring") {
    return (
      <span
        className={`block rounded-full border-[1.5px] ${borderColorClass}`}
        style={{ width: ornament.size, height: ornament.size }}
      />
    );
  }

  if (ornament.shape === "line") {
    return (
      <span
        className={`block rounded-full ${colorClass}`}
        style={{ width: ornament.size, height: 2 }}
      />
    );
  }

  if (ornament.shape === "triangle") {
    return (
      <span
        className="block"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${ornament.size / 2}px solid transparent`,
          borderRight: `${ornament.size / 2}px solid transparent`,
          borderBottom: `${ornament.size}px solid ${
            ornament.accent ? "var(--color-accent)" : "var(--color-foreground)"
          }`,
          opacity: ornament.accent ? 0.6 : 0.3,
        }}
      />
    );
  }

  return (
    <span
      className={`block rounded-full ${colorClass}`}
      style={{ width: ornament.size, height: ornament.size }}
    />
  );
}

export const StarField = memo(function StarField() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
      aria-hidden="true"
    >
      {ORNAMENTS.map((ornament, index) => (
        <motion.div
          key={index}
          className={`absolute ${ornament.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            left: `${ornament.x}%`,
            top: `${ornament.y}%`,
            rotate: ornament.rotate,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -ornament.drift, 0],
                  opacity: [0.35, 1, 0.35],
                  rotate:
                    ornament.shape === "line" || ornament.shape === "triangle"
                      ? [ornament.rotate - 20, ornament.rotate + 20, ornament.rotate - 20]
                      : ornament.rotate,
                }
          }
          transition={{
            duration: ornament.duration,
            delay: ornament.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <OrnamentShape ornament={ornament} />
        </motion.div>
      ))}
    </div>
  );
});
