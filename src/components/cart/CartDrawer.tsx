'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Utensils } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';

export default function CartDrawer() {
    const { items, updateQuantity, getTotalPrice, isOpen, setOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full md:w-[450px] bg-gradient-to-b from-card to-background shadow-2xl flex flex-col border-l border-border"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-brand to-brand/80 text-white p-6 rounded-bl-3xl shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black">Your Bag</h2>
                                    <p className="text-sm text-white/80 mt-1 font-semibold">{items.length} {items.length === 1 ? 'item' : 'items'} from restaurant</p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-3 hover:bg-white/20 rounded-full transition-all text-white hover:scale-110"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 custom-scrollbar">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center flex-1 text-center py-20 gap-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-blue-500/10 rounded-full blur-3xl" />
                                        <div className="relative w-40 h-40 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center shadow-lg border-2 border-brand/20">
                                            <ShoppingBag className="w-20 h-20 text-muted-foreground/40" strokeWidth={1} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-black text-2xl text-foreground">Bag is empty</p>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">Explore delicious dishes and add your favorites to the bag!</p>
                                    </div>
                                    <Button 
                                        onClick={() => setOpen(false)} 
                                        className="mt-6 px-8 bg-brand text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                    >
                                        Continue Browsing
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div 
                                        key={item.id} 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="group flex flex-col gap-3 p-4 border border-border/50 rounded-2xl bg-white/50 hover:bg-white hover:border-brand/40 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-start gap-3">
                                            <div className="w-14 h-14 bg-gradient-to-br from-brand/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-brand/20 group-hover:border-brand/40 transition-all overflow-hidden relative shrink-0">
                                                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50" />
                                                <Utensils className="w-6 h-6 text-brand/60 relative z-10" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`mt-0.5 shrink-0 w-3 h-3 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    </div>
                                                    <h4 className="font-bold text-sm text-foreground truncate">{item.name}</h4>
                                                </div>
                                                <p className="text-xs text-muted-foreground font-semibold">₹{item.price} each</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-brand text-lg">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-3 border-t border-border/30">
                                            <div className="flex items-center bg-muted/60 rounded-full p-1 gap-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand hover:bg-white rounded-full transition-all font-bold"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-brand hover:bg-white rounded-full transition-all font-bold"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => updateQuantity(item.id, 0)}
                                                className="text-xs font-bold text-red-500/70 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full transition-all"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border bg-white shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Subtotal</span>
                                        <span className="font-semibold">₹{getTotalPrice()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground font-medium">Taxes & Charges</span>
                                        <span className="font-semibold">₹50</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-black pt-3 border-t border-border">
                                        <span className="text-foreground">Total</span>
                                        <span className="text-brand">₹{getTotalPrice() + 50}</span>
                                    </div>
                                </div>
                                <Button 
                                    fullWidth 
                                    size="lg" 
                                    className="h-14 text-lg font-black rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all bg-gradient-to-r from-brand to-brand/90"
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
