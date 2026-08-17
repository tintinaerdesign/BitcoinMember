"use client";

import { BookOpen, HelpCircle, Mail, Users } from "lucide-react";

import type { Language } from "@/app/page";

interface SupportContentProps {
    lang: Language;
}

const content = {
    th: {
        kicker: "Support",
        title: "เราพร้อมช่วยให้ใช้ Bitcoin ง่ายขึ้น",
        subtitle: "อ่านสั้น ๆ เข้าใจได้เลย ไม่ต้องเก่งเทคโนโลยี",
        howToUse: {
            id: "how-to-use",
            title: "วิธีใช้งาน",
            intro: "ใช้ Bitcoin Member เป็นระบบเก็บสะสมแต้มเมื่อคุณชำระสินค้าผ่าน Bitcoin กับร้านที่เข้าร่วมรายการ แค่ทำตาม 4 ขั้นนี้",
            steps: [
                {
                    title: "1. สมัครสมาชิก",
                    text: "กดสมัครสมาชิก แล้วกรอกเบอร์โทรศัพท์",
                },
                {
                    title: "2. ถ้าเป็นร้านค้า",
                    text: "เลือกช่องทางการรับเงิน On-chain หรือ Lightning แล้วใส่ที่อยู่รับเงินที่เป็น Public Key[ซึ่งเปรียบเสมือนเลขบัญชีธนาคาร] ห้ามใส่ Private Key เด็ดขาด",
                },
                {
                    title: "3. ไปใช้ที่ร้าน",
                    text: "ค้นหาร้านค้าที่รับ Bitcoin เปิดกระเป๋าดิจิทัล ส่อง QR แล้วกดจ่าย",
                },
                {
                    title: "4. ได้แต้มสะสม",
                    text: "ทุกครั้งที่จ่ายสำเร็จ จะได้แต้มไปแลกสิทธิพิเศษทีหลัง",
                },
            ],
        },
        faq: {
            id: "faq",
            title: "คำถามที่พบบ่อย",
            items: [
                {
                    q: "Bitcoin Member คืออะไร?",
                    a: "เป็นสมาชิกสำหรับคนที่อยากใช้ Bitcoin ในชีวิตประจำวัน และร้านค้าที่รับชำระด้วย Bitcoin",
                },
                {
                    q: "สมัครแล้วเสียเงินไหม?",
                    a: "สมัครสมาชิกไม่เสียค่าธรรมเนียมจากเรา ค่าธรรมเนียมถ้ามีจะเป็นของเครือข่ายตอนโอนเงินเท่านั้น",
                },
                {
                    q: "ต้องมี Bitcoin ก่อนไหม?",
                    a: "ถ้าจะจ่ายของ ต้องมี Bitcoin ในกระเป๋าดิจิทัล ถ้าสมัครเพื่อสะสมแต้มและดูร้านค้า เริ่มจากเบอร์โทรได้เลย",
                },
                {
                    q: "On-chain กับ Lightning ต่างกันอย่างไร?",
                    a: "On-chain คือโอนบนบล็อกเชนหลัก เหมาะกับยอดใหญ่ Lightning คือทางลัด เร็วและถูก เหมาะซื้อของกินของใช้",
                },
                {
                    q: "ทำไมห้ามใส่ Private Key?",
                    a: "Private Key คือกุญแจเข้าถึงเงินทั้งหมด เราต้องการแค่ที่อยู่รับเงิน เหมือนเลขบัญชี ไม่ใช่รหัสผ่าน",
                },
                {
                    q: "OTP คืออะไร?",
                    a: "เป็นรหัส 6 หลักที่ส่งเข้าเบอร์โทร เพื่อยืนยันว่าเป็นเจ้าของเบอร์นั้นจริง ๆ",
                },
            ],
        },
        about: {
            id: "about",
            title: "เกี่ยวกับเรา",
            paragraphs: [
                "Bitcoin Member อยากให้ Bitcoin ใช้จ่ายได้จริง ไม่ใช่แค่ดูราคาบนมือถือ",
                "สมาชิกมาสะสมแต้มและรับสิทธิพิเศษ ร้านค้ามารับเงินผ่าน On-chain หรือ Lightning",
                "เราไม่เก็บ Private Key ของใคร และไม่ขอรหัสกระเป๋าเงิน หน้าที่เราคือเชื่อมคนซื้อกับร้านค้าที่รับ Bitcoin",
            ],
        },
        contact: {
            id: "contact",
            title: "ติดต่อเรา",
            intro: "มีคำถามหรืออยากร่วมเป็นร้านค้า ส่งข้อความมาได้เลย",
            emailLabel: "อีเมล",
            email: "toengmoon2@gmail.com",
            hours: "เราจะตอบกลับภายใน 1–2 วันทำการ",
            note: "ยังไม่ต้องกรอกฟอร์มยาว ๆ ส่งอีเมลสั้น ๆ บอกชื่อ เบอร์ และสิ่งที่อยากให้ช่วย ก็พอ",
        },
    },
    en: {
        kicker: "Support",
        title: "We are here to make Bitcoin easy",
        subtitle: "Short answers. No tech skills needed.",
        howToUse: {
            id: "how-to-use",
            title: "How to use",
            intro: "Using Bitcoin Member is like using a normal shopping app. Just follow these 4 steps.",
            steps: [
                {
                    title: "1. Join as a member",
                    text: "Tap Register, enter your phone number, then confirm the OTP sent to your phone.",
                },
                {
                    title: "2. If you are a merchant",
                    text: "Choose On-chain or Lightning as your receiving channel, then enter your receiving address. Never enter a Private Key.",
                },
                {
                    title: "3. Pay at a shop",
                    text: "Find a shop that accepts Bitcoin, open your wallet, scan the QR code, and tap pay.",
                },
                {
                    title: "4. Earn points",
                    text: "Every successful payment gives you points to redeem for special rewards later.",
                },
            ],
        },
        faq: {
            id: "faq",
            title: "FAQ",
            items: [
                {
                    q: "What is Bitcoin Member?",
                    a: "It is a membership for people who want to spend Bitcoin every day, and for shops that accept Bitcoin.",
                },
                {
                    q: "Does registration cost money?",
                    a: "Joining Bitcoin Member is free. If there is a fee, it is only the network fee when you send money.",
                },
                {
                    q: "Do I need Bitcoin first?",
                    a: "You need Bitcoin in a wallet to pay. To join, look at shops, and collect points, you can start with your phone number.",
                },
                {
                    q: "What is the difference between On-chain and Lightning?",
                    a: "On-chain is a transfer on the main blockchain, better for larger amounts. Lightning is the shortcut: faster and cheaper for everyday buys.",
                },
                {
                    q: "Why must I never enter a Private Key?",
                    a: "A Private Key can unlock all of your money. We only need a receiving address, like a bank account number, not a password.",
                },
                {
                    q: "What is OTP?",
                    a: "It is a 6-digit code sent to your phone to prove that the number belongs to you.",
                },
            ],
        },
        about: {
            id: "about",
            title: "About us",
            paragraphs: [
                "Bitcoin Member wants Bitcoin to be used in real life, not only watched as a price on a phone.",
                "Members collect points and unlock benefits. Merchants receive money through On-chain or Lightning.",
                "We never store anyone's Private Key and never ask for a wallet password. Our job is to connect buyers with shops that accept Bitcoin.",
            ],
        },
        contact: {
            id: "contact",
            title: "Contact us",
            intro: "Have a question or want to join as a merchant? Send us a message.",
            emailLabel: "Email",
            email: "toengmoon2@gmail.com",
            hours: "We usually reply within 1–2 business days.",
            note: "No long form needed. A short email with your name, phone number, and what you need is enough.",
        },
    },
    zh: {
        kicker: "支持",
        title: "我们想让 Bitcoin 更好用",
        subtitle: "内容很短，不用懂技术也能看懂。",
        howToUse: {
            id: "how-to-use",
            title: "使用方法",
            intro: "使用 Bitcoin Member 就像普通购物应用，按这 4 步就行。",
            steps: [
                {
                    title: "1. 注册会员",
                    text: "点击注册，填写手机号码，然后输入发到手机上的 OTP 验证码。",
                },
                {
                    title: "2. 如果是商家",
                    text: "选择 On-chain 或 Lightning 作为收款方式，再填写收款地址。千万不要填写私钥。",
                },
                {
                    title: "3. 到店支付",
                    text: "找到接受 Bitcoin 的商家，打开钱包，扫描二维码，点支付。",
                },
                {
                    title: "4. 获得积分",
                    text: "每次支付成功都会获得积分，以后可以兑换特别奖励。",
                },
            ],
        },
        faq: {
            id: "faq",
            title: "常见问题",
            items: [
                {
                    q: "Bitcoin Member 是什么？",
                    a: "这是给想在日常生活中使用 Bitcoin 的人，以及接受 Bitcoin 的商家准备的会员平台。",
                },
                {
                    q: "注册要花钱吗？",
                    a: "注册 Bitcoin Member 免费。如果有费用，通常只是转账时的网络手续费。",
                },
                {
                    q: "必须先有 Bitcoin 吗？",
                    a: "付款时钱包里需要有 Bitcoin。若只是注册、找店和累积积分，用手机号码就能开始。",
                },
                {
                    q: "On-chain 和 Lightning 有什么不同？",
                    a: "On-chain 是主链转账，比较适合较大金额。Lightning 是快捷通道，更快更便宜，适合日常消费。",
                },
                {
                    q: "为什么不能填写私钥？",
                    a: "私钥可以打开你的全部资金。我们只需要收款地址，就像银行账号，不是密码。",
                },
                {
                    q: "OTP 是什么？",
                    a: "这是发到手机上的 6 位验证码，用来确认这个号码真的是你的。",
                },
            ],
        },
        about: {
            id: "about",
            title: "关于我们",
            paragraphs: [
                "Bitcoin Member 希望 Bitcoin 能真正用来买东西，而不只是看手机上的价格。",
                "会员可以累积积分并享受权益。商家可通过 On-chain 或 Lightning 收款。",
                "我们不会保存任何人的私钥，也不会要钱包密码。我们的工作是把买家和接受 Bitcoin 的商家连在一起。",
            ],
        },
        contact: {
            id: "contact",
            title: "联系我们",
            intro: "有问题，或想成为商家？欢迎写信给我们。",
            emailLabel: "电子邮箱",
            email: "toengmoon2@gmail.com",
            hours: "我们通常会在 1–2 个工作日内回复。",
            note: "不用填写很长的表格。一封短信，写上姓名、电话和需要帮助的事情就够了。",
        },
    },
};

export default function SupportContent({ lang }: SupportContentProps) {
    const t = content[lang];

    return (
        <section className="relative overflow-hidden bg-black px-6 pb-20 pt-32 font-line md:pb-28 md:pt-40">
            <div className="pointer-events-none absolute left-10 top-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="pointer-events-none absolute right-10 bottom-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-4xl">
                <div className="mb-12 text-center">
                    <p className="text-sm font-semibold tracking-wide text-amber-400">{t.kicker}</p>
                    <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">{t.title}</h1>
                    <p className="mt-3 text-zinc-400">{t.subtitle}</p>
                </div>

                <article id={t.howToUse.id} className="scroll-mt-28 mb-8 rounded-[28px] border border-white/10 bg-[#171717] p-6 md:p-10">
                    <div className="mb-5 flex items-center gap-3 text-amber-500">
                        <BookOpen size={26} />
                        <h2 className="text-2xl font-bold md:text-3xl">{t.howToUse.title}</h2>
                    </div>
                    <p className="mb-6 text-zinc-300">{t.howToUse.intro}</p>
                    <div className="space-y-4">
                        {t.howToUse.steps.map((step) => (
                            <div key={step.title} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
                                <h3 className="font-semibold text-white">{step.title}</h3>
                                <p className="mt-2 leading-relaxed text-zinc-300">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article id={t.faq.id} className="scroll-mt-28 mb-8 rounded-[28px] border border-white/10 bg-[#171717] p-6 md:p-10">
                    <div className="mb-5 flex items-center gap-3 text-amber-500">
                        <HelpCircle size={26} />
                        <h2 className="text-2xl font-bold md:text-3xl">{t.faq.title}</h2>
                    </div>
                    <div className="space-y-4">
                        {t.faq.items.map((item) => (
                            <div key={item.q} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
                                <h3 className="font-semibold text-white">{item.q}</h3>
                                <p className="mt-2 leading-relaxed text-zinc-300">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article id={t.about.id} className="scroll-mt-28 mb-8 rounded-[28px] border border-white/10 bg-[#171717] p-6 md:p-10">
                    <div className="mb-5 flex items-center gap-3 text-amber-500">
                        <Users size={26} />
                        <h2 className="text-2xl font-bold md:text-3xl">{t.about.title}</h2>
                    </div>
                    <div className="space-y-4">
                        {t.about.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 leading-relaxed text-zinc-300">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                <article id={t.contact.id} className="scroll-mt-28 rounded-[28px] border border-white/10 bg-[#171717] p-6 md:p-10">
                    <div className="mb-5 flex items-center gap-3 text-amber-500">
                        <Mail size={26} />
                        <h2 className="text-2xl font-bold md:text-3xl">{t.contact.title}</h2>
                    </div>
                    <p className="mb-5 text-zinc-300">{t.contact.intro}</p>
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-5">
                        <p className="text-sm text-amber-200">{t.contact.emailLabel}</p>
                        <a
                            href={`mailto:${t.contact.email}`}
                            className="mt-1 block text-lg font-semibold text-white hover:text-amber-400"
                        >
                            {t.contact.email}
                        </a>
                        <p className="mt-3 text-sm text-zinc-300">{t.contact.hours}</p>
                    </div>
                    <p className="mt-5 leading-relaxed text-zinc-400">{t.contact.note}</p>
                </article>
            </div>
        </section>
    );
}
