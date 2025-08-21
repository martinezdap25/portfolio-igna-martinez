"use client";

import { Dictionary } from "@/types/directory";
import React from "react";

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

interface ProjectFiltersProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    availableTechnologies: Technology[];
    availableCategories: Category[];
    availableYears: string[];
    dict: Dictionary;
}

export default function ProjectFilters({
    filters,
    setFilters,
    availableTechnologies,
    availableCategories,
    availableYears,
    dict,
}: ProjectFiltersProps) {
    const { category, technology, year, favoritesOrFeatured, orderBy } = filters;
    const t = dict.filtersSection;

    const toggleCategory = (cat: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category.includes(cat)
                ? prev.category.filter(c => c !== cat)
                : [...prev.category, cat],
            page: 1,
        }));
    };

    const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const techId = e.target.value;
        if (techId && !technology.includes(techId)) {
            setFilters(prev => ({ ...prev, technology: [...prev.technology, techId], page: 1 }));
        }
    };

    const removeTechnology = (techToRemove: string) => {
        setFilters(prev => ({
            ...prev,
            technology: prev.technology.filter(t => t !== techToRemove),
            page: 1,
        }));
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

    const favoriteFeaturedOptions = [t.yes, t.no];
    const orderByOptions = [
        { label: t.orderOptions.year_desc, value: "year_desc" },
        { label: t.orderOptions.year_asc, value: "year_asc" },
        { label: t.orderOptions.name_asc, value: "name_asc" },
        { label: t.orderOptions.name_desc, value: "name_desc" },
    ];

    return (
        <aside className="w-full max-w-xs sticky top-8 self-start hidden lg:block">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md ring-1 ring-gray-300 dark:ring-gray-700 p-6 space-y-8">
                <h2 className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
                    {t.title}
                </h2>

                {/* Categorías */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {t.category}
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {availableCategories.map(cat => (
                            <label
                                key={cat._id}
                                className={`flex items-center gap-3 cursor-pointer font-medium ${category.includes(cat.name)
                                    ? "text-indigo-700 dark:text-indigo-400"
                                    : "text-gray-700 dark:text-gray-300"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={category.includes(cat.name)}
                                    onChange={() => toggleCategory(cat.name)}
                                    className="appearance-none h-5 w-5 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
                             checked:border-indigo-500 checked:bg-indigo-500
                             focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-700 transition"
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tecnologías */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {t.technologies}
                    </h3>
                    <select
                        onChange={handleTechnologyChange}
                        value=""
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        <option value="" disabled>
                            {t.selectTechnologies}
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
                                    {tech?.name || t.technologies}
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
                        {t.year}
                    </h3>
                    <select
                        onChange={handleYearChange}
                        value={year || ""}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    >
                        <option value="">{t.selectYear}</option>
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
                        {t.favorites}
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {favoriteFeaturedOptions.map(value => {
                            const isSelected = favoritesOrFeatured === value;
                            return (
                                <label
                                    key={value}
                                    className={`flex items-center gap-3 cursor-pointer font-medium
            ${isSelected ? "text-indigo-700 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                    <span
                                        className={`inline-block w-5 h-5 rounded-full border-2
              ${isSelected
                                                ? "border-indigo-500 bg-indigo-500"
                                                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"} 
              transition`}
                                    />
                                    <input
                                        type="radio"
                                        name="favoritesOrFeatured"
                                        checked={isSelected}
                                        onChange={() => setFavorites(value)}
                                        className="hidden"
                                    />
                                    {value}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Orden */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        {t.order}
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {orderByOptions.map(({ label, value }) => {
                            const isSelected = orderBy === value;
                            return (
                                <label
                                    key={value}
                                    className={`flex items-center gap-3 cursor-pointer font-medium
            ${isSelected ? "text-indigo-700 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"}`}
                                >
                                    <span
                                        className={`inline-block w-5 h-5 rounded-full border-2
              ${isSelected
                                                ? "border-indigo-500 bg-indigo-500"
                                                : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"} 
              transition`}
                                    />
                                    <input
                                        type="radio"
                                        name="orderBy"
                                        checked={isSelected}
                                        onChange={() => setOrder(value)}
                                        className="hidden"
                                    />
                                    {label}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Botón Limpiar */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={clearFilters}
                        className="w-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                    >
                        {t.clear}
                    </button>
                </div>
            </div>
        </aside>
    );
}
