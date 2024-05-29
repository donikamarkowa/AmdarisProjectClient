import React, { useState } from 'react';
import { editProfile, EditProfileDto } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const EditProfileForm: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated state:', isAuthenticated);
  const [formData, setFormData] = useState<EditProfileDto>({
    age: undefined,
    bio: '',
    weight: undefined,
    height: undefined,
    phoneNumber: '',
    picture: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editProfile(formData);
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <label>
            Age:
            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} />
          </label>
          <label>
            Bio:
            <input type="text" name="bio" value={formData.bio} onChange={handleChange} />
          </label>
          <label>
            Weight:
            <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} />
          </label>
          <label>
            Height:
            <input type="number" name="height" value={formData.height || ''} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Picture:
            <input type="text" name="picture" value={formData.picture} onChange={handleChange} />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div>Please log in to edit your profile.</div>
      )}
    </div>
  );
};

export default EditProfileForm;
