/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProjects(
  filters: {
    category?: string[];
    technology?: string[];
    year?: string;
    favoritesOrFeatured?: "featured" | "not_featured"; // más claro con valores explícitos
    orderBy?: string; // ejemplo: "name_asc"
    page?: number;
    limit?: number;
  } = {}
) {
  const {
    category,
    technology,
    year,
    favoritesOrFeatured,
    orderBy,
    page = 1,
    limit = 6,
  } = filters;

  const params = new URLSearchParams();

  if (category?.length) {
    category.forEach((catId) => params.append("category", catId));
  }

  if (technology?.length) {
    technology.forEach((techId) => params.append("technology", techId));
  }

  if (year) {
    params.append("year", year);
  }

  if (favoritesOrFeatured === "featured") {
    params.append("featured", "true");
  } else if (favoritesOrFeatured === "not_featured") {
    params.append("featured", "false");
  }

  // Sort (ordenamiento)
  if (orderBy) {
    params.append("sort", orderBy); // ej: name_asc, name_desc
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  try {
    const response = await axios.get(`${API_URL}/projects?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function fetchProjectById(id: string) {

  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("NOT_FOUND");
    }
    throw new Error("FETCH_ERROR");
  }
}

export async function fetchAvailableTechnologies() {
  const response = await axios.get(`${API_URL}/projects/technologies`);
  return response.data;
}

export async function fetchAvailableCategories() {
  const response = await axios.get(`${API_URL}/projects/categories`);
  return response.data;
}

export async function fetchAvailableYears() {
  const response = await axios.get(`${API_URL}/projects/years`);
  return response.data;
}