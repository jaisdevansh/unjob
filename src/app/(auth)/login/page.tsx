'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        // Mock login delay
        await new Promise(resolve => setTimeout(resolve, 800));
        login({ id: '1', name: 'John Doe', email: data.email, role: 'customer' }, 'mock-token-123');
        router.push('/');
    };

    return (
        <div className="w-full max-w-md bg-card p-8 sm:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-border">
            <div className="text-center mb-10">
                <Link href="/" className="text-5xl font-black italic text-brand tracking-tighter hover:opacity-80 transition-opacity">
                    zomato
                </Link>
                <p className="text-muted-foreground mt-4 font-bold text-xl">Welcome back</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left w-full">
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    {...register('email')}
                    error={errors.email?.message}
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    error={errors.password?.message}
                    rightElement={
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 -mr-1 focus:outline-none text-brand hover:scale-110 active:scale-90 transition-all"
                        >
                            {showPassword ? <EyeOff size={24} strokeWidth={2.5} /> : <Eye size={24} strokeWidth={2.5} />}
                        </button>
                    }
                />

                <div className="pt-4 space-y-4">
                    <Button
                        fullWidth
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="text-lg font-extrabold rounded-2xl shadow-brand/20 shadow-xl h-14 bg-brand hover:bg-brand-dark transition-all scale-active"
                    >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </Button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-border"></div>
                        <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm font-semibold">Or</span>
                        <div className="flex-grow border-t border-border"></div>
                    </div>

                    <Button
                        fullWidth
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => router.push('/signup')}
                        className="text-lg font-extrabold rounded-2xl h-14 border-2 hover:bg-muted transition-all scale-active"
                    >
                        Sign up
                    </Button>
                </div>
            </form>

            <div className="mt-10 text-center text-sm font-bold text-muted-foreground tracking-tight">
                Don&apos;t have an account? <Link href="/signup" className="text-brand font-black hover:underline ml-1">Sign up</Link>
            </div>
        </div>
    );
}
