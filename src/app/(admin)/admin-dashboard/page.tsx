'use client';

import { Users, Store, IndianRupee, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '12,456', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Restaurants', value: '842', icon: Store, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Platform Revenue', value: '₹4.2L', icon: IndianRupee, color: 'text-brand', bg: 'bg-brand/10' },
        { label: 'Pending Approvals', value: '15', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Admin Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={idx} className="p-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                                    <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4">Recent Users</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-sm">User {i}</p>
                                        <p className="text-xs text-gray-500">user{i}@example.com</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">Active</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h2 className="text-lg font-bold mb-4">Pending Restaurants</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl">
                                <div>
                                    <p className="font-semibold text-sm">New Eats {i}</p>
                                    <p className="text-xs text-gray-500">Connaught Place</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700">Approve</button>
                                    <button className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-200">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
