/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectFilters from "./ProjectFilters";
import ProjectGridPage from "./ProjectGridPage";
import ProjectGridSkeleton from "@/components/theme/ProjectGridSkeleton";
import { Dictionary } from "@/types/directory";
import { fetchProjects } from "@/services/projectsService";

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
        <ProjectFilters filters={filters} setFilters={setFilters} />
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
    </section>
  );
}
