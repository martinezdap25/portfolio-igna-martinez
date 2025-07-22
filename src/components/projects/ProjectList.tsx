/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectFilters from "./ProjectFilters"; // El filtro para desktop
import ProjectGridPage from "./ProjectGridPage";
import ProjectGridSkeleton from "@/components/theme/ProjectGridSkeleton";
import SidebarFilter from "./SidebarFilter"; // El nuevo filtro para móvil
import { Dictionary } from "@/types/directory";
import { fetchProjects } from "@/services/projectsService";
import { useIsDesktop } from "@/hooks/useIsDesktop"; // Importa el hook

import { FiFilter } from "react-icons/fi"; // Importa un icono de filtro

interface Props {
  lang: "en" | "es";
  dict: Dictionary;
}

interface Filters {
  category: string[];
  technology: string[];
  year: string | null;
  favoritesOrFeatured: string | null;
  orderBy: string | null;
  page: number;
  limit: number;
}

export default function ProjectList({ lang, dict }: Props) {
  const safeLang = lang === "es" ? "es" : "en";
  const isDesktop = useIsDesktop(); // Usa el hook
  const [showMobileFilters, setShowMobileFilters] = useState(false); // Estado para controlar el sidebar móvil

  const [filters, setFilters] = useState<Filters>({
    category: [],
    technology: [],
    year: null,
    favoritesOrFeatured: null,
    orderBy: null,
    page: 1,
    limit: 6,
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sanitizedFilters = {
        ...filters,
        year: filters.year ?? undefined,
        favoritesOrFeatured: filters.favoritesOrFeatured ?? undefined,
        orderBy: filters.orderBy ?? undefined,
      };
      const data = await fetchProjects(safeLang, sanitizedFilters);
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar proyectos");
    } finally {
      setIsLoading(false);
    }
  }, [filters, safeLang]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <section className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
        {/* Filtros para desktop (visible solo en pantallas grandes) */}
        {isDesktop && (
          <ProjectFilters filters={filters} setFilters={setFilters} />
        )}

        {/* Botón de filtro para móvil (visible solo en pantallas pequeñas) */}
        {!isDesktop && (
          <div className="lg:hidden w-full mb-4 px-4">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-md"
            >
              <FiFilter size={20} />
              Mostrar Filtros
            </button>
          </div>
        )}

        <div className="lg:col-span-3">
          {isLoading ? (
            <ProjectGridSkeleton />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No se encontraron proyectos con los filtros seleccionados.
            </p>
          ) : (
            <ProjectGridPage projects={projects} lang={safeLang} dict={dict} />
          )}
        </div>
      </div>

      {/* Sidebar de filtros para móvil */}
      <SidebarFilter
        filters={filters}
        setFilters={setFilters}
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
      />
    </section>
  );
}