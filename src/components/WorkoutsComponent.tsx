import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, WorkoutDto, PaginationParameters  } from '../services/workoutService';
import { useAuth } from '../contexts/AuthContext';

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<WorkoutDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);
    const navigate = useNavigate();
    const { authToken } = useAuth(); 

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
              const paginationParameters: PaginationParameters = { pageNumber, pageSize };
                const workoutsData = await getWorkouts(paginationParameters, authToken!);
                setWorkouts(workoutsData);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [pageNumber, pageSize, authToken]);

    const handleNextPage = () => {
      setPageNumber(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
      if (pageNumber > 1) {
          setPageNumber(prevPage => prevPage - 1);
      }
  };

//   const handleWorkoutClick = (id: string) => {
//     navigate(`/workout/details/${id}`);
// };

const handleWorkoutClick = (id: string) => {
    if (authToken) {
        navigate(`/workout/details/${id}`);
    } else {
        console.error('Authentication token is null');
        // Handle the case where authToken is null, such as showing an error message or redirecting to the login page
    }
};


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div className="workouts-container">
          <h2>All Workouts</h2>
          <div className="workouts-grid">
              {workouts.map(workout => (
                  <div key={workout.id} className="workout-card" onClick={() => handleWorkoutClick(workout.id)}>
                      <img src={workout.picture} alt={workout.title} className="workout-image" />
                      <h3>{workout.title}</h3>
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

export default Workouts;
