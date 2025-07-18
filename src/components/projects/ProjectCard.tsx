'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import ImageCarousel from '../ui/ImageCarousel';

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {
    const mainImage =
        project.images?.find((img) => img.isMain) || project.images?.[0];

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
                        images={project.images.map((img) => ({
                            url: img.url,
                            alt: img.alt || project.title,
                        }))}
                        heightClass="h-56"
                        objectPosition="top"
                    />
                </div>
            )}

            <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                </h3>
                {project.shortDescription && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {project.shortDescription}
                    </p>
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
