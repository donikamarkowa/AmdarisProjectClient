import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Location';

export interface LocationDto {
  id: string;
  city: string;
  address: string;
}

export const getLocationsByWorkoutId = async (workoutId: string, authToken: string): Promise<LocationDto[]> => {
  const response = await axios.get<LocationDto[]>(`${API_URL}/byWorkout?id=${workoutId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
    return response.data;
};