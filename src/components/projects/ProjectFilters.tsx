/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

interface ProjectFiltersProps { }

export default function ProjectFilters({ }: ProjectFiltersProps) {
    return (
        <aside className="w-full max-w-xs sticky top-8 self-start hidden lg:block">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-gray-300 dark:ring-gray-700 p-6 space-y-8">
                <h2 className="text-xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-tight">
                    Filtros
                </h2>

                {/* Filtro: Categoría */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Categoría
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Fullstack", "Backend"].map((label) => (
                            <label
                                key={label}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-indigo-700 h-5 w-5 rounded border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-400 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium transition group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filtro: Destacado */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Destacado
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Sí", "No"].map((value) => (
                            <label
                                key={value}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="featured"
                                    className="accent-indigo-700 h-5 w-5 rounded-full bg-indigo-900 border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-400 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium rounded-full transition group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                                    {value}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Filtro: Estado */}
                <div>
                    <h3 className="text-base font-semibold text-gray-800 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Estado
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {["Completado"].map((estado) => (
                            <label
                                key={estado}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="radio"
                                    name="status"
                                    className="accent-indigo-700 h-5 w-5 border-gray-300 dark:border-gray-600 shadow-sm focus:ring-indigo-400 transition"
                                />
                                <span className="text-gray-700 dark:text-gray-300 font-medium transition group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                                    {estado}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}