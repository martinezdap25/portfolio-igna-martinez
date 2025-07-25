'use client';

import { useContext } from 'react';
import { ProjectsContext } from '@/context/ProjectsContext';
import ProjectCard from './ProjectCard';
import ProjectGridSkeleton from '@/components/theme/ProjectGridSkeleton';
import { motion } from 'framer-motion';
import { Dictionary } from '@/types/directory';

interface Props {
    dict: Dictionary;
    lang: 'en' | 'es';
}

export default function ProjectGrid({ dict, lang }: Props) {
    const { projects, isLoading, error } = useContext(ProjectsContext);

    console.log(projects, dict);

    return (
        <section className="relative z-10 space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="backdrop-blur-sm bg-black/10 dark:bg-gray-600/20 border border-gray-300/20 dark:border-gray-700/20 shadow-md rounded-2xl p-4 sm:p-8"
            >
                <motion.h2
                    className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {lang === 'es' ? 'Proyectos destacados' : 'Featured Projects'}
                </motion.h2>

                {error ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="bg-red-100 text-red-600 px-6 py-4 rounded shadow">
                            <p>
                                {lang === 'es'
                                    ? 'Ocurrió un error al cargar los proyectos. Intenta de nuevo más tarde.'
                                    : 'An error occurred while loading the projects. Please try again later.'}
                            </p>
                        </div>
                    </div>
                ) : isLoading ? (
                    <ProjectGridSkeleton count={3} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects?.map((project, index) => (
                            <motion.div
                                key={project._id}
                                className="h-full"
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <ProjectCard project={project} dict={dict} lang={lang} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
}
