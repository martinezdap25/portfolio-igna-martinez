/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchProjectById } from "@/services/projectsService";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import InfoCard from "@/components/projects/InfoCard";
import NotFound from "@/components/ui/NotFound";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ id: string; lang: "es" | "en" }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id, lang } = await params;
  const dict = await getDictionary(lang);

  let project;

  try {
    project = await fetchProjectById(id);
  } catch (error) {
    return <NotFound />;
  }

  if (!project) return <p>Proyecto no encontrado</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 transition-colors duration-300">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Carousel Card */}
        <div className="rounded-2xl shadow-sm bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 overflow-hidden p-4 sm:p-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              {project.title[lang]}
            </h1>
          </div>
          <div className="py-4">
            <ImageCarousel
              images={project.images}
              heightClass="h-64 sm:h-80 md:h-96"
            />
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
              {project.description[lang]}
            </p>
          </div>

          {/* Botones - SOLO hasta md */}
          <div className="flex flex-col gap-3 pt-4 md:hidden">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer group text-sm"
              >
                <FiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {dict.projects.visitPage}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-950 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer group text-sm"
              >
                <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {dict.projects.visitGithub}
              </a>
            )}
          </div>
        </div>

        {/* Info Card */}
        <InfoCard project={project} lang={lang} dict={dict} />

        {/* Tecnologías y meta info - SOLO en mobile */}
        <div className="md:hidden space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm p-4">
          {/* Tecnologías */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {dict.projects.technologies}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: { name: string }) => (
                <span
                  key={tech.name}
                  className="bg-indigo-200 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 text-xs px-3 py-1 rounded-full cursor-default"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </section>

          {/* Meta info */}
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>
              <strong>{dict.projects.role}:</strong> {project.role[lang]}
            </p>
            <p>
              <strong>{dict.projects.duration}:</strong> {project.duration[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - SOLO desde md */}
      <aside className="w-full rounded-2xl shadow-sm bg-gray-50 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 p-4 sm:p-6 space-y-6 animate-slide-up self-start hidden md:block">
        {/* Tecnologías */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {dict.projects.technologies}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: { name: string }) => (
              <span
                key={tech.name}
                className="bg-indigo-200 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm px-3 py-1 rounded-full cursor-default"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* Meta info */}
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p>
            <strong>{dict.projects.role}:</strong> {project.role[lang]}
          </p>
          <p>
            <strong>{dict.projects.duration}:</strong> {project.duration[lang]}
          </p>
        </div>

        {/* Botones - SOLO desde md */}
        <div className="flex flex-col gap-3 pt-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer group"
            >
              <FiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {dict.projects.visitPage}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-950 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer group"
            >
              <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {dict.projects.visitGithub}
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
