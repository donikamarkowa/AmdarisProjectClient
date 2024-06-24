import React, { useState, useEffect } from 'react';
import { editProfile, EditProfileDto, getProfile } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './EditProfileComponents.css';

const EditProfileForm: React.FC = () => {
  const { isAuthenticated, authToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EditProfileDto>({
    age: undefined,
    bio: '',
    gender: '',
    weight: undefined,
    height: undefined,
    phoneNumber: '',
    picture: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfile(localStorage.token);
        setFormData({
          age: profileData.age ?? undefined,
          bio: profileData.bio ?? '',
          gender: profileData.gender ?? '',
          weight: profileData.weight ?? undefined,
          height: profileData.height ?? undefined,
          phoneNumber: profileData.phoneNumber ?? '',
          picture: profileData.picture ?? '',
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [authToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value === '' ? undefined : (name === 'age' || name === 'weight' || name === 'height') ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editProfile(formData, authToken!);
      navigate('/');
    } catch (error) {
      console.error('Error editing profile:', error);
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };
  
  return (
    <div className="form-container">
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Age:
            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Bio:
            <input type="text" name="bio" value={formData.bio} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Gender:
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Weight:
            <input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Height:
            <input type="number" name="height" value={formData.height || ''} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Phone Number:
            <input type="text" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Picture:
            <input type="text" name="picture" value={formData.picture || ''} onChange={handleChange} className="form-input" />
          </label>
          <button type="submit" className="form-button">Save Changes</button>
          <button type="button" onClick={handleCancel} className="form-cancel">Cancel</button>
        </form>
      ) : (
        <div>Please log in to edit your profile.</div>
      )}
    </div>
  );
};

export default EditProfileForm;
