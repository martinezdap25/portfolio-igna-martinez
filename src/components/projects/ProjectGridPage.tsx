"use client";

import ProjectCardLite from "./ProjectCardLite";
import { Dictionary } from "@/types/directory";

interface ProjectGridProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    projects: any[];
    lang: "en" | "es";
    dict: Dictionary;
}

export default function ProjectGridPage({ projects, lang, dict }: ProjectGridProps) {
    return (
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project._id} className="self-start">
                    <ProjectCardLite project={project} lang={lang} dict={dict} />
                </div>
            ))}
        </div>
    );
}
