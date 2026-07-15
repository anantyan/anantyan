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
    resumeUrl: "assets/resume.pdf",
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
        "Mengembangkan Mimo Candidate — aplikasi mobile pencari kerja berbasis AI (Android & iOS) — dengan Flutter framework, termasuk beberapa implementasi kode native untuk kebutuhan performa dan integrasi platform-spesifik.",
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
      slug: "mimo-candidate",
      name: "Mimo Candidate",
      description:
        "Aplikasi mobile pencari kerja berbasis AI untuk kandidat (Android & iOS), dibangun dengan Flutter dan arsitektur BloC — live di produksi dan dipakai pengguna nyata.",
      stack: ["Flutter", "BloC", "AI Integration"],
      year: "2024 — Sekarang",
      links: {
        playStore:
          "https://play.google.com/store/apps/details?id=id.mimo.app.mimo_candidate&hl=id",
        appStore: "https://apps.apple.com/id/app/mimo-candidate/id6754310239?l=id",
      },
      illustration: "candidate",
    },
    {
      slug: "wingson",
      name: "WingsOn",
      description:
        "Platform pemesanan tiket pesawat digital dengan alur pencarian, pemilihan kursi, dan checkout yang ringkas.",
      stack: ["Kotlin", "MVVM", "Firebase"],
      year: "2024",
      links: {
        repo: "https://github.com/SFPT2B6-SynrgyFinalProject/BookingTicket",
      },
      illustration: "wingson",
    },
    {
      slug: "secondhand",
      name: "SecondHand",
      description:
        "Marketplace jual-beli barang bekas dengan alur negosiasi harga antar pengguna secara langsung.",
      stack: ["Kotlin", "Clean Architecture", "Firebase"],
      year: "2023",
      links: { repo: "https://github.com/anantyan/SecondHand" },
      illustration: "secondhand",
    },
    {
      slug: "news-project",
      name: "News Project",
      description:
        "Portal berita yang terhubung ke NewsApi.org, menampilkan kategori dan pencarian artikel terkini.",
      stack: ["Kotlin", "REST API", "MVVM"],
      year: "2023",
      links: {
        repo: "https://github.com/anantyan/VirtualInternshipMandiri",
      },
      illustration: "news",
    },
    {
      slug: "synrgy-chapter-8",
      name: "SynrgyChapter8",
      description:
        "Aplikasi listing resep makanan & minuman — proyek tantangan akhir chapter pelatihan SYNRGY Academy.",
      stack: ["Kotlin", "Jetpack", "Room"],
      year: "2023",
      links: { repo: "https://github.com/anantyan/SynrgyChapter8" },
      illustration: "recipe",
    },
  ],
};
