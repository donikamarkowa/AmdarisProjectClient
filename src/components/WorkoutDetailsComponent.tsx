import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkoutDetails, WorkoutDetailsDto } from '../services/workoutService';
import { useAuth } from '../contexts/AuthContext';
import LocationComponent from './LocationComponent'; 
import './WorkoutDetailsComponent.css';
import  backgroundImage from '../assets/background.jpg';


const WorkoutDetails: React.FC = () => {
    const { id: workoutId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authToken} = useAuth();
    const [workout, setWorkout] = useState<WorkoutDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);


    const formatValue = (value: string | number | null | undefined, suffix?: string) => {
        if (value === null || value === undefined) return '';
        if (suffix === '€') {
            return `${value} ${suffix}`;
        }
        return suffix ? `${value} ${suffix}` : value.toString();
    };

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
        <>
            <div className="page-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="workout-details-container">
                <h2>{workout.title}</h2>
                <img src={workout.picture} alt={workout.title} className="workout-image" />
                <p>{workout.description}</p>
                <p><span className="detail-label">Equipment Needed:</span> {workout.equipmentNeeded}</p>
                <p><span className="detail-label">Duration:</span> {workout.duration}</p>
                <p><span className="detail-label">Gender:</span> {workout.gender}</p>
                <p><span className="detail-label">Intensity Level:</span> {workout.intensityLevel}</p>
                <p><span className="detail-label">Status:</span> {workout.status}</p>
                <p><span className="detail-label">Price:</span> {formatValue(workout.price, '€')}</p>
                <p><span className="detail-label">Category:</span> {workout.workoutCategory}</p>

                <LocationComponent workoutId={workoutId!} />
            </div>
        </>
    );
};


export default WorkoutDetails;
