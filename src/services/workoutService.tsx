import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Workout'; 

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

export const getWorkouts = async (paginationParameters: PaginationParameters,  authToken: string): Promise<WorkoutDto[]> => {
  const response = await axios.get<WorkoutDto[]>(`${API_URL}/all`, {
    params: paginationParameters,
    headers: {
      Authorization: `Bearer ${authToken}` 
    }
  });
  return response.data;
};

export const getWorkoutDetails = async (id: string, authToken: string): Promise<WorkoutDetailsDto> => {
    const response = await axios.get<WorkoutDetailsDto>(`${API_URL}/details?id=${id}`, {
      params: { id },
      headers: {
        Authorization: `Bearer ${authToken}` 
      }
    });
    return response.data;
};

export const searchWorkouts = async (criteria: string, paginationParameters: PaginationParameters, authToken: string): Promise<WorkoutDto[]> => {
  const response = await axios.get(`${API_URL}/search?criteria=${criteria}`, {
      headers: {
          Authorization: `Bearer ${authToken}`
      },
      params: {
        params: { criteria, ...paginationParameters },
      }
  });
  return response.data;
};

export const searchByCategory = async (id: string, authToken: string): Promise<WorkoutDto[]> => {
  const response = await axios.get<WorkoutDto[]>(`${API_URL}/searchByCategory`, {
    params: { id: id},
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};

export const searchByTrainer = async (trainerId: string, authToken: string): Promise<WorkoutDto[]> => {
  const response = await axios.get(`${API_URL}/searchByTrainer`, {
    params: { id: trainerId},
      headers: {
          Authorization: `Bearer ${authToken}`
      },
  });
  return response.data;
};

