import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addLocation, AddLocationDto } from '../services/locationService';

const AddLocationForm: React.FC = () => {
    const { authToken, user } = useAuth();
    const [formData, setFormData] = useState<AddLocationDto>(
      { city: '', 
        address: '',
        region: '',
        latitude: '',
        longitude: ' ',
        zipCode: '',
        maxCapacity: 0 });
    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addLocation(formData, localStorage.token); 
            setMessage('Location added successfully.');
        } catch (error) {
            console.error('Error adding location:', error);
            setMessage('Failed to add location.');
        }
    };

    if (user?.role !== 'Admin') {
        return <p>You do not have permission to add locations.</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </label>
                <label>
                    Region:
                    <input type="text" name="region" value={formData.region} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <label>
                    Latitude:
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} />
                </label>
                <label>
                    Longitude:
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} />
                </label>
                <label>
                    ZIP Code:
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                </label>
                <label>
                    Capacity:
                    <input type="text" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange} />
                </label>
                <button type="submit">Add Location</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddLocationForm;