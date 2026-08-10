"use client";

import { motion } from "framer-motion";
import {
    Users,
    Coins,
    Zap,
    Gift,
} from "lucide-react";

const rewards = [
    {
        title: "Lightning purchasing",
        value: "+50 CP",
        icon: Zap,
        color: "from-orange-400 to-yellow-400",
        description:
            "รับแต้มสะสมเพิ่มขึ้นเมื่อชำระผ่านไลท์นิ่งเน็ตเวิร์ค",
    },
    {
        title: "Daily Impact",
        value: "+250 CP",
        icon: Gift,
        color: "from-violet-500 to-pink-500",
        description:
            "เมื่อซื้อสินค้าตั้งแต่ 3 ครั้งขึ้นไปใน 1 วัน รับแต้มเพิ่มแบบจุกๆ",
    },
    {
        title: "Special Meetup",

        icon: Users,
        color: "from-pink-500 to-orange-400",
        description:
            "เข้าร่วมกิจกรรมพิเศษสำหรับสมาชิก Bitcoin Membership",
    },
];

export default function RewardSection() {
    return (
        <section className="relative overflow-hidden bg-black py-20">

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
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-xl">
                        <Coins
                            className="text-amber-500"
                            size={18}
                        />

                        <span className="text-sm tracking-[0.3em] text-zinc-300">
                            Benefits
                        </span>
                    </div>

                    <h2 className="mt-8 font-line text-5xl text-white">
                        Purchase.
                        <span className="bg-amber-500 bg-clip-text text-transparent">
                            {" "}Earn.
                        </span>
                        <br />
                        Get More Benefits.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                        เพียงซื้อสินค้าและบริการจากร้านค้าที่เข้าร่วมรายการกับ
                        <span className="bg-amber-500 bg-clip-text text-transparent">
                            {" "}Bitcoin Membership{" "}
                        </span>
                        <br />
                        รับแต้มสะสมเพื่อแลกเป็นสินค้าหรือสิทธิพิเศษ
                    </p>
                </motion.div>


                {/* Reward Cards */}
                <div className="mt-20 mb-20 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">

                    {rewards.map((reward, index) => {
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


                                    {/* XP */}
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