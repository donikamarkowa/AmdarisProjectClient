import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Trainer'; 

export interface TrainerDto {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface TrainerFullNameDto {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PaginationParameters{
  pageNumber: number;
  pageSize: number
}

export interface TrainerDetailsDto {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
  bio?: string;
  weight?: number;
  height?: number;
  picture: string;
  phoneNumber?: string;
}


export const getTrainers = async (paginationParameters: PaginationParameters, authToken: string): Promise<TrainerDto[]> => {
  const response = await axios.get<TrainerDto[]>(`${API_URL}/all`, {
    params: paginationParameters,
    headers: {
      Authorization: `Bearer ${authToken}` 
    }
  });
  return response.data;
};

export const getTrainerDetails = async (id: string, authToken: string): Promise<TrainerDetailsDto> => {
  const response = await axios.get<TrainerDetailsDto>(`${API_URL}/details?id=${id}`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${localStorage.token}` 
    }
  });
  return response.data;
};

export const getTrainersByLocationId = async (locationId: string, authToken: string): Promise<TrainerDto[]> => {
  const response = await axios.get<TrainerDto[]>(`${API_URL}/location?id=${locationId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};

export const fetchTrainers = async (): Promise<TrainerFullNameDto[]> =>{
  const response = await axios.get<TrainerFullNameDto[]>(`${API_URL}/allNames`
  );
  return response.data;
};

export const searchTrainers = async (criteria: string, paginationParameters: PaginationParameters, authToken: string): Promise<TrainerDto[]> => {
  const response = await axios.get(`${API_URL}/search?criteria=${criteria}`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`
      },
      params: {
        params: { criteria, ...paginationParameters },
      }
  });
  return response.data;
};

export const searchByWorkout = async (workoutId: string, authToken: string): Promise<TrainerDto[]> => {
  const response = await axios.get(`${API_URL}/Trainer/trainersByWorkout`, {
    params: { id: workoutId},
      headers: {
          Authorization: `Bearer ${localStorage.token}`
      },
  });
  return response.data;
};




