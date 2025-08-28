import ProjectList from "@/components/projects/ProjectList";
import { getDictionary } from "../dictionaries";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ lang: 'en' | 'es' }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const safeLang = lang === "es" ? "es" : "en";
  const dict = await getDictionary(safeLang);

  return {
    title: dict.titles.projects,
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { lang } = await params;
  const safeLang = lang === "es" ? "es" : "en";
  const dict = await getDictionary(safeLang);

  return <ProjectList lang={safeLang} dict={dict} />;
}
