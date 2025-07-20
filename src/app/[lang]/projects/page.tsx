import ProjectList from "@/components/projects/ProjectList";
import { getDictionary } from "../dictionaries";

interface Props {
  params: Promise<{ lang: 'en' | 'es' }>;
}

export default async function ProjectsPage({ params }: Props) {

    const {lang} = await params;
    const safeLang = lang === "es" ? "es" : "en";
    const dict = await getDictionary(safeLang);

    return (
        <ProjectList lang={safeLang} dict={dict}/>
    );
}
