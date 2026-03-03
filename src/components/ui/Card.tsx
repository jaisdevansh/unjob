import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Card({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow", className)}>
            {children}
        </div>
    );
}
