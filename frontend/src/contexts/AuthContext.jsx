import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@CRM:token');
    
    if (token) {
      // In a real app we might validate the token or fetch user details here
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token });
    }
    
    setLoading(false);
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('@CRM:token', token);
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token });
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        const message = data.invalid_params || data.detail || data.title || (typeof data === 'string' ? data : "Credenciais inválidas");
        throw new Error(message);
      } else {
        throw new Error("Erro de conexão com o servidor");
      }
    }
  }

  async function signUp({ name, email, password }) {
    try {
      await api.post('/auth/register', { name, email, password });
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        const message = data.invalid_params || data.detail || data.title || (typeof data === 'string' ? data : "Erro ao criar conta. Verifique os dados.");
        throw new Error(message);
      } else {
        throw new Error("Erro de conexão com o servidor");
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@CRM:token');
    setData({});
  }

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signUp,
      signOut, 
      isAuthenticated: !!data.token,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
