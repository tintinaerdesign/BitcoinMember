'use client';

import React, { useState } from 'react';
import { X, Mail,Phone, Lock, User, Eye, EyeOff } from 'lucide-react';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
}

export default function RegisterModal({
                                          isOpen,
                                          onClose,
                                          onSwitchToLogin,
                                      }: RegisterModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: จัดการการสมัครสมาชิกด้วย Email/Password
        console.log('Register submitting:', formData);
    };

    const handleGoogleRegister = () => {
        // TODO: จัดการ Auth ด้วย Google (เช่น NextAuth signIn('google') หรือ Firebase)
        console.log('Google Sign-In Clicked');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">

            {/* Container */}
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-2xl">

                {/* Glow Effect ด้านหลัง Modal */}
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
                    aria-label="Close modal"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white font-line">
                        สมัครสมาชิก
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        เข้าร่วมเป็นส่วนหนึ่งกับ <span className="text-amber-500 font-medium">Bitcoin Membership</span>
                    </p>
                </div>

                {/* Google Sign-In Button */}
                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    className="flex w-full items-center justify-center gap-3 rounded-xl
                     border border-white/15 bg-white/5 py-3 px-4 text-sm font-medium cursor-pointer
                      text-white transition-all duration-200 hover:bg-white/10 hover:border-white/30 hover:scale-[1.01] active:scale-[0.99]"
                >
                    {/* Google Logo SVG */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                        />
                    </svg>
                    ดำเนินการต่อด้วย Google
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-zinc-800" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">หรือ</span>
                    <div className="h-[1px] flex-1 bg-zinc-800" />
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name Field */}
                    <div>
                        <label className="block mb-1.5 text-md font-medium text-zinc-300">
                            ชื่อ - นามสกุล
                        </label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="text"
                                required
                                placeholder="สมชาย สายเทรด"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-white
                                 placeholder-zinc-500 transition-all focus:border-amber-500 focus:bg-zinc-900 focus:outline-none
                                  focus:ring-0.5 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1.5 text-md font-medium text-zinc-300">
                            เบอร์โทรศัพท์
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="text"
                                required
                                placeholder="09X-XXX-XXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition-all focus:border-amber-500
                                focus:bg-zinc-900 focus:outline-none focus:ring-0.5 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1.5 text-md font-medium text-zinc-300">
                            อีเมล
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pl-11 pr-4 text-sm text-white
                                 placeholder-zinc-500 transition-all focus:border-amber-500 focus:bg-zinc-900 focus:outline-none
                                  focus:ring-0.5 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-1.5 text-md font-medium text-zinc-300">
                            รหัสผ่าน
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="อย่างน้อย 8 ตัวอักษร"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full rounded-xl border border-white/10 bg-zinc-900/60 py-3 pl-11 pr-11
                                text-sm text-white placeholder-zinc-500 transition-all focus:border-amber-500
                                focus:bg-zinc-900 focus:outline-none focus:ring-0.5 focus:ring-amber-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                            >
                                {showPassword ? <EyeOff className="cursor-pointer h-5 w-5" />
                                                : <Eye className="cursor-pointer h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-amber-500 py-3.5 text-base font-semibold
                         text-black transition-all duration-200 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20
                         hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                        สร้างบัญชีผู้ใช้
                    </button>
                </form>

                {/* Switch to Login */}
                <div className="mt-6 text-center text-xs text-zinc-400">
                    มีบัญชีผู้ใช้อยู่แล้ว?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="font-medium text-amber-500 hover:underline cursor-pointer hover:text-amber-400"
                    >
                        เข้าสู่ระบบ
                    </button>
                </div>

            </div>
        </div>
    );
}