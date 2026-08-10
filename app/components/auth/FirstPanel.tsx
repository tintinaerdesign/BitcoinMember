'use client';

import Image from "next/image";
import { useState } from "react";
import RegisterModal from "./RegisterModal";



import StarsIcon from '@mui/icons-material/Stars';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'; // สำหรับ iOS
import AdbIcon from '@mui/icons-material/Adb'; // Android (โลโก้หุ่นยนต์)

export default function FirstPanel() {
    const [isOpen, setIsOpen] = useState(false);

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

            {/* Content */}
            <div className="relative z-30 flex max-w-5xl flex-col px-12 pt-18 md:px-46 md:pt-48">

                {/* Header */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/assets/BitcoinTrans.png"
                        alt="Bitcoin"
                        width={100}
                        height={100}
                    />

                    <div className="flex flex-col items-start gap-2">

                        <div className="flex items-center gap-2">
                            <h2 className="font-line text-5xl font-semibold text-white tracking-[0.2em]">
                                Bitcoin
                            </h2>
                        </div>

                        <p className="text-5xl text-amber-500">
                            Membership
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4 max-w-lg">

                    <div className="flex items-start gap-3">
                        <StarsIcon className="text-amber-500 text-3xl mt-1 flex-shrink-0" /> {/* ไอคอนดาวสีส้ม */}
                        <p className="font-line text-xl md:text-3xl text-white">
                            สะสมแต้มและรับสิทธิพิเศษจาก
                            <span className="text-amber-500">
                                {" "}Membership{" "}
                            </span>
                            กับร้านค้าที่เข้าร่วมรายการ
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 mt-60 md:mt-14">

                    <div className="relative w-full md:w-85">
                        <button
                            className="w-full cursor-pointer rounded-xl
                            bg-amber-500 p-4 text-2xl transition-all duration-500
                            hover:scale-103 font-line flex items-center justify-center gap-2" // เพิ่ม flex เพื่อจัดวางไอคอน
                            onClick={() => setIsOpen(true)}
                        >
                            <StarsIcon /> {/* เพิ่มไอคอนในปุ่มสมัครสมาชิก (ถ้าต้องการ) */}
                            สมัครสมาชิก
                        </button>
                    </div>

                    {/* iOS / Android Split Button  */}
                    <div className="flex w-full md:w-85 border border-white rounded-xl text-white text-2xl backdrop-blur-2xl overflow-hidden divide-x divide-white/40">
                        <a
                            href="#"
                            className="flex-1 py-4 text-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-line flex items-center justify-center gap-2" // เพิ่ม flex
                        >
                            <PhoneIphoneIcon /> {/* ไอคอน iOS น่ารักๆ */}
                            iOS
                        </a>
                        <a
                            href="#"
                            className="flex-1 py-4 text-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-line flex items-center justify-center gap-2" // เพิ่ม flex
                        >
                            <AdbIcon /> {/* ไอคอน Android น่ารักๆ (หุ่นยนต์) */}
                            Android
                        </a>
                    </div>

                </div>

            </div>

            {/* Glow Effects (คงเดิม) */}
            <div
                className="
                    absolute left-224 top-80
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

            <div
                className="
                    absolute right-140 top-120
                    h-40 w-40
                    rounded-full
                    blur-4xl
                    opacity-70
                    animate-pulse
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

            <div
                className="
                    absolute right-170 top-58
                    h-30 w-30
                    animate-pulse
                    rounded-full
                    blur-4xl
                    opacity-5
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
            />

        </section>
    );
}