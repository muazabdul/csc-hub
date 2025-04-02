import React, { createContext, useState, useEffect } from 'react';
import { getAuthToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setUser({ token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};