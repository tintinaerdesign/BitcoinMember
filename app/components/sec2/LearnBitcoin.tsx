"use client";

import Image from "next/image";

import type { Language } from "@/app/page";

interface LearnBitcoinProps {
    lang: Language;
}

const content = {
    th: {
        kicker: "เรียนรู้แบบง่าย ๆ",
        title: "Bitcoin สำหรับมือใหม่",
        subtitle: "อ่านสั้น ๆ เหมือนนิทาน ก็เข้าใจได้แล้ว",
        sessions: [
            {
                id: "bitcoin",
                heading: "Bitcoin คืออะไร?",
                image: "/assets/learn-bitcoin-coin.png",
                imageAlt: "เหรียญทองยิ้มแย้ม น่ารัก",
                points: [
                    "Bitcoin คือเงินดิจิทัล มีเครือข่ายที่แข็งแรงจนไม่อาจทำลายได้",
                    "เหมือนกระปุกออมสินดิจิทัล ที่เราเก็บเงินเองได้",
                    "ส่งได้ทั่วโลก เหมือนส่งเงินในธนาคาร แต่เป็นเงินจริงๆ",
                    "จำกัดที่ 21 ล้านเหรียญ ไม่มีใครแอบพิมพ์เงินนี้แทนเราได้ง่าย ๆ",
                ],
            },
            {
                id: "lightning",
                heading: "Bitcoin Lightning",
                image: "/assets/learn-lightning-bolt.png",
                imageAlt: "สายฟ้าวิ่งเร็วถือพัสดุ",
                points: [
                    "Lightning คือทางลัดของ Bitcoin",
                    "จ่ายเร็วมาก สายฟ้าฟาด แม้จะอยู่คนละซีกโลก",
                    "ถูก ไว เหมาะใช้จ่ายของกินของใช้ในชีวิตประจำวัน",
                    "ร้านค้าได้เงินเร็ว ลูกค้าไม่ต้องรอนาน",
                ],
            },
            {
                id: "payment",
                heading: "วิธีชำระเงิน",
                image: "/assets/learn-payment-shop.png",
                imageAlt: "เด็กซื้อของที่ร้านด้วยคิวอาร์โค้ด",
                points: [
                    "1. สมัครกระเป๋าดิจิทัลกับผู้ให้บริการ",
                    "2. ค้นหาร้านค้าที่รับชำระผ่าน Bitcoin",
                    "3. กดจ่าย เงินจะวิ่งไปหาแม่ค้าทันที",
                    "4. ได้แต้มสะสม ออมไปใช้สิทธิพิเศษทีหลัง เมื่อคุณสมัคร Bitcoin Member",
                ],
            },
        ],
    },
    en: {
        kicker: "Easy to learn",
        title: "Bitcoin for beginners",
        subtitle: "Short, simple stories anyone can understand.",
        sessions: [
            {
                id: "bitcoin",
                heading: "What is Bitcoin?",
                image: "/assets/learn-bitcoin-coin.png",
                imageAlt: "A smiling gold coin buddy",
                points: [
                    "Bitcoin is digital money with a network so strong it is very hard to break.",
                    "It is like a digital piggy bank that you keep yourself.",
                    "Send it to friends anywhere in the world, like a bank transfer, but it is real money.",
                    "There are only 21 million coins. Nobody can easily print more in your place.",
                ],
            },
            {
                id: "lightning",
                heading: "Bitcoin Lightning",
                image: "/assets/learn-lightning-bolt.png",
                imageAlt: "A speedy lightning buddy carrying a parcel",
                points: [
                    "Lightning is Bitcoin's shortcut.",
                    "Payment is lightning-fast, even if you are on the other side of the world.",
                    "It is cheap and quick, perfect for drinks, snacks, and everyday things.",
                    "The shop gets paid quickly, so customers do not have to wait.",
                ],
            },
            {
                id: "payment",
                heading: "How to pay",
                image: "/assets/learn-payment-shop.png",
                imageAlt: "Kids paying at a snack stall with a QR code",
                points: [
                    "1. Sign up for a digital wallet with a provider.",
                    "2. Find a shop that accepts Bitcoin.",
                    "3. Tap pay, and the money goes to the shop right away.",
                    "4. Earn points, then save them for special rewards later.",
                ],
            },
        ],
    },
    zh: {
        kicker: "超简单学习",
        title: "给新手的 Bitcoin",
        subtitle: "像讲故事一样，一看就懂。",
        sessions: [
            {
                id: "bitcoin",
                heading: "什么是 Bitcoin？",
                image: "/assets/learn-bitcoin-coin.png",
                imageAlt: "微笑的金色硬币",
                points: [
                    "Bitcoin 是数字货币，网络非常坚固，很难被摧毁。",
                    "像一个自己保管的数字存钱罐。",
                    "可以汇给世界各地的朋友，像银行转账，但这是真的钱。",
                    "总量只有 2100 万枚，别人很难偷偷帮你多印。",
                ],
            },
            {
                id: "lightning",
                heading: "Bitcoin Lightning",
                image: "/assets/learn-lightning-bolt.png",
                imageAlt: "快速奔跑的闪电伙伴",
                points: [
                    "Lightning 是 Bitcoin 的快捷通道。",
                    "付款快如闪电，即使远在地球另一端。",
                    "又便宜又快，适合买饮料、小吃和日常用品。",
                    "店家很快收到钱，顾客不用久等。",
                ],
            },
            {
                id: "payment",
                heading: "如何支付",
                image: "/assets/learn-payment-shop.png",
                imageAlt: "小朋友用二维码在小摊付款",
                points: [
                    "1. 向服务商注册一个数字钱包。",
                    "2. 寻找接受 Bitcoin 付款的商家。",
                    "3. 点支付，钱会立刻到店家。",
                    "4. 获得积分，存起来以后换特别奖励。",
                ],
            },
        ],
    },
};

export default function LearnBitcoin({ lang }: LearnBitcoinProps) {
    const t = content[lang];

    return (
        <section className="relative overflow-hidden bg-black px-6 py-20 font-line md:py-28">
            <div className="pointer-events-none absolute left-10 top-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">
                <div className="mb-14 text-center">
                    <p className="text-sm font-semibold tracking-wide text-amber-400">{t.kicker}</p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">{t.title}</h2>
                    <p className="mt-3 text-zinc-400">{t.subtitle}</p>
                </div>

                <div className="space-y-10">
                    {t.sessions.map((session, index) => (
                        <article
                            key={session.id}
                            id={session.id}
                            className="scroll-mt-28 rounded-[28px] border border-white/10 bg-[#171717] p-6 md:p-10"
                        >
                            <div className={`flex flex-col items-center gap-8 md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                                <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-black/40">
                                    <Image
                                        src={session.image}
                                        alt={session.imageAlt}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 420px"
                                    />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="text-2xl font-bold text-amber-500 md:text-3xl">
                                        {session.heading}
                                    </h3>
                                    <ul className="mt-5 space-y-3">
                                        {session.points.map((point) => (
                                            <li
                                                key={point}
                                                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-base leading-relaxed text-zinc-200 md:text-lg"
                                            >
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
