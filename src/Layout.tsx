import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container">
                    <h1>Workout Reservations</h1>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/workouts">Workouts</a>
                        <a href="/trainers">Trainers</a>
                        <a href="/profile/edit">Profile</a>
                        <a href="/login">Login</a>
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
