import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import HomePage from './components/HomePage';
import WorkoutsComponent from './components/WorkoutsComponent';
import WorkoutDetailsComponent from './components/WorkoutDetailsComponent';
import TrainerComponent from './components/TrainerComponent';
import TrainerDetailsComponent from './components/TrainerDetailsComponent'
import EditProfileComponent from './components/EditProfileComponent';
import Layout from './Layout.tsx';
import './global.css';
import AddLocationForm from './components/AddLocation.tsx';


const App: React.FC = () => {
    return (
        <Router>
            <AuthProvider initialUser={null}>
                <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" Component={HomePage}/>
                  <Route path="/login" Component={LoginComponent} />
                  <Route path="/register" Component={RegisterComponent} />
                  <Route path="/profile/edit" Component={EditProfileComponent} />
                  <Route path="/workouts" Component={WorkoutsComponent} />
                  <Route path="/workout/details/:id" Component={WorkoutDetailsComponent} />
                  <Route path="/trainers" Component={TrainerComponent} />
                  <Route path="/trainer/details/:id" Component={TrainerDetailsComponent} />
                  <Route path="/add-location" element={<AddLocationForm />} />
                </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;