import api from './api';

export const RestaurantService = {
    getRestaurants: async (params?: unknown) => {
        const response = await api.get('/restaurants', { params });
        return response.data;
    },
    getRestaurantById: async (id: string) => {
        const response = await api.get(`/restaurants/${id}`);
        return response.data;
    },
    getRestaurantMenu: async (id: string) => {
        const response = await api.get(`/restaurants/${id}/menu`);
        return response.data;
    }
};
