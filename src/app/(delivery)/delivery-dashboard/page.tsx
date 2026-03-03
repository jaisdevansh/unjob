'use client';

import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function DeliveryDashboard() {
    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-24">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="font-bold text-gray-900">You are online</span>
                </div>
                <div className="bg-brand/10 text-brand border border-brand/20 px-3 py-1 rounded-full text-sm font-bold">
                    Today: ₹850
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900">New Delivery Request</h2>

            <Card className="p-0 overflow-hidden border-2 border-brand/20 shadow-lg">
                <div className="h-48 bg-gray-100 relative mb-2">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400 font-medium tracking-wide">MAP VIEW</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="w-8 h-8 text-brand drop-shadow-md" />
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="font-bold text-xl mb-1 text-gray-900">Burger King</h3>
                            <p className="text-gray-500 text-sm font-medium">Connaught Place <span className="text-brand">(2.4 km away)</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-green-600 font-black text-2xl">₹45</p>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Earning</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-brand" />
                            <div className="w-0.5 h-10 bg-gray-300 my-1" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex flex-col justify-between h-20 text-sm font-semibold">
                            <span className="text-gray-600">Pickup: Connaught Place</span>
                            <span className="text-gray-900">Drop: R.K Puram, Sector 3</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" fullWidth className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50 font-bold h-12">Reject</Button>
                        <Button fullWidth className="bg-green-600 hover:bg-green-700 font-bold text-white shadow-md h-12">Accept Order</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
