import React, { useState, useEffect } from 'react';
import { RegisterUserDto, register, getRoles, RoleDto } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const navigate = useNavigate();

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

    const handleRegister = async () => {
        const registerUser: RegisterUserDto = {
            email,
            password,
            firstName,
            lastName,
            gender,
            role: {
                id: roleId
            }
        };

        try {
            const result = await register(registerUser);
            navigate('/profile/edit');
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={e => { e.preventDefault(); handleRegister(); }}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                <input type="text" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} required />
                <select value={roleId} onChange={e => setRoleId(e.target.value)} required>
                    <option value="" disabled>Select Role</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
