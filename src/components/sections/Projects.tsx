import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProjectIllustration } from "@/components/ui/ProjectIllustration";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="proyek" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading
            eyebrow="Proyek"
            title="Karya Terpilih"
            description="Sebagian proyek mobile yang pernah saya bangun, dari MVP tugas belajar hingga aplikasi produksi."
          />
        </RevealSection>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <RevealSection key={project.slug} delay={Math.min(index * 0.05, 0.2)}>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-transform duration-200 hover:-translate-y-1"
              >
                <ProjectIllustration
                  variant={project.illustration}
                  className="h-40 w-full"
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="flex-none text-muted transition-colors group-hover:text-accent"
                    />
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </a>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
