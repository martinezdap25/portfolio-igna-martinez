'use client';

import { FC, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import TechnologyCard from './TechnologyCard';

interface Technology {
    _id: string;
    name: string;
    iconUrl: string;
    category: {
        _id: string;
        name: string;
    } | null;
}

interface Props {
    technologies: Technology[];
}

const hardcodedCategories = ['All', 'Frontend', 'Backend', 'Tools', 'Fullstack'];

const TechnologiesSection: FC<Props> = ({ technologies }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredTechnologies =
        selectedCategory === 'All'
            ? technologies
            : technologies.filter((tech) => tech.category?.name === selectedCategory);

    return (
        <section className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Tecnologías por Categoría
                </h2>

                <CategoryFilter
                    categories={hardcodedCategories}
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />

                <div
                    className="flex flex-wrap justify-center gap-6
                        max-h-[500px] overflow-y-auto
                        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
                        dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-900
                        md:max-h-none md:overflow-visible"
                >
                    {filteredTechnologies.map((tech) => (
                        <TechnologyCard
                            key={tech._id}
                            name={tech.name}
                            iconUrl={tech.iconUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnologiesSection;
