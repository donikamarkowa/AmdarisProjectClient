import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLocationsByWorkoutId, LocationDto } from '../services/locationService';
import { getTrainersByLocationId, TrainerFullNameDto } from '../services/trainerService';
import { getAllSchedules, ScheduleDto } from '../services/scheduleService';

interface LocationComponentProps {
  workoutId: string;
}

const Location: React.FC<LocationComponentProps> = ({ workoutId }) => {
  const { authToken } = useAuth();
  const [locations, setLocations] = useState<LocationDto[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [trainers, setTrainers] = useState<TrainerFullNameDto[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');
  const [schedules, setSchedules] = useState<ScheduleDto[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string>('');

  useEffect(() => {
    const fetchLocationsData = async () => {
      if (authToken) {
        const locationsData = await getLocationsByWorkoutId(workoutId, authToken);
        setLocations(locationsData);
      }
    };

    fetchLocationsData();
  }, [workoutId, authToken]);

  useEffect(() => {
    const fetchTrainersData = async () => {
      if (authToken && selectedLocationId) {
        const trainersData = await getTrainersByLocationId(selectedLocationId, authToken);
        setTrainers(trainersData);
      }
    };

    fetchTrainersData();
  }, [selectedLocationId, authToken]);

  useEffect(() => {
    const fetchSchedulesData = async () => {
      if (authToken && selectedTrainer) {
        const schedulesData = await getAllSchedules(selectedTrainer, workoutId, selectedLocationId, authToken);
        setSchedules(schedulesData);
      }
    };

    fetchSchedulesData();
  }, [selectedTrainer, authToken]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedAddress('');
    setSelectedLocationId('');
    setTrainers([]);
    setSchedules([]);
  };

  const handleAddressChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const address = event.target.value;
    setSelectedAddress(address);
    const location = locations.find(loc => loc.city === selectedCity && loc.address === address);
    if (location) {
      setSelectedLocationId(location.id);
      try {
        if (authToken) {
          const trainersData = await getTrainersByLocationId(location.id, authToken);
          setTrainers(trainersData);
          setSchedules([]);
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    }
  };

  const handleTrainerChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const trainerId = event.target.value;
    setSelectedTrainer(trainerId);
  };

  const handleScheduleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchedule(event.target.value);
  };

  useEffect(() => {
    const fetchTrainersData = async () => {
      if (authToken && selectedLocationId) {
        const trainersData = await getTrainersByLocationId(selectedLocationId, authToken);
        setTrainers(trainersData);
      }
    };

    fetchTrainersData();
  }, [selectedLocationId, authToken]);

  useEffect(() => {
    const fetchSchedulesData = async () => {
      if (authToken && selectedTrainer) {
        try {
          const schedulesData = await getAllSchedules(selectedTrainer, workoutId, selectedLocationId, authToken);
          setSchedules(schedulesData);
        } catch (error) {
          console.error('Error fetching schedules:', error);
        }
      }
    };

    fetchSchedulesData();
  }, [selectedTrainer, authToken, workoutId, selectedLocationId]);

  const cities = Array.from(new Set(locations.map(location => location.city)));
  const filteredAddresses = locations.filter(location => location.city === selectedCity);

  return (
    <div>
      <div>
        <label htmlFor="city">City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map(city => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div>
          <label htmlFor="address">Address:</label>
          <select id="address" value={selectedAddress} onChange={handleAddressChange}>
            <option value="">Select an address</option>
            {filteredAddresses.map(location => (
              <option key={location.id} value={location.address}>
                {location.address}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLocationId && (
        <div>
          <label htmlFor="trainer">Trainer:</label>
          <select id="trainer" value={selectedTrainer} onChange={handleTrainerChange}>
            <option value="">Select a trainer</option>
            {trainers.map(trainer => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.firstName} {trainer.lastName}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTrainer && (
        <div>
          <label htmlFor="schedule">Schedule:</label>
          <select id="schedule" value={selectedSchedule} onChange={handleScheduleChange}>
            <option value="">Select a schedule</option>
            {schedules.map(schedule => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.date}  {schedule.time}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Location;
