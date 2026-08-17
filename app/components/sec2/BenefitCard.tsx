"use client";

import { motion } from "framer-motion";
import {
    Users,
    Coins,
    Zap,
    Gift,
} from "lucide-react";

import type { Language } from "@/app/page";

interface BenefitSectionProps {
    lang: Language;
}

const rewards = {
    th: [
        {
            title: "Lightning purchasing",
            value: "+1 LP",
            icon: Zap,
            color: "from-orange-400 to-yellow-400",
            description:
                "รับแต้มสะสมเพิ่มขึ้นเมื่อชำระผ่านไลท์นิ่งเน็ตเวิร์ค",
        },
        {
            title: "Daily Impact",
            value: "Earned, Not Minted",
            icon: Gift,
            color: "from-violet-500 to-pink-500",
            description:
                "LP จะได้รับผ่านการชำระบน Lightning Network เท่านั้น",
        },
        {
            title: "Special Meetup",
            value: "Exclusive",
            icon: Users,
            color: "from-pink-500 to-orange-400",
            description:
                "เข้าร่วมกิจกรรมพิเศษสำหรับสมาชิก Bitcoin Membership",
        },
    ],

    en: [
        {
            title: "Lightning purchasing",
            value: "+1 LP",
            icon: Zap,
            color: "from-orange-400 to-yellow-400",
            description:
                "Earn extra points when you pay with the Lightning Network.",
        },
        {
            title: "Daily Impact",
            value: "Earned, Not Minted",
            icon: Gift,
            color: "from-violet-500 to-pink-500",
            description:
                "LP is earned exclusively through payments made on the Lightning Network.",
        },
        {
            title: "Special Meetup",
            value: "Exclusive",
            icon: Users,
            color: "from-pink-500 to-orange-400",
            description:
                "Join exclusive events created for Bitcoin Membership members.",
        },
    ],

    zh: [
        {
            title: "Lightning 支付",
            value: "+1 LP",
            icon: Zap,
            color: "from-orange-400 to-yellow-400",
            description:
                "使用 Lightning Network 支付即可获得额外积分。",
        },
        {
            title: "每日奖励",
            value: "赚取，而非铸造",
            icon: Gift,
            color: "from-violet-500 to-pink-500",
            description:
                "LP 仅通过闪电网络支付获得。",
        },
        {
            title: "特别活动",
            value: "Exclusive",
            icon: Users,
            color: "from-pink-500 to-orange-400",
            description:
                "参加专为 Bitcoin Membership 会员举办的特别活动。",
        },
    ],
};

const content = {
    th: {
        badge: "Benefits",
        title1: "Purchase.",
        title2: "Scan.",
        title3: "Get More Rewards.",
        description1: "เพียงซื้อสินค้าและบริการจากร้านค้าที่เข้าร่วมรายการกับ",
        description2: "รับแต้มสะสมเพื่อแลกเป็นสินค้าหรือสิทธิพิเศษ",
    },

    en: {
        badge: "Benefits",
        title1: "Purchase.",
        title2: "Earn.",
        title3: "Get More Benefits.",
        description1:
            "Simply purchase products and services from participating merchants with",
        description2:
            "Earn points and redeem them for products and exclusive benefits.",
    },

    zh: {
        badge: "会员权益",
        title1: "消费.",
        title2: "赚取.",
        title3: "享受更多权益.",
        description1:
            "在参与 Bitcoin Membership 的商家购买商品和服务，",
        description2:
            "即可累积积分并兑换商品或专属权益。",
    },
};

export default function BenefitSection({
                                           lang,
                                       }: BenefitSectionProps) {

    const t = content[lang];
    const currentRewards = rewards[lang];

    return (
        <section className="relative bg-black overflow-hidden">

            {/* Glow */}
            <div className="absolute left-0 top-10 h-80 w-80 rounded-full bg-pink-500/10 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-6">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">

                        <Coins
                            className="text-amber-500"
                            size={18}
                        />

                        <span className="text-sm tracking-[0.3em] text-zinc-300">
                            {t.badge}
                        </span>

                    </div>


                    {/* Heading */}
                    <h2 className="mt-8 font-line text-5xl text-white">

                        {t.title1}

                        <span className="bg-amber-500 bg-clip-text text-transparent">
                            {" "}{t.title2}
                        </span>

                        <br />

                        {t.title3}

                    </h2>


                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">

                        {t.description1}

                        <span className="bg-amber-500 bg-clip-text text-transparent">
                            {" "}Bitcoin Membership{" "}
                        </span>

                        <br />

                        {t.description2}

                    </p>

                </motion.div>


                {/* Reward Cards */}
                <div className="mt-20 mb-20 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">

                    {currentRewards.map((reward, index) => {

                        const Icon = reward.icon;

                        return (
                            <motion.div
                                key={reward.title}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="
                                    relative
                                    flex
                                    h-80
                                    flex-col
                                    overflow-hidden
                                    rounded-[32px]
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    p-8
                                    backdrop-blur-xl
                                "
                            >

                                {/* Background Gradient */}
                                <div
                                    className={`
                                        absolute
                                        inset-0
                                        z-0
                                        bg-gradient-to-br
                                        opacity-10
                                        ${reward.color}
                                    `}
                                />


                                {/* Card Content */}
                                <div className="relative z-10 flex h-full flex-col">

                                    {/* Icon */}
                                    <div
                                        className={`
                                            flex
                                            h-16
                                            w-16
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            bg-gradient-to-r
                                            ${reward.color}
                                        `}
                                    >
                                        <Icon
                                            className="text-white"
                                            size={30}
                                        />
                                    </div>


                                    {/* Title */}
                                    <h3 className="mt-8 text-2xl font-bold text-white">
                                        {reward.title}
                                    </h3>


                                    {/* Description */}
                                    <p className="mt-4 text-zinc-400">
                                        {reward.description}
                                    </p>


                                    {/* CP */}
                                    <div
                                        className="
                                            mt-auto
                                            pt-6
                                            text-4xl
                                            font-bold
                                            bg-gradient-to-r
                                            from-pink-500
                                            to-orange-400
                                            bg-clip-text
                                            text-transparent
                                        "
                                    >
                                        {reward.value}
                                    </div>

                                </div>

                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}