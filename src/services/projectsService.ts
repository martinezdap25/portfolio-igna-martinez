// services/projectsService.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('🌐 API_URL:', API_URL);

export async function fetchProjects() {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
}
