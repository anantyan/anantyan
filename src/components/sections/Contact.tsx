"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Contact() {
  const { locale } = useLocale();
  const { profile } = content[locale];
  const t = ui[locale].contact;

  return (
    <section id="kontak" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <RevealSection>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={18} />
              {t.contactMe}
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" download>
              {t.downloadResume}
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-muted">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <LinkedinLogo size={22} />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubLogo size={22} />
            </a>
          </div>
        </RevealSection>
      </div>
      <footer className="mx-auto mt-20 max-w-5xl border-t border-border pt-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. {t.footerBuiltWith}
      </footer>
    </section>
  );
}
