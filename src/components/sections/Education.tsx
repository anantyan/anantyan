"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Education() {
  const { locale } = useLocale();
  const { education, certifications, awards } = content[locale];
  const t = ui[locale];

  return (
    <section
      id="pendidikan"
      className="border-t border-border bg-surface/50 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <RevealSection>
          <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />
          <div className="mt-8 space-y-6">
            {education.map((item) => (
              <div key={item.school}>
                <h3 className="font-semibold text-foreground">{item.school}</h3>
                <p className="text-sm text-accent">{item.degree}</p>
                <p className="text-sm text-muted">{item.period}</p>
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection delay={0.1}>
          <SectionHeading
            eyebrow={t.certifications.eyebrow}
            title={t.certifications.title}
          />
          <ul className="mt-8 space-y-3 text-sm text-muted">
            {certifications.map((cert) => (
              <li key={cert} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                {cert}
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {awards.map((award) => (
              <li key={award} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                {award}
              </li>
            ))}
          </ul>
        </RevealSection>
      </div>
    </section>
  );
}
