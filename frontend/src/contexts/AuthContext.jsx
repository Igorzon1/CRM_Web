import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@CRM:token');
    const userStr = localStorage.getItem('@CRM:user');
    
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      let user = null;
      if (userStr) {
        try { user = JSON.parse(userStr); } catch (e) {}
      }
      setData({ token, user });
    }
    
    setLoading(false);
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('@CRM:token', token);
      if (user) {
        localStorage.setItem('@CRM:user', JSON.stringify(user));
      }
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
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
    localStorage.removeItem('@CRM:user');
    setData({});
  }

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signUp,
      signOut, 
      user: data.user,
      isAuthenticated: !!data.token,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
