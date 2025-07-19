import { fetchProjectById } from "@/services/projectsService";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import InfoCard from "@/components/projects/InfoCard";

interface Props {
  params: Promise<{ id: string; lang: "es" | "en" }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id, lang } = await params;

  const project = await fetchProjectById(id);
  if (!project) return <p>Proyecto no encontrado</p>;

  return (
    <div className="max-w-7xl mx-auto py-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Carousel Card */}
        <div className="rounded-2xl shadow-sm bg-gray-50 ring-1 ring-gray-200 overflow-hidden p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{project.title[lang]}</h1>
          </div>
          <div className="py-4">
            <ImageCarousel images={project.images} heightClass="h-96" />
          </div>
          <div>
            <p className="text-gray-500 mt-2">{project.description[lang]}</p>
          </div>
        </div>

        {/* Info Card */}
        <InfoCard project={project} lang={lang} />
      </div>

      {/* Right Column */}
      <aside className="rounded-2xl shadow-sm bg-gray-50 ring-1 ring-gray-200 p-6 space-y-6 animate-slide-up self-start">
        {/* Tecnologías */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Tecnologías</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Meta info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Rol:</strong> {project.role[lang]}</p>
          <p><strong>Duración:</strong> {project.duration[lang]}</p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-4 pt-2">
          <a
            href={project.url}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer group"
          >
            <FiExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Visitar sitio
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer group"
          >
            <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Ver en GitHub
          </a>
        </div>
      </aside>

    </div>
  );
}
