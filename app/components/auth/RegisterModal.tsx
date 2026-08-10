'use client';

import { useState } from 'react';
import { X, Phone, Mail } from 'lucide-react';
import { FaLine } from 'react-icons/fa6';
import type { Language } from '@/app/page'; // ✅ Import Type มาจากไฟล์หลัก

const modalContent = {
    th: {
        title: "สมัครสมาชิก",
        subtitle: "สะสมแต้มและรับสิทธิพิเศษจาก Bitcoin Membership",
        phoneTab: "เบอร์โทรศัพท์",
        emailTab: "อีเมล",
        phonePlaceholder: "กรอกเบอร์โทรศัพท์ (เช่น 0812345678)",
        emailPlaceholder: "กรอกอีเมลของคุณ",
        otpBtn: "รับรหัส OTP ผ่านมือถือ",
        emailBtn: "ดำเนินการต่อด้วยอีเมล",
        divider: "หรือเข้าสู่ระบบด้วย",
        lineBtn: "เข้าสู่ระบบด้วย LINE",
        googleBtn: "เข้าสู่ระบบด้วย Google",
        terms: "การสมัครสมาชิกแสดงว่าคุณยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว",
        closeBtn: "ปิดหน้าต่าง",
    },
    en: {
        title: "Join Membership",
        subtitle: "Collect points and unlock benefits with Bitcoin Membership",
        phoneTab: "Phone",
        emailTab: "Email",
        phonePlaceholder: "Enter mobile number",
        emailPlaceholder: "Enter your email",
        otpBtn: "Send OTP Code",
        emailBtn: "Continue with Email",
        divider: "or continue with",
        lineBtn: "Continue with LINE",
        googleBtn: "Continue with Google",
        terms: "By joining, you agree to our Terms and Privacy Policy.",
        closeBtn: "Close modal",
    },
    zh: {
        title: "注册会员",
        subtitle: "加入 Bitcoin Membership，获取专属权益",
        phoneTab: "手机号码",
        emailTab: "电子邮箱",
        phonePlaceholder: "请输入手机号码",
        emailPlaceholder: "请输入您的电子邮箱",
        otpBtn: "获取验证码",
        emailBtn: "使用邮箱继续",
        divider: "或使用以下方式",
        lineBtn: "使用 LINE 登录",
        googleBtn: "使用 Google 登录",
        terms: "注册即表示您同意我们的条款和隐私政策。",
        closeBtn: "关闭窗口",
    },
};

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang?: Language;
}

export default function RegisterModal({
                                          isOpen,
                                          onClose,
                                          lang = 'th',
                                      }: RegisterModalProps) {
    const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
    const [inputValue, setInputValue] = useState(''); // ✅ เพิ่ม State เก็บค่าใน Input

    if (!isOpen) return null;

    const t = modalContent[lang];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: ส่งข้อมูลไปยัง Backend/API
        console.log(`Submitting ${loginMethod}:`, inputValue);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md font-line"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div
                className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-[#171717] p-6 md:p-8 text-white shadow-2xl z-10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glow Background Effect */}
                <div className="pointer-events-none absolute -right-20 -top-20 z-0 h-44 w-44 rounded-full bg-amber-500/15 blur-[80px]" />

                {/* ปุ่มปิด (X) */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={t.closeBtn} // ✅ แก้ไข aria-label ให้ถูกต้อง
                    className="absolute right-5 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-zinc-300 transition-all hover:bg-white/20 hover:text-white"
                >
                    <X size={22} />
                </button>

                {/* Content */}
                <div className="relative z-10">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h3 className="text-3xl font-bold text-amber-500">
                            {t.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-zinc-300">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Tab เลือกสมัครด้วย มือถือ / อีเมล */}
                    <div className="mb-5 flex rounded-xl bg-black/40 p-1 border border-white/10">
                        <button
                            type="button"
                            onClick={() => {
                                setLoginMethod('phone');
                                setInputValue(''); // เคลียร์ค่าเมื่อสลับแท็บ
                            }}
                            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                                loginMethod === 'phone'
                                    ? 'bg-amber-500 text-black shadow-md'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            {t.phoneTab}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setLoginMethod('email');
                                setInputValue(''); // เคลียร์ค่าเมื่อสลับแท็บ
                            }}
                            className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                                loginMethod === 'email'
                                    ? 'bg-amber-500 text-black shadow-md'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            {t.emailTab}
                        </button>
                    </div>

                    {/* Main Form */}
                    <form onSubmit={handleSubmit}>
                        {loginMethod === 'phone' ? (
                            <div className="relative">
                                <Phone
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
                                />
                                <input
                                    type="tel"
                                    required
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t.phonePlaceholder}
                                    className="w-full rounded-xl border border-white/20 bg-black/50 py-4 pl-12 pr-4 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <Mail
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
                                />
                                <input
                                    type="email"
                                    required
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t.emailPlaceholder}
                                    className="w-full rounded-xl border border-white/20 bg-black/50 py-4 pl-12 pr-4 text-base text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-4 w-full cursor-pointer rounded-xl bg-amber-500 py-4 text-lg font-bold text-black transition-all hover:bg-amber-400 active:scale-[0.99] shadow-lg shadow-amber-500/10"
                        >
                            {loginMethod === 'phone' ? t.otpBtn : t.emailBtn}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/20" />
                        <span className="text-sm font-medium text-zinc-400">
                            {t.divider}
                        </span>
                        <div className="h-px flex-1 bg-white/20" />
                    </div>

                    {/* Social Logins */}
                    <div className="space-y-3">
                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#06C755] py-3.5 text-base font-semibold text-white transition-all hover:bg-[#05b34c] active:scale-[0.99]"
                        >
                            <FaLine className="text-2xl" />
                            {t.lineBtn}
                        </button>

                        <button
                            type="button"
                            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white py-3.5 text-base font-semibold text-zinc-800 transition-all hover:bg-zinc-100 active:scale-[0.99]"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                />
                            </svg>
                            {t.googleBtn}
                        </button>
                    </div>

                    {/* Terms */}
                    <p className="mt-6 px-2 text-center text-xs leading-relaxed text-zinc-300">
                        {t.terms}
                    </p>
                </div>
            </div>
        </div>
    );
}