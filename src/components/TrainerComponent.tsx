import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrainers, TrainerDto, PaginationParameters  } from '../services/trainerService';
import { useAuth } from '../contexts/AuthContext';

const Trainers: React.FC = () => {
    const [trainers, setTrainers] = useState<TrainerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);
    const navigate = useNavigate();
    const { authToken } = useAuth(); 

    useEffect(() => {
        const fetchTraienrs = async () => {
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

        fetchTraienrs();
    }, [pageNumber, pageSize, authToken]);

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


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="trainers-container">
            <h2>All Trainers</h2>
            <div className="trainers-grid">
                {trainers.map(trainer => (
                    <div key={trainer.id} className="trainer-card" onClick={() => handleTrainerClick(trainer.id)}>
                        <img src={trainer.picture} alt={`${trainer.firstName} ${trainer.lastName}`} className="trainer-image" />
                        <div className="trainer-info">
                            <h3>{`${trainer.firstName} ${trainer.lastName}`}</h3>
                        </div>
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
