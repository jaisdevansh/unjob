'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function MobileNav() {
    const pathname = usePathname();
    const { items, setOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const navItems = [
        { label: 'Delivery', href: '/', icon: Home },
        { label: 'Search', href: '/search', icon: Search },
        { label: 'Bag', isCart: true, icon: ShoppingBag },
        { label: 'Account', href: '/login', icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 md:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    if (item.isCart) {
                        return (
                            <button
                                key="cart-mobile"
                                onClick={() => setOpen(true)}
                                className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${mounted && cartCount > 0 ? 'text-brand' : 'text-muted-foreground hover:text-brand'}`}
                            >
                                <Icon className={`w-6 h-6 ${mounted && cartCount > 0 ? 'scale-110' : ''}`} strokeWidth={mounted && cartCount > 0 ? 3 : 2} />
                                {mounted && cartCount > 0 && (
                                    <span className="absolute top-1 right-[25%] bg-brand text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black border-2 border-card shadow-lg animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${mounted && cartCount > 0 ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href!}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all ${isActive ? 'text-brand scale-110' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Icon className="w-6 h-6" strokeWidth={isActive ? 3 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
