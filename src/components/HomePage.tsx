import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <Link to="/workouts">
                <button>Go to Workouts</button>
            </Link>
            <Link to="/trainers">
                <button>Go to Trainers</button>
            </Link>
            <Link to="/profile/edit">
                <button>Edit profile info</button>
            </Link>
        </div>
    );
};

export default HomePage;
