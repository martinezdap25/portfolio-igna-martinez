/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectFilters from "./ProjectFilters";
import ProjectGridPage from "./ProjectGridPage";
import ProjectGridSkeleton from "@/components/theme/ProjectGridSkeleton";
import SidebarFilter from "./SidebarFilter";
import { Dictionary } from "@/types/directory";
import {
  fetchProjects,
  fetchAvailableTechnologies,
  fetchAvailableCategories,
  fetchAvailableYears,
} from "@/services/projectsService";
import { useIsDesktop } from "@/hooks/useIsDesktop";

import { FiFilter } from "react-icons/fi";

interface Props {
  lang: "en" | "es";
  dict: Dictionary;
}

interface Technology {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
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
  const isDesktop = useIsDesktop();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: [],
    technology: [],
    year: null,
    favoritesOrFeatured: null,
    orderBy: null,
    page: 1,
    limit: 6,
  });

  const [optionsLoaded, setOptionsLoaded] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTechnologies, setAvailableTechnologies] = useState<Technology[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoryIds = filters.category
        .map((name) => availableCategories.find((cat) => cat.name === name)?._id)
        .filter((id): id is string => !!id);

      const sanitizedFilters: Parameters<typeof fetchProjects>[0] = {
        category: categoryIds,
        technology: filters.technology,
        year: filters.year ?? undefined,
        favoritesOrFeatured:
          filters.favoritesOrFeatured === "Sí"
            ? "featured"
            : filters.favoritesOrFeatured === "No"
              ? "not_featured"
              : undefined,
        orderBy: filters.orderBy ?? undefined,
        page: filters.page,
        limit: filters.limit,
      };

      const data = await fetchProjects(sanitizedFilters);
      setProjects(data || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar proyectos");
    } finally {
      setIsLoading(false);
    }
  }, [filters, availableCategories]);

  useEffect(() => {
    if (optionsLoaded) {
      loadProjects();
    }
  }, [loadProjects, optionsLoaded]);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [techs, cats, years] = await Promise.all([
          fetchAvailableTechnologies(),
          fetchAvailableCategories(),
          fetchAvailableYears(),
        ]);
        setAvailableTechnologies(techs || []);
        setAvailableCategories(cats || []);
        setAvailableYears(years || []);
      } catch (err) {
        console.error("Failed to load filter options:", err);
      } finally {
        setOptionsLoaded(true);
      }
    };
    loadFilterOptions();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Desktop */}
        {isDesktop && (
          <ProjectFilters
            filters={filters}
            setFilters={setFilters}
            availableTechnologies={availableTechnologies}
            availableCategories={availableCategories}
            availableYears={availableYears}
            dict={dict}
          />
        )}

        {/* Main Grid */}
        <div className="relative lg:col-span-3">
          {/* Botón móvil */}
          {!isDesktop && (
            <div className="flex justify-between items-center mb-4">

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Proyectos</h3>

              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow transition"
              >
                <FiFilter size={18} />
                Filtros
              </button>
            </div>
          )}

          {/* Grid de proyectos */}
          {isLoading && projects.length === 0 ? (
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

      {/* Sidebar móvil */}
      <SidebarFilter
        filters={filters}
        setFilters={setFilters}
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        availableTechnologies={availableTechnologies}
        availableCategories={availableCategories}
        availableYears={availableYears}
        dict={dict}
      />
    </section>
  );
}
