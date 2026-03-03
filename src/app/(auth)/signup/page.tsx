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
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const login = useAuthStore(state => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (data: SignupForm) => {
        // Mock registration delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock auto-login after signup
        login({ id: '1', name: data.name, email: data.email, role: 'customer' }, 'mock-token-123');
        router.push('/');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-card p-8 rounded-3xl shadow-2xl border border-border"
        >
            <div className="text-center mb-8">
                <Link href="/" className="text-4xl font-bold italic text-brand tracking-tighter hover:opacity-80 transition-opacity">
                    zomato
                </Link>
                <p className="text-muted-foreground mt-4 font-semibold text-lg">Create an account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left w-full">
                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    {...register('name')}
                    error={errors.name?.message}
                />
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    {...register('email')}
                    error={errors.email?.message}
                />
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    {...register('password')}
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
                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    rightElement={
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="p-2 -mr-1 focus:outline-none text-brand hover:scale-110 active:scale-90 transition-all"
                        >
                            {showConfirmPassword ? <EyeOff size={24} strokeWidth={2.5} /> : <Eye size={24} strokeWidth={2.5} />}
                        </button>
                    }
                />

                <div className="pt-4">
                    <Button
                        fullWidth
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="text-lg font-bold rounded-2xl shadow-brand/20 shadow-xl h-14 bg-brand hover:bg-brand-dark transition-all scale-active"
                    >
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-muted-foreground">
                Already have an account? <Link href="/login" className="text-brand font-bold hover:underline">Log in</Link>
            </div>

            <p className="mt-6 text-[10px] text-center text-muted-foreground/60 leading-relaxed">
                By creating an account, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.
            </p>
        </motion.div>
    );
}
