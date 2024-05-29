import React, { useState } from 'react';
import { LoginUserDto, login } from '../services/apiService';
import { useNavigate } from 'react-router-dom';



const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginUser: LoginUserDto = {
            email,
            password
        };

        try {
            const result = await login(loginUser);
            console.log('Login successful:', result);
            localStorage.setItem('token', result.token);
            navigate('/profile/edit');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

