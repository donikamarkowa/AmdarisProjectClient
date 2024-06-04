import React, { useState } from 'react';
import { LoginUserDto} from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
          </Box>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" disabled={isLoading} onClick={handleLogin}>
              {isLoading ? <CircularProgress size={24} color="secondary" /> : 'Login'}
            </Button>
          </Box>
        </Container>
      );
    };
    
//     return (
//         <div>
//             <h2>Login</h2>
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };

export default Login;

