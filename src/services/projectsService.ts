/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

export async function fetchProjects(lang: 'es' | 'en') {
  const response = await axios.get(`${API_URL}/projects`, {
    params: { lang }
  });
  return response.data;
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