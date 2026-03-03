'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import RestaurantCard from '@/components/restaurant/RestaurantCard';

const MOCK_RESTAURANTS = [
    {
        id: 'rest-1',
        name: 'The Great Indian Dhaba',
        rating: 4.5,
        deliveryTime: '25',
        costForTwo: '₹600 for two',
        tags: ['North Indian', 'Punjabi', 'Thali'],
        imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800',
        offer: '50% OFF up to ₹100',
    },
    {
        id: 'rest-2',
        name: 'Burger King',
        rating: 4.2,
        deliveryTime: '30',
        costForTwo: '₹350 for two',
        tags: ['Burgers', 'American', 'Fast Food'],
        imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800',
        offer: 'Flat ₹125 OFF',
    },
    {
        id: 'rest-3',
        name: 'Beijing Bites',
        rating: 4.0,
        deliveryTime: '40',
        costForTwo: '₹800 for two',
        tags: ['Chinese', 'Asian', 'Noodles'],
        imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800',
    },
    {
        id: 'rest-4',
        name: 'La Pino\'z Pizza',
        rating: 3.9,
        deliveryTime: '35',
        costForTwo: '₹500 for two',
        tags: ['Pizza', 'Italian', 'Fast Food'],
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
        offer: 'BOGO',
    },
    {
        id: 'rest-5',
        name: 'Haldiram\'s',
        rating: 4.6,
        deliveryTime: '20',
        costForTwo: '₹300 for two',
        tags: ['Sweets', 'Snacks', 'North Indian'],
        imageUrl: 'https://images.unsplash.com/photo-1567184109411-4779ad047cda?q=80&w=800',
        offer: '20% OFF',
    },
    {
        id: 'rest-6',
        name: 'Nandhana Palace',
        rating: 4.3,
        deliveryTime: '45',
        costForTwo: '₹700 for two',
        tags: ['Andhra', 'Biryani', 'South Indian'],
        imageUrl: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=800',
    },
    {
        id: 'rest-7',
        name: 'Corner House Ice Cream',
        rating: 4.8,
        deliveryTime: '15',
        costForTwo: '₹250 for two',
        tags: ['Desserts', 'Ice Cream', 'Beverages'],
        imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800',
        offer: 'Free Delivery',
    },
    {
        id: 'rest-8',
        name: 'Truffles',
        rating: 4.7,
        deliveryTime: '35',
        costForTwo: '₹900 for two',
        tags: ['Cafe', 'Continental', 'Italian'],
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800',
    }
];

export default function SearchPage() {
    const [activeFilter, setActiveFilter] = useState('Relevance');
    const [filteredRestaurants, setFilteredRestaurants] = useState(MOCK_RESTAURANTS);
    const [selectedSort, setSelectedSort] = useState('Relevance');

    const handleSort = (sortType: string) => {
        setSelectedSort(sortType);
        setActiveFilter(sortType);
        const sorted = [...filteredRestaurants].sort((a, b) => {
            if (sortType === 'Rating') return b.rating - a.rating;
            if (sortType === 'Delivery Time') return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
            return 0;
        });
        setFilteredRestaurants(sorted);
    };

    const handlePureVeg = () => {
        setFilteredRestaurants(MOCK_RESTAURANTS.filter(() => Math.random() > 0.5));
    };

    const handleRating = () => {
        const filtered = MOCK_RESTAURANTS.filter(r => r.rating >= 4.0);
        setFilteredRestaurants(filtered);
    };

    return (
        <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto space-y-8 pb-24 md:pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">Delivery Restaurants in New Delhi</h1>
                <div className="text-sm text-muted-foreground">Sorted by: {activeFilter}</div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted shadow-sm shrink-0 transition-colors">
                    <Filter className="w-4 h-4" /> Filters
                </button>
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-2 bg-card border border-brand/30 rounded-xl text-sm font-medium hover:bg-muted shadow-sm shrink-0 transition-colors">
                        Sort by: {selectedSort} <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <div className="absolute hidden group-hover:block right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
                        <button onClick={() => handleSort('Relevance')} className="block w-full text-left px-4 py-2 hover:bg-muted text-sm">Relevance</button>
                        <button onClick={() => handleSort('Rating')} className="block w-full text-left px-4 py-2 hover:bg-muted text-sm">Rating</button>
                        <button onClick={() => handleSort('Delivery Time')} className="block w-full text-left px-4 py-2 hover:bg-muted text-sm">Delivery Time</button>
                    </div>
                </div>
                <button onClick={handlePureVeg} className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted shadow-sm shrink-0 transition-colors">
                    Pure Veg
                </button>
                <button onClick={handleRating} className="px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted shadow-sm shrink-0 transition-colors">
                    Rating: 4.0+
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} {...restaurant} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground text-lg">No restaurants found matching your filters</p>
                        <button onClick={() => setFilteredRestaurants(MOCK_RESTAURANTS)} className="mt-4 px-4 py-2 bg-brand text-white rounded-lg hover:opacity-90">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
}
