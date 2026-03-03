'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { MapPin, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [address, setAddress] = useState('123 Main St, New Delhi');
    const [payment, setPayment] = useState('Credit Card ending in 4242');
    const [editingAddress, setEditingAddress] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [paymentMethods] = useState(['Credit Card ending in 4242', 'Debit Card ending in 1234', 'UPI - user@upi', 'Cash on Delivery']);
    const [selectedPayment, setSelectedPayment] = useState(payment);
    const router = useRouter();

    if (items.length === 0) {
        return (
            <div className="max-w-3xl mx-auto p-4 md:p-8 text-center pt-24">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button onClick={() => router.push('/')}>Browse Restaurants</Button>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        // In real app, call API
        clearCart();
        router.push('/tracking/ord-123');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 h-full">
            <h1 className="text-2xl font-bold mb-8">Checkout</h1>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    {/* Address */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="text-brand" /> Delivery Address
                        </h2>
                        {!editingAddress ? (
                            <>
                                <div className="p-4 border border-brand bg-brand/5 rounded-xl flex items-center justify-between cursor-pointer">
                                    <div>
                                        <span className="font-semibold block mb-1">Home</span>
                                        <span className="text-gray-600 text-sm">{address}</span>
                                    </div>
                                    <Button onClick={() => setEditingAddress(true)} variant="ghost" className="text-brand hover:bg-brand/10">Change</Button>
                                </div>
                                <Button onClick={() => setEditingAddress(true)} variant="outline" fullWidth className="mt-4 border-dashed text-brand border-brand/50 bg-brand/5 hover:bg-brand/10">
                                    + Add New Address
                                </Button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    placeholder="Enter your delivery address (e.g., 456 Oak Ave, Delhi)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                                />
                                <div className="flex gap-3">
                                    <Button onClick={() => {
                                        if (newAddress.trim()) {
                                            setAddress(newAddress);
                                            setNewAddress('');
                                            setEditingAddress(false);
                                        }
                                    }} className="flex-1 bg-brand text-white">Save Address</Button>
                                    <Button onClick={() => {
                                        setNewAddress('');
                                        setEditingAddress(false);
                                    }} variant="outline" className="flex-1">Cancel</Button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Payment */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CreditCard className="text-brand" /> Payment Method
                        </h2>
                        <div className="space-y-3">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method}
                                    onClick={() => {
                                        setSelectedPayment(method);
                                        setPayment(method);
                                    }}
                                    className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                                        selectedPayment === method
                                            ? 'border-brand bg-brand/5'
                                            : 'hover:border-brand hover:bg-brand/5'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                        selectedPayment === method ? 'border-brand bg-brand' : 'border-gray-300'
                                    }`}>
                                        {selectedPayment === method && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span className="font-medium text-sm">{method}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Summary */}
                <div className="w-full md:w-96 shrink-0 space-y-4">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4 mb-4">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{item.quantity} x {item.name}</span>
                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2 text-sm text-gray-500">
                            <div className="flex justify-between">
                                <span>Item Total</span>
                                <span>₹{getTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span>₹40</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes & Charges</span>
                                <span>₹35</span>
                            </div>
                        </div>

                        <div className="border-t border-dashed mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
                            <span>To Pay</span>
                            <span>₹{getTotalPrice() + 75}</span>
                        </div>

                        <Button fullWidth size="lg" className="mt-6 text-lg shadow-md" onClick={handlePlaceOrder}>
                            Place Order
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    );
}
