'use client';

const modalContent = {
    th: {
        title: "สมัครสมาชิก",
        subtitle: "กรอกข้อมูลเพื่อรับสิทธิพิเศษ",
        nameLabel: "ชื่อ - นามสกุล",
        namePlaceholder: "ระบุชื่อของคุณ",
        emailLabel: "อีเมล",
        emailPlaceholder: "example@email.com",
        submitBtn: "ยืนยันการสมัคร",
        closeBtn: "ปิด"
    },
    en: {
        title: "Register Membership",
        subtitle: "Fill in your details for exclusive benefits",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your full name",
        emailLabel: "Email Address",
        emailPlaceholder: "example@email.com",
        submitBtn: "Submit Registration",
        closeBtn: "Close"
    },
    zh: {
        title: "注册会员",
        subtitle: "填写您的详细信息以获取专属优惠",
        nameLabel: "姓名",
        namePlaceholder: "请输入您的姓名",
        emailLabel: "电子邮箱",
        emailPlaceholder: "example@email.com",
        submitBtn: "提交注册",
        closeBtn: "关闭"
    }
};

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang?: 'th' | 'en' | 'zh';
}

export default function RegisterModal({ isOpen, onClose, lang = 'th' }: RegisterModalProps) {
    if (!isOpen) return null;

    // เลือกใช้ข้อความตามภาษาปัจจุบัน
    const t = modalContent[lang];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-line">
            <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-neutral-900 p-6 text-white shadow-2xl">

                {/* Header Modal */}
                <div className="mb-6 text-center">
                    <h3 className="text-3xl font-bold text-amber-500">{t.title}</h3>
                    <p className="mt-1 text-sm text-gray-300">{t.subtitle}</p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">
                            {t.nameLabel}
                        </label>
                        <input
                            type="text"
                            placeholder={t.namePlaceholder}
                            className="w-full rounded-xl border border-white/20 bg-black/50 p-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">
                            {t.emailLabel}
                        </label>
                        <input
                            type="email"
                            placeholder={t.emailPlaceholder}
                            className="w-full rounded-xl border border-white/20 bg-black/50 p-3 text-white placeholder-gray-500 focus:border-amber-500 focus:outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-white/20 py-3 text-gray-300 hover:bg-white/10 transition-all cursor-pointer"
                        >
                            {t.closeBtn}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-black hover:bg-amber-400 transition-all cursor-pointer"
                        >
                            {t.submitBtn}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}