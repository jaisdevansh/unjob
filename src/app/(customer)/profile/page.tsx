'use client';

import { User, MapPin, ShoppingBag, Settings, LogOut, Heart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
    const menuItems = [
        { icon: ShoppingBag, label: 'Your Orders', desc: 'Check your order history' },
        { icon: Heart, label: 'Favorite Restaurants', desc: 'Your saved places' },
        { icon: MapPin, label: 'Manage Addresses', desc: 'Add or edit delivery addresses' },
        { icon: Settings, label: 'Settings', desc: 'Notifications, password, etc.' },
    ];

    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 pb-24">
            {/* Header */}
            <div className="flex items-center gap-6 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                    <User className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-gray-500 font-medium">john.doe@example.com</p>
                    <p className="text-sm text-brand font-bold mt-1 cursor-pointer hover:underline">Edit Profile</p>
                </div>
            </div>

            <div className="space-y-4">
                {menuItems.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-brand/50 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand transition-colors" />
                        </div>
                    )
                })}
            </div>

            <Button variant="outline" className="w-full mt-8 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 gap-2">
                <LogOut className="w-5 h-5" /> Logout
            </Button>
        </div>
    );
}
