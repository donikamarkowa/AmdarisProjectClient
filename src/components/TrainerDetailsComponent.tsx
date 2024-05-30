import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainerDetails, TrainerDetailsDto } from '../services/trainerService';
import { useAuth } from '../contexts/AuthContext';


const TrainerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authToken} = useAuth();
    const [trainer, setTrainer] = useState<TrainerDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!authToken) {
            navigate('/trainers');
        } else {
            const fetchTrainerDetails = async (trainerId: string) => {
                try {
                    const trainerData = await getTrainerDetails(trainerId, authToken!);
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

    if (!authToken) {
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
            {trainer.age && <p>Age: {trainer.age}</p>}
            {trainer.bio && <p>Bio: {trainer.bio}</p>}
            {trainer.weight && <p>Weight: {trainer.weight}</p>}
            {trainer.height && <p>Height: {trainer.height}</p>}
            {trainer.phoneNumber && trainer.phoneNumber.trim() !== ' ' && <p>Phone Number: {trainer.phoneNumber}</p>}
        </div>
    );
};

export default TrainerDetails;
