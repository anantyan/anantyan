"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ui } from "@/lib/i18n/ui";
import { LocaleSwitcher } from "@/components/sections/LocaleSwitcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const t = ui[locale].nav;

  const links = [
    { href: "#tentang", label: t.about },
    { href: "#pengalaman", label: t.experience },
    { href: "#proyek", label: t.projects },
    { href: "#kontak", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
          Arya Rezza Anantya
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <LocaleSwitcher />
          <a
            href="#kontak"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform active:scale-[0.98]"
          >
            {t.contactCta}
          </a>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground"
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
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
                  className="rounded-lg px-2 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
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
