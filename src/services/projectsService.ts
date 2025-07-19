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
  const response = await axios.get(`${API_URL}/projects/${id}`);
  return response.data;
}