'use client';

import Image from "next/image";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { FaApple, FaAndroid, FaGlobe } from "react-icons/fa";

const content = {
    th: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc1: "สะสมแต้มและรับสิทธิพิเศษจาก",
        desc2: " กับร้านค้าที่เข้าร่วมรายการ",
        registerBtn: "สมัครสมาชิก",
        ios: "iOS",
        android: "Android"
    },
    en: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc1: "Collect points and get exclusive privileges from",
        desc2: " with participating merchants.",
        registerBtn: "Register",
        ios: "iOS",
        android: "Android"
    },
    zh: {
        title: "Bitcoin",
        subtitle: "Membership",
        desc1: "在合作商家累积积分并享受专属",
        desc2: " 特权",
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
        <section className="relative min-h-screen overflow-hidden bg-black font-line">

            {/* Background */}
            <Image
                src="/assets/BitcoinMember.png"
                alt="Bitcoin Membership"
                fill
                priority
                quality={90}
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t
                from-black/80 via-black/10 to-transparent"
            />

            {/* --- Language Switcher --- */}
            <div className="absolute top-6 right-6 md:top-10 md:right-12 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-sm text-white">
                <FaGlobe className="text-amber-500 text-base" />
                <button
                    type="button"
                    onClick={() => setLang('th')}
                    className={`px-2 py-1 rounded-full cursor-pointer transition-all ${
                        lang === 'th' ? 'bg-amber-500 text-black font-semibold' : 'hover:text-amber-400'
                    }`}
                >
                    TH
                </button>
                <span className="text-white/30">|</span>
                <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-2 py-1 rounded-full cursor-pointer transition-all ${
                        lang === 'en' ? 'bg-amber-500 text-black font-semibold' : 'hover:text-amber-400'
                    }`}
                >
                    EN
                </button>
                <span className="text-white/30">|</span>
                <button
                    type="button"
                    onClick={() => setLang('zh')}
                    className={`px-2 py-1 rounded-full cursor-pointer transition-all ${
                        lang === 'zh' ? 'bg-amber-500 text-black font-semibold' : 'hover:text-amber-400'
                    }`}
                >
                    中文
                </button>
            </div>

            {/* Content */}
            <div className="relative z-30 flex max-w-5xl flex-col px-6 md:px-16 pt-24 md:pt-48">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/BitcoinTrans.png"
                        alt="Bitcoin"
                        width={100}
                        height={100}
                    />

                    <div className="flex flex-col items-start gap-2">
                        <h2 className="font-line text-5xl font-semibold text-white tracking-[0.2em]">
                            {t.title}
                        </h2>
                        <p className="text-5xl text-amber-500">
                            {t.subtitle}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4 max-w-lg">
                    <p className="font-line text-xl md:text-3xl text-white">
                        {t.desc1}
                        <span className="text-amber-500">
                            {" "}Membership{" "}
                        </span>
                        {t.desc2}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 mt-32 md:mt-14">

                    <div className="relative w-full md:w-56">
                        <button
                            type="button"
                            className="w-full cursor-pointer rounded-xl
                            bg-amber-500 p-4 text-2xl transition-all duration-500
                            hover:scale-105 font-line"
                            onClick={() => setIsOpen(true)}
                        >
                            {t.registerBtn}
                        </button>
                    </div>

                    {/* iOS / Android Split Button */}
                    <div className="flex w-full md:w-64 border border-white rounded-xl text-white text-2xl backdrop-blur-2xl overflow-hidden divide-x divide-white/40">
                        <a
                            href="#"
                            className="flex-1 py-4 text-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-line flex items-center justify-center gap-2"
                        >
                            <FaApple className="text-2xl" />
                            {t.ios}
                        </a>
                        <a
                            href="#"
                            className="flex-1 py-4 text-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-line flex items-center justify-center gap-2"
                        >
                            <FaAndroid className="text-2xl" />
                            {t.android}
                        </a>
                    </div>

                </div>

            </div>

            {/* Glow Effects */}
            <div
                className="
                    absolute right-10 top-80
                    h-40 w-40
                    animate-pulse
                    rounded-full
                    blur-4xl
                "
                style={{
                    background: `
                        radial-gradient(circle,
                            rgba(251,191,36,0.45) 0%,
                            rgba(251,191,36,0.22) 20%,
                            rgba(251,191,36,0.10) 45%,
                            rgba(251,191,36,0.03) 70%,
                            transparent 100%)
                    `,
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