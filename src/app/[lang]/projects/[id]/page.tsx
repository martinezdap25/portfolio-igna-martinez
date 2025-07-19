import { fetchProjectById } from "@/services/projectsService";
import { notFound } from "next/navigation";
import { Dictionary } from "@/types/directory";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProjectDetail from "@/components/projects/ProjectDetail";

type PageProps = {
    params : { lang: "en" | "es"; id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProjectPage({ params }: PageProps) {
    const { lang, id } = await params;

    const dict: Dictionary = await getDictionary(lang);
    const project = await fetchProjectById(id);

    if (!project) {
        return notFound();
    }

    return (
        <section className="w-full">
            <ProjectDetail project={project} dict={dict} lang={lang} />
        </section>
    );
}
