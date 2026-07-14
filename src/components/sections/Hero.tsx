import { Button } from "@/components/ui/Button";
import { HeroMonogram } from "@/components/sections/HeroMonogram";
import { profile } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative px-6 pb-20 pt-28 sm:pb-28 sm:pt-36"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <HeroMonogram />
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          {profile.location}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-foreground sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
          {profile.role}
        </p>
        <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted sm:text-lg">
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#proyek">Lihat Proyek</Button>
          <Button href={profile.resumeUrl} variant="secondary" download>
            Unduh CV
          </Button>
        </div>
      </div>
    </section>
  );
}
