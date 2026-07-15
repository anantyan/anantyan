"use client";

import { AppStoreLogo, ArrowUpRight, GooglePlayLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
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
            <RevealSection key={project.slug} delay={Math.min(index * 0.05, 0.2)}>
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
  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-transform duration-200 hover:-translate-y-1";

  const cardBody = (
    <>
      <ProjectIllustration
        variant={project.illustration}
        className="h-40 w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {project.name}
          </h3>
          {repo && (
            <ArrowUpRight
              size={18}
              className="flex-none text-muted transition-colors group-hover:text-accent"
            />
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
          <div className="flex flex-wrap gap-2 pt-1">
            {playStore && (
              <a
                href={playStore}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <AppStoreLogo size={14} />
                App Store
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );

  if (repo) {
    return (
      <a href={repo} target="_blank" rel="noreferrer" className={cardClass}>
        {cardBody}
      </a>
    );
  }

  return <div className={cardClass}>{cardBody}</div>;
}
