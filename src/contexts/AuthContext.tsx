import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoginUserDto, login as apiLogin } from '../services/apiService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (loginUser: LoginUserDto) => Promise<void>;
  // logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const login = () => {
  //   setIsAuthenticated(true);
  //   console.log('User logged in:', isAuthenticated);
  // };
  const login = async (loginUser: LoginUserDto) => {
    try {
      await apiLogin(loginUser);
      setIsAuthenticated(true);
      console.log('User logged in:', isAuthenticated);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // const logout = () => {
  //   setIsAuthenticated(false);
  // };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    // logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
