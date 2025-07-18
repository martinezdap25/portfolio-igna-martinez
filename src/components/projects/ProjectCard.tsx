'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import ImageCarousel from '../ui/ImageCarousel';
import { Dictionary } from '@/types/directory';

interface Props {
    project: Project;
    dict: Dictionary;
    lang: 'en' | 'es';
}

export default function ProjectCard({ project, dict, lang }: Props) {
    const title = project.title[lang];
    const shortDescription = project.shortDescription?.[lang];

    const mainImage =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        project.images?.find((img: any) => img.isMain) || project.images?.[0];

    return (
        <motion.div
            className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-300 dark:border-gray-800 h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            {mainImage && (
                <div className="rounded-t-lg border-b-2 border-indigo-500 bg-white dark:bg-zinc-900 overflow-hidden">
                    <ImageCarousel
                        images={project.images.map(img => ({
                            url: img.url,
                            alt: img.alt || title,
                        }))}
                        heightClass="h-56"
                        objectPosition="top"
                    />
                </div>
            )}

            <div className="p-4 flex flex-col gap-2 flex-grow">
                <div className="flex items-center justify-between">
                    {project.status && (
                        <span
                            className="self-start px-2 py-0.5 rounded-full text-xs font-semibold
                            bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100
                            whitespace-nowrap"
                        >
                            {project.status}
                        </span>
                    )}

                    <a
                        href={`/projects/${project._id}`}
                        className="mt-auto inline-block text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium self-start"
                    >
                        {dict.projects.seeMoreDetails}
                    </a>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>

                {shortDescription && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{shortDescription}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies?.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
