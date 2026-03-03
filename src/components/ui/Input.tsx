import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, rightElement, type, ...props }, ref) => {
        return (
            <div className="w-full flex flex-col gap-1.5">
                {label && (
                    <label className="text-sm font-semibold text-foreground/80 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        ref={ref}
                        {...props}
                        {...(type ? { type } : {})}
                        className={cn(
                            "flex h-12 w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 px-4 py-2 text-base font-bold text-[#000000] dark:text-[#FFFFFF] transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand disabled:cursor-not-allowed disabled:opacity-50 z-10 relative",
                            error && "border-red-500 focus:ring-red-500",
                            rightElement && "pr-16",
                            className
                        )}
                    />
                    {rightElement && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-30">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <span className="text-xs font-medium text-red-500 mt-1 ml-1">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
