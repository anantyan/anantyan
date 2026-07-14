import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { Button } from "@/components/ui/Button";
import { profile } from "@/lib/content";

export function Contact() {
  return (
    <section id="kontak" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <RevealSection>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Kontak
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Mari berkolaborasi membangun aplikasi berikutnya
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Terbuka untuk peluang penuh waktu, kontrak, maupun proyek freelance
            seputar Android, Flutter, dan iOS.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={18} />
              Hubungi Saya
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" download>
              Unduh CV
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-muted">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent"
            >
              <LinkedinLogo size={22} />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent"
            >
              <GithubLogo size={22} />
            </a>
          </div>
        </RevealSection>
      </div>
      <footer className="mx-auto mt-20 max-w-5xl border-t border-border pt-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {profile.name}. Dibuat dengan Next.js &
        Tailwind CSS.
      </footer>
    </section>
  );
}
