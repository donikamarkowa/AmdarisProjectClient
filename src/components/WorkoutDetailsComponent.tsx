import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutDetails, WorkoutDetailsDto } from '../services/workoutService';
import { useAuth } from '../contexts/AuthContext';
import LocationComponent from './LocationComponent'; 


const WorkoutDetails: React.FC = () => {
    const { id: workoutId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authToken} = useAuth();
    const [workout, setWorkout] = useState<WorkoutDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!localStorage.token) {
            navigate('/workouts');
        } else {
            const fetchWorkoutDetails = async (workoutId: string) => {
                try {
                    const workoutData = await getWorkoutDetails(workoutId, authToken!);
                    setWorkout(workoutData);
                } catch (error) {
                    console.error('Error fetching workout details:', error);
                } finally {
                    setLoading(false);
                }
            };
            
            if (workoutId) {
                fetchWorkoutDetails(workoutId);
            } else {
                console.error('No workout ID provided.');
                navigate('/workouts');
            }
        }
    }, [authToken, workoutId, navigate]);

    if (!localStorage.token) {
        return <div>Please log in to view workout details.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!workout) {
        return <div>Workout not found.</div>;
    }

    return (
        <div className="workout-details-container">
            <h2>{workout.title}</h2>
            <img src={workout.picture} alt={workout.title} className="workout-image" />
            <p>{workout.description}</p>
            <p>Equipment Needed: {workout.equipmentNeeded}</p>
            <p>Duration: {workout.duration}</p>
            <p>Gender: {workout.gender}</p>
            <p>Intensity Level: {workout.intensityLevel}</p>
            <p>Status: {workout.status}</p>
            <p>Price: {workout.price}</p>
            <p>Category: {workout.workoutCategory}</p>

            <LocationComponent workoutId={workoutId!} />
        </div>
    );
};

export default WorkoutDetails;
