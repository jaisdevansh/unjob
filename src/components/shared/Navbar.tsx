'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import CartDrawer from '@/components/cart/CartDrawer';

export default function Navbar() {
    const router = useRouter();
    const { items, setOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-md border-b border-border shadow-sm px-4">
            <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-black italic text-brand tracking-tighter hover:scale-105 transition-transform">
                        zomato
                    </Link>

                    {/* Location - Hidden on mobile */}
                    <div className="hidden lg:flex items-center gap-2 text-foreground/70 hover:text-foreground cursor-pointer transition-colors bg-muted/30 px-3 py-1.5 rounded-xl border border-border/50">
                        <MapPin className="w-4 h-4 text-brand" />
                        <span className="text-xs font-bold uppercase tracking-tight">New Delhi</span>
                    </div>
                </div>

                {/* Search - Responsive */}
                <div className="hidden md:flex flex-1 max-w-lg mx-4">
                    <div className="w-full relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim()) {
                                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                                    setSearchQuery('');
                                }
                            }}
                            placeholder="Search for restaurant, cuisine or a dish"
                            className="w-full h-11 pl-12 pr-4 bg-muted/50 border border-transparent rounded-2xl outline-none text-sm font-medium focus:bg-card focus:border-brand/30 focus:ring-4 focus:ring-brand/5 transition-all text-foreground"
                        />
                        {searchQuery && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg p-3 max-h-96 overflow-y-auto z-50">
                                <div className="text-xs text-muted-foreground mb-2 font-semibold">Searching for: &quot;{searchQuery}&quot;</div>
                                <div className="space-y-2">
                                    {['North Indian', 'Chinese', 'Fast Food', 'Biryani', 'Pizzas', 'Desserts'].filter(item => item.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                router.push(`/search?q=${encodeURIComponent(item.toLowerCase())}`);
                                                setSearchQuery('');
                                            }}
                                            className="p-2 hover:bg-muted rounded-lg cursor-pointer text-sm font-medium"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 sm:gap-5">
                    <Link href="/login" className="hidden sm:flex items-center gap-2 text-foreground/80 hover:text-brand font-bold text-sm transition-all hover:scale-105">
                        <User className="w-5 h-5" />
                        Log in
                    </Link>
                    <Link href="/signup" className="hidden sm:flex items-center gap-2 text-foreground/80 hover:text-brand font-bold text-sm transition-all hover:scale-105">
                        Sign up
                    </Link>

                    <button
                        onClick={() => setOpen(true)}
                        className="group relative flex items-center gap-2 bg-brand text-white px-4 py-2.5 rounded-2xl font-black text-sm shadow-lg shadow-brand/20 hover:shadow-brand/40 transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        <ShoppingBag className="w-5 h-5" strokeWidth={3} />
                        <span className="hidden sm:inline">Bag</span>
                        {mounted && cartCount > 0 && (
                            <span className="bg-white text-brand min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-lg text-[10px] font-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <CartDrawer />
        </header>
    );
}
