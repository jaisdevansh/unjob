import api from './api';

interface OrderPayload {
    restaurantId: string;
    items: Array<{ id: string; quantity: number; price: number }>;
    deliveryAddress: string;
    paymentMethod: string;
}

export const OrderService = {
    createOrder: async (data: OrderPayload) => {
        const response = await api.post('/orders', data);
        return response.data;
    },
    getOrderById: async (id: string) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },
    getUserOrders: async () => {
        const response = await api.get('/orders/user');
        return response.data;
    }
};
