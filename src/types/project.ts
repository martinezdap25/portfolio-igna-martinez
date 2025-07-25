export interface LocalizedText {
  es: string;
  en: string;
}

export interface LocalizedStringArray {
  es: string[];
  en: string[];
}

export interface Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Technology {
  _id: string;
  name: string;
  iconUrl?: string;
  category: string | Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface Image {
  _id: string;
  url: string;
  alt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  shortDescription?: Partial<LocalizedText>;
  features: LocalizedStringArray;
  challenges: LocalizedStringArray;
  learnings: LocalizedStringArray;
  role?: LocalizedText;
  duration?: LocalizedText;
  technologies: Technology[];
  category: Category;
  status: 'completed' | 'in-progress';
  featured: boolean;
  images: Image[];
  url?: string;         // deployUrl
  githubUrl?: string;   // repositoryUrl
  teamSize?: number;
  createdAt?: string;
  updatedAt?: string;
}
