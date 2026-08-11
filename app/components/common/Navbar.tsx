"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";


import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";

import type { Language } from "@/app/page";

interface NavbarProps {
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
}

const navLang = {
    th: {
        home: "Home",
        maps: "Maps",
        communityMaps: "Community Maps",
        ranking: "Ranking Leaderboard",
        register: "สมัครสมาชิก",
    },

    en: {
        home: "Home",
        maps: "Maps",
        communityMaps: "Community Maps",
        ranking: "Ranking Leaderboard",
        register: "Register Now",
    },

    zh: {
        home: "首页",
        maps: "地图",
        communityMaps: "社区地图",
        ranking: "排行榜",
        register: "立即注册",
    },
};


export default function Navbar({ lang, setLang }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const t = navLang[lang];


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            ref={dropdownRef}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}

            className={`
                fixed inset-x-0 mx-auto z-50
                border-amber-500/30 bg-black/50 backdrop-blur-xl
                shadow-[0_0_40px_rgba(236,41,0,0.12)]
                transition-all duration-500
                ${isScrolled ? "top-4 w-11/12 rounded-[10px] border" : "top-0 w-full border-b rounded-none"}
            `}
        >
            <div className="flex items-center justify-between py-3 px-4 md:px-8">

                {/* 1. Logo (แสดงผลทั้ง Mobile และ Desktop) */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
                        <Image
                            src="/assets/BitcoinTrans.png"
                            alt="Bitcoin Trans"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-lg md:text-xl font-bold text-white tracking-[0.15em] leading-none">
                            Bitcoin
                        </h2>
                        <p className="text-xs md:text-sm text-amber-500 leading-tight">
                            Membership
                        </p>
                    </div>
                </Link>

                {/* 2. Desktop Navigation Links (แสดงเฉพาะจอใหญ่ mdขึ้นไป) */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                    >
                        {t.home}
                    </Link>
                    <a
                        href="https://btcmap.org/map"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 flex flex-row transition hover:text-amber-500 text-lg font-medium"
                    >
                        {t.maps}
                    </a>
                    <a
                        href="https://btcmap.org/communities/map"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 flex flex-row transition hover:text-amber-500 text-lg font-medium"
                    >
                        {t.communityMaps}
                    </a>
                    <Link
                        href="/ranking"
                        className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                    >
                        {t.ranking}
                    </Link>
                </div>

                {/* Language Switcher + Mobile Hamburger Button */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 text-xs text-white shadow-xl">
                        <FaGlobe className="text-amber-500 text-xs shrink-0" />
                        <button
                            type="button"
                            onClick={() => setLang('th')}
                            className={`px-1.5 py-0.5 rounded-full cursor-pointer transition-all ${
                                lang === 'th' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            TH
                        </button>
                        <span className="text-white/20">|</span>
                        <button
                            type="button"
                            onClick={() => setLang('en')}
                            className={`px-1.5 py-0.5 rounded-full cursor-pointer transition-all ${
                                lang === 'en' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            EN
                        </button>
                        <span className="text-white/20">|</span>
                        <button
                            type="button"
                            onClick={() => setLang('zh')}
                            className={`px-1.5 py-0.5 rounded-full cursor-pointer transition-all ${
                                lang === 'zh' ? 'bg-amber-500 text-black font-bold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            中文
                        </button>
                    </div>

                    {/* Mobile Hamburger Button (แยกอยู่นอก hidden และแสดงเฉพาะมือถือ) */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center justify-center text-white md:hidden cursor-pointer p-1"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-3xl">
                            {isOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* 4. Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="
                            rounded-b-xl
                            border-t border-white/10
                            bg-[#0f0f0f]/95 backdrop-blur-xl
                            md:hidden
                        "
                    >
                        <ul className="flex flex-col space-y-4 p-6 mb-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                                >
                                    {t.home}
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://btcmap.org/map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                                >
                                    {t.maps}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://btcmap.org/communities/map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                                >
                                    {t.communityMaps}
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/ranking"
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-300 transition hover:text-amber-500 text-lg font-medium"
                                >
                                    {t.ranking}
                                </Link>
                            </li>
                            <li className="mt-3">
                                {/* Register Button */}
                                <Link
                                    href="/register"
                                    className="text-black transition-all px-12 py-2 bg-amber-500
                                    hover:shadow-lg hover:bg-amber-400 font-semibold
                                    text-lg active:scale-[0.98] rounded-xl">
                                    {t.register}
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}