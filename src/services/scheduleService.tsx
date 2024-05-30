import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Schedule';

export interface ScheduleDto {
  id: string;
  date: string;
  time: string;
}

export const getAllSchedules = async (trainerId: string, workoutId: string, locationId: string, authToken: string): Promise<ScheduleDto[]> => {
  const response = await axios.get<ScheduleDto[]>(`${API_URL}/all`, {
    params: {
      trainerId,
      workoutId,
      locationId
    },
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return response.data;
};
