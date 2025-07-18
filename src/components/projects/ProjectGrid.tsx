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
        return <p className="text-center py-10 animate-pulse">Cargando proyectos...</p>;
    }

    if (error) {
        return <p className="text-center py-10 text-red-500">Error al cargar los proyectos.</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {projects.map((proj) => (
                <ProjectCard key={proj._id} project={proj} />
            ))}
        </motion.div>
    );
}
