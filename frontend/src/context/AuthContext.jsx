import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (fullName, email, username, password) => {
    try {
      const response = await authAPI.register({
        fullName,
        email,
        username,
        password,
      });
      localStorage.setItem('accessToken', response.data.data.accessToken);
      setUser(response.data.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const login = async (emailOrUsername, password) => {
    try {
      const isEmail = emailOrUsername.includes('@');
      const response = await authAPI.login({
        email: isEmail ? emailOrUsername : '',
        username: isEmail ? '' : emailOrUsername,
        password,
      });
      localStorage.setItem('accessToken', response.data.data.accessToken);
      setUser(response.data.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
