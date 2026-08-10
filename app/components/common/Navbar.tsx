"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [lang, setLang] = useState<'th' | 'en' | 'zh'>("th");

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
        fixed z-50 left-1/2 -translate-x-1/2
        border border-amber-500/30 bg-black/50 backdrop-blur-xl
        shadow-[0_0_40px_rgba(236,41,0,0.12)]
        transition-all duration-500
        ${isScrolled ? "top-4 w-11/12 rounded-[28px]" : "top-0 w-full rounded-none"}
    `}
        >
            <div className="grid grid-cols-3 mx-auto items-center justify-between py-2 px-3">
                {/* Logo */}
                <div className="hide md:flex items-center gap-1">
                    <div className="relative h-14 w-14 shrink-0">
                        <Image
                            src="/assets/BitcoinTrans.png"
                            alt="Bitcoin Trans"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-white tracking-[0.2em] leading-none">
                            Bitcoin
                        </h2>
                        <p className="text-2xl text-amber-500 leading-tight">
                            Membership
                        </p>
                    </div>
                </div>
                <div className="hide md:flex items-center gap-1">
                    <Link
                        href="/"
                        className="text-zinc-400 transition hover:text-white"
                    >
                        Ranking Leaderboard
                    </Link>
                </div>


                {/* --- Language Switcher --- */}
                <div className="absolute top-5 right-5 z-50 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5 text-xs md:text-sm text-white shadow-xl">
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

                {/* Desktop Menu */}
                <div className="hidden items-center gap-8 text-2xl">
                    {/* Mobile Button */}
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="flex items-center cursor-pointer justify-center text-white md:hidden"
                    >
                      <span className="material-symbols-outlined text-4xl">
                        {isOpen ? "close" : "menu"}
                      </span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="
              rounded-b-3xl
              border-t
              border-white/10
              bg-[#0f0f0f]/95
              backdrop-blur-xl
              md:hidden
            "
                    >
                        <ul className="flex flex-col space-y-6 p-6">
                            <li>
                                <Link href="/" onClick={() => setIsOpen(false)}>
                                    Ranking Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}