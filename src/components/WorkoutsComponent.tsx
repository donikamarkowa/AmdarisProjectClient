import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkouts, WorkoutDto, PaginationParameters, searchByCategory, searchWorkouts, searchByTrainer } from '../services/workoutService';
import { useAuth } from '../contexts/AuthContext';
import { fetchCategories, WorkoutCategoryDto } from '../services/categoryService';
import { fetchTrainers, TrainerFullNameDto } from '../services/trainerService';
import './WorkoutsComponents.css';

const Workouts: React.FC = () => {
    const [workouts, setWorkouts] = useState<WorkoutDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(6);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTrainer, setSelectedTrainer] = useState<string>('');
    const [categories, setCategories] = useState<WorkoutCategoryDto[]>([]);
    const [trainers, setTrainers] = useState<TrainerFullNameDto[]>([]);
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
    }, [pageNumber, pageSize, searchCriteria, selectedCategory, selectedTrainer, authToken]);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchTrainersData = async () => {
            try {
                const trainersData = await fetchTrainers();
                setTrainers(trainersData);
            } catch (error) {
                console.error('Error fetching trainers:', error);
            }
        };

        fetchCategoriesData();
        fetchTrainersData();
    }, [authToken]);

    const handleSearch = async () => {
        try {
            setPageNumber(1);
            const paginationParameters: PaginationParameters = { pageNumber: 1, pageSize };
            const workoutsData: WorkoutDto[] = await searchWorkouts(searchCriteria, paginationParameters, authToken!);
            setWorkouts(workoutsData);
            setSelectedCategory('');
            setSelectedTrainer('');
        } catch (error) {
            console.error('Error searching workouts:', error);
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

    const handleWorkoutClick = (id: string) => {
        if (localStorage.token) {
            navigate(`/workout/details/${id}`);
        } else {
            console.error('Authentication token is null');
        }
    };

    const handleFilter = async () => {
        try {
            if (selectedCategory) {
                const workoutsData = await searchByCategory(selectedCategory, authToken!);
                setWorkouts(workoutsData);
            } else if (selectedTrainer) {
                const workoutsData = await searchByTrainer(selectedTrainer, authToken!);
                setWorkouts(workoutsData);
            } else {
                console.log('No filters selected');
            }
        } catch (error) {
            console.error('Error filtering workouts:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="workouts-container">
            <h2>Workouts</h2>
            <div className="search-container">
                <div className="search-placeholder">
                    <input id='input-work' type="text" placeholder="Search by name" value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="filter-placeholder">
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <select value={selectedTrainer} onChange={(e) => setSelectedTrainer(e.target.value)}>
                        <option value="">Trainers</option>
                        {trainers.map(trainer => (
                            <option key={trainer.id} value={trainer.id}>{trainer.firstName} {trainer.lastName}</option>
                        ))}
                    </select>
                    <button onClick={() => { handleFilter() }}>Filter</button>
                </div>
            </div>
            <div className="workouts-grid">
                {workouts.map(workout => (
                    <div key={workout.id} className="workout-card" onClick={(e) => {
                        e.preventDefault();
                        handleWorkoutClick(workout.id)
                    }}>
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
