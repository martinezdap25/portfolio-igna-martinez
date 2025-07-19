import ProjectList from "@/components/projects/ProjectList";

export default async function ProjectsPage({ params }: { params: { lang: string } }) {

    const {lang} = await params;

    return (
        <ProjectList lang={lang} />
    );
}
