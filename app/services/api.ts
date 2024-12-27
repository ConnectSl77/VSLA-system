import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string, role: string) => {
  const response = await api.post('/auth/register', { username, email, password, role });
  return response.data;
};

export const getVSLAs = async () => {
  const response = await api.get('/vslas');
  return response.data;
};

export const getVSLA = async (id: string) => {
  const response = await api.get(`/vslas/${id}`);
  return response.data;
};

export const createVSLA = async (vslaData: any) => {
  const response = await api.post('/vslas', vslaData);
  return response.data;
};

export const updateVSLA = async (id: string, vslaData: any) => {
  const response = await api.patch(`/vslas/${id}`, vslaData);
  return response.data;
};

export const deleteVSLA = async (id: string) => {
  const response = await api.delete(`/vslas/${id}`);
  return response.data;
};

