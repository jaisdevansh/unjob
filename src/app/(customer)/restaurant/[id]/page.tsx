'use client';

import { useState, useEffect, use } from 'react';
import { Star, Clock, ShoppingBag, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const MOCK_RESTAURANTS = [
    {
        id: 'rest-1',
        name: 'The Great Indian Dhaba',
        rating: 4.5,
        deliveryTime: '25',
        costForTwo: '₹600 for two',
        tags: ['North Indian', 'Punjabi', 'Thali'],
        address: 'Connaught Place, New Delhi',
        offer: '50% OFF up to ₹100',
    },
    {
        id: 'rest-2',
        name: 'Burger King',
        rating: 4.2,
        deliveryTime: '30',
        costForTwo: '₹350 for two',
        tags: ['Burgers', 'American', 'Fast Food'],
        address: 'Rajiv Chowk, New Delhi',
        offer: 'Flat ₹125 OFF',
    },
    {
        id: 'rest-3',
        name: 'Beijing Bites',
        rating: 4.0,
        deliveryTime: '40',
        costForTwo: '₹800 for two',
        tags: ['Chinese', 'Asian', 'Noodles'],
        address: 'Hauz Khas, New Delhi',
    },
    {
        id: 'rest-4',
        name: 'La Pino\'z Pizza',
        rating: 3.9,
        deliveryTime: '35',
        costForTwo: '₹500 for two',
        tags: ['Pizza', 'Italian', 'Fast Food'],
        address: 'Saket, New Delhi',
        offer: 'BOGO',
    },
    {
        id: 'rest-5',
        name: 'Haldiram\'s',
        rating: 4.6,
        deliveryTime: '20',
        costForTwo: '₹300 for two',
        tags: ['Sweets', 'Snacks', 'North Indian'],
        address: 'Chandni Chowk, New Delhi',
        offer: '20% OFF',
    },
    {
        id: 'rest-6',
        name: 'Nandhana Palace',
        rating: 4.3,
        deliveryTime: '45',
        costForTwo: '₹700 for two',
        tags: ['Andhra', 'Biryani', 'South Indian'],
        address: 'Karol Bagh, New Delhi',
    },
    {
        id: 'rest-7',
        name: 'Corner House Ice Cream',
        rating: 4.8,
        deliveryTime: '15',
        costForTwo: '₹250 for two',
        tags: ['Desserts', 'Ice Cream', 'Beverages'],
        address: 'Def Col, New Delhi',
        offer: 'Free Delivery',
    },
    {
        id: 'rest-8',
        name: 'Truffles',
        rating: 4.7,
        deliveryTime: '35',
        costForTwo: '₹900 for two',
        tags: ['Cafe', 'Continental', 'Italian'],
        address: 'Vasant Kunj, New Delhi',
    }
];

const MENU = [
    {
        category: 'Recommended',
        items: [
            { id: 'item-1', name: 'Signature Dish 1', price: 179, desc: 'Our signature dish crafted with perfection.', isVeg: false },
            { id: 'item-2', name: 'Signature Dish 2', price: 149, desc: 'A delightful vegetarian option.', isVeg: true },
        ]
    },
    {
        category: 'Sides & Beverages',
        items: [
            { id: 'item-3', name: 'French Fries', price: 99, desc: 'Classic salted fries.', isVeg: true },
            { id: 'item-4', name: 'Cold Beverage', price: 60, desc: 'Chilled refreshing drink.', isVeg: true },
        ]
    }
];

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState('Menu');
    const addItem = useCartStore(state => state.addItem);

    const restaurant = MOCK_RESTAURANTS.find(r => r.id === id) || MOCK_RESTAURANTS[0];

    const handleAdd = (item: { id: string; name: string; price: number; isVeg: boolean; desc?: string }) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            isVeg: item.isVeg,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name
        });
    };

    return (
        <div className="pb-24">
            {/* Banner */}
            <div className="h-48 md:h-72 bg-gray-200 w-full relative">
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 w-full pb-32">
                <div className="bg-card rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tighter text-foreground">{restaurant.name}</h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground font-semibold">
                                <span>{restaurant.tags.join(', ')}</span>
                                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border" />
                                <span>{restaurant.address}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-border bg-muted/30">
                                <div className="flex items-center gap-1.5 font-black text-xl text-green-700">
                                    {restaurant.rating} <Star className="w-5 h-5 fill-green-700" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">1K+ Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border/50">
                        <div className="flex items-center gap-2.5">
                            <Clock className="w-5 h-5 text-brand" strokeWidth={2.5} />
                            <span className="font-bold text-foreground">{restaurant.deliveryTime} mins delivery</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-border" />
                        <div className="flex items-center gap-2.5 font-bold text-foreground">
                            <span>{restaurant.costForTwo}</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-10 border-b border-border mt-10 sticky top-[64px] bg-background/80 backdrop-blur-md z-30 pt-6 overflow-x-auto hide-scrollbar">
                    {['Menu', 'Reviews', 'Info'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-xl font-bold transition-all border-b-[3px] whitespace-nowrap ${activeTab === tab
                                ? 'border-brand text-brand translate-y-[1px]'
                                : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Menu Content */}
                {activeTab === 'Menu' && (
                    <div className="flex flex-col md:flex-row gap-8 mt-8">
                        {/* Sidebar Desktop */}
                        <div className="hidden md:block w-64 shrink-0 border-r border-gray-100 pr-4">
                            <ul className="sticky top-40 space-y-2">
                                {MENU.map((category) => (
                                    <li key={category.category}>
                                        <button className="text-gray-600 hover:text-brand font-medium text-left w-full px-4 py-2 rounded-lg hover:bg-gray-50">
                                            {category.category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 space-y-16">
                            {MENU.map((category) => (
                                <div key={category.category} id={category.category.toLowerCase().replace(/\s+/g, '-')}>
                                    <h2 className="text-3xl font-black mb-8 tracking-tighter">{category.category}</h2>
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                        {category.items.map((item) => (
                                            <div key={item.id} className="flex justify-between gap-6 p-6 rounded-3xl border border-border hover:shadow-2xl hover:border-brand/20 transition-all bg-card group/item">
                                                <div className="flex-1">
                                                    <div className={`w-4 h-4 border-2 flex items-center justify-center rounded-sm mb-3 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                                                    </div>
                                                    <h3 className="font-bold text-xl text-foreground group-hover/item:text-brand transition-colors">{item.name}</h3>
                                                    <div className="font-bold text-lg mt-1 text-foreground/90">₹{item.price}</div>
                                                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2 font-medium leading-relaxed">{item.desc}</p>
                                                </div>
                                                <div className="flex flex-col items-center justify-center shrink-0 w-32 md:w-36 relative h-fit pt-2">
                                                    <div className="w-full aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center border border-border/50 shadow-inner">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Item Image</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAdd(item)}
                                                        className="absolute -bottom-2 bg-card text-green-600 border border-border shadow-lg font-black uppercase px-8 py-2.5 rounded-xl hover:bg-green-600 hover:text-white hover:border-green-600 transition-all active:scale-90 scale-100 hover:shadow-green-600/20"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky View Cart Bar */}
            <CartBar />
        </div>
    );
}

function CartBar() {
    const { items, getTotalPrice, setOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const count = items.reduce((acc, i) => acc + i.quantity, 0);

    if (!mounted || count === 0) return null;

    return (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-[999] animate-in slide-in-from-bottom-10 duration-500">
            <button
                onClick={() => setOpen(true)}
                className="w-full bg-[#60B246] text-white p-5 rounded-3xl shadow-[0_20px_50px_rgba(96,178,70,0.4)] flex items-center justify-between hover:scale-[1.03] active:scale-95 transition-all group border-4 border-white/20"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2.5 rounded-xl">
                        <ShoppingBag className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{count} Item{count > 1 ? 's' : ''} in bag</p>
                        <p className="font-black text-xl">₹{getTotalPrice()} plus taxes</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 font-black text-xl uppercase tracking-tighter">
                    Next Step
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </div>
            </button>
        </div>
    );
}
