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
  id: "ID",
  en: "EN",
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
