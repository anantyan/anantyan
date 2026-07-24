import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { StarField } from "@/components/motion/StarField";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { THEME_STORAGE_KEY } from "@/lib/theme/constants";
import { assetBasePath } from "@/lib/assetBasePath";
import "./globals.css";

// Runs before hydration, as the very first thing in <body>, so the correct
// theme class is applied before anything paints. This is a static export
// (no server-side rendering at request time), so this is the only way to
// avoid a light/dark flash on load — mirrors the pattern used by libraries
// like next-themes.
const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s==="light"||s==="dark"||s==="system"?s:"system";var d=t==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches:t==="dark";if(d){document.documentElement.classList.add("dark");}}catch(e){}})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://anantyan.github.io/anantyan/";
const title = "Arya Rezza Anantya — Mobile Developer";
const description =
  "Mobile Developer specializing in Kotlin, Flutter, and Swift — building production-ready Android and iOS apps. Explore my experience, projects, and get in touch for freelance or full-time opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Mobile Developer",
    "Flutter Developer",
    "Kotlin Developer",
    "Android Developer",
    "iOS Developer",
    "Freelance Mobile Developer",
    "Arya Rezza Anantya",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${assetBasePath}/icon.svg`,
    apple: `${assetBasePath}/apple-icon.png`,
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Arya Rezza Anantya — Portfolio",
    images: ["/opengraph-image.png"],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arya Rezza Anantya",
  jobTitle: "Mobile Developer",
  url: siteUrl,
  sameAs: ["https://www.linkedin.com/in/anantyan", "https://github.com/anantyan"],
  knowsAbout: ["Kotlin", "Flutter", "Swift", "Android Development", "iOS Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <StarField />
          <LocaleProvider>
            {children}
            <ThemeToggle />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
