"use client";

import Image from "next/image";
import { ArrowUpRight, MediumLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";
import { assetBasePath } from "@/lib/assetBasePath";

export function Media() {
  const { locale } = useLocale();
  const { media } = content[locale];
  const t = ui[locale].media;

  return (
    <section id="media" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
          />
        </RevealSection>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <RevealSection delay={0.05}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background">
              <div className="relative h-48 w-full">
                <Image
                  src={`${assetBasePath}${media.coverImage}`}
                  alt={media.eventLabel}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  {media.eventLabel}
                </h3>
                <ul className="space-y-3">
                  {media.newsLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-start gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
                      >
                        <span>
                          {link.headline}
                          <span className="block text-xs text-muted">
                            {link.outlet}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="mt-0.5 flex-none text-muted transition-colors group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-4 rounded-3xl border border-border bg-background p-6">
              <div>
                <MediumLogo size={24} className="text-muted" />
                <p className="mt-4 text-xs font-medium uppercase tracking-widest text-accent">
                  {t.featuredHeading}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {media.featuredArticle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {media.featuredArticle.summary}
                </p>
              </div>
              <a
                href={media.featuredArticle.url}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {t.readArticle}
                <ArrowUpRight
                  size={14}
                  className="flex-none text-muted transition-colors group-hover:text-accent"
                />
              </a>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
