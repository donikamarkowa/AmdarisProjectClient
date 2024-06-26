import React, { useState } from 'react';
import { LoginUserDto} from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginComponent.css'; 
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    CircularProgress,
  } from '@mui/material';



const Login: React.FC = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const loginUser: LoginUserDto = {
            email,
            password
        };

        try {
            await login(loginUser);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" gutterBottom className="login-title">
            Login
          </Typography>
        </Box>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          fullWidth
          required
          className="login-input"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
          required
          className="login-input"
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleLogin}
            className="login-button"
          >
            {isLoading ? <CircularProgress size={24} color="secondary" /> : 'Login'}
          </Button>
        </Box>
      </Container>
    );
  };
  

export default Login;

