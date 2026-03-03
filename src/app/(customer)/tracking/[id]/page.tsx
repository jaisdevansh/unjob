'use client';

import { Phone, MessageSquare, CheckCircle2, MapPin } from 'lucide-react';

export default function TrackingPage({ params }: { params: { id: string } }) {
    const steps = [
        { label: 'Order Accepted', time: '12:30 PM', completed: true },
        { label: 'Preparing Food', time: '12:35 PM', completed: true },
        { label: 'Out for Delivery', time: '12:45 PM', completed: true },
        { label: 'Delivered', time: 'Arriving at 1:00 PM', completed: false },
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 space-y-6">
            <h1 className="text-2xl font-bold">Track Order #{params.id}</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-bold">Estimated Delivery</h2>
                        <p className="text-brand text-2xl font-bold mt-1">1:00 PM</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Burger King</p>
                        <p className="font-medium">₹425</p>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm font-medium">Connaught Place</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 space-y-8 my-8">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${step.completed ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'
                                }`}>
                                {step.completed && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <div>
                                <p className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.label}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Delivery Partner */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        <div>
                            <p className="font-bold">Rahul Kumar</p>
                            <p className="text-sm text-gray-500">Delivery Partner</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-brand hover:bg-brand/5 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center hover:bg-brand-dark transition-colors shadow-sm">
                            <Phone className="w-4 h-4" fill="currentColor" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
