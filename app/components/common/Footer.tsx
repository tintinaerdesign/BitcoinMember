"use client";

import Link from "next/link";
import Image from "next/image";

import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

import RegisterModal from "@/app/components/auth/RegisterModal";
import { useState } from "react";

import type { Language } from "@/app/page";

interface Props {
    lang: Language;
}

const footerContent = {
    th: {
        brandTitle: "Bitcoin",
        brandSubtitle: "Membership",

        description:
            "ใช้ Bitcoin ในชีวิตประจำวัน ค้นหาร้านค้าที่เข้าร่วม สะสมแต้ม และรับสิทธิพิเศษจาก Bitcoin Membership",

        tags: [
            "Bitcoin",
            "Membership",
            "Lightning",
            "Rewards",
        ],

        membership: "Membership",
        membershipLinks: [
            "สมัครสมาชิก",
            "ค้นหาร้านค้า",
            "Community Maps",
            "แต้มสะสม",
        ],

        bitcoin: "Bitcoin",
        bitcoinLinks: [
            "Bitcoin คืออะไร?",
            "Bitcoin Lightning",
            "วิธีชำระเงิน",

        ],

        support: "Support",
        supportLinks: [
            "วิธีใช้งาน",
            "คำถามที่พบบ่อย",
            "เกี่ยวกับเรา",
            "ติดต่อเรา",
        ],

        copyright:
            "© 2026 Bitcoin Membership. All rights reserved.",

        disclaimer:
            "Bitcoin Membership เป็นแพลตฟอร์มสำหรับสมาชิกและร้านค้าที่รองรับ Bitcoin ข้อมูลบนเว็บไซต์มีไว้เพื่อการให้ข้อมูลและการใช้งานบริการเท่านั้น",
    },

    en: {
        brandTitle: "Bitcoin",
        brandSubtitle: "Membership",

        description:
            "Use Bitcoin in everyday life, discover participating merchants, earn points, and unlock exclusive Bitcoin Membership benefits.",

        tags: [
            "Bitcoin",
            "Membership",
            "Lightning",
            "Rewards",
        ],

        membership: "Membership",
        membershipLinks: [
            "Join Membership",
            "Find Merchants",
            "Community Maps",
            "Rewards",
        ],

        bitcoin: "Bitcoin",
        bitcoinLinks: [
            "What is Bitcoin?",
            "Bitcoin Lightning",
            "How to Pay",
        ],

        support: "Support",
        supportLinks: [
            "How It Works",
            "FAQ",
            "About Us",
            "Contact",
        ],

        copyright:
            "© 2026 Bitcoin Membership. All rights reserved.",

        disclaimer:
            "Bitcoin Membership is a platform for members and merchants using Bitcoin. Website content is provided for informational and service purposes only.",
    },

    zh: {
        brandTitle: "Bitcoin",
        brandSubtitle: "Membership",

        description:
            "使用 Bitcoin 进行日常消费，探索参与商家，赚取积分并享受 Bitcoin Membership 专属权益。",

        tags: [
            "Bitcoin",
            "会员",
            "Lightning",
            "积分奖励",
        ],

        membership: "会员",
        membershipLinks: [
            "注册会员",
            "寻找商家",
            "社区地图",
            "积分奖励",
        ],

        bitcoin: "Bitcoin",
        bitcoinLinks: [
            "什么是 Bitcoin？",
            "Bitcoin Lightning",
            "如何支付",
        ],

        support: "支持",
        supportLinks: [
            "使用方法",
            "常见问题",
            "关于我们",
            "联系我们",
        ],

        copyright:
            "© 2026 Bitcoin Membership. All rights reserved.",

        disclaimer:
            "Bitcoin Membership 是一个面向会员和 Bitcoin 商家的平台。本网站内容仅用于信息和服务用途。",
    },
};

export default function Footer({ lang }: Props) {
    const t = footerContent[lang];

    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
        <footer className="relative overflow-hidden border-t border-white/10 bg-black">
            {/* GLOW BACKGROUND */}

            <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-500/10
                    blur-3xl"
            />

            <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full
                    bg-amber-500/10 blur-3xl"
           />

            <div className="relative mx-auto max-w-7xl px-6 py-14">


                <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.5fr]">


                    <div>

                        {/* BRAND */}
                        <div className="flex items-center">

                            <div className="relative h-20 w-20 shrink-0
                                        md:h-24 md:w-24">
                                <Image
                                    src="/assets/BitcoinTrans.png"
                                    alt="Bitcoin Membership"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className=" ml-3 flex flex-col justify-center">
                                <h2 className="text-3xl font-bold leading-none tracking-[0.08em] text-white
                                md:text-4xl">
                                    {t.brandTitle}
                                </h2>

                                <p className="mt-1 text-2xl leading-tight text-amber-500 md:text-3xl">
                                    {t.brandSubtitle}
                                </p>

                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <p className="mt-6 max-w-md leading-relaxed text-zinc-400">
                            {t.description}
                        </p>


                        {/* TAGS */}

                        <div className="mt-5 flex flex-wrap gap-2.5">

                            {t.tags.map((item) => (

                                <div
                                    key={item}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2
                                    text-sm text-zinc-300 transition
                                    hover:border-amber-500/30
                                    hover:bg-amber-500/30
                                    hover:text-white">
                                    {item}
                                </div>

                            ))}

                        </div>

                    </div>


                    {/* ================================================= */}

                    <div className="grid grid-cols-1 gap-10
                            sm:grid-cols-3">


                        {/* MEMBERSHIP */}
                        <div>
                            <h3 className="mb-5 font-semibold tracking-wide text-white">
                                {t.membership}
                            </h3>

                            <div className="space-y-4 text-sm text-zinc-400">

                                {/* Register */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsOpenModal(true)
                                    }
                                    className="block cursor-pointer transition
                                            hover:text-white">
                                    {t.membershipLinks[0]}
                                </button>


                                {/* Find Merchants */}
                                <a
                                    href="https://btcmap.org/map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition
                                            hover:text-white">
                                    {t.membershipLinks[1]}
                                </a>


                                {/* Community Maps */}

                                <a
                                    href="https://btcmap.org/communities/map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition hover:text-white">
                                    {t.membershipLinks[2]}
                                </a>


                                {/* Rewards */}

                                <a
                                    href="#rewards"
                                    className="block transition
                                            hover:text-white">
                                    {t.membershipLinks[3]}
                                </a>

                            </div>

                        </div>

                        {/* BITCOIN */}
                        <div>
                            <h3 className="mb-5 font-semibold tracking-wide text-white">
                                {t.bitcoin}
                            </h3>

                            <div className="space-y-4 text-sm text-zinc-400">

                                <a
                                    href="#bitcoin"
                                    className="block transition hover:text-white">
                                    {t.bitcoinLinks[0]}
                                </a>


                                <a
                                    href="#lightning"
                                    className="block transition hover:text-white">
                                    {t.bitcoinLinks[1]}
                                </a>


                                <a
                                    href="#payment"
                                    className="block transition hover:text-white">
                                    {t.bitcoinLinks[2]}
                                </a>


                                <a
                                    href="https://btcmap.org/map"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block transition hover:text-white">
                                    Bitcoin Map
                                </a>

                            </div>

                        </div>

                        {/* SUPPORT */}
                        <div>
                            <h3 className="mb-5 font-semibold tracking-wide text-white">
                                {t.support}
                            </h3>

                            <div className="space-y-4 text-sm text-zinc-400">

                                <a
                                    href="#how-it-works"
                                    className="block transition hover:text-white">
                                    {t.supportLinks[0]}
                                </a>


                                <a
                                    href="#faq"
                                    className="block transition hover:text-white">
                                    {t.supportLinks[1]}
                                </a>


                                <a
                                    href="#about"
                                    className="block transition hover:text-white">
                                    {t.supportLinks[2]}
                                </a>


                                <a
                                    href="mailto:contact@bitcoinmembership.com"
                                    className="block transition hover:text-white">
                                    {t.supportLinks[3]}
                                </a>

                            </div>

                        </div>

                    </div>
                </div>



                {/* ================================================= */}
                {/* DIVIDER */}


                <div className="my-14 h-px bg-white/10" />


                {/* ================================================= */}
                {/* BOTTOM */}
                {/* ================================================= */}

                <div className="
                    flex
                    flex-col
                    items-center
                    justify-between
                    gap-6
                    lg:flex-row
                ">


                    {/* COPYRIGHT */}

                    <p className="
                        text-center
                        text-sm
                        text-zinc-500
                        lg:text-left
                    ">
                        {t.copyright}
                    </p>


                    {/* SOCIAL */}

                    <div className="
                        flex
                        items-center
                        gap-6
                        text-zinc-400
                    ">

                        <a
                            href="https://github.com/tintinaerdesign?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                        >
                            <FaGithub
                                className="
                                    cursor-pointer
                                    text-xl
                                    transition
                                    hover:text-white
                                "
                            />
                        </a>


                        <a
                            href="https://x.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X"
                        >
                            <FaXTwitter
                                className="
                                    cursor-pointer
                                    text-xl
                                    transition
                                    hover:text-white
                                "
                            />
                        </a>


                        <a
                            href="mailto:contact@bitcoinmembership.com"
                            aria-label="Email"
                        >
                            <Mail
                                className="
                                    cursor-pointer
                                    text-xl
                                    transition
                                    hover:text-white
                                "
                            />
                        </a>

                    </div>


                    {/* DISCLAIMER */}

                    <p className="
                        max-w-md
                        text-center
                        text-sm
                        leading-relaxed
                        text-zinc-500
                        lg:text-right
                    ">
                        {t.disclaimer}
                    </p>

                </div>
            </div>

        </footer>
        <RegisterModal lang={lang}
            isOpenModal={isOpenModal}
            onClose={()=> setIsOpenModal(false)}
        />
    </>
    );
}