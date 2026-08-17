"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe } from "react-icons/fa6";
import RegisterModal from "@/app/components/auth/RegisterModal";

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
        ranking: "Ranking",
        support: "Support",
        register: "สมัครสมาชิก",
    },
    en: {
        home: "Home",
        maps: "Maps",
        communityMaps: "Community Maps",
        ranking: "Ranking",
        support: "Support",
        register: "Register Now",
    },
    zh: {
        home: "首页",
        maps: "地图",
        communityMaps: "社区地图",
        ranking: "排行榜",
        support: "支持",
        register: "立即注册",
    },
};

export default function Navbar({ lang, setLang }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
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

    const linkClass =
        "whitespace-nowrap text-zinc-300 transition hover:text-amber-500 text-base font-medium lg:text-lg";

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`fixed inset-x-0 z-50 mx-auto border-amber-500/30 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(236,41,0,0.12)] transition-all duration-500 ${
                    isScrolled
                        ? "top-4 w-11/12 rounded-[10px] border"
                        : "top-0 w-full rounded-none border-b"
                }`}
            >
                <div className="relative mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6 lg:px-8">
                    <Link href="/" className="relative z-10 h-9 w-24 shrink-0 md:h-12 md:w-36">
                        <Image
                            src="/assets/Logo.png"
                            alt="Bitcoin Member"
                            fill
                            className="object-contain object-left"
                        />
                    </Link>

                    <div className="absolute inset-x-0 hidden justify-center md:flex pointer-events-none">
                        <div className="pointer-events-auto flex items-center gap-5 lg:gap-8">
                            <Link href="/" className={linkClass}>
                                {t.home}
                            </Link>
                            <a
                                href="https://btcmap.org/map"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                {t.maps}
                            </a>
                            <a
                                href="https://btcmap.org/communities/map"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                {t.communityMaps}
                            </a>
                            <Link href="/ranking" className={linkClass}>
                                {t.ranking}
                            </Link>
                            <Link href="/support" className={linkClass}>
                                {t.support}
                            </Link>
                        </div>
                    </div>

                    <div className="relative z-10 flex shrink-0 items-center gap-2 md:gap-3">
                        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 text-sm text-white shadow-xl md:gap-1.5 md:px-2.5 md:py-1.5">
                            <FaGlobe className="shrink-0 text-xs text-amber-500 md:text-base" />
                            <button
                                type="button"
                                onClick={() => setLang("th")}
                                className={`cursor-pointer rounded-full px-1.5 py-0.5 transition-all ${
                                    lang === "th"
                                        ? "bg-amber-500 font-bold text-black"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                TH
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                type="button"
                                onClick={() => setLang("en")}
                                className={`cursor-pointer rounded-full px-1.5 py-0.5 transition-all ${
                                    lang === "en"
                                        ? "bg-amber-500 font-bold text-black"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                EN
                            </button>
                            <span className="text-white/20">|</span>
                            <button
                                type="button"
                                onClick={() => setLang("zh")}
                                className={`cursor-pointer rounded-full px-1.5 py-0.5 transition-all ${
                                    lang === "zh"
                                        ? "bg-amber-500 font-bold text-black"
                                        : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                中文
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="flex cursor-pointer items-center text-white md:hidden"
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-3xl">
                                {isOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-b-xl border-t border-white/10 bg-[#0f0f0f]/95 p-6 backdrop-blur-xl md:hidden"
                        >
                            <ul className="flex flex-col space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-zinc-300 transition hover:text-amber-500"
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
                                        className="text-lg font-medium text-zinc-300 transition hover:text-amber-500"
                                    >
                                        {t.maps}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://btcmap.org/communities/map"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-zinc-300 transition hover:text-amber-500"
                                    >
                                        {t.communityMaps}
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/ranking"
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-zinc-300 transition hover:text-amber-500"
                                    >
                                        {t.ranking}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/support"
                                        onClick={() => setIsOpen(false)}
                                        className="text-lg font-medium text-zinc-300 transition hover:text-amber-500"
                                    >
                                        {t.support}
                                    </Link>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-amber-500 py-3 text-lg font-bold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsOpenModal(true);
                                }}
                            >
                                {t.register}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            <RegisterModal
                isOpenModal={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                lang={lang}
            />
        </>
    );
}
