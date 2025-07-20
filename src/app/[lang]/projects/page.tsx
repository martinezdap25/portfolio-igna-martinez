import ProjectList from "@/components/projects/ProjectList";
import { getDictionary } from "../dictionaries";

export default async function ProjectsPage({ params }: { params: { lang: string } }) {

    const {lang} = await params;
    const safeLang = lang === "es" ? "es" : "en";
    const dict = await getDictionary(safeLang);

    return (
        <ProjectList lang={safeLang} dict={dict}/>
    );
}
