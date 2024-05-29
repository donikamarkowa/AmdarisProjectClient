import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrainers, TrainerDto, PaginationParameters  } from '../services/trainerService';

const Trainers: React.FC = () => {
    const [trainers, setTrainers] = useState<TrainerDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
              const paginationParameters: PaginationParameters = { pageNumber, pageSize };
                const trainersData = await getTrainers(paginationParameters);
                setTrainers(trainersData);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainers();
    }, [pageNumber, pageSize]);

    const handleNextPage = () => {
      setPageNumber(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
      if (pageNumber > 1) {
          setPageNumber(prevPage => prevPage - 1);
      }
  };

  const handleTrainerClick = (id: string) => {
    navigate(`/trainer/details/${id}`);
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
