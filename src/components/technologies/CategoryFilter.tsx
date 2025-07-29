'use client';

import { FC } from 'react';

interface Props {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

const CategoryFilter: FC<Props> = ({ categories, selected, onSelect }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        selected === category
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;