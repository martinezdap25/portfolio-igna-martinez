"use client";

import { useContext } from "react";
import { ProjectsContext } from "@/context/ProjectsContext";
import Link from "next/link";

export default function ProjectList({ lang }: { lang: string }) {
    const safeLang = lang === "es" ? "es" : "en";

    const { projects, isLoading, error } = useContext(ProjectsContext);

    if (isLoading) return <p>Cargando proyectos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!projects || projects.length === 0) return <p>No hay proyectos disponibles.</p>;

    return (
        <section className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <Link
                    key={project._id}
                    href={`./${project._id}`}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-bold mb-2">{ project.title[safeLang] || project.title['es'] }</h2>
                </Link>
            ))}
        </section>
    );
}

