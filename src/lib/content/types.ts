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
  location: string;
  description: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
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

export type ContentData = {
  profile: Profile;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: string[];
  awards: string[];
  projects: Project[];
};
