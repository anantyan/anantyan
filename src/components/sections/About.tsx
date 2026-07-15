"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function About() {
  const { locale } = useLocale();
  const { profile, skills } = content[locale];
  const t = ui[locale].about;

  return (
    <section id="tentang" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </RevealSection>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <RevealSection delay={0.05}>
            <p className="max-w-[65ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
              {profile.summary}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              {profile.languages.map((lang) => (
                <div key={lang.name} className="flex items-baseline gap-2">
                  <dt className="font-medium text-foreground">{lang.name}</dt>
                  <dd>{lang.level}</dd>
                </div>
              ))}
            </dl>
          </RevealSection>
          <RevealSection delay={0.1}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
              {t.skillsHeading}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
