import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Auth'; 

export interface RegisterUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: {
        id: string;
    };
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface User{
    id: string;
    firstName: string;
    lastName: string;
    role: string
}

export interface AuthResultDto {
    token: string;
    user: User
}

export interface RoleDto {
    id: string;
    name: string;
}

export interface EditProfileDto {
    age?: number;
    bio?: string;
    gender?: string;
    weight?: number;
    height?: number;
    phoneNumber?: string;
    picture?: string;
}


export const register = async (registerUser: RegisterUserDto): Promise<AuthResultDto> => {
    const response = await axios.post<AuthResultDto>(`${API_URL}/register`, registerUser);
    return response.data;
};

export const login = async (loginUser: LoginUserDto): Promise<AuthResultDto> => {
    const response = await axios.post<AuthResultDto>(`${API_URL}/login`, loginUser);
    return response.data;
};

export const getRoles = async (): Promise<RoleDto[]> => {
    const response = await axios.get<RoleDto[]>(`${API_URL}/getRoles`);
    return response.data;
};

export const editProfile = async(editProfile: EditProfileDto, authToken: string): Promise<EditProfileDto> =>{
    const response = await axios.post<EditProfileDto>(`${API_URL}/edit`, editProfile, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });

    return response.data;
};

export const getUserDetails = async (authToken: string): Promise<User> => {
    const response = await axios.get<User>(`${API_URL}/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem(localStorage.token);
};

export const getProfile = async(authToken: string): Promise<EditProfileDto> =>{
    const response = await axios.get<EditProfileDto>(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });

    return response.data;
};