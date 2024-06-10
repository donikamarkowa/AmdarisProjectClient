import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrainers, TrainerDto, PaginationParameters, searchTrainers, searchByWorkouts  } from '../services/trainerService';
import { useAuth } from '../contexts/AuthContext';
import {  WorkoutTitleDto, fetchWorkoutsTitles } from '../services/workoutService';

const Trainers: React.FC = () => {
    const [trainers, setTrainers] = useState<TrainerDto[]>([]);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState<string>('');
    const [workouts, setWorkouts] = useState<WorkoutTitleDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);
    const navigate = useNavigate();
    const { authToken } = useAuth(); 

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
              const paginationParameters: PaginationParameters = { pageNumber, pageSize };
                const trainersData = await getTrainers(paginationParameters, authToken!);
                setTrainers(trainersData);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, [pageNumber, pageSize, searchCriteria, selectedWorkout, authToken]);

    useEffect(() => {
        const fecthWorkoutsData = async () => {
            try {
                const workoutsData = await fetchWorkoutsTitles(localStorage.token);
                setWorkouts(workoutsData);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };
        fecthWorkoutsData();
    }, [authToken]);

    const handleSearch = async () => {
        try {
            setPageNumber(1);
            const paginationParameters: PaginationParameters = { pageNumber: 1, pageSize };
            const trainersData: TrainerDto[] = await searchTrainers(searchCriteria, paginationParameters, authToken!);
            setTrainers(trainersData);
            setSelectedWorkout('');
        } catch (error) {
            console.error('Error searching trainers:', error);
        }
    };

    const handleNextPage = () => {
      setPageNumber(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
      if (pageNumber > 1) {
          setPageNumber(prevPage => prevPage - 1);
      }
  };


const handleTrainerClick = (id: string) => {
    if (localStorage.token) {
        navigate(`/trainer/details/${id}`);
    } else {
        console.error('Authentication token is null');
    }
};

const handleFilter = async () => {
    try {
      if (selectedWorkout) {
        const trainersData = await searchByWorkouts(selectedWorkout, authToken!);
        setTrainers(trainersData);
      } else {
        console.log('No filters selected');
      }
    } catch (error) {
      console.error('Error filtering trainers:', error);
    }
  };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trainers-container">
        <h2>All Trainers</h2>
        <div className="search-container">
          <input type="text" placeholder="Search by name" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
          <select value={selectedWorkout} onChange={(e) => setSelectedWorkout(e.target.value)}>
            <option value="">All Workouts</option>
            {workouts.map(workout => (
              <option key={workout.id} value={workout.id}>{workout.title}</option>
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
          <button onClick={() => { handleFilter()}}>Filter</button>
        </div>
            <div className="trainers-grid">
                {trainers.map(trainer => (
                    <div key={trainer.id} className="trainer-card" onClick={(e) => {
                        e.preventDefault();
                        handleTrainerClick(trainer.id)}}>
                        <img src={trainer.picture} alt={`${trainer.firstName} ${trainer.lastName}`} className="trainer-image" />
                        <h3>{trainer.firstName} {trainer.lastName}</h3>
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={pageNumber === 1}>Previous</button>
                <span>Page {pageNumber}</span>
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default Trainers;
