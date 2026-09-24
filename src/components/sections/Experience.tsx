"use client";

import { FilePdf } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";
import { assetBasePath } from "@/lib/assetBasePath";
import { useLiveOngoingDuration } from "@/lib/useLiveOngoingDuration";
import type { ExperienceItem, ExperiencePosition, Locale } from "@/lib/content/types";

function PositionDuration({
  duration,
  durationKey,
  locale,
}: {
  duration: string;
  durationKey?: string;
  locale: Locale;
}) {
  const liveDuration = useLiveOngoingDuration(duration, durationKey, locale);
  return <span>{liveDuration}</span>;
}

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
            <RevealSection
              key={`${item.company}-${item.role || "multi"}-${index}`}
              delay={Math.min(index * 0.05, 0.3)}
            >
              <div className="group -mx-4 rounded-2xl p-4 transition-all duration-200 hover:bg-surface/80 hover:shadow-xs">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <div>
                    <p className="text-sm font-medium text-muted">{item.period}</p>
                    <ExperienceDuration item={item} locale={locale} />
                    {item.employmentType && (
                      <p className="mt-1 text-xs text-muted/80">
                        {item.employmentType}
                        {item.workplaceType ? ` · ${item.workplaceType}` : ""}
                      </p>
                    )}
                  </div>

                  <div>
                    {item.positions && item.positions.length > 0 ? (
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.company}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-accent/90">
                          {item.location}
                        </p>

                        <div className="relative mt-5 border-l-2 border-border/80 pl-6 space-y-8">
                          {item.positions.map((pos: ExperiencePosition) => (
                            <div key={pos.role} className="relative">
                              {pos.isCurrent ? (
                                <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                                  <span className="absolute h-full w-full animate-ping rounded-full bg-accent/40 opacity-75" />
                                  <span className="relative h-2.5 w-2.5 rounded-full border-2 border-accent bg-accent" />
                                </span>
                              ) : (
                                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-border bg-background" />
                              )}

                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                                  {pos.role}
                                </h4>
                                {pos.isCurrent && (
                                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                                    {locale === "id" ? "Terkini" : "Current"}
                                  </span>
                                )}
                              </div>

                              <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted">
                                <span>{pos.period}</span>
                                <span>·</span>
                                <PositionDuration
                                  duration={pos.duration}
                                  durationKey={pos.durationKey}
                                  locale={locale}
                                />
                                {pos.location && (
                                  <>
                                    <span>·</span>
                                    <span>{pos.location}</span>
                                  </>
                                )}
                              </div>

                              <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">
                                {pos.description}
                              </p>

                              {pos.skills && pos.skills.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                  {pos.skills.map((skill) => (
                                    <span
                                      key={skill}
                                      className="rounded-md border border-border/60 bg-surface px-2 py-0.5 text-[11px] font-medium text-foreground/80"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {pos.certificateUrl && (
                                <a
                                  href={`${assetBasePath}${pos.certificateUrl}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm active:translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                >
                                  <FilePdf size={14} />
                                  {t.viewCertificate}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
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
