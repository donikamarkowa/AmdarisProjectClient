import axios from 'axios';

const API_URL = 'https://localhost:7048/api'; 

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
  const response = await axios.get<TrainerDto[]>(`${API_URL}/Trainer/all`, {
    params: paginationParameters,
    headers: {
      Authorization: `Bearer ${authToken}` 
    }
  });
  return response.data;
};

export const getTrainerDetails = async (id: string, authToken: string): Promise<TrainerDetailsDto> => {
  const response = await axios.get<TrainerDetailsDto>(`${API_URL}/Trainer/details?id=${id}`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${authToken}` 
    }
  });
  return response.data;
};

export const getTrainersByLocationId = async (locationId: string, authToken: string): Promise<TrainerDto[]> => {
  const response = await axios.get<TrainerDto[]>(`${API_URL}/Trainer/location?id=${locationId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};