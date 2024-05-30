import React, { useState } from 'react';
import { LoginUserDto} from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Login: React.FC = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginUser: LoginUserDto = {
            email,
            password
        };

        try {
            await login(loginUser);
            navigate('/profile/edit');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

