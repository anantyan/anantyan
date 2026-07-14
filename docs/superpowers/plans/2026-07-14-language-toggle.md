# Language Toggle (Indonesian / English) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual (Indonesian/English) toggle to the portfolio, auto-detecting the visitor's browser language on first load, persisting their choice, with full content translated.

**Architecture:** A client-side React Context (`LocaleProvider`/`useLocale`) holds the active locale, seeded from `localStorage` or `navigator.language` after mount. All page sections become client components that read pre-bundled bilingual data (`content[locale]`) and UI copy (`ui[locale]`) instead of static imports. No routing changes, no `next.config.ts` changes — the static export still produces a single `index.html`.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS v4, Vitest (new — for the one pure-logic unit, see Global Constraints), Playwright (already used ad hoc for verification in this project).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-14-language-toggle-design.md` — every requirement in it applies to this plan.
- Project root: `/Users/anantyan/Documents/StaticWebApps/portfolio-anantyan`
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`) — already in use throughout the codebase.
- Node v26.4.0 / npm 11.17.0 (confirmed in this environment).
- `output: "export"` in `next.config.ts` stays untouched — do not add i18n routing config, `basePath`, or `generateStaticParams` for locales.
- Server/first paint always renders locale `"id"`. Locale detection and persistence only run client-side, after mount, inside `useEffect`. This is an accepted one-time flash, not a bug — do not try to "fix" it with `suppressHydrationWarning` tricks or server-side detection.
- Proper nouns (company names, project names, technology/skill names, place names) are **not translated** — only sentences/prose and UI labels are.
- **Testing strategy for this plan (read before Task 1):** this repo currently has zero test infrastructure (confirmed: no `jest`/`vitest`/`@testing-library` in `package.json`, no `__tests__`/`*.test.*` files, and no sibling project in this workspace has a test suite either — see `docs/superpowers/specs/2026-07-14-language-toggle-design.md` context). Introducing a full component-testing stack (jsdom + React Testing Library) for one toggle feature on a static personal-portfolio site is disproportionate and not requested. This plan therefore:
  - Adds **Vitest** (lightweight, no jsdom needed) with real TDD (red→green) for the one piece of genuine business logic: `detectInitialLocale` (Task 1). This is a pure function — a legitimate, cheap unit-test target.
  - For every other task (content data, context wiring, JSX/component changes), the "test cycle" is: `npx tsc --noEmit` (catches shape/prop mismatches immediately) + `npm run lint`, run after every task. These are real, runnable, deterministic checks — not a placeholder.
  - The final task (Task 13) is the actual behavioral verification: a headless-Playwright script that loads the dev server, exercises the switcher, and asserts the correct bilingual text appears in both directions. This mirrors exactly how the initial site build was verified earlier in this project (no new tooling pattern introduced).

---

### Task 1: Locale detection logic (Vitest, TDD)

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script and `vitest` devDependency)
- Create: `src/lib/i18n/detectLocale.ts`
- Test: `src/lib/i18n/detectLocale.test.ts`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `detectInitialLocale(storedLocale: string | null, browserLanguage: string | undefined): "id" | "en"` from `@/lib/i18n/detectLocale` — consumed by Task 4's `LocaleContext.tsx`

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Add the `test` script**

In `package.json`, add to `"scripts"` (alongside the existing `dev`/`build`/`start`/`lint`):

```json
"test": "vitest run"
```

- [ ] **Step 3: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Write the failing test**

Create `src/lib/i18n/detectLocale.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { detectInitialLocale } from "./detectLocale";

describe("detectInitialLocale", () => {
  it("returns the stored locale when it is a valid value", () => {
    expect(detectInitialLocale("en", "id-ID")).toBe("en");
  });

  it("falls back to browser language when nothing is stored", () => {
    expect(detectInitialLocale(null, "en-US")).toBe("en");
  });

  it("defaults to Indonesian when the browser language is not English", () => {
    expect(detectInitialLocale(null, "id-ID")).toBe("id");
  });

  it("defaults to Indonesian when the browser language is undefined", () => {
    expect(detectInitialLocale(null, undefined)).toBe("id");
  });

  it("ignores an invalid stored value and falls back to detection", () => {
    expect(detectInitialLocale("fr", "en-GB")).toBe("en");
  });
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npx vitest run src/lib/i18n/detectLocale.test.ts`
Expected: FAIL — `Cannot find module './detectLocale'`

- [ ] **Step 6: Write the minimal implementation**

Create `src/lib/i18n/detectLocale.ts`:

```ts
export type Locale = "id" | "en";

export function detectInitialLocale(
  storedLocale: string | null,
  browserLanguage: string | undefined,
): Locale {
  if (storedLocale === "id" || storedLocale === "en") {
    return storedLocale;
  }
  if (browserLanguage?.toLowerCase().startsWith("en")) {
    return "en";
  }
  return "id";
}
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `npx vitest run src/lib/i18n/detectLocale.test.ts`
Expected: PASS — 5 tests passed

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/i18n/detectLocale.ts src/lib/i18n/detectLocale.test.ts
git commit -m "feat: add locale detection logic with Vitest coverage"
```

---

### Task 2: Bilingual content data

**Files:**
- Create: `src/lib/content/types.ts`
- Create: `src/lib/content/id.ts`
- Create: `src/lib/content/en.ts`
- Create: `src/lib/content/index.ts`
- Delete: `src/lib/content.ts`

**Interfaces:**
- Consumes: `Locale` type is redefined locally here (see note below) — do NOT import it from `@/lib/i18n/detectLocale` to avoid a circular dependency; both modules independently define the same literal union and TypeScript treats them as structurally identical.
- Produces: `content: Record<Locale, ContentData>`, and types `Locale`, `ContentData`, `Profile`, `ExperienceItem`, `EducationItem`, `Project`, `ProjectIllustrationKey` — all importable from `@/lib/content`. Consumed by Tasks 6–12 (all section components) and by `src/components/ui/ProjectIllustration.tsx` (already imports `ProjectIllustrationKey` from `@/lib/content`).

- [ ] **Step 1: Create the shared types**

Create `src/lib/content/types.ts`:

```ts
export type Locale = "id" | "en";

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  summary: string;
  email: string;
  links: {
    linkedin: string;
    github: string;
  };
  resumeUrl: string;
  languages: { name: string; level: string }[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  description: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export type ProjectIllustrationKey = "wingson" | "secondhand" | "news" | "recipe";

export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  year: string;
  repoUrl: string;
  illustration: ProjectIllustrationKey;
};

export type ContentData = {
  profile: Profile;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  awards: string[];
  projects: Project[];
};
```

- [ ] **Step 2: Create the Indonesian content**

Create `src/lib/content/id.ts`:

```ts
import type { ContentData } from "./types";

export const idContent: ContentData = {
  profile: {
    name: "Arya Rezza Anantya",
    role: "Mobile Developer",
    location: "Purwokerto, Jawa Tengah, Indonesia",
    tagline:
      "Membangun aplikasi mobile yang rapi, teruji, dan siap tumbuh — dari Kotlin native hingga Flutter multiplatform.",
    summary:
      "Lulusan S1 Ilmu Komputer Universitas Amikom Purwokerto dengan pelatihan intensif di SYNRGY dan Binar Academy. Fokus pada pengembangan mobile menggunakan Kotlin, Android Jetpack, Swift, dan Dart/Flutter — termasuk penerapan arsitektur BloC, Clean Architecture, integrasi Firebase Cloud, dan REST API. Terbiasa berkolaborasi lintas peran dalam tim untuk merancang antarmuka yang mengikuti prinsip UI design modern.",
    email: "aryarezza@hotmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/anantyan",
      github: "https://github.com/anantyan",
    },
    resumeUrl: "/assets/resume.pdf",
    languages: [
      { name: "Bahasa Indonesia", level: "Native" },
      { name: "Bahasa Inggris", level: "Limited Working" },
    ],
  },
  skills: [
    "Kotlin",
    "Java",
    "Dart & Flutter",
    "Swift",
    "Android Jetpack",
    "Jetpack Compose",
    "BloC",
    "MVVM",
    "Clean Architecture",
    "Firebase",
    "Supabase",
    "REST API",
    "Material Design 3",
    "Unit Testing",
    "CI/CD",
  ],
  experience: [
    {
      company: "Nera Teknologi Utama",
      role: "Mobile Developer",
      period: "November 2024 — Sekarang",
      duration: "1 thn 9 bln",
      location: "Jakarta Selatan",
      description:
        "Mengembangkan aplikasi mobile dengan Flutter framework, termasuk beberapa implementasi kode native untuk kebutuhan performa dan integrasi platform-spesifik.",
    },
    {
      company: "PT. Omnifit Solusi Nusantara",
      role: "Android Developer",
      period: "Januari 2024 — November 2024",
      duration: "11 bln",
      location: "Jakarta Timur",
      description:
        "Mengembangkan dan menjaga performa aplikasi Android dengan Java dan Kotlin, menerapkan pengujian unit dan Clean Architecture, migrasi ke MVVM, konfigurasi Firebase Cloud, serta perancangan antarmuka dengan Material Design 3.",
    },
    {
      company: "SYNRGY Academy",
      role: "Android Developer (Pelatihan)",
      period: "Agustus 2023 — Februari 2024",
      duration: "7 bln",
      location: "Yogyakarta",
      description:
        "Menempuh jalur pelatihan hingga level Platinum: Navigation Jetpack, Single Activity Architecture, ViewModel & Room Database, Networking, Clean Architecture, Testing Usability, hingga CI/CD.",
    },
    {
      company: "PT Bank Mandiri (Persero) Tbk.",
      role: "Project-Based Virtual Intern — Mobile Developer",
      period: "Oktober 2023",
      duration: "1 bln",
      location: "Remote — via Rakamin Academy",
      description:
        "Mendalami pola desain MVVM, tata letak antarmuka berbasis material design, serta prinsip dan tooling unit testing.",
    },
    {
      company: "Citiasia Inc. x Kampus Merdeka",
      role: "Mobile Developer (Magang Bersertifikat)",
      period: "Agustus 2022 — Desember 2022",
      duration: "5 bln",
      location: "Jakarta Selatan",
      description:
        "Mengembangkan aplikasi Flutter (Android + iOS) secara fundamental dan menerapkan pola BloC, dari awal hingga proyek MVP selesai, dalam kolaborasi tim.",
    },
    {
      company: "Binar Academy",
      role: "Android Developer (Bootcamp)",
      period: "Februari 2022 — Juli 2022",
      duration: "6 bln",
      location: "Tangerang, Banten",
      description:
        "Studi independen bootcamp Android hingga level Expert/Gold pada pola desain MVVM, menuntaskan proyek tugas akhir berbasis MVP.",
    },
    {
      company: "CV Prima Arya Hutama",
      role: "Front End Developer",
      period: "Juli 2018 — Maret 2019",
      duration: "9 bln",
      location: "Banjarnegara, Jawa Tengah",
      description:
        "Membangun antarmuka klien dengan JavaScript vanilla yang terhubung ke REST API sisi server, serta merancang UI/UX sederhana untuk implementasi langsung.",
    },
  ],
  education: [
    {
      school: "Universitas Amikom Purwokerto",
      degree: "S1 Ilmu Komputer, Informatika",
      period: "September 2019 — Juli 2023",
    },
    {
      school: "SMK Negeri 1 Bawang",
      degree: "Rekayasa Perangkat Lunak",
      period: "2015 — 2018",
    },
  ],
  certifications: [
    "Certificated Intern — Magang Bersertifikat Citiasia Inc. x Kampus Merdeka",
    "Mobile Programming 101: Basic Android dan Kotlin",
    "Certificate of Achievement — Bank Mandiri Mobile Apps Developer Project Based Internship",
    "RH 124 — Red Hat Enterprise Linux System Administration I",
  ],
  awards: ["Lomba Karya Cipta Nasional Bangka Tengah", "LKS Web Design"],
  projects: [
    {
      slug: "wingson",
      name: "WingsOn",
      description:
        "Platform pemesanan tiket pesawat digital dengan alur pencarian, pemilihan kursi, dan checkout yang ringkas.",
      stack: ["Kotlin", "MVVM", "Firebase"],
      year: "2024",
      repoUrl: "https://github.com/anantyan/WingsOn",
      illustration: "wingson",
    },
    {
      slug: "secondhand",
      name: "SecondHand",
      description:
        "Marketplace jual-beli barang bekas dengan alur negosiasi harga antar pengguna secara langsung.",
      stack: ["Kotlin", "Clean Architecture", "Firebase"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/SecondHand",
      illustration: "secondhand",
    },
    {
      slug: "news-project",
      name: "News Project",
      description:
        "Portal berita yang terhubung ke NewsApi.org, menampilkan kategori dan pencarian artikel terkini.",
      stack: ["Kotlin", "REST API", "MVVM"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/News-Project",
      illustration: "news",
    },
    {
      slug: "synrgy-chapter-8",
      name: "SynrgyChapter8",
      description:
        "Aplikasi listing resep makanan & minuman — proyek tantangan akhir chapter pelatihan SYNRGY Academy.",
      stack: ["Kotlin", "Jetpack", "Room"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/SynrgyChapter8",
      illustration: "recipe",
    },
  ],
};
```

- [ ] **Step 3: Create the English content**

Create `src/lib/content/en.ts`:

```ts
import type { ContentData } from "./types";

export const enContent: ContentData = {
  profile: {
    name: "Arya Rezza Anantya",
    role: "Mobile Developer",
    location: "Purwokerto, Central Java, Indonesia",
    tagline:
      "Building mobile apps that are clean, well-tested, and built to scale — from native Kotlin to cross-platform Flutter.",
    summary:
      "A Computer Science graduate from Universitas Amikom Purwokerto with intensive training at SYNRGY and Binar Academy. Focused on mobile development using Kotlin, Android Jetpack, Swift, and Dart/Flutter — including BloC architecture, Clean Architecture, Firebase Cloud integration, and REST APIs. Experienced collaborating across cross-functional teams to design interfaces that follow modern UI design principles.",
    email: "aryarezza@hotmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/anantyan",
      github: "https://github.com/anantyan",
    },
    resumeUrl: "/assets/resume.pdf",
    languages: [
      { name: "Indonesian", level: "Native" },
      { name: "English", level: "Limited Working" },
    ],
  },
  skills: [
    "Kotlin",
    "Java",
    "Dart & Flutter",
    "Swift",
    "Android Jetpack",
    "Jetpack Compose",
    "BloC",
    "MVVM",
    "Clean Architecture",
    "Firebase",
    "Supabase",
    "REST API",
    "Material Design 3",
    "Unit Testing",
    "CI/CD",
  ],
  experience: [
    {
      company: "Nera Teknologi Utama",
      role: "Mobile Developer",
      period: "November 2024 — Present",
      duration: "1 yr 9 mo",
      location: "South Jakarta",
      description:
        "Developing mobile applications with the Flutter framework, including several native code implementations for performance and platform-specific integrations.",
    },
    {
      company: "PT. Omnifit Solusi Nusantara",
      role: "Android Developer",
      period: "January 2024 — November 2024",
      duration: "11 mo",
      location: "East Jakarta",
      description:
        "Developed and maintained Android application performance using Java and Kotlin, applied unit testing and Clean Architecture, migrated to MVVM, configured Firebase Cloud, and designed interfaces with Material Design 3.",
    },
    {
      company: "SYNRGY Academy",
      role: "Android Developer (Training)",
      period: "August 2023 — February 2024",
      duration: "7 mo",
      location: "Yogyakarta",
      description:
        "Completed the training track up to Platinum level: Navigation Jetpack, Single Activity Architecture, ViewModel & Room Database, Networking, Clean Architecture, Testing Usability, and CI/CD.",
    },
    {
      company: "PT Bank Mandiri (Persero) Tbk.",
      role: "Project-Based Virtual Intern — Mobile Developer",
      period: "October 2023",
      duration: "1 mo",
      location: "Remote — via Rakamin Academy",
      description:
        "Studied MVVM design patterns, material-design-based interface layouts, and unit testing principles and tooling.",
    },
    {
      company: "Citiasia Inc. x Kampus Merdeka",
      role: "Mobile Developer (Certified Internship)",
      period: "August 2022 — December 2022",
      duration: "5 mo",
      location: "South Jakarta",
      description:
        "Built Flutter applications (Android + iOS) from the ground up and applied the BloC pattern, taking an MVP project from kickoff to completion in a team setting.",
    },
    {
      company: "Binar Academy",
      role: "Android Developer (Bootcamp)",
      period: "February 2022 — July 2022",
      duration: "6 mo",
      location: "Tangerang, Banten",
      description:
        "Independent-study Android bootcamp reaching Expert/Gold level in the MVVM design pattern, completing a final MVP-based capstone project.",
    },
    {
      company: "CV Prima Arya Hutama",
      role: "Front End Developer",
      period: "July 2018 — March 2019",
      duration: "9 mo",
      location: "Banjarnegara, Central Java",
      description:
        "Built client-side interfaces in vanilla JavaScript connected to a server-side REST API, and designed simple UI/UX for direct implementation.",
    },
  ],
  education: [
    {
      school: "Universitas Amikom Purwokerto",
      degree: "B.Sc. Computer Science, Informatics",
      period: "September 2019 — July 2023",
    },
    {
      school: "SMK Negeri 1 Bawang",
      degree: "Software Engineering",
      period: "2015 — 2018",
    },
  ],
  certifications: [
    "Certified Intern — Citiasia Inc. x Kampus Merdeka Certified Internship Program",
    "Mobile Programming 101: Basic Android and Kotlin",
    "Certificate of Achievement — Bank Mandiri Mobile Apps Developer Project-Based Internship",
    "RH 124 — Red Hat Enterprise Linux System Administration I",
  ],
  awards: [
    "Bangka Tengah National Creative Works Competition",
    "LKS Web Design Competition",
  ],
  projects: [
    {
      slug: "wingson",
      name: "WingsOn",
      description:
        "A digital flight ticket booking platform with a streamlined search, seat selection, and checkout flow.",
      stack: ["Kotlin", "MVVM", "Firebase"],
      year: "2024",
      repoUrl: "https://github.com/anantyan/WingsOn",
      illustration: "wingson",
    },
    {
      slug: "secondhand",
      name: "SecondHand",
      description:
        "A marketplace for buying and selling used goods, with a direct price-negotiation flow between users.",
      stack: ["Kotlin", "Clean Architecture", "Firebase"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/SecondHand",
      illustration: "secondhand",
    },
    {
      slug: "news-project",
      name: "News Project",
      description:
        "A news portal connected to NewsApi.org, featuring categorized browsing and article search.",
      stack: ["Kotlin", "REST API", "MVVM"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/News-Project",
      illustration: "news",
    },
    {
      slug: "synrgy-chapter-8",
      name: "SynrgyChapter8",
      description:
        "A food and drink recipe listing app — the capstone challenge project for the SYNRGY Academy training track.",
      stack: ["Kotlin", "Jetpack", "Room"],
      year: "2023",
      repoUrl: "https://github.com/anantyan/SynrgyChapter8",
      illustration: "recipe",
    },
  ],
};
```

- [ ] **Step 4: Create the combined index**

Create `src/lib/content/index.ts`:

```ts
import type { ContentData, Locale } from "./types";
import { idContent } from "./id";
import { enContent } from "./en";

export * from "./types";

export const content: Record<Locale, ContentData> = {
  id: idContent,
  en: enContent,
};
```

- [ ] **Step 5: Delete the old single-locale content file**

Run: `rm src/lib/content.ts`

- [ ] **Step 6: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors listing every section component that still imports named values (`profile`, `skills`, etc.) directly from `@/lib/content` — this is expected; those are fixed in Tasks 6–12. Confirm the errors are ONLY in `src/components/sections/*.tsx`, not in `src/components/ui/ProjectIllustration.tsx` (which only imports the `ProjectIllustrationKey` type and should still resolve cleanly via the re-export in Step 4).

- [ ] **Step 7: Commit**

```bash
git add src/lib/content
git rm src/lib/content.ts
git commit -m "feat: restructure content into bilingual id/en data files"
```

---

### Task 3: UI copy dictionary

**Files:**
- Create: `src/lib/i18n/ui.ts`

**Interfaces:**
- Consumes: `Locale` type — defined locally in this file (same reasoning as Task 2: avoid a cross-import between `i18n` and `content`, both independently declare the `"id" | "en"` union).
- Produces: `ui: Record<Locale, UiStrings>`, type `UiStrings`, both importable from `@/lib/i18n/ui`. Consumed by Tasks 5–12.

- [ ] **Step 1: Create the dictionary**

Create `src/lib/i18n/ui.ts`:

```ts
export type Locale = "id" | "en";

export type UiStrings = {
  nav: {
    about: string;
    experience: string;
    projects: string;
    contact: string;
    contactCta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    viewProjects: string;
    downloadResume: string;
  };
  about: {
    eyebrow: string;
    title: string;
    skillsHeading: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
  };
  education: {
    eyebrow: string;
    title: string;
  };
  certifications: {
    eyebrow: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    contactMe: string;
    downloadResume: string;
    footerBuiltWith: string;
  };
  localeSwitcher: {
    buttonLabel: string;
  };
};

export const LANGUAGE_NAMES: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

export const ui: Record<Locale, UiStrings> = {
  id: {
    nav: {
      about: "Tentang",
      experience: "Pengalaman",
      projects: "Proyek",
      contact: "Kontak",
      contactCta: "Hubungi Saya",
      openMenu: "Buka menu navigasi",
      closeMenu: "Tutup menu navigasi",
    },
    hero: {
      viewProjects: "Lihat Proyek",
      downloadResume: "Unduh CV",
    },
    about: {
      eyebrow: "Tentang",
      title: "Ringkasan Profesional",
      skillsHeading: "Keahlian",
    },
    experience: {
      eyebrow: "Pengalaman",
      title: "Perjalanan Karier",
      description:
        "Dari front-end vanilla JS hingga mobile development lintas platform.",
    },
    projects: {
      eyebrow: "Proyek",
      title: "Karya Terpilih",
      description:
        "Sebagian proyek mobile yang pernah saya bangun, dari MVP tugas belajar hingga aplikasi produksi.",
    },
    education: {
      eyebrow: "Pendidikan",
      title: "Latar Belakang Akademik",
    },
    certifications: {
      eyebrow: "Sertifikasi & Penghargaan",
      title: "Pengakuan & Pencapaian",
    },
    contact: {
      eyebrow: "Kontak",
      title: "Mari berkolaborasi membangun aplikasi berikutnya",
      body: "Terbuka untuk peluang penuh waktu, kontrak, maupun proyek freelance seputar Android, Flutter, dan iOS.",
      contactMe: "Hubungi Saya",
      downloadResume: "Unduh CV",
      footerBuiltWith: "Dibuat dengan Next.js & Tailwind CSS.",
    },
    localeSwitcher: {
      buttonLabel: "Pilih bahasa",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      contactCta: "Contact Me",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
    },
    about: {
      eyebrow: "About",
      title: "Professional Summary",
      skillsHeading: "Skills",
    },
    experience: {
      eyebrow: "Experience",
      title: "Career Journey",
      description:
        "From vanilla JS front-end work to cross-platform mobile development.",
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Work",
      description:
        "A selection of mobile projects I've built, from learning-project MVPs to production apps.",
    },
    education: {
      eyebrow: "Education",
      title: "Academic Background",
    },
    certifications: {
      eyebrow: "Certifications & Awards",
      title: "Recognition & Achievements",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build the next app together",
      body: "Open to full-time, contract, and freelance opportunities in Android, Flutter, and iOS.",
      contactMe: "Contact Me",
      downloadResume: "Download Resume",
      footerBuiltWith: "Built with Next.js & Tailwind CSS.",
    },
    localeSwitcher: {
      buttonLabel: "Select language",
    },
  },
};
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: same pre-existing errors as end of Task 2 (nothing new/worse from this file, since nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/ui.ts
git commit -m "feat: add bilingual UI copy dictionary"
```

---

### Task 4: Locale context provider

**Files:**
- Create: `src/lib/i18n/LocaleContext.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `detectInitialLocale` from `@/lib/i18n/detectLocale` (Task 1); `Locale` type from `@/lib/content` (Task 2)
- Produces: `LocaleProvider` (component), `useLocale(): { locale: Locale; setLocale: (locale: Locale) => void }`, both from `@/lib/i18n/LocaleContext`. Consumed by Tasks 5–12 and by `layout.tsx`.

- [ ] **Step 1: Create the provider and hook**

Create `src/lib/i18n/LocaleContext.tsx`:

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/content";
import { detectInitialLocale } from "@/lib/i18n/detectLocale";

const STORAGE_KEY = "portfolio-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(
  undefined,
);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const detected = detectInitialLocale(stored, navigator.language);
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
```

- [ ] **Step 2: Wrap the app in the provider**

In `src/app/layout.tsx`, add the import and wrap `children`. The full file should read:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arya Rezza Anantya — Mobile Developer",
  description:
    "Portofolio Arya Rezza Anantya, Mobile Developer yang berfokus pada Kotlin, Flutter, dan Swift — pengalaman, proyek, dan cara menghubungi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: same pre-existing errors as before (unused-export errors in section files), nothing new from `layout.tsx` or `LocaleContext.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/i18n/LocaleContext.tsx src/app/layout.tsx
git commit -m "feat: add LocaleProvider and wire it into the root layout"
```

---

### Task 5: Locale switcher dropdown

**Files:**
- Create: `src/components/sections/LocaleSwitcher.tsx`

**Interfaces:**
- Consumes: `useLocale()` from `@/lib/i18n/LocaleContext` (Task 4); `ui`, `LANGUAGE_NAMES` from `@/lib/i18n/ui` (Task 3); `CaretDown` icon from `@phosphor-icons/react/ssr` (already a project dependency, confirmed present)
- Produces: `LocaleSwitcher` component, default-exported as a named export, consumed by Task 6 (`Nav.tsx`)

- [ ] **Step 1: Create the component**

Create `src/components/sections/LocaleSwitcher.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ui, LANGUAGE_NAMES, type Locale } from "@/lib/i18n/ui";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const options = Object.keys(LANGUAGE_NAMES) as Locale[];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ui[locale].localeSwitcher.buttonLabel}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
      >
        {LANGUAGE_NAMES[locale]}
        <CaretDown size={14} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-background shadow-lg"
        >
          {options.map((key) => (
            <button
              key={key}
              type="button"
              role="menuitemradio"
              aria-checked={locale === key}
              onClick={() => {
                setLocale(key);
                setOpen(false);
              }}
              className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-surface ${
                locale === key ? "font-medium text-accent" : "text-foreground"
              }`}
            >
              {LANGUAGE_NAMES[key]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: same pre-existing errors as before, nothing new from this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/LocaleSwitcher.tsx
git commit -m "feat: add locale switcher dropdown component"
```

---

### Task 6: Wire locale into Nav

**Files:**
- Modify: `src/components/sections/Nav.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `ui` (Task 3), `LocaleSwitcher` (Task 5)
- Produces: nothing new consumed elsewhere — `Nav` is rendered once from `page.tsx` (unchanged)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Nav.tsx`:

```tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react/ssr";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { ui } from "@/lib/i18n/ui";
import { LocaleSwitcher } from "@/components/sections/LocaleSwitcher";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();
  const t = ui[locale].nav;

  const links = [
    { href: "#tentang", label: t.about },
    { href: "#pengalaman", label: t.experience },
    { href: "#proyek", label: t.projects },
    { href: "#kontak", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight text-foreground">
          Arya Rezza Anantya
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <LocaleSwitcher />
          <a
            href="#kontak"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform active:scale-[0.98]"
          >
            {t.contactCta}
          </a>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-foreground"
            aria-expanded={open}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border/70 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 text-sm">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: errors remaining only for `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Education.tsx`, `Contact.tsx` (fixed in Tasks 7–12). No errors referencing `Nav.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Nav.tsx
git commit -m "feat: localize Nav and add the language switcher"
```

---

### Task 7: Wire locale into Hero

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Hero.tsx`:

```tsx
"use client";

import { Button } from "@/components/ui/Button";
import { HeroMonogram } from "@/components/sections/HeroMonogram";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Hero() {
  const { locale } = useLocale();
  const { profile } = content[locale];
  const t = ui[locale].hero;

  return (
    <section id="top" className="relative px-6 pb-20 pt-28 sm:pb-28 sm:pt-36">
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
          <Button href="#proyek">{t.viewProjects}</Button>
          <Button href={profile.resumeUrl} variant="secondary" download>
            {t.downloadResume}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: `Hero.tsx` no longer appears in the error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: localize Hero section"
```

---

### Task 8: Wire locale into About

**Files:**
- Modify: `src/components/sections/About.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/About.tsx`:

```tsx
"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function About() {
  const { locale } = useLocale();
  const { profile, skills } = content[locale];
  const t = ui[locale].about;

  return (
    <section id="tentang" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <RevealSection>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        </RevealSection>
        <div className="mt-10 grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <RevealSection delay={0.05}>
            <p className="max-w-[65ch] text-base leading-relaxed text-foreground/80 sm:text-lg">
              {profile.summary}
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              {profile.languages.map((lang) => (
                <div key={lang.name} className="flex items-baseline gap-2">
                  <dt className="font-medium text-foreground">{lang.name}</dt>
                  <dd>{lang.level}</dd>
                </div>
              ))}
            </dl>
          </RevealSection>
          <RevealSection delay={0.1}>
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
              {t.skillsHeading}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: `About.tsx` no longer appears in the error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: localize About section"
```

---

### Task 9: Wire locale into Experience

**Files:**
- Modify: `src/components/sections/Experience.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Experience.tsx`:

```tsx
"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

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
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: `Experience.tsx` no longer appears in the error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: localize Experience section"
```

---

### Task 10: Wire locale into Projects

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3), `ProjectIllustration` (existing, unchanged)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Projects.tsx`:

```tsx
"use client";

import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ProjectIllustration } from "@/components/ui/ProjectIllustration";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
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
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: `Projects.tsx` no longer appears in the error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: localize Projects section"
```

---

### Task 11: Wire locale into Education

**Files:**
- Modify: `src/components/sections/Education.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Education.tsx`:

```tsx
"use client";

import { RevealSection } from "@/components/motion/RevealSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Education() {
  const { locale } = useLocale();
  const { education, certifications, awards } = content[locale];
  const t = ui[locale];

  return (
    <section
      id="pendidikan"
      className="border-t border-border bg-surface/50 px-6 py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <RevealSection>
          <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />
          <div className="mt-8 space-y-6">
            {education.map((item) => (
              <div key={item.school}>
                <h3 className="font-semibold text-foreground">{item.school}</h3>
                <p className="text-sm text-accent">{item.degree}</p>
                <p className="text-sm text-muted">{item.period}</p>
              </div>
            ))}
          </div>
        </RevealSection>
        <RevealSection delay={0.1}>
          <SectionHeading
            eyebrow={t.certifications.eyebrow}
            title={t.certifications.title}
          />
          <ul className="mt-8 space-y-3 text-sm text-muted">
            {certifications.map((cert) => (
              <li key={cert} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                {cert}
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            {awards.map((award) => (
              <li key={award} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                {award}
              </li>
            ))}
          </ul>
        </RevealSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: `Education.tsx` no longer appears in the error output.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Education.tsx
git commit -m "feat: localize Education section"
```

---

### Task 12: Wire locale into Contact

**Files:**
- Modify: `src/components/sections/Contact.tsx`

**Interfaces:**
- Consumes: `useLocale()` (Task 4), `content` (Task 2), `ui` (Task 3)

- [ ] **Step 1: Replace the file**

Replace the full contents of `src/components/sections/Contact.tsx`:

```tsx
"use client";

import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { RevealSection } from "@/components/motion/RevealSection";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { content } from "@/lib/content";
import { ui } from "@/lib/i18n/ui";

export function Contact() {
  const { locale } = useLocale();
  const { profile } = content[locale];
  const t = ui[locale].contact;

  return (
    <section id="kontak" className="border-t border-border px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <RevealSection>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{t.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={18} />
              {t.contactMe}
            </Button>
            <Button href={profile.resumeUrl} variant="secondary" download>
              {t.downloadResume}
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
        © {new Date().getFullYear()} {profile.name}. {t.footerBuiltWith}
      </footer>
    </section>
  );
}
```

- [ ] **Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: zero errors — all section components have been migrated.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: localize Contact section"
```

---

### Task 13: Full verification (build, lint, bilingual behavioral check)

**Files:**
- None created/modified — this task only runs verification.

**Interfaces:**
- Consumes: the fully wired app from Tasks 1–12
- Produces: nothing (terminal task)

- [ ] **Step 1: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both clean, zero errors/warnings.

- [ ] **Step 2: Run the Vitest suite**

Run: `npx vitest run`
Expected: all 5 `detectInitialLocale` tests pass.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: static export succeeds, `out/index.html` regenerated.

- [ ] **Step 4: Start the dev server**

Run: `npm run dev &` then poll until ready:

```bash
timeout 30 bash -c 'until curl -sf http://localhost:3000 >/dev/null; do sleep 1; done'
```

- [ ] **Step 5: Write and run the bilingual behavioral check**

This project has no Playwright devDependency yet (it was installed ad hoc in a scratch directory during the initial build's verification, not saved to the project). Install it here so the check is reproducible in this repo:

Run: `npm install -D playwright && npx playwright install chromium`

Create a temporary script `scripts/check-locale-toggle.mjs` (delete after use, per Step 7):

```js
import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(err.message));

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

// Default render before hydration effects settle should already have
// resolved to Indonesian (machine has no en-* locale in this check).
await page.waitForSelector("text=Mobile Developer");
await page.waitForSelector("text=Lihat Proyek");

// Open the switcher and select English.
await page.locator('button[aria-label="Pilih bahasa"]').click();
await page.locator('button[role="menuitemradio"]:has-text("English")').click();

await page.waitForSelector("text=View Projects");
await page.waitForSelector("text=Career Journey");
await page.waitForSelector("text=Let's build the next app together");
const leftoverIndonesian = await page.locator("text=Lihat Proyek").count();
if (leftoverIndonesian !== 0) {
  errors.push("Indonesian CTA text still present after switching to English");
}

// Reload and confirm the choice persisted.
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector("text=View Projects");

await browser.close();

if (errors.length) {
  console.error("FAIL:", JSON.stringify(errors, null, 2));
  process.exit(1);
}
console.log("PASS: locale toggle works, no console errors, persists across reload");
```

Run: `node scripts/check-locale-toggle.mjs`
Expected: `PASS: locale toggle works, no console errors, persists across reload`

- [ ] **Step 6: Stop the dev server**

Run: `pkill -f "next dev"`

- [ ] **Step 7: Remove the temporary check script**

Run: `rm scripts/check-locale-toggle.mjs`

(Keep `playwright` as a devDependency — it's reusable for the next round of manual verification, matching what was already done ad hoc for the initial build.)

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add Playwright devDependency for bilingual verification"
```

## Self-Review Notes

- **Spec coverage:** every numbered requirement in `2026-07-14-language-toggle-design.md` maps to a task — auto-detect (Task 1 + 4), persistence (Task 4), dropdown UI (Task 5), full content translation (Task 2), SEO metadata staying Indonesian (Task 4 Step 2, explicit in `layout.tsx`), accessibility (Task 5's `aria-*` attributes, Task 4's `document.documentElement.lang` update).
- **Type consistency checked:** `Locale` union `"id" | "en"` is spelled identically in `detectLocale.ts`, `content/types.ts`, and `i18n/ui.ts`; `useLocale()`'s returned shape (`{ locale, setLocale }`) matches every consumer's destructuring across Tasks 6–12; `content[locale]` and `ui[locale]` property names matched against every section's usage.
- **No placeholders:** every step has complete, runnable code — confirmed by re-reading each task's Step blocks.
