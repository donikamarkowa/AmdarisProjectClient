import React, { useState, useEffect } from 'react';
import { RegisterUserDto, register, getRoles, RoleDto } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import './RegisterComponent.css';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
  } from '@mui/material';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const navigate = useNavigate();
    const [isLoading] = useState(false);

     useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleRegister = async (e: any) => {
      e.preventDefault();
        const registerUser: RegisterUserDto = {
            email,
            password,
            firstName,
            lastName,
            role: {
                id: roleId
            }
        };

        try {
            const result = await register(registerUser);
            if(result){
                localStorage.setItem('token', result.token);
                navigate('/login');
                console.log('Registration successful:', result);
            } else {
              console.error('Error: No token received');
          }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Register
            </Typography>
          </Box>
          <form onSubmit={handleRegister}>
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
            <TextField
              label="First Name"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              margin="normal"
              fullWidth
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={roleId}
                label="Role"
                onChange={e => setRoleId(e.target.value)}
                required
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="secondary" /> : 'Register'}
              </Button>
            </Box>
          </form>
        </Container>
      );
    };


export default Register;