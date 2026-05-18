import apiClient from './axios';
import type { User } from '../types';

export const authApi = {
  login: async (username: string, password: string) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (username: string, password: string, role: string, firstName: string, lastName: string) => {
    const response = await apiClient.post('users/register', { username, password, role, firstName, lastName });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
