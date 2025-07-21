"use client";

import { useState } from "react";

export default function ProjectFilters() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [featured, setFeatured] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setFeatured(null);
        setStatus(null);
    };

    return (
        <aside className="w-full max-w-xs sticky top-8 self-start hidden lg:block">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md ring-1 ring-gray-300 dark:ring-gray-700 p-6 space-y-8">
                <h2 className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
                    Filtros
                </h2>

                {/* === Categoría === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Categoría
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Fullstack", "Backend"].map(label => (
                            <label key={label} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(label)}
                                    onChange={() => toggleCategory(label)}
                                    className="peer appearance-none h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                                    checked:border-indigo-500 checked:bg-indigo-500
                                    focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium peer-checked:text-indigo-700 dark:peer-checked:text-indigo-400 transition">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* === Destacado === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Destacado
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Sí", "No"].map(value => (
                            <label key={value} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="featured"
                                    checked={featured === value}
                                    onChange={() => setFeatured(value)}
                                    className="peer appearance-none h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                                    checked:border-indigo-500 checked:bg-indigo-500
                                    focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium peer-checked:text-indigo-700 dark:peer-checked:text-indigo-400 transition">
                                    {value}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* === Estado === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Estado
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Completado"].map(estado => (
                            <label key={estado} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    checked={status === estado}
                                    onChange={() => setStatus(estado)}
                                    className="peer appearance-none h-5 w-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                                    checked:border-indigo-500 checked:bg-indigo-500
                                    focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium peer-checked:text-indigo-700 dark:peer-checked:text-indigo-400 transition">
                                    {estado}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* === Botón Limpiar === */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={clearFilters}
                        className="w-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>
        </aside>
    );
}