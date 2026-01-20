export interface User {
    username: string;
    email: string;
}

export interface Profile {
    user: User;
    bio: string;
    profile_picture: string | null;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string | null;
    author: string;
    created_at: string; // ISO date string from Django
    status: number;
    visibility: 'Public' | 'Private' | 'Users Only';
}

export interface Task {
    id: number;
    task: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
}

export interface Checklist {
    id: number;
    title: string;
    description: string;
    tasks: Task[]; // Nested array of tasks
    created_at: string;
}