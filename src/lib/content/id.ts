import type { ContentData } from "./types";
import { formatOngoingDuration } from "@/lib/formatDuration";
import ongoingDuration from "./generated/ongoing-duration.json";

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
    languages: [
      { name: "Bahasa Indonesia", level: "Native" },
      { name: "Bahasa Inggris", level: "Professional Working" },
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
      company: "PT. Nera Teknologi Utama",
      role: "Mobile Developer",
      period: "November 2024 — Sekarang",
      duration: formatOngoingDuration(
        ongoingDuration["nera-teknologi-utama"],
        "id"
      ),
      durationKey: "nera-teknologi-utama",
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
      certificateUrl: "/certificates/synrgy-academy-android-engineering.pdf",
    },
    {
      company: "PT. Bank Mandiri (Persero) Tbk.",
      role: "Project-Based Virtual Intern — Mobile Developer",
      period: "Oktober 2023",
      duration: "1 bln",
      location: "Remote — via Rakamin Academy",
      description:
        "Mendalami pola desain MVVM, tata letak antarmuka berbasis material design, serta prinsip dan tooling unit testing.",
      certificateUrl: "/certificates/rakamin-bank-mandiri-internship.pdf",
    },
    {
      company: "Citiasia Inc. x Kampus Merdeka",
      role: "Mobile Developer (Magang Bersertifikat)",
      period: "Agustus 2022 — Desember 2022",
      duration: "5 bln",
      location: "Jakarta Selatan",
      description:
        "Mengembangkan aplikasi Flutter (Android + iOS) secara fundamental dan menerapkan pola BloC, dari awal hingga proyek MVP selesai, dalam kolaborasi tim.",
      certificateUrl: "/certificates/citiasia-internship.pdf",
    },
    {
      company: "Binar Academy",
      role: "Android Developer (Bootcamp)",
      period: "Februari 2022 — Juli 2022",
      duration: "6 bln",
      location: "Tangerang, Banten",
      description:
        "Studi independen bootcamp Android hingga level Expert/Gold pada pola desain MVVM, menuntaskan proyek tugas akhir berbasis MVP.",
      certificateUrl: "/certificates/binar-academy-bootcamp.pdf",
    },
    {
      company: "CV. Prima Arya Hutama",
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
    {
      id: "citiasia-msib",
      label:
        "Certificated Intern — Magang Bersertifikat Citiasia Inc. x Kampus Merdeka",
      url: "/certificates/citiasia-internship.pdf",
    },
    {
      id: "mobile-programming-101",
      label: "Mastering Mobile Programming Android — Skill Academy by Ruangguru",
      url: "/certificates/mobile-programming-101.pdf",
    },
    {
      id: "bank-mandiri-internship",
      label:
        "Certificate of Achievement — Bank Mandiri Mobile Apps Developer Project Based Internship",
      url: "/certificates/rakamin-bank-mandiri-internship.pdf",
    },
    {
      id: "rh-124",
      label: "RH 124 — Red Hat Enterprise Linux System Administration I",
      url: "/certificates/rh-124-linux-administration.pdf",
    },
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
  media: {
    eventLabel: "Lomba Karya Cipta Nasional Bangka Tengah 2016",
    coverImage: "/media/lkcn-bangka-tengah-2016.jpg",
    newsLinks: [
      {
        headline: "Sekda Buka LKCN Bangka Tengah 2016",
        outlet: "Tribun Bangka",
        url: "https://bangka.tribunnews.com/2016/12/06/sekda-buka-lkcn-bangka-tengah-2016",
      },
      {
        headline: "Siswa SMK Bangka Tengah Juara LKCN",
        outlet: "Antara News Babel",
        url: "https://babel.antaranews.com/berita/48690/siswa-smk-bangka-tengah-juara-lkcn",
      },
      {
        headline: "Bangka Tengah Tuan Rumah LKCN",
        outlet: "Antara News Babel",
        url: "https://babel.antaranews.com/berita/48172/bangka-tengah-tuan-rumah-lkcn",
      },
    ],
    featuredArticle: {
      title: "6 Fundamental Truths for Mastering the Modern Flutter Ecosystem",
      summary:
        "Prinsip arsitektur untuk menguasai Flutter — membandingkan pendekatan state management (Riverpod, BloC, Signals) dan membangun domain layer yang bersih dan teruji.",
      url: "https://anantyan.medium.com/6-fundamental-truths-for-mastering-the-modern-flutter-ecosystem-211518c6410c",
      platform: "Medium",
    },
  },
};
