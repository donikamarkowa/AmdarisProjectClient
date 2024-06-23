import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './Layout.css';
import { useAuth } from './contexts/AuthContext';

const Layout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    
    return (
        <div className="layout">
            <header className="header">
                <div className="container">
                    <h1>Workie</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/workouts">Workouts</a>
                        <a href="/trainers">Trainers</a>
                        <a href="/profile/edit">Profile</a>
                        {isAuthenticated ? (
                        <button onClick={handleLogout}>Logout</button>
                        ) : (
                        <Link to="/login">Login</Link>
                        )}
                    </nav>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 Workout Reservations. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
