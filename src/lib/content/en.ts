import type { ContentData } from "./types";
import { formatOngoingDuration } from "@/lib/formatDuration";
import ongoingDuration from "./generated/ongoing-duration.json";

export const enContent: ContentData = {
  profile: {
    name: "Arya Rezza Anantya",
    role: "Platform AI Engineer & Mobile Developer",
    location: "Purwokerto, Central Java, Indonesia",
    tagline:
      "Bridging client-side multiplatform systems with scalable platform architectures — from high-performance Flutter & native Kotlin to AI-driven digital ecosystems.",
    summary:
      "A Computer Science graduate from Universitas Amikom Purwokerto with intensive training at SYNRGY and Binar Academy. Currently operating as a Platform AI Engineer & Mobile Developer, bridging production-grade multiplatform development (Flutter, native Kotlin, Swift) with scalable backend architectures, RESTful API orchestration, and resilient stateful data flows. Proven experience delivering end-to-end digital solutions, building AI-powered products, and applying Clean Architecture and rigorous engineering standards across web and mobile platforms.",
    email: "aryarezza@hotmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/anantyan",
      github: "https://github.com/anantyan",
    },
    languages: [
      { name: "Indonesian", level: "Native" },
      { name: "English", level: "Professional Working" },
    ],
  },
  skills: [
    "Platform AI",
    "Kotlin",
    "Dart & Flutter",
    "Swift",
    "Java",
    "System Architecture",
    "Android Jetpack",
    "Jetpack Compose",
    "BloC",
    "MVVM",
    "Clean Architecture",
    "RESTful API Orchestration",
    "Stateful Data Flow",
    "Firebase",
    "Supabase",
    "Unit Testing",
    "CI/CD",
  ],
  experience: [
    {
      company: "PT. Nera Teknologi Utama",
      employmentType: "Full-time",
      workplaceType: "Remote",
      location: "South Jakarta",
      period: "November 2024 — Present",
      duration: formatOngoingDuration(
        ongoingDuration["nera-teknologi-utama"],
        "en"
      ),
      durationKey: "nera-teknologi-utama",
      positions: [
        {
          role: "Platform AI Engineer",
          period: "September 2026 — Present",
          duration: formatOngoingDuration(
            ongoingDuration["nera-platform-ai"],
            "en"
          ),
          durationKey: "nera-platform-ai",
          location: "Jakarta Selatan",
          isCurrent: true,
          description:
            "Delivered end-to-end digital solutions by bridging client-side multiplatform development with scalable backend architectures. Spearheaded the development of production-grade mobile applications using Flutter and native Android (Kotlin), while expanding the core system scope to include responsive web frontends and reliable backend services. Designed RESTful API integrations, orchestrated stateful data flow across platforms, and built resilient server-side logic to ensure seamless data delivery, optimal performance, and high code quality across mobile and web environments.",
          skills: [
            "Platform AI",
            "Flutter",
            "Kotlin",
            "System Architecture",
            "RESTful API",
            "Stateful Data Flow",
          ],
        },
        {
          role: "Mobile Developer",
          period: "November 2024 — September 2026",
          duration: "1 yr 11 mo",
          location: "South Jakarta, Jakarta, Indonesia",
          isCurrent: false,
          description:
            "Architected and maintained cross-platform mobile applications using Flutter and Dart, integrating native platform channels (Kotlin) for low-level device capabilities and performance-critical modules. Developed Mimo Candidate — an AI-powered job-seeker mobile app (Android & iOS) — optimizing core state management and offline-first data caching.",
          skills: [
            "Mobile Application Development",
            "Flutter & Dart",
            "Kotlin Native Channels",
            "BloC Architecture",
            "Clean Architecture",
          ],
        },
      ],
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
      certificateUrl: "/certificates/synrgy-academy-android-engineering.pdf",
    },
    {
      company: "PT. Bank Mandiri (Persero) Tbk.",
      role: "Project-Based Virtual Intern — Mobile Developer",
      period: "October 2023",
      duration: "1 mo",
      location: "Remote — via Rakamin Academy",
      description:
        "Studied MVVM design patterns, material-design-based interface layouts, and unit testing principles and tooling.",
      certificateUrl: "/certificates/rakamin-bank-mandiri-internship.pdf",
    },
    {
      company: "Citiasia Inc. x Kampus Merdeka",
      role: "Mobile Developer (Certified Internship)",
      period: "August 2022 — December 2022",
      duration: "5 mo",
      location: "South Jakarta",
      description:
        "Built Flutter applications (Android + iOS) from the ground up and applied the BloC pattern, taking an MVP project from kickoff to completion in a team setting.",
      certificateUrl: "/certificates/citiasia-internship.pdf",
    },
    {
      company: "Binar Academy",
      role: "Android Developer (Bootcamp)",
      period: "February 2022 — July 2022",
      duration: "6 mo",
      location: "Tangerang, Banten",
      description:
        "Independent-study Android bootcamp reaching Expert/Gold level in the MVVM design pattern, completing a final MVP-based capstone project.",
      certificateUrl: "/certificates/binar-academy-bootcamp.pdf",
    },
    {
      company: "CV. Prima Arya Hutama",
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
    {
      id: "citiasia-msib",
      label:
        "Certified Intern — Citiasia Inc. x Kampus Merdeka Certified Internship Program",
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
        "Certificate of Achievement — Bank Mandiri Mobile Apps Developer Project-Based Internship",
      url: "/certificates/rakamin-bank-mandiri-internship.pdf",
    },
    {
      id: "rh-124",
      label: "RH 124 — Red Hat Enterprise Linux System Administration I",
      url: "/certificates/rh-124-linux-administration.pdf",
    },
  ],
  awards: [
    "Bangka Tengah National Creative Works Competition",
    "LKS Web Design Competition",
  ],
  projects: [
    {
      slug: "glimpse",
      name: "Glimpse",
      description:
        "Give yourself space to feel and let go anonymously without judgment through a daily journal.",
      stack: ["Flutter", "BloC", "Social Media", "Reactive"],
      year: "2024",
      links: {},
      illustration: "glimpse",
    },
    {
      slug: "mimo-candidate",
      name: "Mimo Candidate",
      description:
        "An AI-powered job-seeker mobile app for candidates (Android & iOS), built with Flutter and BloC architecture — live in production with real users.",
      stack: ["Flutter", "BloC", "AI Integration"],
      year: "2024 — Present",
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
        "A digital flight ticket booking platform with a streamlined search, seat selection, and checkout flow.",
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
        "A marketplace for buying and selling used goods, with a direct price-negotiation flow between users.",
      stack: ["Kotlin", "Clean Architecture", "Firebase"],
      year: "2023",
      links: { repo: "https://github.com/anantyan/SecondHand" },
      illustration: "secondhand",
    },
    {
      slug: "news-project",
      name: "News Project",
      description:
        "A news portal connected to NewsApi.org, featuring categorized browsing and article search.",
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
        "A food and drink recipe listing app — the capstone challenge project for the SYNRGY Academy training track.",
      stack: ["Kotlin", "Jetpack", "Room"],
      year: "2023",
      links: { repo: "https://github.com/anantyan/SynrgyChapter8" },
      illustration: "recipe",
    },
  ],
  media: {
    eventLabel: "Bangka Tengah National Creative Works Competition 2016",
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
        "Architectural principles for mastering Flutter — comparing state management approaches (Riverpod, BLoC, Signals) and building a clean, testable domain layer.",
      url: "https://anantyan.medium.com/6-fundamental-truths-for-mastering-the-modern-flutter-ecosystem-211518c6410c",
      platform: "Medium",
    },
  },
};
