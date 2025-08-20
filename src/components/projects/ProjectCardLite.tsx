'use client';

import { Project } from '@/types/project';
import { Dictionary } from '@/types/directory';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    project: Project;
    dict: Dictionary;
    lang: 'en' | 'es';
}

export default function ProjectCardLite({ project, dict, lang }: Props) {
    const title = project.title[lang];
    const shortDescription = project.shortDescription?.[lang];
    const mainImage = project.images?.[0];

    return (
        <div className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow hover:shadow-lg transition-all duration-300 overflow-hidden h-[420px]">
            {/* Imagen con altura fija */}
            <div className="relative w-full h-[180px]">
                {mainImage ? (
                    <Image
                        src={mainImage.url}
                        alt={mainImage.alt || title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                        No image
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="flex flex-col p-4 flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
                    {title}
                </h3>

                {shortDescription && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
                        {shortDescription}
                    </p>
                )}

                {/* Tecnologías */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech, index) => (
                        <span
                            key={index}
                            className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white text-xs px-2 py-1 rounded-full"
                        >
                            {tech.name}
                        </span>
                    ))}
                </div>

                {/* CTA siempre al fondo */}
                <div className="mt-auto pt-4">
                    <Link
                        href={`/projects/${project._id}`}
                        className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        {dict.projects.seeMoreDetails}
                    </Link>
                </div>
            </div>
        </div>
    );
}
