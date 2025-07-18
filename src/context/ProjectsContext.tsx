// context/ProjectsContext.tsx
"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { fetchProjects } from "@/services/projectsService";

type Project = {
    _id: string;
    title: string;
    description: string;
    url?: string;
    technologies: string[];
};

interface ProjectsContextType {
    projects: Project[] | null;
    isLoading: boolean;
    error: string | null;
    reloadProjects: () => void;
}

export const ProjectsContext = createContext<ProjectsContextType>({
    projects: null,
    isLoading: false,
    error: null,
    reloadProjects: () => { },
});

export function ProjectsProvider({ children }: { children: ReactNode }) {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProjects = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchProjects();
            setProjects(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Error al cargar proyectos");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <ProjectsContext.Provider
            value={{ projects, isLoading, error, reloadProjects: loadProjects }}
        >
            {children}
        </ProjectsContext.Provider>
    );
}
