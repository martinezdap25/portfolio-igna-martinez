export interface LocalizedText {
  es: string;
  en: string;
}

export interface Project {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  shortDescription?: Partial<LocalizedText>;
  features: string[];
  challenges: string[];
  learnings: string[];
  role?: string;
  duration?: string;
  technologies: string[];
  category: string;
  status: string;
  featured: boolean;
  images: {
    url: string;
    alt: string;
    isMain?: boolean;
  }[];
  url?: string;
  githubUrl?: string;
  teamSize?: number;
  createdAt?: string;
  updatedAt?: string;
}
