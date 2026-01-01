"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Loader2, ShieldCheck, Mail, Lock, User as UserIcon } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";
import { Toaster, toast } from 'sonner';

// Initialize Supabase Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminLoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");
    // const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: ""
    });

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // setError("");
        // setMessage("");

        try {
            if (isLogin) {
                // LOGIN
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });

                if (error) throw error;

                // Check active status
                const { data: profile, error: profileError } = await supabase
                    .from('admin_profiles')
                    .select('is_active')
                    .eq('id', data.user.id)
                    .single();

                // If profile doesn't exist yet (maybe trigger failed?), we assume false
                if (profileError || !profile?.is_active) {
                    await supabase.auth.signOut();
                    throw new Error("Your account is pending approval. Please contact the administrator.");
                }

                toast.success('Welcome back!');
                router.push('/admin/dashboard');

            } else {
                // REGISTER
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        }
                    }
                });

                if (error) throw error;

                toast.success("Registration successful! Your account is pending admin approval.");
                setIsLogin(true);
            }
        } catch (err: any) {
            toast.error(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/Hero Image Front On 01.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay to ensure text readability if needed, but keeping it light glass effect mainly */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 p-6">
                <div className="flex justify-center mb-8">
                    <Image
                        src="/assets/logo-final-wide.png"
                        alt="Gentech Guard"
                        width={240}
                        height={80}
                        className="h-auto w-48 drop-shadow-lg"
                    />
                </div>

                <GlassSurface
                    borderRadius={24}
                    opacity={0.85}
                    backgroundOpacity={0.1}
                    blur={20}
                    borderWidth={0.1}
                    width="clamp(300px, 500px, 90vw)"
                    height="clamp(400px, 480px, 90vh)"
                    className="p-8 shadow-2xl"
                >
                    <div className="w-full">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
                                {isLogin ? "Admin Login" : "Request Access"}
                            </h1>
                            <p className="text-blue-100/70 text-sm">
                                {isLogin ? "Enter your credentials to continue" : "Join the administrative team"}
                            </p>
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-black/40 p-1 rounded-xl mb-8 relative">
                            <div
                                className="absolute inset-y-1 w-1/2 bg-primary-blue rounded-lg transition-all duration-300 shadow-lg"
                                style={{ left: isLogin ? '4px' : 'calc(50% - 4px)' }}
                            />
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider relative z-10 transition-colors ${isLogin ? 'text-white' : 'text-blue-200/60 hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2 text-sm font-bold uppercase tracking-wider relative z-10 transition-colors ${!isLogin ? 'text-white' : 'text-blue-200/60 hover:text-white'}`}
                            >
                                Register
                            </button>
                        </div>

                        <form onSubmit={handleAuth} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="relative group">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-primary-blue transition-colors" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-blue-100/30 text-sm outline-none focus:border-primary-blue/50 focus:bg-black/50 transition-all"
                                    />
                                </div>
                            )}

                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-primary-blue transition-colors" size={18} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-blue-100/30 text-sm outline-none focus:border-primary-blue/50 focus:bg-black/50 transition-all"
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-primary-blue transition-colors" size={18} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-blue-100/30 text-sm outline-none focus:border-primary-blue/50 focus:bg-black/50 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-primary-blue hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,170,255,0.3)] hover:shadow-[0_0_30px_rgba(0,170,255,0.5)]"
                            >
                                {loading && <Loader2 className="animate-spin" size={16} />}
                                {isLogin ? "Sign In" : "Request Access"}
                            </button>
                        </form>
                    </div>
                </GlassSurface>
                <div className="text-center mt-6">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">Restricted Access • Gentech Admin</p>
                </div>
            </div>
            <Toaster position="top-center" theme="dark" />
        </div>
    );
}
