import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainerDetails, TrainerDetailsDto } from '../services/trainerService';


const TrainerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState<TrainerDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainerDetails = async (workoutId: string) => {
            try {
                const workoutData = await getTrainerDetails(workoutId);
                setTrainer(workoutData);
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
  }, [id, navigate]);

  useEffect(() => {
    if (!trainer && !loading) {
        navigate('/trainers');
    }
}, [trainer, loading, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!trainer) {
        return <div>Trainer not found.</div>;
    }

    return (
      <div className="trainer-details-container">
          <h2>Trainer Details</h2>
          <div>
              <img src={trainer.picture} alt={`${trainer.firstName} ${trainer.lastName}`} />
              <p>Name: {trainer.firstName} {trainer.lastName}</p>
              <p>Age: {trainer.age}</p>
              <p>Bio: {trainer.bio}</p>
              <p>Weight: {trainer.weight}</p>
              <p>Height: {trainer.height}</p>
              <p>Phone Number: {trainer.phoneNumber}</p>
          </div>
      </div>
  );
};

export default TrainerDetails;
