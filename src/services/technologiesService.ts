import axios from 'axios';
import { Technology } from "@/types/project";

const API_URL = 'https://portfolio-back-ajd4.onrender.com';

export const getAllTechnologies = async (): Promise<Technology[]> => {
  try {
    const { data } = await axios.get<Technology[]>(`${API_URL}/technologies`);
    return data;
  } catch (error) {
    console.error('Error al obtener tecnologías:', error);
    throw new Error('Error al obtener tecnologías');
  }
};