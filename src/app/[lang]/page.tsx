import { getDictionary } from '@/app/[lang]/dictionaries';
import AboutMe from '@/components/about-me/AboutMe';
import ProjectsGrid from '@/components/projects/ProjectGrid';
import TechnologiesSection from '@/components/technologies/TechnologiesSection';
import { getAllTechnologies } from '@/services/technologiesService';
import { Technology } from '@/types/project';

interface Props {
  params: Promise<{ lang: 'en' | 'es' }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;

  const dict = await getDictionary(lang);
  const technologies: Technology[] = await getAllTechnologies();

  return (
    <div className="max-w-7xl mx-auto px-4">
      <main>
        <AboutMe dict={dict} />
        <section className="mb-8">
          <ProjectsGrid dict={dict} lang={lang} />
        </section>
        <section className="mb-8">
          <TechnologiesSection technologies={technologies} dict={dict} />
        </section>
      </main>
    </div>
  );
}