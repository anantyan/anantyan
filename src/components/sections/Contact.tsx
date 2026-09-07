"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Contact() {
  const { locale } = useLocale();
  const { profile } = content[locale];
  const shouldReduceMotion = useReducedMotion();
  const t = ui[locale].contact;

  const socialMotionProps = {
    whileHover: shouldReduceMotion ? undefined : { y: -3, scale: 1.12 },
    whileTap: shouldReduceMotion ? undefined : { y: 2, scale: 0.94 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  return (
    <section id="kontak" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <RevealSection>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={18} />
              {t.contactMe}
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-muted">
            <motion.a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/60 p-3 text-foreground shadow-xs transition-colors hover:border-accent hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              {...socialMotionProps}
            >
              <LinkedinLogo size={22} />
            </motion.a>
            <motion.a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/60 p-3 text-foreground shadow-xs transition-colors hover:border-accent hover:text-accent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              {...socialMotionProps}
            >
              <GithubLogo size={22} />
            </motion.a>
          </div>
        </RevealSection>
      </div>
      <footer className="mx-auto mt-20 max-w-5xl border-t border-border pt-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. {t.footerBuiltWith}
      </footer>
    </section>
  );
}
