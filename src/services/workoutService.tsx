import axios from 'axios';

const API_URL = 'https://localhost:7048/api'; 

export interface WorkoutDto {
    id: string;
    title: string;
    picture: string;
}

export interface PaginationParameters{
    pageNumber: number;
    pageSize: number
}

export interface WorkoutDetailsDto {
  id: string;
  title: string;
  description: string;
  equipmentNeeded: string;
  duration: string;
  gender: string;
  intensityLevel: string;
  status: string;
  picture: string;
  price: string;
  workoutCategory: string;
}

export const getWorkouts = async (paginationParameters: PaginationParameters): Promise<WorkoutDto[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get<WorkoutDto[]>(`${API_URL}/Workout/all`, {
      params: paginationParameters,
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return response.data;
};

export const getWorkoutDetails = async (id: string): Promise<WorkoutDetailsDto> => {
  const token = localStorage.getItem('token');
  const response = await axios.get<WorkoutDetailsDto>(`${API_URL}/Workout/details?id=${id}`, {
      params: { id },
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return response.data;
};
