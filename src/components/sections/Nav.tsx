"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ui } from "@/lib/i18n/ui";
import { LocaleSwitcher } from "@/components/sections/LocaleSwitcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const t = ui[locale].nav;

  const links = [
    { href: "#tentang", label: t.about },
    { href: "#pengalaman", label: t.experience },
    { href: "#proyek", label: t.projects },
    { href: "#media", label: t.media },
    { href: "#kontak", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <motion.a
          href="#top"
          className="rounded-lg text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          Arya Rezza Anantya
        </motion.a>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <LocaleSwitcher />
          <motion.a
            href="#kontak"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-[0_3px_0_rgba(140,65,30,0.85),0_6px_14px_rgba(184,103,63,0.3)] transition-colors hover:bg-accent/95 hover:shadow-[0_4px_0_rgba(140,65,30,0.85),0_8px_18px_rgba(184,103,63,0.4)] active:shadow-[0_1px_0_rgba(140,65,30,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            whileHover={shouldReduceMotion ? undefined : { y: -1, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { y: 2, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 18 }}
          >
            {t.contactCta}
          </motion.a>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <LocaleSwitcher />
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border/70 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
