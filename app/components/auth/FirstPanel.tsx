'use client';

import Image from "next/image";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { FaApple, FaAndroid, FaGlobe } from "react-icons/fa6";

const content = {
    th: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc: "สะสมแต้มและรับสิทธิพิเศษมากมาย กับร้านค้าที่เข้าร่วมรายการกับ Bitcoin Membership",
        registerBtn: "สมัครสมาชิก",
        ios: "iOS",
        android: "Android"
    },
    en: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc: "Collect points and unlock exclusive privileges at participating merchants.",
        registerBtn: "Register Now",
        ios: "iOS",
        android: "Android"
    },
    zh: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc: "在合作商家累积积分并享受专属特权",
        registerBtn: "立即注册",
        ios: "iOS",
        android: "Android"
    }
};

export default function FirstPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState<'th' | 'en' | 'zh'>('th');

    const t = content[lang];

    return (
        <section className="relative min-h-screen overflow-hidden bg-black font-line flex flex-col justify-between">

            {/* Background */}
            <Image
                src="/assets/BitcoinMember.png"
                alt="Bitcoin Membership"
                fill
                priority
                quality={90}
                className="object-cover opacity-60"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />

            {/* --- Language Switcher --- */}
            <div className="absolute top-6 right-6 md:top-8 md:right-12 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5 text-xs md:text-sm text-white shadow-xl">
                <FaGlobe className="text-amber-500 text-sm" />
                <button
                    type="button"
                    onClick={() => setLang('th')}
                    className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${
                        lang === 'th' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    TH
                </button>
                <span className="text-white/20">|</span>
                <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${
                        lang === 'en' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    EN
                </button>
                <span className="text-white/20">|</span>
                <button
                    type="button"
                    onClick={() => setLang('zh')}
                    className={`px-2 py-0.5 rounded-full cursor-pointer transition-all ${
                        lang === 'zh' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    中文
                </button>
            </div>

            {/* Main Content Area */}
            <div className="relative z-30 flex max-w-4xl flex-col px-6 md:px-16 pt-12 md:pt-36 my-12">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <div className="relative h-30 w-30 shrink-0">
                        <Image
                            src="/assets/BitcoinTrans.png"
                            alt="Bitcoin Trans"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-5xl font-bold text-white tracking-[0.2em] leading-none">
                            {t.title}
                        </h2>
                        <p className="text-5xl text-amber-500 leading-tight">
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-6 max-w-lg">
                    <p className="text-lg md:text-2xl text-zinc-300 font-light leading-relaxed">
                        {t.desc}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3.5 mt-20 md:mt-12 max-w-sm">

                    {/* Primary Button */}
                    <button
                        type="button"
                        className="w-full cursor-pointer rounded-2xl bg-amber-500 py-4 text-lg md:text-xl font-bold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                        onClick={() => setIsOpen(true)}
                    >
                        {t.registerBtn}
                    </button>

                    {/* Secondary Split Button (iOS/Android) */}
                    <div className="flex w-full rounded-2xl border border-white/20 bg-white/5 text-white text-sm md:text-base backdrop-blur-md overflow-hidden divide-x divide-white/15">
                        <a
                            href="#"
                            className="flex-1 py-3 text-center cursor-pointer transition-all duration-200 hover:bg-white/15 flex items-center justify-center gap-2 font-medium"
                        >
                            <FaApple className="text-lg" />
                            {t.ios}
                        </a>
                        <a
                            href="#"
                            className="flex-1 py-3 text-center cursor-pointer transition-all duration-200 hover:bg-white/15 flex items-center justify-center gap-2 font-medium"
                        >
                            <FaAndroid className="text-lg" />
                            {t.android}
                        </a>
                    </div>

                </div>

            </div>

            {/* Footer Padding / Glow */}
            <div className="relative z-30 pb-8" />

            <div
                className="
                    pointer-events-none
                    absolute right-0 top-1/3
                    h-72 w-72
                    rounded-full
                    blur-3xl
                    opacity-50
                "
                style={{
                    background: `radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)`,
                }}
            />

            <RegisterModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                lang={lang}
            />

        </section>
    );
}