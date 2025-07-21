"use client";

import { useState } from "react";

export default function ProjectFilters() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [favoritesOrFeatured, setFavoritesOrFeatured] = useState<string | null>(null);
    const [orderBy, setOrderBy] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const technology = e.target.value;
        if (technology && !selectedTechnologies.includes(technology)) {
            setSelectedTechnologies(prev => [...prev, technology]);
        }
    };

    const removeTechnology = (technologyToRemove: string) => {
        setSelectedTechnologies(prev => prev.filter(tech => tech !== technologyToRemove));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        setSelectedYear(year === "" ? null : year); // Set to null if "Seleccionar Año" is chosen
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedTechnologies([]);
        setSelectedYear(null);
        setFavoritesOrFeatured(null);
        setOrderBy(null);
    };

    // Dummy data for filters (you'd typically fetch these from an API)
    const availableCategories = ["Fullstack", "Frontend", "Backend"];
    const availableTechnologies = ["React", "Next.js", "Node.js", "Python", "Django", "TypeScript", "SQL", "MongoDB", "Express", "Vue.js"];
    const availableYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
    const favoriteFeaturedOptions = ["Sí", "No"];
    const orderByOptions = ["Más reciente", "Más antiguo", "Nombre (A-Z)"];

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
                        {availableCategories.map(label => (
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

                {/* === Tecnologías === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Tecnologías
                    </h3>
                    <select
                        onChange={handleTechnologyChange}
                        value="" // Esto asegura que el desplegable siempre muestre el placeholder o la primera opción después de seleccionar
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        <option value="" disabled>Seleccionar Tecnologías</option>
                        {availableTechnologies.filter(tech => !selectedTechnologies.includes(tech)).map(tech => (
                            <option key={tech} value={tech}>
                                {tech}
                            </option>
                        ))}
                    </select>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {selectedTechnologies.map(tech => (
                            <span
                                key={tech}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100"
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => removeTechnology(tech)}
                                    className="ml-2 -mr-0.5 h-4 w-4 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 hover:text-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* === Año === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Año
                    </h3>
                    <select
                        onChange={handleYearChange}
                        value={selectedYear || ""}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        <option value="">Seleccionar Año</option>
                        {availableYears.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* === Favoritos / Destacados === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Favoritos / Destacados
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {favoriteFeaturedOptions.map(value => (
                            <label key={value} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="favoritesOrFeatured"
                                    checked={favoritesOrFeatured === value}
                                    onChange={() => setFavoritesOrFeatured(value)}
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

                {/* === Orden === */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Orden
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {orderByOptions.map(order => (
                            <label key={order} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="orderBy"
                                    checked={orderBy === order}
                                    onChange={() => setOrderBy(order)}
                                    className="peer appearance-none h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                                    checked:border-indigo-500 checked:bg-indigo-500
                                    focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium peer-checked:text-indigo-700 dark:peer-checked:text-indigo-400 transition">
                                    {order}
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