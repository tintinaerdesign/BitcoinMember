"use client";

import type { Language } from "@/app/page";

import NavBar from "@/app/components/common/Navbar";

interface Props {
    lang: Language;
    setLang: React.Dispatch<React.SetStateAction<Language>>;
}

const detail = {
    th: {
        comingSoon: "Coming Soon...",
    },
    en: {
        comingSoon: "Coming Soon...",
    },
    zh:{
        comingSoon: "马上就来...",
    },
};


export default function RankingLeaderBoard({ lang, setLang }: Props) {

    const t = detail[lang];
    return (
        <section className="min-h-screen bg-black">

            <NavBar lang={lang} setLang={setLang} />

            <div className="relative min-h-screen mx-auto">
                <div className="flex min-h-screen items-center text-4xl md:text-7xl
                text-zinc-400 justify-center font-[Orbitron] animate-pulse">
                    {t.comingSoon}

                </div>

            </div>
        </section>
    );
}