import apiClient from './axios';
import type { Movie, PaginatedResponse } from '../types';

export const moviesApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Movie>> => {
    const response = await apiClient.get('/movies', {
      params: { page, limit },
    });
    return response.data;
  },

  getOne: async (id: number): Promise<Movie> => {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  },

  create: async (data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    const response = await apiClient.post('/movies', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Movie> => {
    const response = await apiClient.patch(`/movies/${id}`, data);
    return response.data;
  },

  remove: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/movies/${id}`);
    return response.data;
  },
};
