// app/[lang]/projects/[id]/page.tsx

import { notFound } from "next/navigation";
import { Project } from "@/types/project";
import { Dictionary } from "@/types/directory";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { fetchProjectById } from "@/services/projectsService";
import Image from "next/image";

type PageProps = {
    params: {
        lang: "en" | "es";
        id: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProjectPage({ params }: PageProps) {
    const { lang, id } = await params;

    const dict: Dictionary = await getDictionary(lang);

    let project: Project | null = null;

    try {
        project = await fetchProjectById(id);
    } catch {
        return notFound();
    }

    if (!project) return notFound();

    const mainImage = project.images.find((img) => img.isMain) || project.images[0];

    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{project.title[lang]}</h1>

            {mainImage && (
                <Image
                    width={800}
                    height={400}
                    src={mainImage.url}
                    alt={mainImage.alt || project.title[lang]}
                    className="w-full rounded-md shadow mb-6"
                    priority
                />
            )}

            <p className="mb-6">{project.description[lang]}</p>

            {/* Features */}
            {project.features && project.features.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{dict.projects.features || "Features"}</h2>
                    <ul className="list-disc list-inside">
                        {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{dict.projects.challenges || "Challenges"}</h2>
                    <ul className="list-disc list-inside">
                        {project.challenges.map((challenge, i) => (
                            <li key={i}>{challenge}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Learnings */}
            {project.learnings && project.learnings.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">{dict.projects.learnings || "Learnings"}</h2>
                    <ul className="list-disc list-inside">
                        {project.learnings.map((learning, i) => (
                            <li key={i}>{learning}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Links */}
            <div className="mt-6 flex gap-6">
                {project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        {dict.projects.visit || "Visit"} ↗
                    </a>
                )}

                {project.githubUrl && (
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        GitHub ↗
                    </a>
                )}
            </div>
        </main>
    );
}