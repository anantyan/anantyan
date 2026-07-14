import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="pengalaman"
      className="border-t border-border bg-surface/50 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading
            eyebrow="Pengalaman"
            title="Perjalanan Karier"
            description="Dari front-end vanilla JS hingga mobile development lintas platform."
          />
        </RevealSection>
        <div className="mt-10 divide-y divide-border border-t border-border">
          {experience.map((item, index) => (
            <RevealSection key={item.company} delay={Math.min(index * 0.05, 0.3)}>
              <div className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <div>
                  <p className="text-sm font-medium text-muted">{item.period}</p>
                  <p className="text-xs text-muted/70">{item.duration}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {item.company} · {item.location}
                  </p>
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
