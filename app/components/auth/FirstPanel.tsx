'use client';

import Image from "next/image";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import { FaApple, FaAndroid, FaGlobe } from "react-icons/fa6";


type Language = 'th' | 'en' | 'zh';

interface FirstPanelProps {
    lang: Language;
}


const content = {
    th: {
        title: "Bitcoin",
        subtitle: "Member",
        desc: "สะสมแต้มและรับสิทธิพิเศษมากมาย กับร้านค้าที่เข้าร่วมรายการกับ Bitcoin Member",
        registerBtn: "สมัครสมาชิก",
        ios: "iOS",
        android: "Android"
    },
    en: {
        title: "Bitcoin",
        subtitle: "Member",
        desc: "Collect points and unlock exclusive privileges at participating merchants.",
        registerBtn: "Register Now",
        ios: "iOS",
        android: "Android"
    },
    zh: {
        title: "Bitcoin",
        subtitle: "Member",
        desc: "在合作商家累积积分并享受专属特权",
        registerBtn: "立即注册",
        ios: "iOS",
        android: "Android"
    }
};

export default function FirstPanel({ lang }: FirstPanelProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const t = content[lang];

    return (
        <section className="relative min-h-screen overflow-hidden bg-black font-line flex flex-col justify-between">

            {/* Background */}
            <Image
                src="/assets/BitcoinMember.png"
                alt="Bitcoin Member"
                fill
                priority
                quality={100}
                className="object-cover opacity-70"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />


            {/* Main Content Area */}
            <div className="relative z-30 flex max-w-4xl flex-col px-6 md:px-36 pt-12 md:pt-36 my-12">

                {/* Header */}
                <div className="flex items-center">
                    <div className="relative h-36 w-80 shrink-0">
                        <Image
                            src="/assets/Logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="max-w-lg">
                    <p className="text-lg md:text-2xl text-zinc-300 font-light leading-relaxed">
                        {t.desc}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3.5 mt-20 md:mt-12 max-w-sm">

                    {/* Register Button */}
                    <button
                        type="button"
                        className="w-full cursor-pointer rounded-2xl bg-amber-500 py-4 text-lg md:text-xl font-bold text-black
                        transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                        onClick={() => setIsOpenModal(true)}
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
                isOpenModal={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                lang={lang}
            />

        </section>
    );
}