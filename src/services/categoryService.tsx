import axios from 'axios';

const API_URL = 'https://localhost:7048/api/WorkoutCategory'; 

export interface WorkoutCategoryDto{
  id: string;
  name: string
}

export const fetchCategories = async (): Promise<WorkoutCategoryDto[]> =>{
  const response = await axios.get<WorkoutCategoryDto[]>(`${API_URL}/all`);
  return response.data;
};


