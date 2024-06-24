import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Location';

export interface LocationDto {
  id: string;
  city: string;
  address: string;
}

export interface AddLocationDto {
  city: string;
  region: string;
  address: string;
  latitude: string;
  longitude: string;
  zipCode: string;
  maxCapacity: number;
}

export const getLocationsByWorkoutId = async (workoutId: string, authToken: string): Promise<LocationDto[]> => {
  const response = await axios.get<LocationDto[]>(`${API_URL}/byWorkout?id=${workoutId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
    return response.data;
};

export const addLocation = async (dto: AddLocationDto, authToken: string) => {
  const response = await axios.post(`${API_URL}/add`, dto, {
    headers: {
      Authorization: `Bearer: ${localStorage.token}`
    }
  });
  return response;
}