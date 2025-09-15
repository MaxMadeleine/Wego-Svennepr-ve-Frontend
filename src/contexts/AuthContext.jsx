import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Laver en kontekst til auth
const AuthContext = createContext();

// Custom hook til at bruge AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth skal bruges inden for en AuthProvider');
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tjek om bruger er logget ind ved app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
          const result = await authService.verifyToken();
          if (result.userId) {
            // Hent brugerdata fra sessionStorage eller API
            const userData = sessionStorage.getItem('user');
            if (userData) {
              setUser(JSON.parse(userData));
            }
          } else {
            // Token er ugyldig
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth status check fejlede:', error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await authService.login(email, password);
      
      setUser(result.user);
      setLoading(false);
      
      return result;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await authService.register(userData);
      
      setLoading(false);
      return result;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    // double negation så det bliver til en boolean
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
