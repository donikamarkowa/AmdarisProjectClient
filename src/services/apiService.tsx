import axios from 'axios';

const API_URL = 'https://localhost:7048/api/Auth'; 

export interface RegisterUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    role: {
        id: string;
    };
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface AuthResultDto {
    token: string;
}

export interface RoleDto {
    id: string;
    name: string;
}

export interface EditProfileDto {
    age?: number;
    bio?: string;
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
