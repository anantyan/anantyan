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
    languages: [
      { name: "Indonesian", level: "Native" },
      { name: "English", level: "Professional Working" },
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
        "Developing Mimo Candidate — an AI-powered job-seeker mobile app (Android & iOS) — with the Flutter framework, including several native code implementations for performance and platform-specific integrations.",
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
};
