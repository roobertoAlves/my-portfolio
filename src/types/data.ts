import type { Locale } from "@/locales";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type SkillCategory =
  | "frontend"
  | "backend"
  | "game"
  | "cloud"
  | "tools"
  | "database"
  | "languages";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 1 | 2 | 3 | 4 | 5;
  keywords: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: LocalizedText;
  start: string; // ISO yyyy-mm
  end: string | null; // null = current
  location: string;
  summary: LocalizedList;
  highlights: LocalizedList;
  stack: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: LocalizedText;
  start: string;
  end: string | null;
  location: string;
  details: LocalizedList;
}

export type ProjectCategory =
  "web" | "fullstack" | "unity" | "game" | "backend" | "frontend" | "academic";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: LocalizedText;
  description: LocalizedText;
  category: ProjectCategory;
  stack: string[];
  cover: string; // /img/...
  repoUrl: string;
  demoUrl: string | null;
  year: number;
  featured: boolean;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface Profile {
  id: string;
  name: string;
  aliases: string[];
  role: LocalizedText;
  location: string;
  headline: LocalizedText;
  bio: LocalizedList;
  links: {
    github: string;
    linkedin: string;
  };
  avatar?: string;
  resume: {
    "pt-BR": string;
    en: string;
    es: string;
  };
}
