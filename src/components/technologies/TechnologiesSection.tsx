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
            : technologies.filter(
                (tech) => tech.category?.name === selectedCategory
            );

    return (
        <section>
            {/* Botones filtro */}
            <div className="flex justify-center flex-wrap gap-3 mb-6">
                {hardcodedCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg border transition-colors duration-300
                        ${selectedCategory === cat
                                ? 'bg-indigo-700 text-white border-indigo-700'
                                : 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-indigo-600 hover:border-indigo-600'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid tecnologías */}
            <div className="flex flex-wrap justify-center gap-6">
                {filteredTechnologies.map((tech) => {
                    const IconComponent =
                        (SiIcons as Record<string, IconType>)[tech.iconUrl] ||
                        (BiIcons as Record<string, IconType>)[tech.iconUrl];

                    return (
                        <div
                            key={tech._id}
                            className="bg-gray-900 rounded-2xl p-6 w-32 h-32 flex flex-col items-center justify-center shadow-md hover:shadow-indigo-700 cursor-pointer transition-all duration-300 hover:bg-indigo-700 group"
                        >
                            {IconComponent ? (
                                <div
                                    className="mb-3 text-gray-300 transition-transform duration-700 ease-in-out group-hover:rotate-y-360 group-hover:text-indigo-400"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transformOrigin: 'center',
                                    }}
                                >
                                    <IconComponent size={40} />
                                </div>
                            ) : (
                                <span className="text-red-500 text-4xl mb-3">
                                    ❌
                                </span>
                            )}
                            <span className="text-base font-semibold text-gray-100 text-center">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoriesGrid;
