/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

export async function fetchProjects(
  lang: string,
  filters: {
    category?: string[];
    technology?: string[];
    year?: string;
    favoritesOrFeatured?: string;
    orderBy?: string;
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

  params.append("lang", lang);
  if (category && category.length > 0)
    params.append("category", category.join(","));
  if (technology && technology.length > 0)
    params.append("technology", technology.join(","));
  if (year) params.append("year", year);
  if (favoritesOrFeatured) params.append("favoritesOrFeatured", favoritesOrFeatured);
  if (orderBy) params.append("orderBy", orderBy);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const response = await axios.get(`${API_URL}/projects/?${params.toString()}`);
  return response.data.data;
  
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