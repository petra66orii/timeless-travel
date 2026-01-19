import axios from 'axios';
import type { BlogPost, Checklist } from './types';

// Create a base axios instance so we don't have to type the URL every time
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Use your local Django URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Define our fetch functions
export const getPosts = async () => {
    // TypeScript knows that response.data is an array of BlogPosts
    const response = await api.get<BlogPost[]>('posts/');
    return response.data;
};

export const getChecklists = async () => {
    const response = await api.get<Checklist[]>('checklists/');
    return response.data;
};

export const toggleTask = async (taskId: number, completed: boolean) => {
    const response = await api.patch(`tasks/${taskId}/`, { completed });
    return response.data;
};

export default api;