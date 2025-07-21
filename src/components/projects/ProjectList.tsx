"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/ProjectsContext";
import { Dictionary } from "@/types/directory";
import ProjectFilters from "./ProjectFilters";
import ProjectGridPage from "./ProjectGridPage";
import FullPageLoader from "../ui/FullPageLoader";

interface Props {
    lang: "en" | "es";
    dict: Dictionary;
}

export default function ProjectList({ lang, dict }: Props) {
    const safeLang = lang === "es" ? "es" : "en";
    const { projects, isLoading, error } = useContext(ProjectsContext);

    if (isLoading)
        return <FullPageLoader />;
    if (error)
        return <p className="text-center py-4 text-red-500">Error: {error}</p>;
    if (!projects || projects.length === 0)
        return <p className="text-center py-4">No hay proyectos disponibles.</p>;

    return (
        <section className="max-w-7xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
                <ProjectFilters />
                <ProjectGridPage projects={projects} lang={safeLang} dict={dict} />
            </div>
        </section>
    );
}