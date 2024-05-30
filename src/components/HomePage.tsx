import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {/* Add content for the home page */}
            <Link to="/workouts">
                <button>Go to Workouts</button>
            </Link>
        </div>
    );
};

export default HomePage;
