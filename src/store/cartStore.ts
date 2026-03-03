import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    isVeg: boolean;
    restaurantId: string;
    restaurantName: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            setOpen: (open) => set({ isOpen: open }),
            addItem: (item) => {
                const items = get().items;
                const existingItem = items.find((i) => i.id === item.id);

                // Ensure items are from the same restaurant
                if (items.length > 0 && items[0].restaurantId !== item.restaurantId) {
                    // If different restaurant, clear cart or throw error (we'll clear it for now or you could prompt user)
                    set({ items: [{ ...item, quantity: 1 }] });
                    return;
                }

                if (existingItem) {
                    set({
                        items: items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    });
                } else {
                    set({ items: [...items, { ...item, quantity: 1 }] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    get().removeItem(id);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.id === id ? { ...i, quantity } : i
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
