"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/content";
import { detectInitialLocale } from "@/lib/i18n/detectLocale";

const STORAGE_KEY = "portfolio-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(
  undefined,
);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const detected = detectInitialLocale(stored, navigator.language);
    // Intentional one-time client-only correction, not a bug: a static
    // export has no server-side way to read localStorage/navigator.language,
    // so the server/first paint always renders "id" and this effect
    // synchronizes with those external sources after mount. The resulting
    // single re-render (a possible id -> detected locale flash) is expected
    // and accepted by design (see docs/superpowers/plans/2026-07-14-language-toggle.md,
    // Task 4 Global Constraints).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
