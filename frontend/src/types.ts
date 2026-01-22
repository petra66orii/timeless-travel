export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirm: string; // dj-rest-auth usually expects this
    first_name: string;
    last_name: string;
}

export interface Profile {
    id: number;
    user: User;
    bio: string;
    profile_picture: string | null;
}

export interface PasswordChangeData {
    old_password: string;
    new_password1: string;
    new_password2: string;
};

export interface Author {
    id: number;
    username: string;
    name: string;
    email: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string | null;
    author: Author;
    created_at: string; // ISO date string from Django
    status: number;
    visibility: 'Public' | 'Private' | 'Users Only';
}

export interface Comment {
    id: number;
    post: number;
    author: Author;
    content: string;
    created_at: string;
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