'use client';

import { FC, useState } from 'react';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { IconType } from 'react-icons';

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

const CategoriesGrid: FC<Props> = ({ technologies }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredTechnologies =
        selectedCategory === 'All'
            ? technologies
            : technologies.filter((tech) => tech.category?.name === selectedCategory);

    return (
        <section className="max-w-7xl mx-auto">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                    Tecnologías por Categoría
                </h2>

                {/* Botones de filtro */}
                <div className="flex justify-center flex-wrap gap-3 mb-8">
                    {hardcodedCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`cursor-pointer px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium
                            ${selectedCategory === cat
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-indigo-500 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid de tecnologías */}
                <div className="flex flex-wrap justify-center gap-6
    max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900
    md:max-h-none md:overflow-visible">
                    {filteredTechnologies.map((tech) => {
                        const IconComponent =
                            (SiIcons as Record<string, IconType>)[tech.iconUrl] ||
                            (BiIcons as Record<string, IconType>)[tech.iconUrl];

                        return (
                            <div
                                key={tech._id}
                                className="bg-gray-900 rounded-xl w-[120px] h-[120px] flex flex-col items-center justify-center
                                shadow-md hover:shadow-indigo-700 transition-all duration-300 hover:bg-indigo-700 group cursor-pointer"
                            >
                                {IconComponent ? (
                                    <div
                                        className="mb-2 text-gray-300 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:text-white"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transformOrigin: 'center',
                                        }}
                                    >
                                        <IconComponent size={36} />
                                    </div>
                                ) : (
                                    <span className="text-red-500 text-3xl mb-2">❌</span>
                                )}
                                <span className="text-sm font-semibold text-gray-100 text-center">
                                    {tech.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );

};

export default CategoriesGrid;
