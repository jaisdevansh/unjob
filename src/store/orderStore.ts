import { create } from 'zustand';

export interface Order {
    id: string;
    restaurantId: string;
    items: unknown[];
    total: number;
    status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
    createdAt: string;
}

interface OrderState {
    currentOrder: Order | null;
    orders: Order[];
    setOrders: (orders: Order[]) => void;
    setCurrentOrder: (order: Order | null) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
    currentOrder: null,
    orders: [],
    setOrders: (orders) => set({ orders }),
    setCurrentOrder: (currentOrder) => set({ currentOrder }),
    updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o),
        currentOrder: state.currentOrder?.id === orderId ? { ...state.currentOrder, status } : state.currentOrder
    }))
}));
