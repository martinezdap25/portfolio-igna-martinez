/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchProjectById } from "@/services/projectsService";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string; lang: "es" | "en" }>; // params es una PROMESA
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id, lang } = await params; // 👈 importante: usar `await`

  const project = await fetchProjectById(id);
  if (!project) return <p>Proyecto no encontrado</p>;

  return (
    <article className="p-6">
      <h1 className="text-3xl font-bold mb-2">{project.title[lang]}</h1>
      <p className="mb-4 text-gray-700">{project.description[lang]}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {project.images.map((img: any) => (
          <Image
            key={img._id}
            src={img.url}
            alt={img.alt}
            width={600}
            height={400}
            className="rounded-lg"
          />
        ))}
      </div>

      <section className="my-6">
        <h2 className="text-xl font-semibold">Características</h2>
        <ul className="list-disc list-inside mt-2">
          {project.features[lang].map((feature: string, i: number) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="my-6">
        <h2 className="text-xl font-semibold">Desafíos</h2>
        <ul className="list-disc list-inside mt-2">
          {project.challenges[lang].map((challenge: string, i: number) => (
            <li key={i}>{challenge}</li>
          ))}
        </ul>
      </section>

      <section className="my-6">
        <h2 className="text-xl font-semibold">Aprendizajes</h2>
        <ul className="list-disc list-inside mt-2">
          {project.learnings[lang].map((learning: string, i: number) => (
            <li key={i}>{learning}</li>
          ))}
        </ul>
      </section>

      <p className="mt-4 text-sm text-gray-500">Rol: {project.role[lang]}</p>
      <p className="text-sm text-gray-500">Duración: {project.duration[lang]}</p>

      <div className="mt-4">
        <a href={project.url} className="text-blue-500 underline mr-4" target="_blank">Ver proyecto</a>
        <a href={project.githubUrl} className="text-blue-500 underline" target="_blank">Ver código</a>
      </div>
    </article>
  );
}
