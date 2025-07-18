// types/project.ts
export interface Project {
    _id: string;
    title: string;
    description: string;
    shortDescription?: string;
    url?: string;
    githubUrl?: string;
    technologies: string[];
    category?: string;
    status?: 'completed' | 'in-progress' | 'archived';
    featured?: boolean;
    images: { url: string; alt: string; isMain?: boolean }[];
    features?: string[];
    role?: string;
    teamSize?: number;
    duration?: string;
    challenges?: string[];
    learnings?: string[];
    createdAt?: string;
    updatedAt?: string;
}
