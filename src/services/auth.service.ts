import api from './api';

interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export const AuthService = {
    login: async (credentials: LoginPayload) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (data: RegisterPayload) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    }
};
