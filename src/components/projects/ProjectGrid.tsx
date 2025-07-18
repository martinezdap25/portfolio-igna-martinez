'use client';

import { useEffect, useState } from 'react';
import { fetchProjects } from '@/services/projectsService';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';
import { motion } from 'framer-motion';

export default function ProjectGrid() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchProjects()
            .then((data) => setProjects(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <motion.div
                    className="w-10 h-10 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Cargando proyectos...
                </motion.p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="bg-red-100 text-red-600 px-6 py-4 rounded shadow">
                    <p>Ocurrió un error al cargar los proyectos. Intenta de nuevo más tarde.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-10 space-y-6">
            {/* Fondo translúcido con tarjetas */}
            <div className="backdrop-blur-sm bg-black/10 dark:bg-gray-600/20 border border-gray-300/20 dark:border-gray-700/20 shadow-md rounded-2xl p-6">

                {/* Título */}
                <motion.h2
                    className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Proyectos destacados
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj, index) => (
                        <motion.div
                            key={proj._id}
                            className="h-full"
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <ProjectCard project={proj} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
