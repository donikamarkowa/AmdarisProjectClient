import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Booking';

export const createBooking = async (workoutId: string, scheduleId: string): Promise<void> => {
  await axios.post(`${API_URL}/add?workoutId=${workoutId}&scheduleId=${scheduleId}`, null,{
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  });
};
