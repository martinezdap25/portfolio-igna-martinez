'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/project';

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {
    const mainImage =
        project.images?.find((img) => img.isMain) || project.images?.[0];

    return (
        <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-gray-300 dark:border-gray-800"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {mainImage && (
                <div className="relative w-full h-48 md:h-56 lg:h-64">
                    <Image
                        src={mainImage.url}
                        alt={mainImage.alt}
                        fill
                        className="object-cover"
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
