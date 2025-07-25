"use client";

import React from "react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

interface Filters {
    category: string[];
    technology: string[];
    year: string | null;
    favoritesOrFeatured: string | null;
    orderBy: string | null;
    page: number;
    limit: number;
}

interface Technology {
    _id: string;
    name: string;
}

interface Category {
    _id: string;
    name: string;
}

interface SidebarFilterProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    isOpen: boolean;
    onClose: () => void;
    availableTechnologies: Technology[];
    availableCategories: Category[];
    availableYears: string[];
}

export default function SidebarFilter({
    filters,
    setFilters,
    isOpen,
    onClose,
    availableTechnologies,
    availableCategories,
    availableYears
}: SidebarFilterProps) {
    const { category, technology, year, favoritesOrFeatured, orderBy } = filters;

    const toggleCategory = (cat: string) => {
        if (category.includes(cat)) {
            setFilters(prev => ({ ...prev, category: prev.category.filter(c => c !== cat), page: 1 }));
        } else {
            setFilters(prev => ({ ...prev, category: [...prev.category, cat], page: 1 }));
        }
    };

    const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const techId = e.target.value;
        if (techId && !technology.includes(techId)) {
            setFilters(prev => ({ ...prev, technology: [...prev.technology, techId], page: 1 }));
        }
    };

    const removeTechnology = (techToRemove: string) => {
        setFilters(prev => ({ ...prev, technology: prev.technology.filter(t => t !== techToRemove), page: 1 }));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const y = e.target.value;
        setFilters(prev => ({ ...prev, year: y === "" ? null : y, page: 1 }));
    };

    const setFavorites = (val: string | null) => {
        setFilters(prev => ({ ...prev, favoritesOrFeatured: val, page: 1 }));
    };

    const setOrder = (val: string | null) => {
        setFilters(prev => ({ ...prev, orderBy: val, page: 1 }));
    };

    const clearFilters = () => {
        setFilters({
            category: [],
            technology: [],
            year: null,
            favoritesOrFeatured: null,
            orderBy: null,
            page: 1,
            limit: 6,
        });
    };

    const favoriteFeaturedOptions = ["Sí", "No"];
    const orderByOptions = [
        { label: "Más reciente", value: "year_desc" },
        { label: "Más antiguo", value: "year_asc" },
        { label: "Nombre (A-Z)", value: "name_asc" },
        { label: "Nombre (Z-A)", value: "name_desc" },
    ];

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose}></div>
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
            >
                <div className="p-6 space-y-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
                            Filtros
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label="Cerrar filtros"
                        >
                            <CloseIcon size={24} />
                        </button>
                    </div>

                    {/* Categoría */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Categoría
                        </h3>
                        <div className="flex flex-col space-y-3">
                            {availableCategories.map(cat => (
                                <label key={cat._id} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={category.includes(cat.name)}
                                        onChange={() => toggleCategory(cat.name)}
                                        className="peer appearance-none h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                                        checked:border-indigo-500 checked:bg-indigo-500
                                        focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium peer-checked:text-indigo-700 dark:peer-checked:text-indigo-400 transition">
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Tecnologías */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Tecnologías
                        </h3>
                        <select
                            onChange={handleTechnologyChange}
                            value=""
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        >
                            <option value="" disabled>
                                Seleccionar Tecnologías
                            </option>
                            {availableTechnologies.filter(tech => !technology.includes(tech._id)).map(tech => (
                                <option key={tech._id} value={tech._id}>
                                    {tech.name}
                                </option>
                            ))}
                        </select>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {technology.map(techId => {
                                const tech = availableTechnologies.find(t => t._id === techId);
                                return (
                                    <span
                                        key={techId}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100"
                                    >
                                        {tech?.name || "Tecnología"}
                                        <button
                                            type="button"
                                            onClick={() => removeTechnology(techId)}
                                            className="ml-2 -mr-0.5 h-4 w-4 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 hover:text-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Año */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Año
                        </h3>
                        <select
                            onChange={handleYearChange}
                            value={year || ""}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        >
                            <option value="">Seleccionar Año</option>
                            {availableYears.map(y => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Favoritos / Destacados */}
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
                                        onChange={() => setFavorites(value)}
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

                    {/* Orden */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Orden
                        </h3>
                        <div className="flex flex-col space-y-3">
                            {orderByOptions.map(({ label, value }) => (
                                <label key={value} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="orderBy"
                                        checked={orderBy === value}
                                        onChange={() => setOrder(value)}
                                        className="peer appearance-none h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
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

                    {/* Limpiar filtros */}
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
        </>
    );
}