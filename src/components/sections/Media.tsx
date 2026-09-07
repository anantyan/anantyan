"use client";

import Image from "next/image";
import { ArrowUpRight, MediumLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { TiltCard3D } from "@/components/motion/TiltCard3D";
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
            <TiltCard3D className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-md transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
              <div
                className="relative h-48 w-full overflow-hidden transform-style-3d"
                style={{ transform: "translateZ(14px)" }}
              >
                <Image
                  src={`${assetBasePath}${media.coverImage}`}
                  alt={media.eventLabel}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className="flex flex-1 flex-col gap-3 p-6 transform-style-3d"
                style={{ transform: "translateZ(20px)" }}
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {media.eventLabel}
                </h3>
                <ul className="relative z-20 space-y-3">
                  {media.newsLinks.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-start gap-1.5 rounded-sm text-sm text-foreground transition-all duration-150 hover:text-accent hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span>
                          {link.headline}
                          <span className="block text-xs text-muted">
                            {link.outlet}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="mt-0.5 flex-none text-muted transition-colors group-hover/link:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard3D>
          </RevealSection>
          <RevealSection delay={0.1}>
            <TiltCard3D className="group flex h-full flex-col justify-between gap-4 rounded-3xl border border-border bg-background p-6 shadow-md transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
              <div
                className="transform-style-3d"
                style={{ transform: "translateZ(18px)" }}
              >
                <MediumLogo
                  size={26}
                  className="text-muted transition-colors group-hover:text-accent"
                />
                <p className="mt-4 text-xs font-medium uppercase tracking-widest text-accent">
                  {t.featuredHeading}
                </p>
                <a
                  href={media.featuredArticle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-balance text-lg font-semibold text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {media.featuredArticle.title}
                </a>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {media.featuredArticle.summary}
                </p>
              </div>
              <div
                className="relative z-20 transform-style-3d"
                style={{ transform: "translateZ(22px)" }}
              >
                <a
                  href={media.featuredArticle.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-all duration-150 hover:text-accent hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t.readArticle}
                  <ArrowUpRight
                    size={14}
                    className="flex-none text-muted transition-colors group-hover:text-accent"
                  />
                </a>
              </div>
            </TiltCard3D>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
