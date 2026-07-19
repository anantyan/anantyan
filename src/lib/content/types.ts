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
  languages: { name: string; level: string }[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  duration: string;
  /**
   * Key into ongoing-start-dates.json — set only on the still-ongoing
   * ("Present"/"Sekarang") entry so its duration can be recomputed live
   * in the browser instead of staying frozen at build time.
   */
  durationKey?: string;
  location: string;
  description: string;
  certificateUrl?: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export type Certification = {
  label: string;
  url?: string;
};

export type ProjectIllustrationKey =
  | "wingson"
  | "secondhand"
  | "news"
  | "recipe"
  | "candidate";

export type ProjectLinks = {
  repo?: string;
  playStore?: string;
  appStore?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  year: string;
  links: ProjectLinks;
  illustration: ProjectIllustrationKey;
};

export type NewsLink = {
  headline: string;
  outlet: string;
  url: string;
};

export type FeaturedArticle = {
  title: string;
  summary: string;
  url: string;
  platform: string;
};

export type MediaCoverage = {
  eventLabel: string;
  coverImage: string;
  newsLinks: NewsLink[];
  featuredArticle: FeaturedArticle;
};

export type ContentData = {
  profile: Profile;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  awards: string[];
  projects: Project[];
  media: MediaCoverage;
};
