import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainerDetails, TrainerDetailsDto } from '../services/trainerService';
import { useAuth } from '../contexts/AuthContext';
import './TrainerDetailsComponent.css';


const TrainerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authToken} = useAuth();
    const [trainer, setTrainer] = useState<TrainerDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);


    const formatValue = (value: string | number | null | undefined, suffix?: string) => {
        if (value === null || value === undefined) return '';
        return suffix ? `${value} ${suffix}` : value.toString();
    };
    

    useEffect(() => {
        if (!localStorage.token) {
            navigate('/trainers');
        } else {
            const fetchTrainerDetails = async (trainerId: string) => {
                try {
                    const trainerData = await getTrainerDetails(trainerId, localStorage.token);
                    setTrainer(trainerData);
                } catch (error) {
                    console.error('Error fetching trainer details:', error);
                } finally {
                    setLoading(false);
                }
            };
            
            if (id) {
                fetchTrainerDetails(id);
            } else {
                console.error('No trainer ID provided.');
                navigate('/trainers');
            }
        }
    }, [authToken, id, navigate]);

    if (!localStorage.token) {
        return <div>Please log in to view trainer details.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!trainer) {
        return <div>Trainer not found.</div>;
    }

    return (
        <div className="trainer-details-container">
            <h2>{trainer.firstName} {trainer.lastName}</h2>
            <img src={trainer.picture} alt={`${trainer.firstName} ${trainer.lastName}`} className="trainer-image" />
            {trainer.age && <p><span>Age:</span> {trainer.age}</p>}
            {trainer.bio && <p><span>Bio:</span> {trainer.bio}</p>}
            {trainer.weight && <p><span>Weight:</span> {formatValue(trainer.weight, 'kg')}</p>}
            {trainer.height && <p><span>Height:</span> {formatValue(trainer.height, 'cm')}</p>}
            {trainer.phoneNumber && trainer.phoneNumber.trim() !== '' && <p><span>Phone Number:</span> {trainer.phoneNumber}</p>}
        </div>
    );
};

export default TrainerDetails;
