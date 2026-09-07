"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

type TiltCard3DProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  href?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const SPRING_CONFIG = { damping: 22, stiffness: 240, mass: 0.8 };

export function TiltCard3D({
  children,
  className = "",
  maxTilt = 12,
  perspective = 1000,
  glare = true,
  href,
  id,
  onClick,
}: TiltCard3DProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const smoothX = useSpring(mouseX, SPRING_CONFIG);
  const smoothY = useSpring(mouseY, SPRING_CONFIG);
  const smoothHover = useSpring(isHovered, { damping: 25, stiffness: 250 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  const glareOpacity = useTransform(smoothHover, [0, 1], [0, 0.18]);

  const glareBackground = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, var(--color-accent), transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    isHovered.set(1);
  };

  const handleMouseEnter = () => {
    if (!shouldReduceMotion) {
      isHovered.set(1);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    isHovered.set(0);
  };

  if (shouldReduceMotion) {
    if (href) {
      return (
        <a
          id={id}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={className}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }
    return (
      <div
        id={id}
        className={className}
        onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      >
        {children}
      </div>
    );
  }

  const content = (
    <>
      <div className="relative h-full w-full transform-style-3d">{children}</div>
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay transition-opacity"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
        />
      )}
    </>
  );

  const motionBaseProps = {
    id,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      perspective: `${perspective}px`,
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
    },
    whileHover: {
      scale: 1.02,
      transition: { duration: 0.25, ease: "easeOut" as const },
    },
    whileTap: {
      scale: 0.97,
      rotateX: 4,
      transition: { duration: 0.15, ease: "easeOut" as const },
    },
    className: `relative transform-style-3d cursor-pointer ${className}`,
  };

  if (href) {
    return (
      <motion.a
        ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        {...motionBaseProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      {...motionBaseProps}
    >
      {content}
    </motion.div>
  );
}
