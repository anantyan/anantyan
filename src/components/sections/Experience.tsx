"use client";

import { FilePdf } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";
import { assetBasePath } from "@/lib/assetBasePath";
import { useLiveOngoingDuration } from "@/lib/useLiveOngoingDuration";
import type { ExperienceItem, Locale } from "@/lib/content/types";

function ExperienceDuration({
  item,
  locale,
}: {
  item: ExperienceItem;
  locale: Locale;
}) {
  const duration = useLiveOngoingDuration(
    item.duration,
    item.durationKey,
    locale
  );
  return <p className="text-xs font-medium text-muted">{duration}</p>;
}

export function Experience() {
  const { locale } = useLocale();
  const { experience } = content[locale];
  const t = ui[locale].experience;

  return (
    <section
      id="pengalaman"
      className="border-t border-border bg-surface/50 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
          />
        </RevealSection>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {experience.map((item, index) => (
            <RevealSection key={item.company} delay={Math.min(index * 0.05, 0.3)}>
              <div className="group -mx-4 rounded-2xl p-4 transition-all duration-200 hover:bg-surface/80 hover:shadow-xs">
                <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <div>
                    <p className="text-sm font-medium text-muted">{item.period}</p>
                    <ExperienceDuration item={item} locale={locale} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-accent/90">
                      {item.company} · {item.location}
                    </p>
                    <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    {item.certificateUrl && (
                      <a
                        href={`${assetBasePath}${item.certificateUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm active:translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <FilePdf size={14} />
                        {t.viewCertificate}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
