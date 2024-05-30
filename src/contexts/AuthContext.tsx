import React, { createContext, useContext, useState, ReactNode} from 'react';
import { LoginUserDto, login as apiLogin } from '../services/apiService';

interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
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
  const [authToken, setAuthToken] = useState<string | null>(null); 

  const login = async (loginUser: LoginUserDto) => {
    try {
      const authResult = await apiLogin(loginUser);
      if (authResult.token) {
        setIsAuthenticated(true);
        setAuthToken(authResult.token); 
        console.log('User logged in:', isAuthenticated);
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // const logout = () => {
  //   setIsAuthenticated(false);
  // };

  const value: AuthContextType = {
    isAuthenticated,
    authToken,
    login,
    // logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
