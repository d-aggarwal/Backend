import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  logout: () => api.post('/users/logout'),
  getCurrentUser: () => api.get('/users/current-user'),
  refreshToken: () => api.post('/users/refresh-token'),
  getAdminPanel: () => api.get('/users/admin-panel'),
};

export const notesAPI = {
  createNote: (data) => api.post('/notes', data),
  getNotes: () => api.get('/notes'),
  getNoteById: (noteId) => api.get(`/notes/${noteId}`),
  updateNote: (noteId, data) => api.patch(`/notes/${noteId}`, data),
  deleteNote: (noteId) => api.delete(`/notes/${noteId}`),
};

export default api;
