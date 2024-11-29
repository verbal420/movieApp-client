import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://movieapp-api-lms1.onrender.com/api', 
});

// Auth-related API calls
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Movie-related API calls
export const fetchMovies = () => API.get('/movies');
export const fetchMovieById = (id) => API.get(`/movies/${id}`);
export const addMovie = (data, token) =>
  API.post('/movies', data, { headers: { Authorization: `Bearer ${token}` } });
export const updateMovie = (id, token) =>
  API.put(`/movies/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const deleteMovie = (id, token) =>
  API.delete(`/movies/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Comment-related API call
export const addComment = (id, data, token) =>
  API.post(`/movies/${id}/comments`, data, { headers: { Authorization: `Bearer ${token}` } });