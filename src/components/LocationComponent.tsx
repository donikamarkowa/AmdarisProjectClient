import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getLocationsByWorkoutId, LocationDto } from '../services/locationService';
import { getTrainersByLocationId, TrainerFullNameDto } from '../services/trainerService';

interface LocationComponentProps {
  workoutId: string;
}

const LocationComponent: React.FC<LocationComponentProps> = ({ workoutId }) => {
  const { authToken } = useAuth();
  const [locations, setLocations] = useState<LocationDto[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [trainers, setTrainers] = useState<TrainerFullNameDto[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');

  useEffect(() => {
    const fetchLocationsData = async () => {
      if (authToken) {
        const locationsData = await getLocationsByWorkoutId(workoutId, authToken);
        setLocations(locationsData);
      }
    };

    fetchLocationsData();
  }, [workoutId, authToken]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
    setSelectedAddress('');
    setSelectedLocationId('');
    setTrainers([]);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const address = event.target.value;
    setSelectedAddress(address);
    const location = locations.find(loc => loc.city === selectedCity && loc.address === address);
    setSelectedLocationId(location?.id || '');
  };

  const handleTrainerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrainer(event.target.value);
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
    </div>
  );
};

export default LocationComponent;
