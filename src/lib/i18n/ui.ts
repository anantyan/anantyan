export type Locale = "id" | "en";

export type UiStrings = {
  nav: {
    about: string;
    experience: string;
    projects: string;
    media: string;
    contact: string;
    contactCta: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    viewProjects: string;
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
    viewCertificate: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
  };
  media: {
    eyebrow: string;
    title: string;
    description: string;
    featuredHeading: string;
    readArticle: string;
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
    footerBuiltWith: string;
  };
  localeSwitcher: {
    buttonLabel: string;
  };
  themeToggle: {
    light: string;
    dark: string;
    system: string;
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
      media: "Media",
      contact: "Kontak",
      contactCta: "Hubungi Saya",
      openMenu: "Buka menu navigasi",
      closeMenu: "Tutup menu navigasi",
    },
    hero: {
      viewProjects: "Lihat Proyek",
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
      viewCertificate: "Lihat Sertifikat",
    },
    projects: {
      eyebrow: "Proyek",
      title: "Karya Terpilih",
      description:
        "Sebagian proyek mobile yang pernah saya bangun, dari MVP tugas belajar hingga aplikasi produksi.",
    },
    media: {
      eyebrow: "Sorotan Media",
      title: "Liputan & Tulisan",
      description:
        "Sorotan media dan tulisan teknis yang pernah saya publikasikan.",
      featuredHeading: "Artikel Unggulan",
      readArticle: "Baca di Medium",
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
      footerBuiltWith: "Dibuat dengan Next.js & Tailwind CSS.",
    },
    localeSwitcher: {
      buttonLabel: "Pilih bahasa",
    },
    themeToggle: {
      light: "Mode terang aktif — klik untuk ganti ke mode gelap",
      dark: "Mode gelap aktif — klik untuk ganti ke mode sistem",
      system: "Mode sistem aktif — klik untuk ganti ke mode terang",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      media: "Media",
      contact: "Contact",
      contactCta: "Contact Me",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      viewProjects: "View Projects",
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
      viewCertificate: "View Certificate",
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected Work",
      description:
        "A selection of mobile projects I've built, from learning-project MVPs to production apps.",
    },
    media: {
      eyebrow: "Media Coverage",
      title: "Press & Writing",
      description: "Press mentions and technical writing I've published.",
      featuredHeading: "Featured Article",
      readArticle: "Read on Medium",
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
      footerBuiltWith: "Built with Next.js & Tailwind CSS.",
    },
    localeSwitcher: {
      buttonLabel: "Select language",
    },
    themeToggle: {
      light: "Light mode active — click to switch to dark mode",
      dark: "Dark mode active — click to switch to system mode",
      system: "System mode active — click to switch to light mode",
    },
  },
};
