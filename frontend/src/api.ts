import axios from 'axios';
import type { BlogPost, Checklist, Task } from './types';

// Create a base axios instance so we don't have to type the URL every time
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Django REST Framework standard Token Auth pattern
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define our fetch functions
export const getPosts = async () => {
    // TypeScript knows that response.data is an array of BlogPosts
    const response = await api.get<BlogPost[]>('api/posts/');
    return response.data;
};

export const getChecklists = async () => {
    const response = await api.get<Checklist[]>('api/checklists/');
    return response.data;
};


export const createTask = async (checklistId: number, title: string) => {
  return api.post('/api/tasks/', {
    checklist_id: checklistId,
    task: title,
    priority: 'low' // Default priority
  });
};

export const deleteTask = async (taskId: number) => {
  return api.delete(`/api/tasks/${taskId}/`);
};

export const updateTask = async (taskId: number, updates: Partial<Task>) => {
  return api.patch(`/api/tasks/${taskId}/`, updates);
};

export default api;