import { getDictionary } from "@/app/[lang]/dictionaries";
import AboutMe from "@/components/about-me/AboutMe";
import ProjectsGrid from "@/components/projects/ProjectGrid";
import { Dictionary } from "@/types/directory";

interface Props {
  params: Promise<{ lang: "en" | "es" }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;

  const dict: Dictionary = await getDictionary(lang);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <main>
        <AboutMe dict={dict} />

        <ProjectsGrid />
      </main>
    </div>
  );
}