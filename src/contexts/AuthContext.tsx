import React, { createContext, useContext, useState, ReactNode, useEffect} from 'react';
import { LoginUserDto, login as apiLogin, User, getUserDetails } from '../services/apiService';

export type UserRole = 'Admin' | 'Customer' | 'Trainer';

interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  user: User | null;
  login: (loginUser: LoginUserDto) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
  initialUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialUser }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token')); 
  const [user, setUser] = useState<User | null>(initialUser);

  const login = async (loginUser: LoginUserDto) => {
    try {
      const authResult = await apiLogin(loginUser);
      if (authResult.token) {
        setIsAuthenticated(true);
        setAuthToken(authResult.token); 
        localStorage.setItem( 'token', authResult.token);
        setUser(authResult.user || null);
      } else {
        console.error('Login failed: No token received');
      }
    } catch (error) {
      const unknownError = error as Error;
      console.error('Login failed:', unknownError.message);
    }
  };

  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.removeItem('token');
      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
      resolve();
    });
  };

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserDetails(token);
          setUser(userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
          // Handle token errors (e.g., token expired or invalid)
          setAuthToken(null);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      };

      fetchUserDetails();
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    authToken,
    user,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
