'use client';

import { DollarSign, Package, TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function RestaurantDashboard() {
    const stats = [
        { label: 'Total Revenue', value: '₹45,231', icon: DollarSign, trend: '+12.5%' },
        { label: 'Orders Today', value: '45', icon: Package, trend: '+5.2%' },
        { label: 'Avg. Rating', value: '4.8', icon: TrendingUp, trend: '+0.1' },
        { label: 'Avg. Delivery Time', value: '28m', icon: Clock, trend: '-2m' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>
                <button className="bg-brand text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-dark transition-colors shadow-sm">
                    Manage Menu
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="p-6 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-brand border border-gray-100">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md border border-green-100">{stat.trend}</span>
                            </div>
                            <h3 className="text-gray-500 font-medium text-sm">{stat.label}</h3>
                            <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                        </Card>
                    )
                })}
            </div>

            {/* Active Orders */}
            <h2 className="text-xl font-bold mt-10 mb-4">Active Orders</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 uppercase text-xs font-bold text-gray-400">
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map(i => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-brand/5 transition-colors">
                                <td className="p-4 font-bold text-gray-700">#ORD-00{i}</td>
                                <td className="p-4 font-medium text-gray-900">John Doe</td>
                                <td className="p-4 text-gray-500 text-sm">2x Whopper, 1x Fries</td>
                                <td className="p-4 font-bold text-gray-900">₹457</td>
                                <td className="p-4">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-md border border-yellow-200">Preparing</span>
                                </td>
                                <td className="p-4">
                                    <button className="text-brand text-sm font-bold hover:underline">Update Status</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
