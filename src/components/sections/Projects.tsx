"use client";

import { AppStoreLogo, ArrowUpRight, GooglePlayLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { TiltCard3D } from "@/components/motion/TiltCard3D";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProjectIllustration } from "@/components/ui/ProjectIllustration";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content, type Project } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Projects() {
  const { locale } = useLocale();
  const { projects } = content[locale];
  const t = ui[locale].projects;

  return (
    <section id="proyek" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
          />
        </RevealSection>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <RevealSection key={project.slug} delay={Math.min(index * 0.08, 0.25)}>
              <ProjectCard project={project} />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { repo, playStore, appStore } = project.links;

  return (
    <TiltCard3D className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-md transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 focus-within:ring-2 focus-within:ring-accent">
      <div style={{ transform: "translateZ(14px)" }} className="transform-style-3d">
        {repo ? (
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            title={`View ${project.name} on GitHub`}
          >
            <ProjectIllustration
              variant={project.illustration}
              className="h-40 w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>
        ) : (
          <ProjectIllustration
            variant={project.illustration}
            className="h-40 w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div
        className="flex flex-1 flex-col gap-3 p-6 transform-style-3d"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-center justify-between gap-2">
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="group/title inline-flex items-center gap-2 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <h3 className="text-balance text-lg font-semibold text-foreground transition-colors group-hover/title:text-accent">
                {project.name}
              </h3>
              <ArrowUpRight
                size={18}
                className="flex-none text-muted transition-colors group-hover/title:text-accent"
              />
            </a>
          ) : (
            <h3 className="text-balance text-lg font-semibold text-foreground">
              {project.name}
            </h3>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        {(playStore || appStore) && (
          <div className="relative z-20 flex flex-wrap gap-2 pt-2">
            {playStore && (
              <a
                href={playStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm active:translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <GooglePlayLogo size={14} />
                Google Play
              </a>
            )}
            {appStore && (
              <a
                href={appStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-sm active:translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <AppStoreLogo size={14} />
                App Store
              </a>
            )}
          </div>
        )}
      </div>
    </TiltCard3D>
  );
}
