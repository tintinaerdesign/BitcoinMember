"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Navigation,
    ArrowUpRight,
} from "lucide-react";

import  Image  from "next/image";

import type { Language } from "@/app/page";

interface FindMapsProps {
    lang: Language;
}

const MAP_URL = "https://btcmap.org/map";

const content = {
    th: {
        badge: "Find Merchants",
        title1: "Explore",
        title2: "Merchant Nearby.",
        description:
            "ค้นหาร้านค้าที่เข้าร่วม Bitcoin Membership ใกล้คุณ ใช้จ่ายและรับแต้มสะสมได้ทันที",
        explore: "ค้นหาร้านค้าใกล้คุณ",
        location: "Your Location",
        merchant: "Bitcoin Merchant",
        lightning: "Bitcoin • Lightning",
    },

    en: {
        badge: "Find Merchants",
        title1: "Explore",
        title2: "Merchant Nearby.",
        description:
            "Find nearby merchants where you can pay with Bitcoin and earn rewards.",
        explore: "Explore Bitcoin Map",
        location: "Your Location",
        merchant: "Bitcoin Merchant",
        lightning: "Bitcoin • Lightning",
    },

    zh: {
        badge: "寻找商家",
        title1: "探索",
        title2: "附近商家.",
        description:
            "寻找附近参与 Bitcoin Membership 的商家，使用 Bitcoin 支付并立即赚取积分",
        explore: "探索 Bitcoin 地图",
        location: "你的位置",
        merchant: "Bitcoin 商家",
        lightning: "Bitcoin • Lightning",
    },
};

export default function FindMaps({ lang }: FindMapsProps) {
    const t = content[lang];

    return (
        <section className="relative overflow-hidden bg-black py-24 md:py-32">


            {/* BACKGROUND GLOW */}
            <div className="absolute left-[-10%] top-20 h-96 w-96 rounded-full
                bg-orange-500/10 blur-[140px]"
            />

            <div className="absolute bottom-0 right-[-10%] h-96 w-96
                rounded-full bg-amber-500/10 blur-[140px]"
            />

            <div className="absolute right-20 bottom-30 h-60 w-60 rounded-full
                bg-amber-500/40 blur-[120px] animate-pulse"
            />


            <div className="relative mx-auto max-w-7xl px-6">

                <div className="grid items-center gap-14
                    lg:grid-cols-2 lg:gap-20"
                >


                    {/* ================================================= */}
                    {/* LEFT */}
                    {/* ================================================= */}

                    <motion.div
                        initial={{ opacity: 0, x: -40, }}
                        whileInView={{ opacity: 1, x: 0, }}
                        viewport={{ once: true, }}
                        transition={{ duration: 0.6, }}
                        className="text-center
                        lg:text-left"
                    >

                        {/* Badge */}

                        <div className="inline-flex items-center gap-3
                            rounded-full border border-white/10 bg-white/[0.04]
                            px-5 py-2 backdrop-blur-xl"
                        >

                            <MapPin
                                size={20}
                                strokeWidth={1.5}
                                className="text-amber-500"
                            />

                            <span className="
                                text-lg
                                tracking-[0.15em]
                                text-zinc-300
                            ">
                                {t.badge}
                            </span>

                        </div>


                        {/* Heading */}

                        <h2 className="mt-8 font-line text-5xl
                            leading-[1.05] text-white
                            md:text-6xl
                        ">
                            {t.title1}

                            <br />

                            <span className="bg-gradient-to-r from-amber-400 to-orange-500
                                bg-clip-text text-transparent
                            ">
                                {t.title2}
                            </span>

                        </h2>


                        {/* Description */}

                        <p className="mx-auto mt-7 max-w-xl text-lg
                            leading-relaxed text-zinc-400 lg:mx-0
                        ">
                            {t.description}
                        </p>


                        {/* Small CTA */}

                        <motion.a
                            href={MAP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 4, }}
                            whileTap={{ scale: 0.98, opacity: 0.5 }}
                            className="mt-8
                                inline-flex items-center gap-2 text-2xl
                                font-medium text-amber-500 transition-colors
                                hover:text-amber-400
                            "
                        >

                            {t.explore}

                            <ArrowUpRight
                                size={17}
                            />

                        </motion.a>

                    </motion.div>


                    {/* ================================================= */}
                    {/* MOCK MAP */}
                    {/* ================================================= */}

                    <motion.a
                        href={MAP_URL}
                        target="_blank"
                        rel="noopener noreferrer"

                        initial={{opacity: 0, x: 40,}}
                        whileInView={{opacity: 1, x: 0,}}
                        viewport={{once: true,}}
                        transition={{duration: 0.7,}}
                        whileHover={{y: -6,}}

                        className="group relative block cursor-pointer"
                    >

                        {/* Map Container */}

                        <div className="
                            relative
                            aspect-[4/3]
                            overflow-hidden
                            rounded-[36px]
                            border
                            border-white/10
                            bg-[#111]
                            shadow-2xl
                            transition-all
                            duration-500
                            group-hover:border-amber-500/30
                            group-hover:shadow-[0_20px_80px_rgba(245,158,11,0.12)]
                        ">


                            {/* ================================================= */}
                            {/* FAKE MAP GRID */}
                            {/* ================================================= */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    opacity-100
                                "
                                style={{
                                    backgroundImage: `
                                        linear-gradient(
                                            rgba(255,255,255,0.035) 1px,
                                            transparent 1px
                                        ),
                                        linear-gradient(
                                            90deg,
                                            rgba(255,255,255,0.035) 1px,
                                            transparent 1px
                                        )
                                    `,
                                    backgroundSize: "44px 44px",
                                }}
                            />


                            {/* ================================================= */}
                            {/* FAKE ROADS */}
                            {/* ================================================= */}

                            <div className="
                                absolute
                                left-[-10%]
                                top-[45%]
                                h-[2px]
                                w-[120%]
                                rotate-12
                                bg-white/[0.05]
                            " />

                            <div className="
                                absolute
                                left-[20%]
                                top-[-10%]
                                h-[120%]
                                w-[2px]
                                rotate-[25deg]
                                bg-white/[0.05]
                            " />

                            <div className="
                                absolute
                                left-[-10%]
                                top-[25%]
                                h-[2px]
                                w-[120%]
                                -rotate-[18deg]
                                bg-white/[0.04]
                            " />

                            <div className="
                                absolute
                                left-[65%]
                                top-[-10%]
                                h-[120%]
                                w-[2px]
                                -rotate-[35deg]
                                bg-white/[0.04]
                            " />


                            {/* ================================================= */}
                            {/* MAP GLOW */}
                            {/* ================================================= */}

                            <div className="
                                absolute
                                left-1/2
                                top-1/2
                                h-72
                                w-72
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-full
                                bg-orange-500/10
                                blur-[100px]
                            " />


                            {/* ================================================= */}
                            {/* MERCHANT PINS */}
                            {/* ================================================= */}

                            <MapPinMarker
                                className="left-[17%] top-[25%] z-10"
                                delay={0}
                            />

                            <MapPinMarker
                                className="left-[70%] top-[21%] z-10"
                                delay={0.15}
                            />

                            <MapPinMarker
                                className="left-[77%] top-[60%] z-10"
                                delay={0.3}
                            />

                            <MapPinMarker
                                className="left-[25%] top-[66%] z-10"
                                delay={0.45}
                            />


                            {/* ================================================= */}
                            {/* CURRENT LOCATION */}
                            {/* ================================================= */}

                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute left-1/2 top-1/2 z-50
                                    -translate-x-1/2
                                    -translate-y-1/2
                                "
                            >

                                {/* Pulse */}

                                <div className="absolute left-1/2 top-1/2 h-24 w-24 rounded-full
                                bg-amber-500/10
                                    -translate-x-1/2
                                    -translate-y-1/2"
                                />

                                <div className="relative flex h-16 w-16 items-center justify-center rounded-full
                                border-r border-black bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.45)]
                                transition-transform duration-500 group-hover:scale-110"
                                >

                                    <MapPin
                                        size={30}
                                        fill="currentColor"
                                        className="text-black"
                                    />

                                </div>

                            </motion.div>


                            {/* ================================================= */}
                            {/* LOCATION LABEL */}
                            {/* ================================================= */}

                            <div className="
                                absolute
                                left-5
                                top-5
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/60
                                px-4
                                py-3
                                backdrop-blur-xl
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <Navigation
                                        size={15}
                                        className="text-amber-500"
                                    />

                                    <span className="
                                        text-sm
                                        text-white
                                    ">
                                        {t.location}
                                    </span>

                                </div>

                            </div>


                            {/* ================================================= */}
                            {/* MERCHANT CARD */}
                            {/* ================================================= */}

                            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border
                            border-white/10 bg-black/90 p-1 backdrop/blur-xl z-50
                            md:p-4
                            ">

                                <div className="flex items-center justify-between pr-3
                                        md:pr-1">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">
                                        <div className="relative w-14 h-14 shrink-0 ">
                                            <Image
                                                src="/assets/BitcoinTrans.png"
                                                alt="Bitcoin Trans"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>





                                        <div>

                                            <p className="
                                                font-medium
                                                text-white
                                            ">
                                                {t.merchant}
                                            </p>

                                            <p className="
                                                text-xs
                                                text-zinc-500
                                            ">
                                                {t.lightning}
                                            </p>

                                        </div>

                                    </div>


                                    <ArrowUpRight
                                        size={20}
                                        className="
                                            text-zinc-500
                                            transition-all
                                            duration-300
                                            group-hover:-translate-y-1
                                            group-hover:translate-x-1
                                            group-hover:text-amber-500

                                        "
                                    />

                                </div>

                            </div>


                            {/* ================================================= */}
                            {/* HOVER OVERLAY */}
                            {/* ================================================= */}

                            <div className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                bg-black/0
                                transition-all
                                duration-500
                                group-hover:bg-black/10
                            ">

                            </div>

                        </div>

                    </motion.a>

                </div>

            </div>

        </section>
    );
}


/* ================================================= */
/* MAP MARKER */
/* ================================================= */

function MapPinMarker({
                          className,
                          delay,
                      }: {
    className: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.5,
            }}

            whileInView={{
                opacity: 1,
                scale: 1,
            }}

            viewport={{
                once: true,
            }}

            transition={{
                delay,
                duration: 0.5,
            }}

            whileHover={{
                scale: 1.15,
            }}

            className={`
                absolute
                z-10
                ${className}
            `}
        >

            <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-black
                bg-white/90
                shadow-lg
            ">

                <MapPin
                    size={19}
                    className="text-orange-500"
                    fill="currentColor"
                />

            </div>

        </motion.div>
    );
}